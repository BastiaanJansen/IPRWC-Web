import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { DashboardBrandsComponent } from "./dashboard-brands/dashboard-brands.component";
import { DashboardCategoriesComponent } from "./dashboard-categories/dashboard-categories.component";
import { DashboardProductsComponent } from "./dashboard-products/dashboard-products.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardTagsComponent } from "./dashboard-tags/dashboard-tags.component";
import { DashboardOrdersComponent } from "./dashboard-orders/dashboard-orders.component";

const routes: Routes = [
	{
		path: "",
		component: DashboardComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: "",
				redirectTo: "products",
				pathMatch: "full",
			},
			{
				path: "products",
				component: DashboardProductsComponent,
			},
			{
				path: "brands",
				component: DashboardBrandsComponent,
			},
			{
				path: "categories",
				component: DashboardCategoriesComponent,
			},
			{
				path: "tags",
				component: DashboardTagsComponent,
			},
			{
				path: "orders",
				component: DashboardOrdersComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
