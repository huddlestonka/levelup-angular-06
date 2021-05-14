import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collector } from '@bba/api-interfaces';
import { environment } from '@env/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class CollectorsService {
  model = 'collectors';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Collector[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Collector>(this.getUrlWithId(id));
  }

  create(collector: Collector) {
    return this.http.post(this.getUrl(), collector, { headers: headers });
  }

  update(collector: Collector) {
    return this.http.put(this.getUrlWithId(collector.id), collector, {
      headers: headers,
    });
  }

  delete(collector: Collector) {
    return this.http.delete(this.getUrlWithId(collector.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
