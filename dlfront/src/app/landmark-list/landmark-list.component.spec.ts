import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { LandmarkListComponent } from './landmark-list.component';

describe('LandmarkListComponent', () => {
  let component: LandmarkListComponent;
  let fixture: ComponentFixture<LandmarkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LandmarkListComponent
      ],
      imports: [
        MatCardModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
