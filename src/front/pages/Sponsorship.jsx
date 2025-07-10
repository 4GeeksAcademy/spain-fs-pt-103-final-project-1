import Carousel from "../components/Carousel.jsx"
import { Card } from "../components/Card.jsx";
import { useEffect, useState } from "react";
import fotobackground from '../assets/img/fotobackground.jpeg';

export const Sponsorship = () => {
    const [cat, setCat] = useState([]);


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
        <div className="p-4" style={{ backgroundImage:`url(${fotobackground})`, backgroundSize:"cover", backgroundPosition: "center", height: 680 }}>
            <div className="content ">
                <h1 className="text-center p-2">Quieres apadrinar?</h1>
                <div className="text-center p-2" >
                    <div className="card border-info mb-3 m-auto" style={{ width: 800 }}>
                        <div className="card-body">
                            <h5 className="card-title">Si estás interesado en apadrinar, pulsa en el botón de "Quiero saber más" <br></br>
                            Allí encontrarás la información detallada de cada gato.   </h5>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    <Carousel  cards={cat.map((cat) => (
                        <Card cat={cat} key={cat.id} />
                    )
                    )}
                    />
                </div>
            </div>
        </div>
    )
}