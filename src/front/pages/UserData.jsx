import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import fotobackground from '../assets/img/fotobackground.jpeg';

export const UserData = () => {
    const { store } = useGlobalReducer();
    const [payments, setPayments] = useState([]);



    const handleListSponsor = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            if (!backendUrl) throw new Error('Backend error')
            const response = await fetch(
                `${backendUrl}/api/payment-registration`, {
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
            handleListSponsor();
        }
    }, [store.user]);

    return (
        <div className="p-5" style={{ backgroundImage:`url(${fotobackground})`, backgroundSize:"cover", backgroundPosition: "center", height:680 }}>
            <div className="container p-3">
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
                                <p className="card-text">Cantidad: {item.amount}{store.currency}</p>
                                <p className="card-text"><strong>Fecha de Registro:</strong> {new Date(item.date_payment).toLocaleString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

