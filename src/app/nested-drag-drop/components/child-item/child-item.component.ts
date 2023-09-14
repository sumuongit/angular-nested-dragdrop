import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '../../models/drag-drop-item.model';

@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildItemComponent {
  @Input() item!: Item;
  @Input() connectedTo!: string[];
  @Output() itemDrop: EventEmitter<CdkDragDrop<Item[]>>;

  constructor() {
    this.itemDrop = new EventEmitter();
  }

  public onDragDrop(event: CdkDragDrop<Item[]>): void {
    this.itemDrop.emit(event);
  }
}
