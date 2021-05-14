import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comic } from '@bba/api-interfaces';

@Component({
  selector: 'bba-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss'],
})
export class ComicsListComponent {
  @Input() comics: Comic[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
