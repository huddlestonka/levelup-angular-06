import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collector, Comic } from '@bba/api-interfaces';
import { CollectorsFacade, ComicsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-collectors',
  templateUrl: './collectors.component.html',
  styleUrls: ['./collectors.component.scss'],
})
export class CollectorsComponent implements OnInit {
  collectors$: Observable<Collector[]> = this.collectorsFacade.allCollectors$;
  selectedCollector$: Observable<Collector> = this.collectorsFacade
    .selectedCollector$;
  comics$: Observable<Comic[]> = this.comicsFacade.allComics$;

  constructor(
    private collectorsFacade: CollectorsFacade,
    private comicsFacade: ComicsFacade
  ) {}

  ngOnInit(): void {
    this.loadCollectors();
    this.loadComics();
    this.collectorsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadCollectors();
    this.collectorsFacade.selectCollector(null);
  }

  resetForm() {
    this.collectorsFacade.selectCollector(null);
  }

  loadCollectors() {
    this.collectorsFacade.loadCollectors();
  }

  loadComics() {
    this.comicsFacade.loadComics();
  }

  selectCollector(collector: Collector) {
    this.collectorsFacade.selectCollector(collector.id);
  }

  saveCollector(collector: Collector) {
    if (collector.id) {
      this.collectorsFacade.updateCollector(collector);
    } else {
      this.collectorsFacade.createCollector(collector);
    }
  }

  saveComic(comic: Comic) {
    if (comic.id) {
      this.comicsFacade.updateComic(comic);
    } else {
      this.comicsFacade.createComic(comic);
    }
  }

  deleteCollector(collector: Collector) {
    this.collectorsFacade.deleteCollector(collector);
  }
}
