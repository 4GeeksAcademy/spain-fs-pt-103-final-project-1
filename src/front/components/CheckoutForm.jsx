import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState('')

    useEffect(() => {
         if (amount <= 0 || currency === "") 
            return;
        const paymentIntent = async () => {
           const res = await  fetch('https://refactored-doodle-5gr9497rp94vh754r-3001.app.github.dev/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ amount,currency})

            })
                if(!res.ok) throw new Error(`Error ${res.status}`)
                    const data = await res.json()
                setClientSecret(data.clientSecret)
        }
        paymentIntent()
    }, [amount,currency]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setLoading(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        },
        );
        setLoading(false)

        if (error) {
            console.log('[error]', error);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded')
        } else {
            console.log('algun error')
        };

    }
    return (
        <form className="w-50 bg-light mx-auto" onSubmit={handleSubmit}>
           <div className="mx-auto my-2 col-3">
                <label>Amount</label>
                <input
                     type="text" 
                     pattern="[0-9]*" 
                     inputmode="numeric"
                    value={amount}
                    onChange={(e)=> setAmount((e.target.value))}
                ></input>
           </div>
           <div className="mx-auto col-3"> 
                <label>Moneda</label>
                <select
                    value={currency}
                    onChange={(e)=> setCurrency(e.target.value)}
                    className="form-control"
                >
                    <option value = "usd">USD</option>
                    <option value = "eur">EUR</option>
                    <option value = "mxn">MXN</option>
                </select>
           </div>
           
            <div className="my-5">
                <CardElement />
            </div>
            <button type="submit" disabled={!stripe || loading}>
                Pay
            </button>
        </form>
    );
};