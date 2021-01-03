import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Category } from "../category.model";
import { CategoryService } from "../category.service";

@Component({
	selector: "app-set-category-modal",
	templateUrl: "./set-category-modal.component.html",
	styleUrls: ["./set-category-modal.component.scss"],
})
export class SetCategoryModalComponent implements OnInit {
	@Input() category?: Category;
    @Output() close = new EventEmitter();

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {}

    closeModal(): void {
        this.close.emit();
    }

    create(form: NgForm): void {
        this.categoryService.create({ name: form.value.name }).subscribe((category: Category) => {
            this.categoryService.changedSubject.next(category);
            this.closeModal();
        })
    }

    edit(form: NgForm): void {
        this.categoryService.update(this.category.id, { name: form.value.name }).subscribe((category: Category) => {
            this.categoryService.changedSubject.next(category);
            this.closeModal();
        })
    }
}
