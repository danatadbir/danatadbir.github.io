import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IButtonConfig} from "../../../utils/models/button.interface";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {DashboardState} from "../../../../Dashboard/data-access/dashboard.state";
import {getDashboardItem} from "../../../../Dashboard/data-access/dashboard.selector";
import {map} from "rxjs/operators";
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-change-source',
  templateUrl: './change-source.component.html',
  styleUrls: ['./change-source.component.scss']
})
export class ChangeSourceComponent extends SharedFeaturesBaseComponent<IButtonConfig>  implements OnInit, OnDestroy {
  title: string = 'Button';
  color: string = '#DC143C';

  constructor(private store: Store<DashboardState>) {
    super();
  }

  ngOnInit() {
    this.safeObservable(this.store.select(getDashboardItem(this.id))).pipe(
      map(item => {
        const config = item['content'].config || this.config;
        this.color = config.view.Button.color || '#DC143C';
        this.title = config.view.Labels.title;
      })
    ).subscribe();
  }

}
