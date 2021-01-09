import { Product } from "../product/product.model";
import { User } from "../user/user.model";

export interface Order {
    user: User;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}