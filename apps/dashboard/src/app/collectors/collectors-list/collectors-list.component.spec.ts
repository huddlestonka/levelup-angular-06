import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@bba/material';
import { CollectorsListComponent } from './collectors-list.component';

describe('CollectorsListComponent', () => {
  let component: CollectorsListComponent;
  let fixture: ComponentFixture<CollectorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectorsListComponent],
      imports: [MaterialModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
