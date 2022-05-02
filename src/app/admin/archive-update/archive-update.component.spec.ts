import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveUpdateComponent } from './archive-update.component';

describe('ArchiveUpdateComponent', () => {
  let component: ArchiveUpdateComponent;
  let fixture: ComponentFixture<ArchiveUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
