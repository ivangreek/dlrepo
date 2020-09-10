import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkFormComponent } from './landmark-form.component';

describe('LandmarkFormComponent', () => {
  let component: LandmarkFormComponent;
  let fixture: ComponentFixture<LandmarkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandmarkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
