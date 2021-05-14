import { Comic } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockComicsFacade = {
  loadComics: () => {},
  selectComic: () => {},
  deleteComic: () => {},
  updateComic: () => {},
  createComic: () => {},
  mutations$: of(true),
};

export const mockComicsService = {
  all: () => of([]),
  find: () => of({ ...mockComic }),
  create: () => of({ ...mockComic }),
  update: () => of({ ...mockComic }),
  delete: () => of({ ...mockComic }),
};

export const mockComic = {
  id: '0',
  title: 'mock',
  description: 'mock',
  genre: 'mock',
  collectorId: 'mock',
};

export const mockEmptyComic = {
  id: null,
  title: 'mockEmpty',
  genre: 'mockEmpty',
  description: 'mockEmpty',
  collectorId: 'mockEmpty',
};
