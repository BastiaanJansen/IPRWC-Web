import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Brand } from "src/app/shared/brand/brand.model";
import { BrandService } from "src/app/shared/brand/brand.service";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { NutriScore } from "src/app/shared/nutri-score.model";
import { CategoryService } from "src/app/shared/category/category.service";
import { Category } from "src/app/shared/category/category.model";
import { TagService } from "src/app/shared/tag/tag.service";
import { Tag } from "src/app/shared/tag/tag.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProductsFilterService } from "../products-filter.service";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
	categories: Category[];
	brands: Brand[];
	nutriScores: NutriScore[] = Object.values(NutriScore);
	tags: Tag[];

	constructor(
		private categoryService: CategoryService,
		private brandService: BrandService,
		private tagService: TagService,
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

		this.tagService.findAll().subscribe((tags: FindAllResponse<Tag>) => {
			this.tags = tags.result;
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
