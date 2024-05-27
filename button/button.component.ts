import {OnInit, Component, Input, OnDestroy} from '@angular/core';
import {IButtonConfig} from "../models/button.interface";
import {Store} from "@ngrx/store";
// import {DashboardState} from "../../../../Dashboard/data-access/dashboard.state";
// import {getDashboardItem} from "../../../../Dashboard/data-access/dashboard.selector";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends SharedFeaturesBaseComponent<IButtonConfig> implements OnInit, OnDestroy {
  title: string = 'Button';
  color: string = '#DC143C';

//FIXME:
//@ts-ignore
  constructor(private store: Store<DashboardState>) {
    super();
  }

  ngOnInit() {
    //FIXME:
//@ts-ignore
    this.safeObservable(this.store.select(getDashboardItem(this.id))).pipe(
      map(item => {
        const config = item['content'].config || this.config;
        this.color = config.view.Button.color || '#DC143C';
        this.title = config.view.Labels.title;
      })
    ).subscribe();
  }
}
