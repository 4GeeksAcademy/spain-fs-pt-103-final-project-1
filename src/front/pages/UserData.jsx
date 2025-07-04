import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const UserData = () => {
    const { store } = useGlobalReducer();
    const [payments, setPayments] = useState([]);



    const handleListSponsor = async () => {
        try {
            const response = await fetch(
                "https://refactored-doodle-5gr9497rp94vh754r-3001.app.github.dev/api/payment-registration", {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            }
            );
            const data = await response.json();


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
        <>
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h1 className="card-text d-flex justify-content-center">Listado de gatos a los que has donado.</h1>
                </div>
            </div>
        </div>
            <div className="container mt-5 mb-5">
                <div className="card shadow-sm">
                    <div className="card-body">

                        {payments.map((item, index) => (
                            <div key={index} className="mb-3 border-bottom pb-2">
                                <h5 className="card-title">Nombre del gato: {item.sponsor.cat_name}</h5>
                                <p className="card-text">Cantidad: ${item.amount}</p>
                                <p className="card-text">Fecha de Registro: {item.date_payment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};