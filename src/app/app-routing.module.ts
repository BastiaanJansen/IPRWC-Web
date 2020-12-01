import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { ProductsComponent } from "./product/products/products.component";

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
