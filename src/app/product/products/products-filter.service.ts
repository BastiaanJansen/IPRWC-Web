import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { FilterProductDTO } from "src/app/product/filter-product.dto";

@Injectable()
export class ProductsFilterService implements OnDestroy {
	filter: FilterProductDTO = new FilterProductDTO();
	filterSubject: Subject<FilterProductDTO> = new Subject<FilterProductDTO>();
	queryParamsSubscription: Subscription;

	constructor(private route: ActivatedRoute) {
		this.queryParamsSubscription = this.route.queryParams.subscribe(
			(params: Params) => {
				this.filter = {};
				for (const key in params) this.filter[key] = params[key];

				this.filterSubject.next(this.filter);
			}
		);
	}

	addFilter(key: string, value: string): void {
		const currentFilterWithKey = this.filter[key];

		if (currentFilterWithKey) {
			this.deleteFilter(currentFilterWithKey.key);
		}

		this.filter[key] = value;

		this.filterSubject.next(this.filter);
	}

	deleteFilter(key: string): void {
		delete this.filter[key];
		this.filterSubject.next(this.filter);
	}

	isFilter(key: string, value: string) {
		return this.filter[key] === value;
	}

	ngOnDestroy(): void {
		this.queryParamsSubscription.unsubscribe();
	}
}
