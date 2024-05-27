import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DynamicFormControlType,
  ISubmit,
} from '@sharedComponents/models/Form.interface';
import { map } from 'rxjs';
import { ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
// import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
// import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class SubmitComponent
  extends SharedFeaturesBaseComponent<ISubmit>
  implements OnInit, OnDestroy
{
  @Input() override config: ISubmit = {
    content: {
      idList: [],
      selectedForm: null,
    },
    view: {
      color: 'primary',
      label: 'Submit',
    },
  };

  errors: ValidationErrors | null;
  fromControlType = DynamicFormControlType;
  //FIXME:
  //@ts-ignore

  constructor(private store: Store<DashboardState>) {
    super();
  }

  ngOnInit(): void {
      //FIXME:
  //@ts-ignore

    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      .pipe(
        map(data => {
          this.config = data['content'].config;
        })
      )
      .subscribe();
  }
}
