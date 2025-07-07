import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AdminListSponsor = () => {
    const [sponsor, setSponsor] = useState([]);
    const { store } = useGlobalReducer();
    

     useEffect(() => {
    if (store.token) {
      handleListSponsor();
    }
  }, [store.token]);

    const handleListSponsor = async () => {
        try {
            const response = await fetch(
                "https://refactored-doodle-5gr9497rp94vh754r-3001.app.github.dev/api/payment-registration-admin",
                {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSponsor(data.payments);
        } catch (error) {
            console.error("Error fetching sponsors:", error);
        }
    };
      if (!store.token) {
    return <p>Cargando token, por favor espera...</p>;
  }
    


    return (
        <div className="container mt-5 mb-5">
            <h1 className="text-center mb-4">Lista de Patrocinadores</h1>
            <div className="card shadow-sm">
                <div className="card-body">
                    <p className="card-text">Listado de Gatos con sponsors.</p>
                    {sponsor.map((item, index) => (
                        <div key={index} className="mb-3 border-bottom pb-2">
                            <h5 className="card-title">Cat ID: {item.sponsor.cat_name}</h5>
                            <p className="card-text">User ID: {item.sponsor.user_email}</p>
                            <p className="card-text">Monto: ${item.amount}</p>
                            <p className="card-text">Fecha de Registro: {item.date_payment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}