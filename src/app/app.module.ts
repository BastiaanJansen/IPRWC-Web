import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavComponent } from "./components/nav/nav.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductCardComponent } from './pages/products/product-card/product-card.component';
import { SidebarComponent } from './pages/products/sidebar/sidebar.component';
import { SidebarItemComponent } from './pages/products/sidebar/sidebar-item/sidebar-item.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	declarations: [AppComponent, NavComponent, ProductsComponent, ProductCardComponent, SidebarComponent, SidebarItemComponent, HeaderComponent],
	imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
