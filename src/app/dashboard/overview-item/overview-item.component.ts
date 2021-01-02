import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.scss']
})
export class OverviewItemComponent {
    @Input() name: string;
    @Input() count: number;
    @Output() create = new EventEmitter();

    icons = { faPlus }

    constructor() { }

    createItem(): void {
        this.create.emit();
    }

}
