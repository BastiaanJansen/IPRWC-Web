import { Brand } from "./brand.model";
import { Category } from "./category.model";
import { Model } from "./model";
import { NutriScore } from "./nutri-score.model";
import { Tag } from "./tag.model";

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
