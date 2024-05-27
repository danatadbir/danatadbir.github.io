import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Store } from '@ngrx/store';
import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { map } from 'rxjs/operators';
import { Color } from '@amcharts/amcharts5';
import {
  IColumnChart,
  IColumnChartContent,
  IMultiColumnChartContent,
} from '../../../utils/models/column.interface';
import { Subscription, interval } from 'rxjs';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

interface IColumnChartData {
  topic: string;
  color?: Color;
  outputs: string;
  value: number;
}

interface IColumnChartUpdateItem {
  cols: number;
  content: {
    config: IColumnChart;
    name: string;
  };
  id: string;
  rows: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-cluster-column-chart',
  templateUrl: './cluster-column-chart.component.html',
  styleUrls: ['./cluster-column-chart.component.scss'],
})
export class ClusterColumnChartComponent
  extends SharedFeaturesBaseComponent<IColumnChart>
  implements AfterViewInit, OnDestroy
{
  /**
   * @deprecated
   */
  @Input() chartId: string;
  private _root: am5.Root;
  private _bringToLife: any;
  private _series: am5xy.ColumnSeries[] = [];
  private _chart: am5xy.XYChart;
  private _yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;
  private _xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>;
  public backgroundColor = 'transparent';

  private data: IMultiColumnChartContent[] = [
    {
      label: 'Jan',
      columns: [
        {
          outputs: { read: { name: 'USA', type: 'Number' } },
          topic: { id: '0', name: '' },
          color: '#e33529',
        },
        {
          outputs: { read: { name: 'China', type: 'Number' } },
          topic: { id: '0', name: '' },
          color: '#10abc7',
        },
      ],
    },
    {
      label: 'Feb',
      columns: [
        {
          outputs: { read: { name: 'USA2', type: 'Number' } },
          Equivalent: 'USA',
          topic: { id: '0', name: '' },
          color: '#e33529',
        },
        {
          outputs: { read: { name: 'China2', type: 'Number' } },
          Equivalent: 'China',
          topic: { id: '0', name: '' },
          color: '#10abc7',
        },
      ],
    },
  ];

  constructor(private store: Store<DashboardState>) {
    super();
  }

  // override onChanges(changes: SimpleChanges): void {
  //   if (changes['config']) {
  //     // console.log('changed config:', this.config, this.chartId);
  //   }
  // }

  ngAfterViewInit() {
    // this.test();
    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      .pipe(
        map((item: any) => {
          this.updateChart(item);
        })
      )
      .subscribe();

    this.safeObservable(interval(5000)).subscribe(() => {
      this.updateChartData();
    });
  }

  updateChart(item: IColumnChartUpdateItem) {
    // console.log('item', item, this.widgetId);
    let config = this.config;
    if (item?.content?.config) {
      config = item.content.config;
    }
    if (this._root) {
      this._root.dispose();
    }
    this._root = am5.Root.new(this.widgetId);

    this._root.setThemes([am5themes_Animated.new(this._root)]);

    if (config.view.chart.BackgroundColor) {
      this.backgroundColor = config.view.chart.BackgroundColor;
    }

    this._chart = this._root.container.children.push(
      am5xy.XYChart.new(this._root, {
        panX: config.view.chart.panX || true,
        panY: config.view.chart.panY || true,
        wheelX: config.view.chart.wheelX || 'panX',
        wheelY: config.view.chart.wheelY || 'zoomX',
        pinchZoomX: config.view.chart.pinchZoomX || true,
      })
    );

    const cursor = this._chart.set(
      'cursor',
      am5xy.XYCursor.new(this._root, {})
    );
    cursor.lineY.set('visible', false);

    const xRenderer = am5xy.AxisRendererX.new(this._root, {
      // minGridDistance: 30,
    });
    const XRendererConfig = config.view.xRenderer;
    let centerY = am5.p50;
    let centerX = am5.p100;
    if (XRendererConfig.centerY === '100') {
      centerY = am5.p100;
    }

    if (XRendererConfig.centerX === '50') {
      centerX = am5.p50;
    }
    xRenderer.labels.template.setAll({
      rotation: config.view.xRenderer.rotation || 0,
      centerY,
      centerX,
      breakWords: config.view.xRenderer.breakWords || true,
      textAlign: config.view.xRenderer.textAlign || 'center',
      fontSize: config.view.xRenderer.fontSize || '10',
      visible: config.view.xRenderer.visible || false,
    });

    xRenderer.grid.template.setAll({
      location: 1,
    });

    this._xAxis = this._chart.xAxes.push(
      am5xy.CategoryAxis.new(this._root, {
        maxDeviation: 0.3,
        categoryField: 'label',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(this._root, {}),
      })
    );

    this._yAxis = this._chart.yAxes.push(
      am5xy.ValueAxis.new(this._root, {
        maxDeviation: 0.1,
        min: config.view.chart.min || 0,
        max: config.view.chart.max || 100,
        renderer: am5xy.AxisRendererY.new(this._root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    if (config.content && config.content.length > 0) {
      this.data = config.content.map((content: any) => {
        return {
          label: content.label,
          columns: content['columns'].map((i: any) => {
            return {
              outputs: { read: i.outputs_read },
              Equivalent: i.Equivalent,
              topic: i.topic,
              color: i.color,
            };
          }),
        };
      });
      // this.data = config.multiContent;
      // .map((content: IColumnChartContent[]) => {
      //   return content.map(item => {
      //     return {
      //       topic: item.topic.id,
      //       color: am5.color(item.color ?? '#000000'),
      //       outputs: item.outputs?.read?.name || 'undefined',
      //       value: Math.round(Math.random() * 50),
      //     };
      //   });
      // return {
      //   topic: content.topic.id,
      //   color: am5.color(content.color ?? '#000000'),
      //   outputs: content.outputs?.read?.name || 'undefined',
      //   value: Math.round(Math.random() * 50),
      // };
      // });
    }

    this._series = [];
    let fieldNames = this.data[0].columns.map(
      i => i.Equivalent || i.outputs_read?.name || i.outputs.read.name
    );
    // let outputNames = this.data[0].map(i => i.outputs);
    let clusterCount = config.view.chart.clusterCount;
    if (config.multiContent && config.multiContent.length === 0) {
      clusterCount = this.data[0].columns.length;
    }
    for (let i = 0; i < clusterCount; i++) {
      const newSeries = this.addSeries(
        'Series_' + i,
        'label',
        config,
        fieldNames[i]
      );
    }

    // Add legend
    // const legend = this._chart.children.push(am5.Legend.new(this._root, {}));
    // legend.data.setAll(this._chart.series.values);

    this._chart.appear(300, 10);

    setTimeout(() => {
      this.updateChartData();
    }, 500);
  }

  updateChartData() {
    if (!this.data || !this._series) return;
    const randomizeData = this.data.map(item => {
      const items = item.columns.map(i => {
        i.value = Math.round(Math.random() * 50);
        return i; //{ [i.outputs]: i.value };
      });
      let mergedItems: { [k: string]: any } = {};
      for (const it of items) {
        if (it.Equivalent) {
          mergedItems[it.Equivalent] = it.value;
        } else if (it.outputs_read) {
          mergedItems[it.outputs_read.name] = it.value;
        } else if (it.outputs?.read) {
          mergedItems[it.outputs.read.name] = it.value;
        }
      }
      mergedItems['label'] = item.label;
      // mergedItems['color'] = item[0].color;
      return mergedItems;
    });
    // console.log('randomizeData:', randomizeData);
    this._xAxis.data.setAll(randomizeData);
    for (let i = 0; i < this._series.length; i++) {
      const seriesItem = this._series[i];
      seriesItem.data.setAll(randomizeData);

      seriesItem.appear(500).then(() => {
        // for (let j = 0; j < this.data[i].length; j++) {
        //   seriesItem.columns
        //     .getIndex(j)
        //     ?.template?.set('fill', this.data[i][j].color);
        //   seriesItem.columns
        //     .getIndex(j)
        //     ?.template?.set('stroke', this.data[i][j].color);
        // }//TODO:
      });
    }
  }

  private addSeries(
    name: string,
    categoryName: string,
    config: IColumnChart,
    fieldName: string
  ) {
    const newSeries = am5xy.ColumnSeries.new(this._root, {
      name,
      xAxis: this._xAxis,
      yAxis: this._yAxis,
      valueYField: fieldName,
      sequencedInterpolation: true,
      // background: am5.Color('green'),
      categoryXField: categoryName,
      tooltip: am5.Tooltip.new(this._root, {
        labelText: '{valueY}',
      }),
    });
    this._series.push(newSeries);
    this._chart.series.push(newSeries);
    newSeries.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    // newSeries.columns.template.adapters.add(
    //   'fill',
    //   function (fill: any, target: any) {
    //     if (target.dataItem) {
    //       return target.dataItem.dataContext['color'];
    //     }
    //     return am5.color('#000000');
    //   }
    // );

    // newSeries.columns.template.adapters.add(
    //   'stroke',
    //   function (stroke: any, target: any) {
    //     if (target.dataItem) {
    //       return target.dataItem.dataContext['color'];
    //     }
    //     return am5.color('#000000');
    //   }
    // );

    return newSeries;
  }

  override onDestroy() {
    if (this._root) {
      this._root.dispose();
    }
  }
}
