import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { Store } from '@ngrx/store';
// import { DashboardState } from 'src/app/Dashboard/data-access/dashboard.state';
import { IDynamicChart } from 'src/app/ct-shared/utils/models/dynamic.interface';
// import { getDashboardItem } from 'src/app/Dashboard/data-access/dashboard.selector';
import {
  PIE_CHART_DATA,
  PIE_CHART_RADIAL_GRADIENT_ITEMS,
} from 'src/app/ct-shared/utils/configs';
import {
  IPieChart,
  IPieChartContent,
  PieLayoutSetting,
} from 'src/app/ct-shared/utils/models';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';
import { map } from 'rxjs';

interface IPieChartUpdateItem {
  cols: number;
  content: {
    config: IPieChart;
    name: string;
  };
  id: string;
  rows: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})

// series tab must merge with content (content type should be set to array)
export class PieChartComponent
  extends SharedFeaturesBaseComponent<IPieChart>
  implements AfterViewInit, OnDestroy
{
  /**
   * @deprecated
   */
  @Input() chartId: string;

  private _root: am5.Root;
  public backgroundColor = 'transparent';

  private _sampleData: IPieChartContent[] = PIE_CHART_DATA;
  //FIXME:
  //@ts-ignore

  constructor(private store: Store<DashboardState>) {
    super();
  }

  ngAfterViewInit() {
      //FIXME:
  //@ts-ignore

    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      // .pipe(
      //   map((item: any) => {
      //     this.updateChart(item);
      //   })
      // )
      .subscribe((item: any) => {
        // console.log('item:', item);
        this.updateChart(item);
      });
  }

  updateChart(item: IPieChartUpdateItem) {
    const config = item.content.config || this.config;
    if (this._root) this._root.dispose();
    //@ts-ignore
    if (config.view.chart['BackgroundColor']) {
      //@ts-ignore
      this.backgroundColor = config.view.chart['BackgroundColor'];
    }

    this._root = am5.Root.new(this.widgetId);
    this._root.setThemes([am5themes_Animated.new(this._root)]);

    this._root.setThemes([am5themes_Animated.new(this._root)]);

    let chart = this._root.container.children.push(
      am5percent.PieChart.new(this._root, {
        ...config.view.chart,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(this._root, {
        valueField: 'value',
        categoryField: 'category',

        ...config.view.chart,
      })
    );

    series.states.create('hidden', {
      endAngle: -90,
    });

    series.ticks.template.set('forceHidden', config.view.tooltip.ticks);
    series.labels.template.set('forceHidden', config.view.tooltip.labels);
    if (config.view.chartMode.radialGradient) {
      series.slices.template.set('strokeOpacity', 0);
      series.slices.template.set(
        'fillGradient',
        am5.RadialGradient.new(this._root, {
          stops: PIE_CHART_RADIAL_GRADIENT_ITEMS,
        })
      );
    }
    let label = chart.seriesContainer.children.push(
      am5.Label.new(this._root, { ...config.view.seriesContainer })
    );
    if (config.view.chartMode.variableRadius) {
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
    if (config.content.length === 0) {
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
      data = config.content.map((item: IPieChartContent) => {
        return {
          category: item?.topic?.name,
          value: Math.random() * 100,
        };
      });
      colors = config.content.map((item: IPieChartContent) =>
        am5.color(item.color ?? '#000000')
      );
    }

    series?.get('colors')?.set('colors', colors);
    series.data.setAll(data);

    if (config.view.legend?.hasLegend) {
      let legend = chart.children.push(
        am5.Legend.new(this._root, {
          ...config.view.legend,
          x: am5.percent(Number(config.view.legend.x)),
          y: am5.percent(Number(config.view.legend.y)),
          layout:
            this._root[config.view.legend.layoutSetting as PieLayoutSetting],
        })
      );
      legend.data.setAll(series.dataItems);
    }
    series.appear(1000, 100);
  }
}
