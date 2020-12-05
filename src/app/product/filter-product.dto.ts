import { Filter } from "../shared/filter";
import { NutriScore } from "../shared/nutri-score.model";

export class FilterProductDTO extends Filter {
	brand?: number;
	nutriScore?: NutriScore;
	category?: number;
	barcode?: string;
	tags?: string;
	priceLowerBound?: number;
	priceHigherBound?: number;
}
