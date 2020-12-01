import { Filter } from "../shared/filter";
import { NutriScore } from "../shared/nutri-score.model";

export class FilterProductDTO extends Filter {
	brand?: string;
	nutriScore?: NutriScore;
	category?: string;
}
