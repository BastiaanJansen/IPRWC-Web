import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavComponent } from "./shared/components/nav/nav.component";
import { APIInterceptor } from "./shared/api.interceptor";
import { ProductModule } from "./product/product.module";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { CartModule } from "./cart/cart.module";
import { DashboardModule } from "./dashboard/dashboard.module";

@NgModule({
	declarations: [AppComponent, NavComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		SharedModule,
		ProductModule,
		AuthModule,
		CartModule,
		DashboardModule,
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
