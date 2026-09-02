import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import type { Order } from "../../types/order";
import { getOrderById } from "../../api/HandleApi";

const OrderDetail = () => {
    
    const { id } = useParams();
    const [order , setOrder] = useState<Order | null>(null);
    const [loading , setLoading] = useState<boolean>(true);

    useEffect(()=>{
        async function fetchOrders() {
            try{
                if (!id) return;

                const data=await getOrderById(id);
                setOrder(data);
                } catch (error){
                    console.error(error);
                } finally {
                    setLoading(false);
                }
        }
        fetchOrders();
    },[id]);
    return (
        <div>
            {loading && <p>Loading...</p>}

            {!loading && order&&(
                <div>
                    <p>Order #{order.id}</p>
                    <p>Total Price: {order.totalPrice}</p> 
                    <p>Created At: {order.createdAt}</p>
                </div>
            )}

        </div>
      );
};
 
export default OrderDetail;