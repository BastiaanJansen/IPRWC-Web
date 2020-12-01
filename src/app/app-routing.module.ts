import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./shared/login/login.component";
import { ProductsComponent } from "./webshop/products/products.component";

const routes: Routes = [
	{
		path: "",
		component: ProductsComponent,
	},
	{
		path: "cart",
		component: ProductsComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
