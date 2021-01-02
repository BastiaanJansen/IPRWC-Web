import { Component, OnInit } from "@angular/core";
import { Brand } from "src/app/brand/brand.model";
import { BrandService } from "src/app/brand/brand.service";
import { Category } from "src/app/category/category.model";
import { CategoryService } from "src/app/category/category.service";
import { Product } from "src/app/product/product.model";
import { ProductService } from "src/app/product/product.service";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { Tag } from "src/app/tag/tag.model";
import { TagService } from "src/app/tag/tag.service";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	private take: number = 7;

	products: FindAllResponse<Product>;
	brands: FindAllResponse<Brand>;
	categories: FindAllResponse<Category>;
	tags: FindAllResponse<Tag>;

	modals = {
		setTag: {
			show: false,
			tag: null
		}
	}

	icons = {
		faPen, faTrash
	}

	constructor(
		private productService: ProductService,
		private brandService: BrandService,
		private categoryService: CategoryService,
		private tagService: TagService
	) {}

	ngOnInit(): void {
		// Register for changes
		this.tagService.tagChangedSubject.subscribe((tag: Tag) => this.fetchTags())
		this.brandService.brandChangedSubject.subscribe((brand: Brand) => this.fetchBrands())
		this.categoryService.categoryChangedSubject.subscribe((category: Category) => this.fetchCategories());
		this.tagService.tagChangedSubject.subscribe((tag: Tag) => this.fetchTags());

		// Fetch current state
		this.fetchProducts();
		this.fetchBrands();
		this.fetchTags();
		this.fetchCategories();
	}

	fetchProducts(): void {
		this.productService
			.findAll({ take: this.take })
			.subscribe((products: FindAllResponse<Product>) => {
				this.products = products;
			});
	}

	fetchBrands(): void {
		this.brandService
		.findAll({ take: this.take })
		.subscribe((brands: FindAllResponse<Brand>) => {
			this.brands = brands;
		});
	}

	fetchCategories(): void {
		this.categoryService
			.findAll({ take: this.take })
			.subscribe((categories: FindAllResponse<Category>) => {
				this.categories = categories;
			});
	}

	fetchTags(): void {
		this.tagService
			.findAll({ take: this.take })
			.subscribe((tags: FindAllResponse<Tag>) => {
				this.tags = tags;
			})
	}

	createTag(): void {
		this.modals.setTag = {
			show: true,
			tag: null
		}
	}

	deleteTag(tag: Tag): void {
		this.tagService.delete(tag.id).subscribe(() => {
			this.fetchTags();
		});
	}

	editTag(tag: Tag) {
		this.modals.setTag = {
			show: true,
			tag
		}
	}
}
