import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DndModule } from 'ngx-drag-drop';

import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';
import { GaugeComponent } from './gauge/gauge.component';
import { CardComponent } from './card/card.component';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import { LineChartComponent } from './line-chart/line-chart.component';

import { HostDirective } from './Directive/host.directive';
import { BoxDirective } from './Directive/box.directive';
import { TextDirective } from './Directive/text.directive';
import { ColorDirective } from './Directive/color.directive';
import { BorderDirective } from './Directive/border.directive';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LinkedTableComponent } from './linked-table/linked-table.component';
import { SliderComponent } from './slider/slider.component';
import { ButtonComponent } from './button/button.component';
import { SubmitComponent } from './submit/submit.component';
import { ThreeDComponent } from './three-d/three-d.component';
import { ChangeSourceComponent } from './change-source/change-source.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ComponentConfigDialogComponent } from 'src/app/ct-shared/data-access/component/component-config-dialog/component-config-dialog.component';
// import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';
import { ClusterColumnChartComponent } from './cluster-column-chart/cluster-column-chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
// import { ApplicationSearchableChooserComponent } from '../application-searchable-chooser/application-searchable-chooser.component';
import { SharedModule } from '@shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const materials = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSlideToggleModule,
  LayoutModule,
  CdkAccordionModule,
  MatTabsModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    DynamicChartComponent,
    GaugeComponent,
    CardComponent,
    MapComponent,
    HostDirective,
    BoxDirective,
    TextDirective,
    TableComponent,
    ColorDirective,
    BorderDirective,
    LineChartComponent,
    ColumnChartComponent,
    ClusterColumnChartComponent,
    ProgressBarComponent,
    LinkedTableComponent,
    SliderComponent,
    ButtonComponent,
    SubmitComponent,
    ThreeDComponent,
    ChangeSourceComponent,
    PieChartComponent,
    ComponentConfigDialogComponent,
    // ApplicationSearchableChooserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule,
    materials,
    GoogleMapsModule,
    // DynamicFormBuilderComponent,
    SharedModule,
  ],
  exports: [HostDirective, 
    // ApplicationSearchableChooserComponent
  ],
})
export class ComponentsModule {}
