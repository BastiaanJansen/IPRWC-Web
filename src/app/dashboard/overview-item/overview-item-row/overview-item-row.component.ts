import { Component, EventEmitter, Output } from '@angular/core';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-overview-item-row',
  templateUrl: './overview-item-row.component.html',
  styleUrls: ['./overview-item-row.component.scss']
})
export class OverviewItemRowComponent {
    @Output() delete = new EventEmitter();
    @Output() edit = new EventEmitter();

    icons = {
        faPen, faTrash
    }

    constructor() { }

    editItem(): void {
        this.edit.emit();
    }

    removeItem(): void {
        this.delete.emit();
    }

}
