import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Collector, Comic } from '@bba/api-interfaces';

@Component({
  selector: 'bba-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.scss'],
})
export class ComicDetailsComponent {
  currentComic: Comic;
  originalTitle = '';
  @Input() collectors: Collector[];
  @Input() set comic(value: Comic) {
    if (value) this.originalTitle = value.title;
    this.currentComic = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
