import { Product } from "src/app/product/product.model";

export interface OrderItem {
	quantity: number;
	product: Product;
}
