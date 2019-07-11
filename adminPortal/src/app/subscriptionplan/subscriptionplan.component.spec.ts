import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionplanComponent } from './subscriptionplan.component';

describe('SubscriptionplanComponent', () => {
  let component: SubscriptionplanComponent;
  let fixture: ComponentFixture<SubscriptionplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
