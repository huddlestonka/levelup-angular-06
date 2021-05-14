import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule, ComicsFacade } from '@bba/core-state';
import { MaterialModule } from '@bba/material';

import { ComicDetailsComponent } from './comic-details/comic-details.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { ComicsComponent } from './comics.component';

import { mockComic, mockEmptyComic } from '@bba/testing';

describe('ComicsComponent', () => {
  let component: ComicsComponent;
  let fixture: ComponentFixture<ComicsComponent>;
  let de: DebugElement;
  let comicsFacade: ComicsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComicsComponent,
        ComicDetailsComponent,
        ComicsListComponent,
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
    fixture = TestBed.createComponent(ComicsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    comicsFacade = TestBed.inject(ComicsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call comicsFacade selectComic', () => {
    const spy = jest.spyOn(comicsFacade, 'selectComic');

    component.selectComic(mockComic);

    expect(spy).toHaveBeenCalledWith(mockComic.id);
  });

  describe('should on save call comicsFacade', () => {
    it('updateComic', () => {
      const spy = jest.spyOn(comicsFacade, 'updateComic');

      component.saveComic(mockComic);

      expect(spy).toHaveBeenCalledWith(mockComic);
    });

    it('createComic', () => {
      const spy = jest.spyOn(comicsFacade, 'createComic');

      component.saveComic(mockEmptyComic);

      expect(spy).toHaveBeenCalledWith(mockEmptyComic);
    });
  });

  it('should on delete call comicsFacade deleteComic', () => {
    const spy = jest.spyOn(comicsFacade, 'deleteComic');

    component.deleteComic(mockComic);

    expect(spy).toHaveBeenCalledWith(mockComic);
  });
});
