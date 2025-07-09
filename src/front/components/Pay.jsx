import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "./Card.jsx"
import {CheckoutForm} from "./CheckoutForm.jsx"
import { Elements,CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

export const Pay = () =>{
    const stripePromise = loadStripe('pk_test_51RahuCFMs8PtSpw5iOeENRQLye4ZZpol9GBFiY3v6ezOXxMTcTtG7Q6JMcEXKJ2Bg9lqzIg1iZ6HkbMdyNO94gl100Cn0k1TfR')

    return (
        <Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
    )
}