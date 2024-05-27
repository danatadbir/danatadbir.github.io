import { Component } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Color } from '@amcharts/amcharts5';
import WidgetComponent from '@sharedComponents/models/widget-component.model';
import { IColumnChartContent } from '@sharedComponents/models/column.interface';

interface IColumnChartData {
  topic: string;
  color: Color;
  outputs: string;
  value: number;
}

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent extends WidgetComponent {
  private _root: am5.Root;
  private _bringToLife: any;
  private _series: am5xy.ColumnSeries;
  public backgroundColor = 'transparent';

  private data: IColumnChartData[] = [
    {
      outputs: 'USA',
      topic: 'USA',
      color: am5.color(0x74b9ff),
      value: 25,
    },
    {
      outputs: 'China',
      topic: 'China',
      color: am5.color(0xa29bfe),
      value: 18,
    },
    {
      outputs: 'Japan',
      topic: 'Japan',
      color: am5.color(0x81ecec),
      value: 9,
    },
  ];

  override renderView(): void {
    this.initialChart();
    this.updateChart();
  }

  private initialChart(): void {
    if (!this.config) return;
    if (this._root) {
      this._root.dispose();
    }
    this._root = am5.Root.new(this.id);

    this._root.setThemes([am5themes_Animated.new(this._root)]);

    if (this.config['view'].chart.BackgroundColor) {
      this.backgroundColor = this.config['view'].chart.BackgroundColor;
    }

    const chart = this._root.container.children.push(
      am5xy.XYChart.new(this._root, {
        panX: this.config['view'].chart.panX || true,
        panY: this.config['view'].chart.panY || true,
        wheelX: this.config['view'].chart.wheelX || 'panX',
        wheelY: this.config['view'].chart.wheelY || 'zoomX',
        pinchZoomX: this.config['view'].chart.pinchZoomX || true,
      })
    );

    const cursor = chart.set('cursor', am5xy.XYCursor.new(this._root, {}));
    cursor.lineY.set('visible', false);

    const xRenderer = am5xy.AxisRendererX.new(this._root, {
      minGridDistance: 30,
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

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this._root, {
        maxDeviation: 0.3,
        categoryField: 'outputs',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(this._root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this._root, {
        maxDeviation: 0.1,
        min: this.config['view'].chart.min || 0,
        max: this.config['view'].chart.max || 100,
        renderer: am5xy.AxisRendererY.new(this._root, {
          strokeOpacity: 0.1,
        }),
      })
    );
    this._series = am5xy.ColumnSeries.new(this._root, {
      name: 'Series 1',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'value',
      sequencedInterpolation: true,
      categoryXField: 'outputs',
      tooltip: am5.Tooltip.new(this._root, {
        labelText: '{valueY}',
      }),
    });
    chart.series.push(this._series);

    if (this.config['content']!.length > 0) {
      this.data = this.config['view'].content!.map(
        (content: IColumnChartContent) => {
          return {
            topic: content.topic.id,
            color: am5.color(content.color ?? '#000000'),
            outputs: content.outputs?.read?.name || 'undefined',
            value: Math.round(Math.random() * 50),
          };
        }
      );
    }
    this._series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    this._series.columns.template.adapters.add(
      'fill',
      function (fill: any, target: any) {
        if (target.dataItem) {
          return target.dataItem.dataContext['color'];
        }
        return am5.color('0xeeeeee');
      }
    );

    this._series.columns.template.adapters.add(
      'stroke',
      function (stroke: any, target: any) {
        if (target.dataItem) {
          return target.dataItem.dataContext['color'];
        }
        return am5.color('0xeeeeee');
      }
    );

    xAxis.data.setAll(this.data);
    this._series.data.setAll(this.data);

    this._series.appear(500);
    chart.appear(1000, 100);
  }

  private updateChart(): void {
    if (!this.data || !this._series) return;
    this.data.forEach((item, index) => {
      const newData = {
        topic: item.topic,
        outputs: item.outputs,
        value: Math.round(Math.random() * 50),
        color: item.color,
      };
      if (this._series.data.length - 1 < index) {
        this._series.data.push(newData);
      } else {
        this._series.data.setIndex(index, newData);
      }
    });
  }

  override destroy(): void {
    if (this._root) {
      this._root.dispose();
    }
  }
}
