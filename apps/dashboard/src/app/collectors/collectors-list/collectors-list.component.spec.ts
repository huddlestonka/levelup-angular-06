import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorsListComponent } from './collectors-list.component';

describe('CollectorsListComponent', () => {
  let component: CollectorsListComponent;
  let fixture: ComponentFixture<CollectorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectorsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
