import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullImageDialogComponent } from './full-image-dialog.component';

describe('FullImageDialogComponent', () => {
  let component: FullImageDialogComponent;
  let fixture: ComponentFixture<FullImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
