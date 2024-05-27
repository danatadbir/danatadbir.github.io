import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  DynamicFormControlType,
  IFormFieldConfig,
} from '@sharedComponents/models/Form.interface';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
// import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
// import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { map } from 'rxjs/operators';
// import { updateFormField } from '../../../../Dashboard/data-access/dashboard.action';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

const materials = [
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
];

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, materials],
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent
  extends SharedFeaturesBaseComponent<IFormFieldConfig>
  implements OnInit, OnDestroy
{
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
        map(formField => {
          if (formField) {
            this.config = formField['content'].config;
            this.store.dispatch(
              //FIXME:
              //@ts-ignore
              updateFormField({
                formField: { id: this.id, name: this.config.content.Name },
              })
            );
          }
        })
      )
      .subscribe();
  }
}
