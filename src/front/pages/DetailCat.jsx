import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageUploader from "../components/ImageUploader";

export const DetailCat = () => {

    const [cat, setCat] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Obtiene el ID de la URL

    useEffect(() => {
        const handleGetCat = async () => {
            try {
                setCargando(true);
                setError(null);
                const backendUrl = import.meta.env.VITE_BACKEND_URL
                 if (!backendUrl) throw new Error('Backend error')
                const response = await fetch(`${backendUrl}/api/cat/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error`);
                }
                const data = await response.json();
                console.log(data)
                setCat(data);
            } catch (err) {
                setError('Error cargando el gato: ' + err.message);
                console.error('Error:', err);
            } finally {
                setCargando(false);
            }
        };

        handleGetCat();
    }, [id]);
    if (!cat) return null;

    return (
        <div className="container" style={{ height: 600 }} >
            <div className="container">
                <div className="rounded float-start" style={{ width: 400 }} >
                    <ImageUploader idImage={'adorable-chaton-qui-a-sommeil_rzphdy'} />
                </div>
                <div className="text-center  text m-4 my-4">
                    <h1 className='fw-bolder'>{cat.name}</h1>
                    <hr className="my-4" />
                    <p className="text-justify text fw-semibold">{cat.history}</p>
                    <hr className="my-4" />
                    <p className="text-justify text fw-semibold">{cat.age}</p>
                    <p className="text-justify text fw-semibold">{cat.race}</p>
                    <p className="text-justify text fw-semibold">{cat.castration}</p>
                    <p className="text-justify text fw-semibold">{cat.character}</p>
                </div>
            </div>
        </div>
    )
}