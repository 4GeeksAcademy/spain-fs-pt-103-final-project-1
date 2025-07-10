import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageUploader from "../components/ImageUploader";
import { CheckoutForm } from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BiBody } from 'react-icons/bi';
import { Modal } from 'react-bootstrap';
import fotobackground from '../assets/img/fotobackground.jpeg';
import { auto } from '@cloudinary/url-gen/actions/resize';
import '../index.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const DetailCat = () => {

    const [cat, setCat] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { cat_id } = useParams(); 
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
                console.log(currency)
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

    
    return (
        <div style={{ backgroundImage:`url(${fotobackground})`, backgroundSize:"cover", backgroundPosition: "center" }}>
        <div className="container d-flex py-5" >
            <div className="text-start ms-4 " style={{ flex: 1 }}>
                <h1 className='fw-bolder'>{cat.name}</h1>
                <hr className="my-4" />
                <h5 className="text-justify text fw-semibold">{cat.history}</h5>
                <hr className="my-4" />
                <h5 className="text-justify text fw-semibold card-title">Edad : {cat.age}</h5>
                <hr className="my-4" />
                <h5 className="text-justify text fw-semibold card-title">Raza : {cat.race}</h5>
                <hr className="my-4" />
                <h5 className="text-justify text fw-semibold card-title">Castración : {cat.castration ? 'SI': 'NO'}</h5>
                <hr className="my-4" />
                <h5 className="text-justify text fw-semibold card-title">Carácter : {cat.character}</h5>
                <hr className="my-4" />


                {isLoggedIn ? (
                    <>
                        <button 
                        onClick={() => setMostrarPago(true)} 
                        className='btn btn-info' >
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
                    <h3 className='text-center'><strong>Por favor inicia sesión  o registrate para donar.</strong></h3>
                )}
            </div>
             <div className='mt-5 px-5 ' style={{ width: 400, }} >
                <ImageUploader  idImage={cat.image} />
            </div>
        </div>
       </div>
    );
};
