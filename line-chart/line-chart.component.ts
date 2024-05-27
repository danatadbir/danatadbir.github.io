import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Store } from '@ngrx/store';
// import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
import { Color } from '@amcharts/amcharts5';
// import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { map } from 'rxjs/operators';
import { ILineChart } from '@sharedComponents/models/line.interface';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent
  extends SharedFeaturesBaseComponent<ILineChart>
  implements AfterViewInit, OnDestroy
{
  /**
   * @deprecated
   */
  @Input() chartId: string;

  private _root: am5.Root;
  public backgroundColor = 'transparent';
  //FIXME:
  //@ts-ignore

  constructor(private store: Store<DashboardState>) {
    super();
  }

  ngAfterViewInit() {
    let data: {
      topic: string;
      value: number;
      color: Color;
    }[] = [];
      //FIXME:
  //@ts-ignore

    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      .pipe(
        map(item => {
          const config = item['content'].config || this.config;
          if (this._root) {
            this._root.dispose();
          }
          this._root = am5.Root.new('line_chart_' + this.chartId);
          this._root.setThemes([am5themes_Animated.new(this._root)]);
          if (config.view.chart.BackgroundColor) {
            this.backgroundColor = config.view.chart.BackgroundColor;
          }

          let chart = this._root.container.children.push(
            am5xy.XYChart.new(this._root, {
              panX: config.view.chart.panX || true,
              panY: config.view.chart.panY || true,
              wheelX: config.view.chart.wheelX || 'panX',
              wheelY: config.view.chart.wheelY || 'zoomX',
              pinchZoomX: config.view.chart.pinchZoomX || true,
            })
          );

          let cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(this._root, {
              behavior: 'none',
            })
          );
          cursor.lineX.set('visible', config.view.cursor.lineX || false);
          cursor.lineY.set('visible', config.view.cursor.lineY || false);

          let date = new Date();
          date.setHours(0, 0, 0, 0);
          let value = 100;

          function generateData() {
            value = Math.round(Math.random() * 10 - 5 + value);

            am5.time.add(date, 'day', 1);
            return { date: date.getTime(), value: value };
          }

          function generateDatas(count: number) {
            let data = [];
            for (let i = 0; i < count; ++i) {
              data.push(generateData());
            }
            return data;
          }

          let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(this._root, {
              baseInterval: { timeUnit: 'day', count: 1 },
              renderer: am5xy.AxisRendererX.new(this._root, {}),
              tooltip: am5.Tooltip.new(this._root, {}),
            })
          );

          let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(this._root, {
              renderer: am5xy.AxisRendererY.new(this._root, {}),
            })
          );

          let series = chart.series.push(
            am5xy.LineSeries.new(this._root, {
              name: 'Series',
              xAxis: xAxis,
              yAxis: yAxis,
              fill: am5.color(config.view.series.color || 0x74b9ff),
              stroke: am5.color(config.view.series.color || 0x74b9ff),
              valueYField: 'value',
              valueXField: 'date',
              tooltip: am5.Tooltip.new(this._root, {
                labelText: '{valueY}',
              }),
            })
          );

          let data = generateDatas(2000);
          series.data.setAll(data);

          if (config.view.scroll.enable) {
            let scrollbar = chart.set(
              'scrollbarX',
              am5xy.XYChartScrollbar.new(this._root, {
                orientation: 'horizontal',
                height: 20,
              })
            );
            if (config.view.scroll.type === 'sb') {
              let sbDateAxis = scrollbar.chart.xAxes.push(
                am5xy.DateAxis.new(this._root, {
                  baseInterval: {
                    timeUnit: 'day',
                    count: 1,
                  },
                  renderer: am5xy.AxisRendererX.new(this._root, {}),
                })
              );
              let sbValueAxis = scrollbar.chart.yAxes.push(
                am5xy.ValueAxis.new(this._root, {
                  renderer: am5xy.AxisRendererY.new(this._root, {}),
                })
              );
              let sbSeries = scrollbar.chart.series.push(
                am5xy.LineSeries.new(this._root, {
                  valueYField: 'value',
                  valueXField: 'date',
                  xAxis: sbDateAxis,
                  yAxis: sbValueAxis,
                })
              );
              sbSeries.data.setAll(data);
            }
          }
          series.appear(1000);
          chart.appear(1000, 100);
        })
      )
      .subscribe();
  }

  override onDestroy() {
    // if (this.storeSub)
    //   this.storeSub.unsubscribe();
  }
}
