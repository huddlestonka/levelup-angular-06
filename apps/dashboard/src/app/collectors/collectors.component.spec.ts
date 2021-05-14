import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule, CollectorsFacade } from '@bba/core-state';
import { MaterialModule } from '@bba/material';

import { CollectorDetailsComponent } from './collector-details/collector-details.component';
import { CollectorsListComponent } from './collectors-list/collectors-list.component';
import { CollectorsComponent } from './collectors.component';

import { mockCollector, mockEmptyCollector } from '@bba/testing';

describe('CollectorsComponent', () => {
  let component: CollectorsComponent;
  let fixture: ComponentFixture<CollectorsComponent>;
  let de: DebugElement;
  let collectorsFacade: CollectorsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectorsComponent,
        CollectorDetailsComponent,
        CollectorsListComponent,
      ],
      imports: [
        CoreDataModule,
        CoreStateModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    collectorsFacade = TestBed.inject(CollectorsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call collectorsFacade selectCollector', () => {
    const spy = jest.spyOn(collectorsFacade, 'selectCollector');

    component.selectCollector(mockCollector);

    expect(spy).toHaveBeenCalledWith(mockCollector.id);
  });

  describe('should on save call collectorsFacade', () => {
    it('updateCollector', () => {
      const spy = jest.spyOn(collectorsFacade, 'updateCollector');

      component.saveCollector(mockCollector);

      expect(spy).toHaveBeenCalledWith(mockCollector);
    });

    it('createCollector', () => {
      const spy = jest.spyOn(collectorsFacade, 'createCollector');

      component.saveCollector(mockEmptyCollector);

      expect(spy).toHaveBeenCalledWith(mockEmptyCollector);
    });
  });

  it('should on delete call collectorsFacade deleteCollector', () => {
    const spy = jest.spyOn(collectorsFacade, 'deleteCollector');

    component.deleteCollector(mockCollector);

    expect(spy).toHaveBeenCalledWith(mockCollector);
  });
});
