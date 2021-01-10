import {
	Component,
	ComponentRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
} from "@angular/core";
import { NgControl, NgForm } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { Brand } from "src/app/brand/brand.model";
import { BrandService } from "src/app/brand/brand.service";
import { Category } from "src/app/category/category.model";
import { CategoryService } from "src/app/category/category.service";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { NutriScore } from "src/app/shared/nutri-score.model";
import { Tag } from "src/app/tag/tag.model";
import { TagService } from "src/app/tag/tag.service";
import { CreateProductDTO } from "../dto/create-product.dto";
import { UpdateProductDTO } from "../dto/update-product.dto";
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

	categories: Category[] = [];
	brands: Brand[] = [];
	tags: Tag[] = [];
	nutriscores: NutriScore[] = [];

	error: string;

	selectedTags: Tag[] = [];

	get defaultCategory(): Category {
		return this.product?.category ?? this.categories[0];
	}

	get defaultBrand(): Brand {
		return this.product?.brand ?? this.brands[0];
	}

	get defaultNutriscore(): NutriScore {
		return this.product?.nutriScore ?? this.nutriscores[0];
	}

	constructor(
		private productService: ProductService,
		private categoryService: CategoryService,
		private brandService: BrandService,
		private tagService: TagService
	) {}

	ngOnInit(): void {
		this.categoryService
			.findAll()
			.subscribe((categories: FindAllResponse<Category>) => {
				this.categories = categories.result;
			});

		this.brandService
			.findAll()
			.subscribe((brands: FindAllResponse<Brand>) => {
				this.brands = brands.result;
			});

		this.tagService.findAll().subscribe((tags: FindAllResponse<Tag>) => {
			this.tags = tags.result;
			const productTagIDs =
				this.product?.tags.map((tag: Tag) => tag.id) ?? [];
			this.selectedTags = this.tags.filter((tag: Tag) =>
				productTagIDs.includes(tag.id)
			);
		});

		this.nutriscores = Object.values(NutriScore);
	}

	closeModal(): void {
		this.close.emit();
	}

	tagIsSelected(tag: Tag): boolean {
		return this.selectedTags.includes(tag);
	}

	toggleTag(tag: Tag): void {
		if (this.tagIsSelected(tag))
			this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
		else this.selectedTags.push(tag);
	}

	create(form: NgForm): void {
		this.productService.create(this.getFormValues(form)).subscribe(
			(product: Product) => {
				this.productService.changedSubject.next(product);
				this.closeModal();
			},
			(error) => (this.error = error.error.error.message)
		);
	}

	edit(form: NgForm): void {
		this.productService
			.update(this.product.id, this.getFormValues(form))
			.subscribe(
				(product: Product) => {
					this.productService.changedSubject.next(product);
					this.closeModal();
				},
				(error) => (this.error = error.error.error.message)
			);
	}

	hasErrors(viewChild: NgControl): boolean {
		return viewChild.invalid && viewChild.dirty && viewChild.touched;
	}

	private getFormValues(
		form: NgForm
	): {
		name: string;
		description: string;
		price: number;
		brandID: number;
		nutriScore: NutriScore;
		weight: string;
		categoryID: number;
		tagsID: number[];
		image: string;
		barcode: string;
	} {
		const values = form.value;
		return {
			name: values.name,
			description: values.description,
			price: +values.price,
			brandID: values.brand.id,
			nutriScore: values.nutriscore,
			weight: values.weight,
			categoryID: values.category.id,
			tagsID: this.selectedTags.map((tag: Tag) => tag.id),
			image: values.image,
			barcode: values.barcode,
		};
	}
}
