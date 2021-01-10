import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgControl, NgForm } from "@angular/forms";
import { Tag } from "../tag.model";
import { TagService } from "../tag.service";

@Component({
	selector: "app-set-tag-modal",
	templateUrl: "./set-tag-modal.component.html",
	styleUrls: ["./set-tag-modal.component.scss"],
})
export class SetTagModalComponent implements OnInit {
	@Input() tag?: Tag;
	@Output() close = new EventEmitter();

	constructor(private tagService: TagService) {}

	ngOnInit(): void {}

	closeModal(): void {
		this.close.emit();
	}

	create(form: NgForm): void {
		this.tagService
			.create({ name: form.value.name })
			.subscribe((tag: Tag) => {
				this.tagService.changedSubject.next(tag);
				this.closeModal();
			});
	}

	edit(form: NgForm): void {
		this.tagService
			.update(this.tag.id, { name: form.value.name })
			.subscribe((tag: Tag) => {
				this.tagService.changedSubject.next(tag);
				this.closeModal();
			});
	}

	hasErrors(viewChild: NgControl): boolean {
		return viewChild.invalid && viewChild.dirty && viewChild.touched;
	}
}
