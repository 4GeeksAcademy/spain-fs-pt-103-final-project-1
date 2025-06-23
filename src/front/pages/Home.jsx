import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import { CardTips } from "../components/CardTips";
import  Carousel  from "../components/Carousel.jsx";
import Jumbotron from "../components/Jumbotron.jsx";
import { GiPawHeart } from "react-icons/gi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";





export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	

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
		<>
		<div className="text-center mt-5">
			<Jumbotron />
			<hr className="my-4"/>
			<h1>Conoce nuestros gatitos!<GiPawHeart /></h1>
			<Carousel cards={[<Card />]} /> 
			<hr className="my-4"/>
			<h1>Tips para cuidar de tu minino <MdOutlineTipsAndUpdates /></h1>
			<Carousel cards={[<CardTips />]} />
		</div>
		</>
	);
}; 