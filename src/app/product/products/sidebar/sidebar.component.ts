import { Component, OnInit } from "@angular/core";
import { Brand } from "src/app/brand/brand.model";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { NutriScore } from "src/app/shared/nutri-score.model";
import { Category } from "src/app/category/category.model";
import { ActivatedRoute, Params } from "@angular/router";
import { ProductsFilterService } from "../products-filter.service";
import { BrandService } from "src/app/brand/brand.service";
import { CategoryService } from "src/app/category/category.service";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
	categories: Category[];
	brands: Brand[];
	nutriScores: NutriScore[] = Object.values(NutriScore);

	constructor(
		private categoryService: CategoryService,
		private brandService: BrandService,
		private route: ActivatedRoute,
		private productsFilterService: ProductsFilterService
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
	}

	getQueryParams(): Params {
		return this.route.snapshot.queryParams;
	}

	filterOnNutriScore(score: NutriScore): void {
		const params: Params = this.route.snapshot.queryParams;

		if (params.nutriScore == score) {
			this.productsFilterService.deleteFilter("nutriScore");
			return;
		}

		this.productsFilterService.addFilter("nutriScore", score);
	}

	filterOnCategory(category: Category): void {
		const params: Params = this.route.snapshot.queryParams;

		if (params.category == category.id) {
			this.productsFilterService.deleteFilter("category");
			return;
		}

		this.productsFilterService.addFilter(
			"category",
			category.id.toString()
		);
	}

	filterOnBrand(brand: Brand): void {
		const params: Params = this.route.snapshot.queryParams;

		if (params.brand == brand.id) {
			this.productsFilterService.deleteFilter("brand");
			return;
		}

		this.productsFilterService.addFilter("brand", brand.id.toString());
	}

	isFilter(key: string, value: any) {
		return this.productsFilterService.isFilter(key, value.toString());
	}
}
