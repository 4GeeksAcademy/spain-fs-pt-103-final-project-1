import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageUploader from "../components/ImageUploader";
import { CheckoutForm } from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BiBody } from 'react-icons/bi';
import { Modal } from 'react-bootstrap';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const DetailCat = () => {

    const [cat, setCat] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { cat_id } = useParams(); // Obtiene el ID de la URL
    const [mostrarPago, setMostrarPago] = useState(false);
    const token = localStorage.getItem('token');
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('EUR');

    const isLoggedIn = token && token !== 'null' && token !== 'undefined';

    const handlePostSponsor = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            if (!backendUrl) throw new Error('Backend error')
            const response = await fetch(`${backendUrl}/api/payment-registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    cat_id,
                    date_payment: new Date().toISOString()
                })

            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handlePaymentSuccess = () => {
        handlePostSponsor();
        setMostrarPago(false);
    };

    useEffect(() => {
        const handleGetCat = async () => {
            try {
                setCargando(true);
                setError(null);
                const backendUrl = import.meta.env.VITE_BACKEND_URL
                if (!backendUrl) throw new Error('Backend error')
                const response = await fetch(`${backendUrl}/api/cat/${cat_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error`);
                }
                const data = await response.json();
                console.log(data.Cat)
                setCat(data.Cat);
            } catch (err) {
                setError('Error cargando el gato: ' + err.message);
                console.error('Error:', err);
            } finally {
                setCargando(false);
            }
        };



        handleGetCat();

    }, [cat_id]);

    if (!cat) return null;

    console.log(amount)
    console.log(currency)
    return (
        <div className="container  d-flex py-5" style={{ paddingBottom: '200px' }}>
            <div style={{ width: 400 }}>
                <ImageUploader idImage={'adorable-chaton-qui-a-sommeil_rzphdy'} />
            </div>
            <div className="text-start ms-4 " style={{ flex: 1 }}>
                <h1 className='fw-bolder'>{cat.name}</h1>
                <hr className="my-4" />
                <p className="text-justify text fw-semibold">{cat.history}</p>
                <hr className="my-4" />
                <p className="text-justify text fw-semibold card-title">Edad : {cat.age}</p>
                <hr className="my-4" />
                <p className="text-justify text fw-semibold card-title">Raza : {cat.race}</p>
                <hr className="my-4" />
                <p className="text-justify text fw-semibold card-title">Castración : {cat.castration ? 'SI': 'NO'}</p>
                <hr className="my-4" />
                <p className="text-justify text fw-semibold card-title">Carácter : {cat.character}</p>
                <hr className="my-4" />

                {isLoggedIn ? (
                    <>
                        <button onClick={() => setMostrarPago(true)} className='btn btn-primary'>
                            Donar
                        </button>
                        <Modal show={mostrarPago} onHide={() => setMostrarPago(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Donar</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        amount={amount}
                                        setAmount={setAmount}
                                        currency={currency}
                                        setCurrency={setCurrency}
                                        onPaymentSuccess={handlePaymentSuccess}
                                    />
                                </Elements>
                            </Modal.Body>
                        </Modal>
                    </>
                ) : (
                    <p>Por favor inicia sesión para donar.</p>
                )}
            </div>
        </div>
    
    );
};
