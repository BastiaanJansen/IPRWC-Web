import { Brand } from "../brand/brand.model";
import { Category } from "../category/category.model";
import { Model } from "../shared/model";
import { NutriScore } from "../shared/nutri-score.model";
import { Tag } from "../tag/tag.model";

export class Product extends Model {
	name: string;
	description: string;
	price: number;
	brand: Brand;
	nutriScore: NutriScore;
	weight: string;
	category: Category;
	tags: Tag[];
	image: string;
	barcode: string;
}
