import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comic } from '@bba/api-interfaces';
import { environment } from '@env/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  model = 'comics';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Comic[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Comic>(this.getUrlWithId(id));
  }

  create(comic: Comic) {
    return this.http.post(this.getUrl(), comic, { headers: headers });
  }

  update(comic: Comic) {
    return this.http.put(this.getUrlWithId(comic.id), comic, {
      headers: headers,
    });
  }

  delete(comic: Comic) {
    return this.http.delete(this.getUrlWithId(comic.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
