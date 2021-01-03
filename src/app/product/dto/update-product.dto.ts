import { NutriScore } from "src/app/shared/nutri-score.model";

export interface UpdateProductDTO {
    name: string;
    description: string;
    price: number;
    brandID: number;
    nutriScore: NutriScore;
    weight: string;
    categoryID: number;
    tagsID: number[];
    image: string;
    barcode: string;
}