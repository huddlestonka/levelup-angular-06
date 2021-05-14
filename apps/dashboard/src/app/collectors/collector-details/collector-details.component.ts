import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Comic, Collector } from '@bba/api-interfaces';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'bba-collector-details',
  templateUrl: './collector-details.component.html',
  styleUrls: ['./collector-details.component.scss'],
})
export class CollectorDetailsComponent {
  currentCollector: Collector;
  originalTitle = '';
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() comics;
  @Input() set collector(value: Collector) {
    if (value) this.originalTitle = `${value.title} `;
    this.currentCollector = { ...value };
  }
  @Output() savedComic = new EventEmitter();
  @Output() savedCollector = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  checkComics() {
    return (
      [null, undefined, ''].includes(this.currentCollector.id) ||
      this.currentCollector.comics?.length > 0
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add comic title
    if (value) {
      let newComic = { title: value.trim() };
      newComic = Object.assign({}, newComic);
      if (this.comics?.length > 0) {
        this.comics = [...this.comics, newComic];
      } else {
        this.comics = [newComic];
      }
    }

    // Reset the input value
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(id: string): void {
    if (id === null || id === undefined) return;
    this.currentCollector.comics = this.currentCollector.comics.filter(
      (a) => a.id !== id
    );
  }
}
