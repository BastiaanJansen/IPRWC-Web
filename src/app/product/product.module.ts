import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./products/products.component";
import { ProductCardComponent } from "./products/product-card/product-card.component";
import { SidebarComponent } from "./products/sidebar/sidebar.component";
import { SidebarItemComponent } from "./products/sidebar/sidebar-item/sidebar-item.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderComponent } from "../shared/components/header/header.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductPriceComponent } from "./product-price/product-price.component";
import { ProductsFilterService } from "./products/products-filter.service";
import { ProductDetailRecommendedComponent } from "./product-detail/product-detail-recommended/product-detail-recommended.component";
import { SetProductModalComponent } from "./set-product-modal/set-product-modal.component";
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
	declarations: [
		ProductsComponent,
		ProductCardComponent,
		SidebarComponent,
		SidebarItemComponent,
		ProductDetailComponent,
		ProductPriceComponent,
		ProductDetailRecommendedComponent,
		SetProductModalComponent,
	],
	imports: [
		RouterModule,
		ProductRoutingModule,
		CommonModule,
		FontAwesomeModule,
		SharedModule,
		FormsModule,
		CustomFormsModule,
	],
	providers: [ProductsFilterService],
	exports: [ProductsComponent, ProductPriceComponent],
})
export class ProductModule {}
