import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-stepper",
	templateUrl: "./stepper.component.html",
	styleUrls: ["./stepper.component.scss"],
})
export class StepperComponent implements OnInit {
	@Input() value = 1;
	@Input() minValue = 1;
	@Input() maxValue = 20;
	@Output() change = new EventEmitter<number>();

	icons = {
		faPlus,
		faMinus,
	};

	constructor() {}

	ngOnInit(): void {}

	add(): void {
		if (this.value < this.maxValue) {
			this.value += 1;
			this.change.emit(this.value);
		}
	}

	subtract(): void {
		if (this.value > this.minValue) {
			this.value -= 1;
			this.change.emit(this.value);
		}
	}
}
