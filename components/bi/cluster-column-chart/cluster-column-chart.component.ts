import { Component } from '@angular/core';

import { Color } from '@amcharts/amcharts5';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { interval } from 'rxjs';
import WidgetComponent from '@sharedComponents/models/widget-component.model';
import {
  IColumnChart,
  IMultiColumnChartContent,
} from '@sharedComponents/models/column.interface';

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
export class ClusterColumnChartComponent extends WidgetComponent {
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

  override renderView(): void {
    this.initialChart();
    this.updateChart();
  }

  initialChart(): void {
    if (!this.config) return;

    if (this._root) {
      this._root.dispose();
    }
    this._root = am5.Root.new(this.id);

    this._root.setThemes([am5themes_Animated.new(this._root)]);

    if (this.config['view'].chart.BackgroundColor) {
      this.backgroundColor = this.config['view'].chart.BackgroundColor;
    }

    this._chart = this._root.container.children.push(
      am5xy.XYChart.new(this._root, {
        panX: this.config['view'].chart.panX || true,
        panY: this.config['view'].chart.panY || true,
        wheelX: this.config['view'].chart.wheelX || 'panX',
        wheelY: this.config['view'].chart.wheelY || 'zoomX',
        pinchZoomX: this.config['view'].chart.pinchZoomX || true,
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
    const XRendererConfig = this.config['view'].xRenderer;
    let centerY = am5.p50;
    let centerX = am5.p100;
    if (XRendererConfig.centerY === '100') {
      centerY = am5.p100;
    }

    if (XRendererConfig.centerX === '50') {
      centerX = am5.p50;
    }
    xRenderer.labels.template.setAll({
      rotation: this.config['view'].xRenderer.rotation || 0,
      centerY,
      centerX,
      breakWords: this.config['view'].xRenderer.breakWords || true,
      textAlign: this.config['view'].xRenderer.textAlign || 'center',
      fontSize: this.config['view'].xRenderer.fontSize || '10',
      visible: this.config['view'].xRenderer.visible || false,
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
        min: this.config['view'].chart.min || 0,
        max: this.config['view'].chart.max || 100,
        renderer: am5xy.AxisRendererY.new(this._root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    if (this.config['config'] && this.config['config'].length > 0) {
      this.data = this.config['config'].map((content: any) => {
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
    let clusterCount = this.config['view'].chart.clusterCount;
    if (
      this.config['multiContent'] &&
      this.config['multiContent'].length === 0
    ) {
      clusterCount = this.data[0].columns.length;
    }
    for (let i = 0; i < clusterCount; i++) {
      const newSeries = this.addSeries(
        'Series_' + i,
        'label',
        this.config as IColumnChart,
        fieldNames[i]
      );
    }

    // Add legend
    // const legend = this._chart.children.push(am5.Legend.new(this._root, {}));
    // legend.data.setAll(this._chart.series.values);

    this._chart.appear(300, 10);

    setTimeout(() => {
      this.updateChart();
    }, 500);
  }

  updateChart() {
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

    this.safeObservable(interval(5000)).subscribe(() => {
      this.updateChart();
    });
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

  override destroy() {
    if (this._root) {
      this._root.dispose();
    }
  }
}
