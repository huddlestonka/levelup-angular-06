import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Collector } from '@bba/api-interfaces';

import { CollectorsService } from './collectors.service';

import { mockCollector } from '@bba/testing';

describe('CollectorsService', () => {
  const model = 'collectors';
  let httpTestingController: HttpTestingController;
  let service: CollectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CollectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockCollector);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockCollector]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockCollector.id).subscribe((res) => {
        expect(res).toEqual(mockCollector);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockCollector.id)
      );
      req.flush(mockCollector);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockCollector).subscribe((res) => {
        expect(res).toEqual(mockCollector);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockCollector);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockCollector).subscribe((res) => {
        expect(res).toEqual(mockCollector);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockCollector.id)
      );
      req.flush(mockCollector);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockCollector).subscribe((res) => {
        expect(res).toEqual(mockCollector);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockCollector.id)
      );
      req.flush(mockCollector);
      httpTestingController.verify();
    });
  });
});
