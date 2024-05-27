import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { IDynamicChart } from '../../../utils/models/dynamic.interface';
import { Observable, of, Subject, take, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

interface IDataSource {
  name: { name: string; id: string };
  field: string;
  color: string;
}

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
})
export class DynamicChartComponent
  extends SharedFeaturesBaseComponent<IDynamicChart>
  implements AfterViewInit, OnDestroy
{
  /**
   * @deprecated
   */
  @Input() chartId: string;

  private _root: am5.Root;
  public backgroundColor = 'transparent'

  constructor(private store: Store<DashboardState>) {
    super();
  }

  ngAfterViewInit() {
    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      .pipe(
        map((item) => {
          let config = this.config;
          if (item?.['content']?.config) {
            config = item['content'].config;
          }

          if (this._root) {
            this._root.dispose();
          }
          this._root = am5.Root.new('dynamic_chart_' + this.chartId);
          this._root.setThemes([am5themes_Animated.new(this._root)]);
          if (config.view.chart.BackgroundColor) {
            this.backgroundColor = config.view.chart.BackgroundColor;
          }
          let chart = this._root.container.children.push(
            am5xy.XYChart.new(this._root, {
              panX: true,
              panY: true,
              wheelX: 'panX',
              wheelY: 'zoomX',
              pinchZoomX: true,
            })
          );
          const cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(this._root, {})
          );
          cursor.lineX.set('visible', false);
          cursor.lineY.set('visible', false);

          let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(this._root, {
              baseInterval: { timeUnit: 'second', count: 1 },
              renderer: am5xy.AxisRendererX.new(this._root, {}),
              tooltip: am5.Tooltip.new(this._root, {}),
            })
          );
          xAxis.set('tooltipDateFormat', 'yyyy/MM/dd HH:mm:ss');
          let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(this._root, {
              maxDeviation: 0.3,
              renderer: am5xy.AxisRendererY.new(this._root, {}),
            })
          );
          chart.appear(1000, 100);

          let rawData: { [key: string]: any }[] = [];
          const self = this;
          chart.plotContainer.children.push(
            am5.Label.new(this._root, {
              x: 10,
              y: 10,
              text: config.view.label?.title,
              fill: am5.color(0xffffff),
            })
          );
          const nowDate = new Date().getTime();
          if (config.view.scrollbarY.enable) {
            let scrollbarY = chart.set(
              'scrollbarY',
              am5xy.XYChartScrollbar.new(this._root, {
                orientation: 'vertical',
                width: config.view.scrollbarY.width || 20,
              })
            );
          }
          let scrollbarX: am5xy.XYChartScrollbar;
          let sbDateAxis: am5xy.DateAxis<am5xy.AxisRenderer>;
          let sbValueAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;
          if (config.view.scrollbarX.enable) {
            scrollbarX = chart.set(
              'scrollbarX',
              am5xy.XYChartScrollbar.new(this._root, {
                orientation: 'horizontal',
                height: config.view.scrollbarX.height || 40,
              })
            );
            config.view.scrollbarX.position === 'bottom'
              ? chart.bottomAxesContainer.children.push(scrollbarX)
              : chart.topAxesContainer.children.push(scrollbarX);
            sbDateAxis = scrollbarX.chart.xAxes.push(
              am5xy.DateAxis.new(this._root, {
                baseInterval: {
                  timeUnit: 'second',
                  count: 1,
                },
                markUnitChange: false,
                renderer: am5xy.AxisRendererX.new(this._root, {}),
              })
            );
            sbValueAxis = scrollbarX.chart.yAxes.push(
              am5xy.ValueAxis.new(this._root, {
                renderer: am5xy.AxisRendererY.new(this._root, {}),
              })
            );
          }
          config.content.forEach((content) => {
            this.safeObservable(this.generateData(nowDate))
              .pipe(
                map((history) => {
                  history.map((data) => {
                    rawData.push({
                      date: data.date,
                      [content.outputs.read.name]: data.value,
                    });
                  });
                  const series = chart.series.push(
                    am5xy.LineSeries.new(this._root, {
                      name: content.outputs.read.name,
                      xAxis: xAxis,
                      yAxis: yAxis,
                      fill: am5.color(content.color || 0x74b9ff),
                      stroke: am5.color(content.color || 0x74b9ff),
                      valueYField: content.outputs.read.name,
                      valueXField: 'date',
                      tooltip: am5.Tooltip.new(this._root, {
                        labelText: `${content.outputs.read.name}:{valueY}`,
                      }),
                    })
                  );
                  series.bullets.push(() => {
                    return am5.Bullet.new(self._root, {
                      locationY: 0,
                      sprite: am5.Circle.new(self._root, {
                        radius: config.view.bullet.size || 2,
                        fill: series.get('fill'),
                      }),
                    });
                  });
                  series.data.setAll(rawData);

                  if (
                    scrollbarX &&
                    sbDateAxis &&
                    sbValueAxis &&
                    config.view.scrollbarX.type === 'data'
                  ) {
                    let sbSeries = scrollbarX.chart.series.push(
                      am5xy.LineSeries.new(this._root, {
                        valueYField: 'value',
                        valueXField: 'date',
                        xAxis: sbDateAxis,
                        yAxis: sbValueAxis,
                      })
                    );
                    sbSeries.data.setAll(history);
                  }

                  if (config.view.target.enabled) {
                    const seriesRangeDataItem: any = yAxis.makeDataItem({
                      value: config.view.target.value || 20,
                      endValue: 0,
                    });
                    const seriesRange =
                      series.createAxisRange(seriesRangeDataItem);
                    seriesRangeDataItem.get('grid').setAll({
                      strokeOpacity: 1,
                      visible: true,
                      stroke: am5.color(0x000000),
                      strokeDasharray: [2, 2],
                    });

                    seriesRangeDataItem.get('label').setAll({
                      location: 0,
                      visible: true,
                      text: config.view.target.title,
                      inside: true,
                      centerX: 0,
                      centerY: am5.p100,
                      fontWeight: 'bold',
                    });
                  }

                  series.appear(1000);
                  this._root?.resize();
                  return series;
                }),
                take(1),
                map((series) => {
                  setInterval(() => {
                    this.addData(series, Math.round(Math.random() * 800 + 400));
                  }, 3000);
                })
              )
              .subscribe();
          });
        })
      )
      .subscribe();
  }

  private addData(series: any, value: number) {
    const easing = am5.ease.linear;
    let lastDataItem = series.dataItems[series.dataItems.length - 1];
    let lastValue = lastDataItem.get('valueY');
    let date = new Date().getTime();
    series.data.push({
      date: date,
      value: value,
    });

    let newDataItem = series.dataItems[series.dataItems.length - 1];
    newDataItem.animate({
      key: 'valueYWorking',
      to: value,
      from: lastValue,
      duration: 500,
      easing: easing,
    });
  }

  private generateData(
    nowDate: number
  ): Observable<{ date: Date; value: number }[]> {
    const data = [];
    for (let i = 10; i > 0; i--) {
      let rawData: any = {
        date: nowDate - 1000 * i,
        value: Math.round(Math.random() * 800 + 400),
      };
      data.push(rawData);
    }
    return of(data);
  }
}
