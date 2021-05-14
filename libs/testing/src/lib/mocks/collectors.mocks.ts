import { Collector } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockCollectorsFacade = {
  loadCollectors: () => {},
  selectCollector: () => {},
  deleteCollector: () => {},
  updateCollector: () => {},
  createCollector: () => {},
  mutations$: of(true),
};

export const mockCollectorsService = {
  all: () => of([]),
  find: () => of({ ...mockCollector }),
  create: () => of({ ...mockCollector }),
  update: () => of({ ...mockCollector }),
  delete: () => of({ ...mockCollector }),
};

export const mockCollector = {
  id: '0',
  title: 'mock',
  timeCollecting: 'mock',
  favoriteGenre: 'mock',
  firstName: 'mock',
  lastName: 'mock',
};

export const mockEmptyCollector = {
  id: null,
  title: 'mockEmpty',
  timeCollecting: 'mockEmpty',
  favoriteGenre: 'mockEmpty',
  firstName: 'mockEmpty',
  lastName: 'mockEmpty',
};
