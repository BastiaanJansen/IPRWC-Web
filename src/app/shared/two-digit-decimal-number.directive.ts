import { Directive, ElementRef, HostListener } from "@angular/core";
@Directive({
	selector: "[appTwoDigitDecimaNumber]",
})
export class TwoDigitDecimaNumberDirective {
	private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
	private specialKeys: string[] = [
		"Backspace",
		"Tab",
		"End",
		"Home",
		"ArrowLeft",
		"ArrowRight",
		"Del",
		"Delete",
	];
	constructor(private el: ElementRef) {}
	@HostListener("keydown", ["$event"])
	keyDown(event: KeyboardEvent) {
		// Allow Backspace, tab, end, and home keys
		if (this.specialKeys.indexOf(event.key) !== -1) return;
		let value: string = this.el.nativeElement.value;
		const position = this.el.nativeElement.selectionStart;
		const next: string = [
			value.slice(0, position),
			event.key == "Decimal" ? "." : event.key,
			value.slice(position),
		].join("");

		if (next && !String(next).match(this.regex)) {
			event.preventDefault();
		}
	}
}
