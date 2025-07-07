import Carousel from "../components/Carousel.jsx"
import { Card } from "../components/Card.jsx";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Adoption = () => {
    const [cat, setCat] = useState([]);

    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {

        const handleGetCat = async () => {

            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL
                if (!backendUrl) throw new Error('Backend error')
                const response = await fetch(`${backendUrl}/api/cat`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error`);
                }
                const data = await response.json();

                setCat(data.cats);
            } catch (err) {
                setError('Error cargando el gato: ' + err.message);
                console.error('Error:', err);
            }
        };

        handleGetCat();
    }, [])
    return (
        <div className="content m-4">
            <h1 className="text-center m-3">Quieres adoptar?</h1>
            <div className="text-center m-3" >
                <div className="card border-info mb-3 m-auto" style={{ width: 800 }}>
                    <div className="card-body">
                        <h5 className="card-title">Si estás interesado en adoptar, envíanos un correo con tu nombre, e-mail y número de teléfono y nos comunicaremos contigo lo más pronto posible.<br></br> Nuestro correo: <br></br> <strong>ayudaanimaljerez@gmail.com</strong> </h5>
                    </div>
                </div>
            </div>
            <Carousel cards={cat.map((cat) => (
                <Card cat={cat} key={cat.id} />
            )
            )}
            />
        </div>
    )
}