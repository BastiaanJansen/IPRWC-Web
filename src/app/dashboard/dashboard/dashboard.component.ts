import { Component, OnInit } from "@angular/core";
import { Brand } from "src/app/brand/brand.model";
import { BrandService } from "src/app/brand/brand.service";
import { Category } from "src/app/category/category.model";
import { CategoryService } from "src/app/category/category.service";
import { Product } from "src/app/product/product.model";
import { ProductService } from "src/app/product/product.service";
import { FindAllResponse } from "src/app/shared/find-all-response";

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

	constructor(
		private productService: ProductService,
		private brandService: BrandService,
		private categoryService: CategoryService
	) {}

	ngOnInit(): void {
		this.productService
			.findAll({ take: this.take })
			.subscribe((products: FindAllResponse<Product>) => {
				this.products = products;
			});

		this.brandService
			.findAll({ take: this.take })
			.subscribe((brands: FindAllResponse<Brand>) => {
				this.brands = brands;
			});

		this.categoryService
			.findAll({ take: this.take })
			.subscribe((categories: FindAllResponse<Category>) => {
				this.categories = categories;
			});
	}
}
