import { CreateOrderItemDTO } from "../order-item/dto/create-order-item.dto";
export interface CreateOrderDTO {
	productItems: CreateOrderItemDTO[];
}
