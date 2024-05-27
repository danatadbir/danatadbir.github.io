import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as noUiSlider from 'nouislider';
import {
  ISliderConfig,
  sliderContent,
  SliderContentSettings,
  sliderView,
  SliderViewSettings,
} from '@sharedComponents/models/slider.interface';
// import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
// import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent
  extends SharedFeaturesBaseComponent<ISliderConfig>
  implements AfterViewInit, OnDestroy
{
  title: string = 'Title';
  @ViewChild('sliderElement') sliderElement!: ElementRef;

  @Input() override config: ISliderConfig = {
    name: 'slider',
    content: sliderContent,
    view: sliderView,
  };
  slider!: noUiSlider.API;

  value: number = 0;
  //FIXME:
  //@ts-ignore

  constructor(private store: Store<DashboardState>) {
    super();
  }

  ngAfterViewInit() {
      //FIXME:
  //@ts-ignore

    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      .pipe(
        map(item => {
          const config = item['content'].config || this.config;
          if (this.slider) {
            this.slider.destroy();
          }
          this.createSlider(config);
          this.config = config;
        })
      )
      .subscribe();
  }

  override onDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }

  // Initialize Nouislider
  private createSlider(config: ISliderConfig) {
    this.slider = noUiSlider.create(this.sliderElement.nativeElement, {
      start: 0,
      step: config.content?.step || 5,
      connect: 'lower',
      direction: 'rtl',
      range: {
        min: config.content?.min || 0,
        max: config.content?.max || 100,
      },
      tooltips: config.view.Chart.showTooltip || false,
      orientation: config.view.Chart.orientation || 'vertical',
      pips: this.config.view.Ticks.show
        ? { mode: 'steps' as any, filter: this.filterPips.bind(this) }
        : undefined,
    });
    this.title = config.view.Labels.title;
    this.setRangeColor(config.view?.Chart.color);

    this.slider.on('update.one', this.onRangeChange.bind(this));

    const handle: any = document.querySelector('.noUi-handle');
    const container: any = document.getElementById(this.widgetId);

    const handleWidthPercentage =
      (handle?.offsetWidth / container.offsetWidth) * 100;
    const handleHeightPercentage =
      (handle?.offsetHeight / container.offsetHeight) * 100;
    container?.style.setProperty(
      '--noui-handle-width-percentage',
      `${handleWidthPercentage}%`
    );
    container?.style.setProperty(
      '--noui-handle-height-percentage',
      `${handleHeightPercentage}%`
    );
  }

  private onRangeChange(v: (string | number)[]) {
    this.value = Math.round(+v);
  }

  private filterPips(value: any, type: any) {
    if (type === 0) {
      return -1;
    }
    if (value % this.config.view.Ticks.bigLabelStep === 0) {
      return 1;
    }
    return value % this.config.view.Ticks.smallLabelStep === 0
      ? 2
      : this.config.view.Ticks.showTicksBetweenLabels
      ? 0
      : -1;
  }
  private setRangeColor(color: string) {
    const rangeElement =
      this.sliderElement.nativeElement.querySelector('.noUi-connect');
    rangeElement.style.backgroundColor = color;
  }

  stepUp() {
    if (this.config.content && this.value >= this.config.content.max) return;

    this.updateSliderValue((this.value += this.config.content?.step || 5));
  }

  stepDown() {
    if (this.config.content && this.value <= this.config.content.min) return;

    this.updateSliderValue((this.value -= this.config.content?.step || 5));
  }

  private updateSliderValue(newValue: number) {
    this.slider.set(newValue);
  }

  onInputChangeValue() {
    setTimeout(() => {
      this.updateSliderValue(this.value);
    }, 700);
  }
}
