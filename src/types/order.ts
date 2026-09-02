import type { Product } from "./product";
export interface OrderItem {
    id : number ;
    quantity: number ; 
    price: number ; 
    product : Product

}

export interface Order{
    id: number ; 
    totalPrice:number;
    createdAt: string ;
    items : OrderItem[];
    
}