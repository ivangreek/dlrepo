import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkDetailsComponent } from './landmark-details.component';
import { MatCardModule } from '@angular/material/card';

describe('LandmarkDetailsComponent', () => {
  let component: LandmarkDetailsComponent;
  let fixture: ComponentFixture<LandmarkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandmarkDetailsComponent ],
      imports: [
        MatCardModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
