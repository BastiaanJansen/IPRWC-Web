import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./products/products.component";
import { ProductCardComponent } from "./products/product-card/product-card.component";
import { SidebarComponent } from "./products/sidebar/sidebar.component";
import { SidebarItemComponent } from "./products/sidebar/sidebar-item/sidebar-item.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderComponent } from "../shared/components/header/header.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [
		ProductsComponent,
		ProductCardComponent,
		SidebarComponent,
		SidebarItemComponent,
	],
	imports: [CommonModule, FontAwesomeModule, SharedModule],
	exports: [ProductsComponent],
})
export class ProductModule {}
