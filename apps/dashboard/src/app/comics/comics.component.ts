import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collector, Comic } from '@bba/api-interfaces';
import { CollectorsFacade, ComicsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
  comics$: Observable<Comic[]> = this.comicsFacade.allComics$;
  collectors$: Observable<Collector[]> = this.collectorsFacade.allCollectors$;
  selectedComic$ = this.comicsFacade.selectedComic$;

  constructor(
    private comicsFacade: ComicsFacade,
    private collectorsFacade: CollectorsFacade
  ) {}

  ngOnInit(): void {
    this.reset();
    this.comicsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadComics();
    this.loadCollectors();
    this.comicsFacade.selectComic(null);
  }

  resetForm() {
    this.comicsFacade.selectComic(null);
  }

  loadComics() {
    this.comicsFacade.loadComics();
  }

  loadCollectors() {
    this.collectorsFacade.loadCollectors();
  }

  selectComic(comic: Comic) {
    this.comicsFacade.selectComic(comic.id);
  }

  saveComic(comic: Comic) {
    if (comic.id) {
      this.comicsFacade.updateComic(comic);
    } else {
      this.comicsFacade.createComic(comic);
    }
  }

  deleteComic(comic: Comic) {
    this.comicsFacade.deleteComic(comic);
  }
}
