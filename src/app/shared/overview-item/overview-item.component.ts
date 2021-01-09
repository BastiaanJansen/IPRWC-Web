import {
	Component,
	ContentChild,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
} from "@angular/core";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { OverviewItemRowDirective } from "./overview-item-row.directive";

@Component({
	selector: "app-overview-item",
	templateUrl: "./overview-item.component.html",
	styleUrls: ["./overview-item.component.scss"],
})
export class OverviewItemComponent<T> implements OnInit {
	@Input() items: T[];
	@Input() name: string;
	@Input() count: number;

	@Input() showAddButton: boolean = true;
	@Input() showEditButton: boolean = true;
	@Input() showDeleteButton: boolean = true;

	@Output() create = new EventEmitter();
	@Output() update = new EventEmitter<T>();
	@Output() remove = new EventEmitter<T>();

	@ContentChild(OverviewItemRowDirective, { read: TemplateRef })
	template: TemplateRef<OverviewItemRowDirective>;

	icons = { faPlus, faPen, faTrash };

	constructor() {}

	ngOnInit(): void {}

	createItem(): void {
		this.create.emit();
	}

	updateItem(object: T): void {
		this.update.emit(object);
	}

	removeItem(object: T): void {
		this.remove.emit(object);
	}
}
