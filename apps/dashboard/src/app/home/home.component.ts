import { Component, OnInit } from '@angular/core';
import { CollectorsFacade, ComicsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  collectorComics$ = this.collectorsFacade.collectorComics$;

  constructor(
    private collectorsFacade: CollectorsFacade,
    private comicsFacade: ComicsFacade
  ) {}

  ngOnInit(): void {
    this.collectorsFacade.loadCollectors();
    this.comicsFacade.loadComics();
  }
}
