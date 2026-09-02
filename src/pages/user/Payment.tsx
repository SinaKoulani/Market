import { useParams } from "react-router-dom";
import { useState } from "react";
import { makePayment } from "../../api/HandleApi";


const Payment = () => {
    const { id } = useParams();
    const [processing, setProcessing] = useState<boolean>(false);

    async function handlePayment() {
        try{
            if (!id) return;

            setProcessing(true);

            await makePayment(id);

            alert ("Payment successful!");
        } catch (error) {
            console.error(error)
            alert("Payment failed!");
        } finally{
            setProcessing(false);
        }
    }

    return ( 
        <div>
            <button onClick={handlePayment} disabled={processing}>
                {processing ? "Processing..." : "Pay Now"}
            </button>
        </div>
     );
}
 
export default Payment;