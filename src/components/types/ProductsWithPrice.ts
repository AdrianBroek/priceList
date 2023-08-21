import { Product } from "./Product"

export interface ProductsWithPriceList extends Product {
    priceListId: number
}