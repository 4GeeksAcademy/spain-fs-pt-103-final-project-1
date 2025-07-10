import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import fotobackground from '../assets/img/fotobackground.jpeg';


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
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            if (!backendUrl) throw new Error('Backend error')
        
            const response = await fetch(`${backendUrl}/api/payment-registration-admin`,
            
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
  console.log(store.currency)
    
return (
    <div className="p-5" style={{ backgroundImage:`url(${fotobackground})`, backgroundSize:"cover", backgroundPosition: "center" }}>
        <div className="container mt-5 mb-5">
            <h1 className="text-center mb-4">Lista de Patrocinadores</h1>
            <div className="card shadow-sm">
                <div className="card-body">
                
                    {sponsor.map((item, index) => (
                        <div key={index} className="mb-3 border-bottom pb-2">
                            <h5 className="card-title">Nombre del gato: <strong>{item.sponsor.cat_name}</strong></h5>
                            <p className="card-text"><strong>Email de usuario:</strong> {item.sponsor.user_email}</p>
                            <p className="card-text"><strong>Cantidad:</strong> {item.amount}{store.currency}</p>
                            <p className="card-text"><strong>Fecha de Registro:</strong>{new Date(item.date_payment).toLocaleString('es-ES', {
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
    </div>
    );
}
