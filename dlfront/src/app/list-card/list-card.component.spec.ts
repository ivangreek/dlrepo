import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ListCardComponent } from './list-card.component';

describe('ListCardComponent', () => {
  let component: ListCardComponent;
  let fixture: ComponentFixture<ListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCardComponent ],
      imports: [
        MatCardModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
