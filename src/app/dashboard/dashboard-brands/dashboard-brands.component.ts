import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Brand } from "src/app/brand/brand.model";
import { BrandService } from "src/app/brand/brand.service";
import { SetBrandModalComponent } from "src/app/brand/set-brand-modal/set-brand-modal.component";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { ModalService } from "src/app/shared/modal/modal.service";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";

@Component({
	selector: "app-dashboard-brands",
	templateUrl: "./dashboard-brands.component.html",
	styleUrls: ["./dashboard-brands.component.scss"],
})
export class DashboardBrandsComponent implements OnInit {

    brands: FindAllResponse<Brand>;

    @ViewChild(PlaceholderDirective, { static: false }) modalHost: PlaceholderDirective

	constructor(private brandService: BrandService, private modalService: ModalService) {}

	ngOnInit(): void {
        this.brandService.changedSubject.subscribe(() => this.fetchBrands());

        this.fetchBrands();
    }

    fetchBrands(): void {
        this.brandService.findAll().subscribe((brands: FindAllResponse<Brand>) => {
            this.brands = brands;
        })
    }

    showModal(brand?: Brand): void {
        const modal = this.modalService.createModal(SetBrandModalComponent, this.modalHost);
        modal.instance.brand = brand;
    }
}
