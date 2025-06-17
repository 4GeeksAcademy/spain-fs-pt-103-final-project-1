import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card"
import {CheckoutForm} from "../components/CheckoutForm"
import { Elements,CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';



export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const stripePromise = loadStripe('pk_test_51RahuCFMs8PtSpw5iOeENRQLye4ZZpol9GBFiY3v6ezOXxMTcTtG7Q6JMcEXKJ2Bg9lqzIg1iZ6HkbMdyNO94gl100Cn0k1TfR')

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/user")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<Card />
			
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</div>
	);
}; 