import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WonderRepPageComponent } from './wonder-rep-page.component';

describe('WonderRepPageComponent', () => {
  let component: WonderRepPageComponent;
  let fixture: ComponentFixture<WonderRepPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WonderRepPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WonderRepPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
