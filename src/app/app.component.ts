import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Data, Item } from './nested-drag-drop/models/drag-drop-item.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public rootNode: Item;
  public get connectedTo(): string[] {
    return this.getIdsRecursive(this.rootNode).reverse();
  }

  constructor() {
    this.rootNode = { uId: '-1', name: 'rootNode', children: Data } as Item;
  }

  onDragDrop = (event: CdkDragDrop<Item[]>) => {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  };

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach(childItem => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
  }
}
