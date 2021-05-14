import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Collector } from '@bba/api-interfaces';
import { MaterialModule } from '@bba/material';
import { CollectorDetailsComponent } from './collector-details.component';
import { mockCollector } from '@bba/testing';

describe('CollectorDetailsComponent', () => {
  let component: CollectorDetailsComponent;
  let fixture: ComponentFixture<CollectorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectorDetailsComponent],
      imports: [FormsModule, MaterialModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorDetailsComponent);
    component = fixture.componentInstance;
    component.collector = mockCollector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
