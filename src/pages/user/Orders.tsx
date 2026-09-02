import { useState,useEffect } from "react";
import type { Order } from "../../types/order";
import { getOrders } from "../../api/HandleApi";


const Orders = () => {
    const [orders , setOrders] = useState<Order[]>([]);
    const [loading , setLoading] = useState<boolean>(true);

    useEffect(() =>{

        async function fetchOrders() {
            
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally{
                setLoading(false);
            }

        }

        fetchOrders();

    },[]) ;

    return (
        <div>
            {loading && <p>Loading...</p>}

            {!loading && (
            <div>
                {orders.map((order) => (
                <div key={order.id}>
                    <p>Order #{order.id}</p>
                    <p>Total Price: {order.totalPrice}</p>
                    <p>Created At: {order.createdAt}</p>
                </div>
                ))}
            </div>
            )}
        </div>
);
}
 
export default Orders;