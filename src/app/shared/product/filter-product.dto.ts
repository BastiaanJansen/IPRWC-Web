import { Filter } from "../filter";
import { NutriScore } from "../nutri-score.model";

export class FilterProductDTO extends Filter {
	brand?: string;
	nutriScore?: NutriScore;
	category?: string;
}
