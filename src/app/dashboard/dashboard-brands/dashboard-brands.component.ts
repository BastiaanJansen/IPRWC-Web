import {
	Component,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Brand } from "src/app/brand/brand.model";
import { BrandService } from "src/app/brand/brand.service";
import { SetBrandModalComponent } from "src/app/brand/set-brand-modal/set-brand-modal.component";
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";
import { OrderDirection } from "src/app/shared/filter";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { ModalService } from "src/app/shared/modal/modal.service";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";

@Component({
	selector: "app-dashboard-brands",
	templateUrl: "./dashboard-brands.component.html",
	styleUrls: ["./dashboard-brands.component.scss"],
})
export class DashboardBrandsComponent implements OnInit, OnDestroy {
	brands: FindAllResponse<Brand> = { result: [], count: 0 };

	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	private brandSubjectSubscription: Subscription;

	constructor(
		private brandService: BrandService,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		this.brandSubjectSubscription = this.brandService.changedSubject.subscribe(
			() => {
				this.brands.result = [];
				this.fetchBrands();
			}
		);
		this.fetchBrands();
	}

	fetchBrands(skip: number = 0, take: number = 10): void {
		this.brandService
			.findAll({
				take,
				skip,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((brands: FindAllResponse<Brand>) => {
				this.brands.result.push(...brands.result);
				this.brands.count = brands.count;
			});
	}

	removeBrand(brand: Brand): void {
		const modal = this.modalService.createModal(
			ConfirmModalComponent,
			this.modalHost
		);
		modal.instance.confirmed.subscribe(() => {
			this.brandService.delete(brand.id).subscribe(() => {
				const index = this.brands.result.indexOf(brand);
				this.brands.result.splice(index, 1);
				this.brands.count--;
			});
		});
	}

	showModal(brand?: Brand): void {
		const modal = this.modalService.createModal(
			SetBrandModalComponent,
			this.modalHost
		);
		modal.instance.brand = brand;
	}

	loadMore(): void {
		this.fetchBrands(this.brands.result.length);
	}

	ngOnDestroy(): void {
		this.brandSubjectSubscription.unsubscribe();
	}
}
