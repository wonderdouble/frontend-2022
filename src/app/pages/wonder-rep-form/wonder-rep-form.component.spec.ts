import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WonderRepFormComponent } from './wonder-rep-form.component';

describe('WonderRepFormComponent', () => {
  let component: WonderRepFormComponent;
  let fixture: ComponentFixture<WonderRepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WonderRepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WonderRepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
