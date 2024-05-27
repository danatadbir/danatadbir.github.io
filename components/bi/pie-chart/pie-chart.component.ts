import { Component } from '@angular/core';

import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import WidgetComponent from '@sharedComponents/models/widget-component.model';
import { IPieChartContent, PieLayoutSetting } from '@sharedComponents/models';
import {
  PIE_CHART_DATA,
  PIE_CHART_RADIAL_GRADIENT_ITEMS,
} from '@sharedComponents/interfaces/pie-chart.config';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent extends WidgetComponent {
  private _root: am5.Root;
  public backgroundColor = 'transparent';

  private _sampleData: IPieChartContent[] = PIE_CHART_DATA;

  override renderView(): void {
    this.initialChart();
  }

  private initialChart(): void {
    if (!this.config) return;

    if (this._root) this._root.dispose();
    //@ts-ignore
    if (this.config['view'].chart['BackgroundColor']) {
      //@ts-ignore
      this.backgroundColor = this.config['view'].chart['BackgroundColor'];
    }

    this._root = am5.Root.new(this.id);
    this._root.setThemes([am5themes_Animated.new(this._root)]);

    this._root.setThemes([am5themes_Animated.new(this._root)]);

    let chart = this._root.container.children.push(
      am5percent.PieChart.new(this._root, {
        ...this.config['view'].chart,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(this._root, {
        valueField: 'value',
        categoryField: 'category',

        ...this.config['view'].chart,
      })
    );

    series.states.create('hidden', {
      endAngle: -90,
    });

    series.ticks.template.set('forceHidden', this.config['view'].tooltip.ticks);
    series.labels.template.set(
      'forceHidden',
      this.config['view'].tooltip.labels
    );
    if (this.config['view'].chartMode.radialGradient) {
      series.slices.template.set('strokeOpacity', 0);
      series.slices.template.set(
        'fillGradient',
        am5.RadialGradient.new(this._root, {
          stops: PIE_CHART_RADIAL_GRADIENT_ITEMS,
        })
      );
    }
    let label = chart.seriesContainer.children.push(
      am5.Label.new(this._root, { ...this.config['view'].seriesContainer })
    );
    if (this.config['view'].chartMode.variableRadius) {
      series.slices.template.setAll({
        strokeWidth: 3,
        stroke: am5.color(0xffffff),
      });

      series.labelsContainer.set('paddingTop', 30);
      series.slices.template.adapters.add(
        'radius',
        function (radius, target: any) {
          let dataItem = target.dataItem;
          let high = series.getPrivate('valueHigh');

          if (dataItem && target.dataItem && radius && high) {
            let value = target.dataItem.get('valueWorking', 0);
            return (radius * +value) / high;
          }
          return radius;
        }
      );
    }
    let data: any;
    let colors: am5.Color[] = [];
    if (this.config['content'].length === 0) {
      data = this._sampleData.map((item: IPieChartContent) => {
        return {
          category: item?.topic?.name,
          value: Math.random() * 100,
        };
      });
      colors = this._sampleData.map((item: IPieChartContent) =>
        am5.color(item.color ?? '#000000')
      );
    } else {
      data = this.config['content'].map((item: IPieChartContent) => {
        return {
          category: item?.topic?.name,
          value: Math.random() * 100,
        };
      });
      colors = this.config['content'].map((item: IPieChartContent) =>
        am5.color(item.color ?? '#000000')
      );
    }

    series?.get('colors')?.set('colors', colors);
    series.data.setAll(data);

    if (this.config['view'].legend?.hasLegend) {
      let legend = chart.children.push(
        am5.Legend.new(this._root, {
          ...this.config['view'].legend,
          x: am5.percent(Number(this.config['view'].legend.x)),
          y: am5.percent(Number(this.config['view'].legend.y)),
          layout:
            this._root[
              this.config['view'].legend.layoutSetting as PieLayoutSetting
            ],
        })
      );
      legend.data.setAll(series.dataItems);
    }
    series.appear(1000, 100);
  }

  override destroy(): void {
    if (this._root) this._root.dispose();
  }
}
