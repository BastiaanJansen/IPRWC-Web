import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavComponent } from "./shared/components/nav/nav.component";
import { ProductsComponent } from "./webshop/products/products.component";
import { ProductCardComponent } from "./webshop/products/product-card/product-card.component";
import { SidebarComponent } from "./webshop/products/sidebar/sidebar.component";
import { SidebarItemComponent } from "./webshop/products/sidebar/sidebar-item/sidebar-item.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { APIInterceptor } from "./shared/api.interceptor";
import { LoginComponent } from "./shared/login/login.component";

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		ProductsComponent,
		ProductCardComponent,
		SidebarComponent,
		SidebarItemComponent,
		HeaderComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: APIInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
