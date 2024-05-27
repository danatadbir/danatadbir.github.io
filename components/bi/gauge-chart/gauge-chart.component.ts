import { Component } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5radar from '@amcharts/amcharts5/radar';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { interval } from 'rxjs';
import WidgetComponent from '@sharedComponents/models/widget-component.model';
import { IGaugeChart } from '@sharedComponents/models/gauge.interface';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent extends WidgetComponent {
  private _root: am5.Root;
  private _axisDataItem: am5.DataItem<am5xy.IValueAxisDataItem>;
  private _xAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;
  private _clockHand: am5radar.ClockHand;
  private _label: am5.Label;

  override renderView(): void {
    this.initialChart();
    this.updateChart();
  }

  private initialChart() {
    if (!this.config) return;

    const config: IGaugeChart = this.config['content'].config || this.config;
    if (this._root) {
      this._root.dispose();
    }
    this._root = am5.Root.new(this.id);
    this._root.setThemes([am5themes_Animated.new(this._root)]);

    let chart = this._root.container.children.push(
      am5radar.RadarChart.new(this._root, {
        panX: false,
        panY: false,
        startAngle: config.view.chart.startAngle || 180,
        endAngle: config.view.chart.endAngle || 360,
      })
    );

    let axisRenderer = am5radar.AxisRendererCircular.new(this._root, {
      innerRadius: config.view.axisRenderer.innerRadius || -15,
    });

    axisRenderer.grid.template.setAll({
      stroke: this._root.interfaceColors.get('background'),
      visible: true,
      strokeOpacity: 0.8,
    });

    this._xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(this._root, {
        maxDeviation: 0,
        min: config.view.xAxis.min || 0,
        max: config.view.xAxis.max || 100,
        strictMinMax: true,
        renderer: axisRenderer,
      })
    );

    this._axisDataItem = this._xAxis.makeDataItem({});
    this._clockHand = am5radar.ClockHand.new(this._root, {
      pinRadius: am5.percent(config.view.clockHand.pinRadius || 10),
      radius: am5.percent(config.view.clockHand.radius || 90),
      bottomWidth: config.view.clockHand.bottomWidth || 10,
    });

    let bullet = this._axisDataItem.set(
      'bullet',
      am5xy.AxisBullet.new(this._root, {
        sprite: this._clockHand,
      })
    );

    this._xAxis.createAxisRange(this._axisDataItem);

    this._label = chart.radarContainer.children.push(
      am5.Label.new(this._root, {
        fill: am5.color(config.view.label.fill || 0xffffff),
        centerX: am5.percent(50),
        textAlign: 'center',
        centerY: am5.percent(50),
        fontSize: `${config.view.label.fontSize}%`,
      })
    );

    this._axisDataItem.set('value', 0);
    bullet.get('sprite').on('rotation', this.rotationEvent.bind(this));

    chart.bulletsContainer.set('mask', undefined);

    let bandsData =
      config.view.bands ||
      [
        // {
        //   color: '#fdae19',
        //   lowScore: 0,
        //   highScore: 20,
        // },
        // {
        //   color: '#f3eb0c',
        //   lowScore: 20,
        //   highScore: 40,
        // },
        // {
        //   color: '#b0d136',
        //   lowScore: 40,
        //   highScore: 60,
        // },
        // {
        //   color: '#54b947',
        //   lowScore: 60,
        //   highScore: 80,
        // },
        // {
        //   color: '#0f9747',
        //   lowScore: 80,
        //   highScore: 100,
        // },
      ];
    am5.array.each(bandsData, data => {
      let axisRange = this._xAxis.createAxisRange(this._xAxis.makeDataItem({}));

      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore,
      });

      axisRange.get('axisFill')?.setAll({
        visible: true,
        fill: am5.color(data.color ?? '#000000'),
        fillOpacity: 0.8,
      });
    });
    chart.appear(1000, 100);

    this.safeObservable(interval(3000)).subscribe(() => {
      this.updateChart();
    });
  }

  private rotationEvent() {
    let value = this._axisDataItem.get('value');
    let text = Math.round(this._axisDataItem.get('value') || 0).toString();
    let fill = am5.color(0x000000);
    this._xAxis.axisRanges.each(function (axisRange: any) {
      if (
        value &&
        value >= axisRange.get('value') &&
        value <= axisRange.get('endValue')
      ) {
        fill = axisRange.get('axisFill').get('fill');
      }
    });

    this._label.set('text', Math.round(value || 0).toString());

    this._clockHand.pin.animate({
      key: 'fill',
      to: fill,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
    this._clockHand.hand.animate({
      key: 'fill',
      to: fill,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }

  private updateChart() {
    this._axisDataItem.animate({
      key: 'value',
      to: Math.round(Math.random() * 100),
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }

  override destroy(): void {
    if (this._root) {
      this._root.dispose();
    }
  }
}
