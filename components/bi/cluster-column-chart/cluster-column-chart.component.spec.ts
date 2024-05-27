import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterColumnChartComponent } from './cluster-column-chart.component';

describe('ClusterColumnChartComponent', () => {
  let component: ClusterColumnChartComponent;
  let fixture: ComponentFixture<ClusterColumnChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClusterColumnChartComponent]
    });
    fixture = TestBed.createComponent(ClusterColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
