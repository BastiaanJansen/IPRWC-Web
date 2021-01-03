import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Category } from "src/app/category/category.model";
import { CategoryService } from "src/app/category/category.service";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
	selector: "app-set-product-modal",
	templateUrl: "./set-product-modal.component.html",
	styleUrls: ["./set-product-modal.component.scss"],
})
export class SetProductModalComponent implements OnInit {
	@Input() product?: Product;
    @Output() close = new EventEmitter();

    categories: Category[];

    constructor(private productService: ProductService, private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.categoryService.findAll().subscribe((categories: FindAllResponse<Category>) => {
            this.categories = categories.result;
        })
    }

    closeModal(): void {
        this.close.emit();
    }

    create(form: NgForm): void {
        this.productService.create({ ...form.value }).subscribe((product: Product) => {
            this.productService.changedSubject.next(product);
            this.closeModal();
        })
    }

    edit(form: NgForm): void {
        // this.categoryService.update(this.category.id, { name: form.value.name }).subscribe((category: Category) => {
        //     this.categoryService.changedSubject.next(category);
        //     this.closeModal();
        // })
    }
}
