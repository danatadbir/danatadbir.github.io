import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSourceComponent } from './change-source.component';

describe('ChangeSourceComponent', () => {
  let component: ChangeSourceComponent;
  let fixture: ComponentFixture<ChangeSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
