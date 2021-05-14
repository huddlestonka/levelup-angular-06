import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Collector } from '@bba/api-interfaces';

@Component({
  selector: 'bba-collectors-list',
  templateUrl: './collectors-list.component.html',
  styleUrls: ['./collectors-list.component.scss'],
})
export class CollectorsListComponent {
  @Input() collectors: Collector[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
