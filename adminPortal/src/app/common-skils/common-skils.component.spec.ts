import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSkilsComponent } from './common-skils.component';

describe('CommonSkilsComponent', () => {
  let component: CommonSkilsComponent;
  let fixture: ComponentFixture<CommonSkilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSkilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSkilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
