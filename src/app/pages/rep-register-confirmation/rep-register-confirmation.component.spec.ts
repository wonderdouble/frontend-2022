import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepRegisterConfirmationComponent } from './rep-register-confirmation.component';

describe('RepRegisterConfirmationComponent', () => {
  let component: RepRegisterConfirmationComponent;
  let fixture: ComponentFixture<RepRegisterConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepRegisterConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepRegisterConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
