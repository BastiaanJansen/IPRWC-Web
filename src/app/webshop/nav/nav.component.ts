import { Component, OnInit } from "@angular/core";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
	icons = {
		faShoppingBasket: faShoppingBasket,
	};

	constructor() {}

	ngOnInit(): void {}
}
