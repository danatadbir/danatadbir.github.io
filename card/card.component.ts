import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { map } from 'rxjs/operators';
import {
  ICard,
  ICardContent,
  ICardView,
} from '../../../utils/models/card.interface';
import { Subscription } from 'rxjs';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent
  extends SharedFeaturesBaseComponent<ICard>
  implements OnInit
{
  Title = 'Title';
  Subtitle = '';
  Label = 'Label';
  Unit = 'Unit';
  titleSize = '25px';
  titleColor = `#ffffff`;
  titlePosition = 'TopCenter';
  labelSize = '20px';
  labelColor = `#ffffff`;
  unitSize = '15px';
  unitColor = `#ffffff`;
  backgroundColor = '#6F90D5';
  borderColor = '#6F90D5';

  constructor(private dashboardStore: Store<DashboardState>) {
    super();
  }

  ngOnInit() {
    if (this.id) {
      this.safeObservable(this.dashboardStore.select(getDashboardItem(this.id)))
        .pipe(
          map(data => {
            const config = data['content'].config || this.config;
            const contentConfig = config['content'];
            const viewConfig = config['view'];
            this.applyContent(contentConfig);
            this.applyViewConfig(viewConfig);
          })
        )
        .subscribe();
    }
  }

  private applyContent(config: ICardContent) {
    this.Title = config?.Title;
    this.Subtitle = config?.Subtitle || '';
    this.Label =
      (config.Label ? config.Label : config.outputs?.read.name) || 'label';
    this.Unit = config?.Unit;
  }

  private applyViewConfig(config: ICardView) {
    this.backgroundColor = config.Card.BackgroundColor;
    this.borderColor = config.Card.BorderColor;
    this.titleColor = config.Title.color;
    this.titleSize = `${config.Title.fontSize}px`;
    this.titlePosition = `${config.Title.position}`;
    this.labelColor = config.Label.color;
    this.labelSize = `${config.Label.fontSize}px`;
    this.unitColor = config.Unit.color;
    this.unitSize = `${config.Unit.fontSize}px`;
  }
}
