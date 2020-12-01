import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { NutriScore } from "src/app/shared/nutri-score.model";
import { FilterProductDTO } from "src/app/product/filter-product.dto";
import { ProductsFilterService } from "./products-filter.service";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
	products: Product[];
	totalFound: number;
	filter: FilterProductDTO;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
		private router: Router,
		private productFilterService: ProductsFilterService
	) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe(() => {
			this.findAllProducts();
		});

		this.productFilterService.filterSubject.subscribe(
			(filter: FilterProductDTO) => {
				this.filter = filter;

				this.router.navigate([], {
					relativeTo: this.route,
					queryParams: filter,
				});
			}
		);
	}

	findAllProducts(): void {
		this.productService
			.findAll(this.route.snapshot.queryParams)
			.subscribe((products: FindAllResponse<Product>) => {
				this.products = products.result;
				this.totalFound = products.count;
			});
	}
}
