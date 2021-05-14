import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Comic } from '@bba/api-interfaces';

import { ComicsService } from './comics.service';

import { mockComic } from '@bba/testing';

describe('ComicsService', () => {
  const model = 'comics';
  let httpTestingController: HttpTestingController;
  let service: ComicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ComicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockComic);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockComic]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockComic.id).subscribe((res) => {
        expect(res).toEqual(mockComic);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockComic.id)
      );
      req.flush(mockComic);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockComic).subscribe((res) => {
        expect(res).toEqual(mockComic);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockComic);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockComic).subscribe((res) => {
        expect(res).toEqual(mockComic);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockComic.id)
      );
      req.flush(mockComic);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockComic).subscribe((res) => {
        expect(res).toEqual(mockComic);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockComic.id)
      );
      req.flush(mockComic);
      httpTestingController.verify();
    });
  });
});
