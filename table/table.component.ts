import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IBorder } from '../models';
import { Store } from '@ngrx/store';
// import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
import { MatCheckboxChange } from '@angular/material/checkbox';
// import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import {
  ITableConfig,
  ITableContent,
  ITableView,
} from '@sharedComponents/models/Table.interface';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent
  extends SharedFeaturesBaseComponent<ITableConfig>
  implements OnInit, OnDestroy
{
  @ViewChild('pagination', { static: true }) pagination: ElementRef;
  tableData: any[] = [];
  filtredTableData: any[] = [];
  rawData: any[] = [];

  borderConfig: IBorder = {
    BorderWidth: 3,
    BorderRadius: 12,
    BorderColor: '#FFFFFF',
  };
  headerColor: string = '#FFFFFF';
  bodyColor = '#FFFFFF';
  headerTextColor = '#000000';
  bodyTextColor = '#000000';
  labelColor = '#0A0A0A';

  Search: boolean = true;
  Select: boolean = true;
  Paginator: boolean = true;
  No: boolean = true;
  Action: boolean = true;

  Label: string | undefined = 'Label';
  columns: string[] = ['id', 'device', 'topic', 'name', 'date'];

  pageSize: number;
  currentPage: number;
  totalSize: number;
  pageLength: number;
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
            this.rawData = [];
            const config = data['content'].config || this.config;
            config.content.map((item: ITableContent) => {
              this.rawData.push({
                id: new Date().getTime(),
                name: item.outputs?.read?.name,
                value: '-',
                device: item.device,
                topic: item.topic.name,
                date: new Date(),
              });
            });
            const view = config.view;
            this.applyView(view);
          })
        )
        .subscribe();
    } else this.applyView(this.config.view);
  }

  private applyView(config: ITableView) {
    this.Label = config.Labels.Title;
    this.Search = config.Chart.Search;
    this.Select = config.Chart.Select;
    this.Paginator = config.Chart.Pagination;
    this.No = config.Chart.No;
    this.Action = config.Chart.Action;
    this.columns = config.Chart.Columns;
    this.borderConfig = config.Border;
    this.headerColor = config.Content.HeaderColor;
    this.bodyColor = config.Content.BodyColor;
    this.headerTextColor = config.Content.HeaderTextColor;
    this.bodyTextColor = config.Content.BodyTextColor;

    if (config.Chart.Pagination) {
      this.pageSize = 5;
      this.currentPage = 0;
      this.totalSize = 0;
      this.pageLength = this.rawData.length;
      this.tableData = this.rawData.slice(0, this.pageSize);
    } else this.tableData = this.rawData;
  }

  applyFilter(filter: Event) {
    // @ts-ignore
    const value = filter.target.value;
    this.filtredTableData = this.rawData.filter(item =>
      item?.device?.toLowerCase().includes(value.toLowerCase())
    );
    this.pageLength = this.filtredTableData.length;
    this.tableData = this.Paginator
      ? this.filtredTableData.slice(0, this.pageSize)
      : this.filtredTableData;
  }

  onChangeSelectAll(event: MatCheckboxChange) {
    event.checked ? this.selectAll() : this.deselectAll();
  }

  private selectAll() {}

  private deselectAll() {}

  onSelectItemPerPage(event: MatSelectChange) {
    const selectedValue: number = event.value;
  }

  onSelectData(id: string) {}

  handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    const startIndex = (e.pageIndex + 1) * e.pageSize - e.pageSize;
    const endIndex = startIndex + e.pageSize;
    this.tableData = this.rawData.slice(startIndex, endIndex);
  }
}
