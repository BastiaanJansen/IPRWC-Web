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
		private router: Router
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

	private update(params: Params): void {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: params,
		});
	}

	getQueryParams(): Params {
		return this.route.snapshot.queryParams;
	}

	filterOnNutriScore(score: NutriScore): void {
		const params: Params = this.route.snapshot.queryParams;
		let newParams: Params;

		if (params.nutriScore == score) {
			newParams = { ...params };
			delete newParams.nutriScore;
		} else newParams = { ...params, nutriScore: score };

		this.update(newParams);
	}

	filterOnCategory(category: Category): void {
		const params: Params = this.route.snapshot.queryParams;
		let newParams: Params;

		if (params.category == category.id) {
			newParams = { ...params };
			delete newParams.category;
		} else newParams = { ...params, category: category.id };

		this.update(newParams);
	}

	filterOnBrand(brand: Brand): void {
		const params: Params = this.route.snapshot.queryParams;
		let newParams: Params;

		if (params.brand == brand.id) {
			newParams = { ...params };
			delete newParams.brand;
		} else newParams = { ...params, brand: brand.id };

		this.update(newParams);
	}
}
