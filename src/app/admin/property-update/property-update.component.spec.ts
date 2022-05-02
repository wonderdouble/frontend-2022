import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUpdateComponent } from './property-update.component';

describe('PropertyUpdateComponent', () => {
  let component: PropertyUpdateComponent;
  let fixture: ComponentFixture<PropertyUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
