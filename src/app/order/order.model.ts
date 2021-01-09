import { Product } from "../product/product.model";
import { User } from "../user/user.model";
import { OrderItem } from "./order-item/order-item.model";

export interface Order {
	id: number;
	user: User;
	items: OrderItem[];
	createdAt: Date;
	updatedAt: Date;
}
