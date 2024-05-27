import { Component, Input, OnInit } from '@angular/core';
import { IBorder } from '../models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
// import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
// import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { map } from 'rxjs/operators';
import {
  ILinkedTableConfig,
  ILinkedTableContent,
  ILinkedTableView,
} from '@sharedComponents/models/linkedTable.interface';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-linked-table',
  templateUrl: './linked-table.component.html',
  styleUrls: ['./linked-table.component.scss'],
})
export class LinkedTableComponent
  extends SharedFeaturesBaseComponent<ILinkedTableConfig>
  implements OnInit
{
  borderConfig: IBorder = {
    BorderWidth: 3,
    BorderRadius: 12,
    BorderColor: '#FFFFFF',
  };
  headerBackgroundColor: string = '#6F90D5';
  headerColor: string = '#FFFFFF';
  bodyColor = '#000000';
  rowColor = '#000000';
  labelColor = '#0A0A0A';

  Search: boolean = true;
  Select: boolean = true;
  Paginator: boolean = true;
  No: boolean = true;
  Action: boolean = true;

  Label: string | undefined = 'Label';
  columns: ILinkedTableContent[] = [];
  tableData: any[] = [];
  //FIXME:
  //@ts-ignore

  constructor(private dashboardStore: Store<DashboardState>) {
    super();
  }

  ngOnInit() {
    if (this.id) {
        //FIXME:
  //@ts-ignore

      this.safeObservable(this.dashboardStore.select(getDashboardItem(this.id)))
        .pipe(
          map(data => {
            const config = data['content'].config || this.config;
            const view = config.view;
            const content = config.content;
            this.applyContent(content);
            this.applyView(view);
          })
        )
        .subscribe();
    }
  }

  private applyContent(content: ILinkedTableContent[]) {
    this.columns = content;
  }

  private applyView(config: ILinkedTableView) {
    this.borderConfig = config.Border;
    this.headerColor = config.Content.HeaderColor;
    this.bodyColor = config.Content.BodyColor;
    this.headerBackgroundColor = config.Chart.HeaderColor;
    this.rowColor = config.Chart.RowColor;
    this.Search = config.Chart.Search;
    this.Paginator = config.Chart.Pagination;
    this.No = config.Chart.No;
    this.Action = config.Chart.Action;
    this.Label = config.Labels.Title;
  }
}
