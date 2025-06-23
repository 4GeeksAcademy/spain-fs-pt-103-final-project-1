import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const UserData = () => {
    const { store } = useGlobalReducer();
    const [payments, setPayments] = useState([]);



    const handleListSponsor = async () => {
        try {
            const response = await fetch(
                "https://refactored-doodle-5gr9497rp94vh754r-3001.app.github.dev/api/payment-registration",{
                 headers:{
                    'Authorization': `Bearer ${store.token}`
                }
            }
            );
            const data = await response.json();
            console.log("esto es data", data.payments)
           
            setPayments(data.payments);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    useEffect(() => {
       if (store.user) {
         console.log(store.token)
        handleListSponsor();
    }
}, [store.user]);

    return (
        <section>
            <h1>Bienvenido usuario:</h1>
           <h2>{store.user?.email || "Cargando..."}</h2>
            <h3>Tus pagos:</h3>
            <ul>
                {payments.map((payment) => (
                    <li key={payment.id}>
                        Cantidad: {payment.amount} - Fecha: {payment.date_payment}
                    </li>
                ))}
            </ul>
        </section>
    );
};