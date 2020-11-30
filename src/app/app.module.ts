import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavComponent } from "./shared/ui/nav/nav.component";
import { ProductsComponent } from "./webshop/products/products.component";
import { ProductCardComponent } from "./webshop/products/product-card/product-card.component";
import { SidebarComponent } from "./webshop/products/sidebar/sidebar.component";
import { SidebarItemComponent } from "./webshop/products/sidebar/sidebar-item/sidebar-item.component";
import { HeaderComponent } from "./shared/ui/header/header.component";

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		ProductsComponent,
		ProductCardComponent,
		SidebarComponent,
		SidebarItemComponent,
		HeaderComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FontAwesomeModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
