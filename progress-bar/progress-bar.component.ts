import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';

import { getDashboardItem } from 'src/app/Dashboard/data-access/dashboard.selector';
import { DashboardState } from 'src/app/Dashboard/data-access/dashboard.state';

import {
  IProgressSeries,
  IProgressChartAxisLabel,
  IProgressChartRangeColor,
} from 'src/app/ct-shared/utils/models';
import { IDynamicChart } from 'src/app/ct-shared/utils/models/dynamic.interface';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})

// setting series must change for colors user should set range and color
// example: range: [{start: 0, end: 20, color: #ff0000},{start: 20, end: 80, color: #00ff00},...];
export class ProgressBarComponent
  extends SharedFeaturesBaseComponent<IDynamicChart>
  implements AfterViewInit, OnDestroy
{
  /**
   * @deprecated
   */
  @Input() chartId: string;

  private _root: am5.Root;
  public backgroundColor = 'transparent';

  constructor(private store: Store<DashboardState>) {
    super();
  }

  ngAfterViewInit() {
    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      .pipe(
        map(item => {
          const config = item['content'].config || this.config;
          if (this._root) this._root.dispose();

          this._root = am5.Root.new('progress_' + this.chartId);

          // Set themes
          // https://www.amcharts.com/docs/v5/concepts/themes/
          this._root.setThemes([am5themes_Animated.new(this._root)]);
          if (config.view.chart.BackgroundColor) {
            this.backgroundColor = config.view.chart.BackgroundColor;
          }
          // Create chart
          // https://www.amcharts.com/docs/v5/charts/xy-chart/
          let chart = this._root.container.children.push(
            am5xy.XYChart.new(this._root, {
              ...config.view.chart,
              layout: this._root.verticalLayout,
            })
          );

          // Add legend
          // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
          let legend = chart.children.push(
            am5.Legend.new(this._root, {
              centerX: am5.p50,
              x: am5.p50,
            })
          );
          // Create axes
          // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
          let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(this._root, {
              categoryField: 'category',
              renderer: am5xy.AxisRendererX.new(this._root, {}),
              tooltip: am5.Tooltip.new(this._root, {}),
            })
          );
          let xRenderer = xAxis.get('renderer');

          xRenderer.grid.template.set('forceHidden', true);
          xRenderer.labels.template.set('forceHidden', true);

          const rangeColor = config.view.rangeColor
            .slice()
            .sort(
              (a: IProgressChartRangeColor, b: IProgressChartRangeColor) => {
                if (a.start < b.start) return -1;
                return 1;
              }
            );

          let range: { [key: number]: string }[] = [];
          rangeColor?.forEach((item: IProgressChartRangeColor) => {
            range[item.start] = item.color;
          });
          const lastItem = rangeColor[rangeColor.length - 1].end;

          const data = [];
          let rangeColorCounter = 0;
          let fill = '';
          for (let i = rangeColor[0].start; i < lastItem; i++) {
            if (rangeColor[rangeColorCounter]) {
              if (
                rangeColor[rangeColorCounter + 1] &&
                i > rangeColor[rangeColorCounter + 1].start
              )
                rangeColorCounter++;
              fill = rangeColor[rangeColorCounter].color;
              data.push({
                category: i,
                columnSettings: { fill },
                value: 100,
                currentBullet: config.view.bullet.bullet == i,
              });
            }
          }
          xAxis.data.setAll(data.reverse());

          let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(this._root, {
              ...config.view.valueAxisSetting,
              renderer: am5xy.AxisRendererY.new(this._root, {}),
            })
          );

          let yRenderer = yAxis.get('renderer');
          yRenderer.grid.template.set('forceHidden', true);
          yRenderer.labels.template.set('forceHidden', true);
          //////////////////////////////////////////////////////////////
          // Add series
          // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
          const columnsTemplate = {
            width: am5.p100,
            tooltipY: 0,
            strokeOpacity: 1,
            strokeWidth: 2,
            stroke: am5.color(0xffffff),
            templateField: 'columnSettings',
          };
          const columnSeries = {
            valueYField: 'value',
            categoryXField: 'category',
            maskBullets: false,
          };
          let series = chart.series.push(
            am5xy.ColumnSeries.new(this._root, {
              xAxis,
              yAxis,
              ...columnSeries,
            })
          );

          series.columns.template.setAll(columnsTemplate);
          series.bullets.push((root, target, dataItem) => {
            let dataContext: any = dataItem.dataContext;
            if (dataContext?.currentBullet) {
              let container = am5.Container.new(root, {});

              let pin = container.children.push(
                am5.Graphics.new(root, {
                  fill: dataContext.columnSettings?.fill,
                  dy: -5,
                  centerY: am5.p100,
                  centerX: am5.p50,
                  svgPath:
                    'M66.9 41.8c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4 0 11.3 20.4 32.4 20.4 32.4s20.4-21.1 20.4-32.4zM37 41.4c0-5.2 4.3-9.5 9.5-9.5s9.5 4.2 9.5 9.5c0 5.2-4.2 9.5-9.5 9.5-5.2 0-9.5-4.3-9.5-9.5z',
                })
              );

              return am5.Bullet.new(root, {
                locationY: 1,
                sprite: container,
              });
            } else if (dataContext.targetBullet) {
              let container = am5.Container.new(root, {
                dx: 15,
              });

              let circle = container.children.push(
                am5.Circle.new(root, { ...config.view.targetCircle })
              );

              let targetLabel = container.children.push(
                am5.Label.new(root, { ...config.view.targetSettings })
              );

              return am5.Bullet.new(root, {
                locationY: 0.5,
                sprite: container,
              });
            }
            return undefined;
          });
          series.data.setAll(data);
          config.view.axisLabels.forEach((item: IProgressChartAxisLabel) =>
            this.addAxisLabel(xAxis, item.category, item.text)
          );

          series.appear(1000, 100);
          chart.appear(1000, 100);
        })
      )
      .subscribe();
  }

  // Add labels
  addAxisLabel(
    xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>,
    category: any,
    text: any,
    fill = 0x000000
  ) {
    let rangeDataItem = xAxis.makeDataItem({
      category: category,
    });

    let range = xAxis.createAxisRange(rangeDataItem);
    if (range) {
      range.get('label')?.setAll({
        fill: am5.color(fill ?? 0x000000),
        text: text,
        forceHidden: false,
      });
      range.get('grid')?.setAll({
        strokeOpacity: 1,
        location: 1,
      });
    }
  }
}
