import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card";
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

			const response = await fetch(backendUrl + "/api/hello")
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
 
const tips = [
	{
		title: "La alimentación",
		content: "Darle una alimentación variada, equilibrada y de buena calidad, y proporcionarle agua fresca todos los días."
	},
	{
		title: "La cama",
		content: "Ponerle una camita cómoda, suave y amplia, y dos cuencos o platos hondos para la comida y el agua."
	},
	{
		title: "El arenero",
		content: "Mantener el arenero limpio y en un lugar tranquilo, ya que los gatos son muy higiénicos y exigentes."
	},
	{
		title: "La malta",
		content: "Ofrecerle malta de vez en cuando para evitar las bolas de pelo en el estómago."
	},
	{
		title: "Entretenimiento",
		content: "Jugar con él y estimular su curiosidad con juguetes, rascadores y enriquecimiento ambiental."
	},
	{
		title: "El agua",
		content: "Los gatos no son grandes bebedores. Debemos fomentar su ingesta de agua. Podemos conseguirlo colocando fuentes de agua para captar su atención."
	},
	{
		title: "La curiosidad",
		content: "Los gatos indoor se aburren en el sofá y les llama la atención lo que ocurre en el exterior. Por ello muchos deciden asomarse y saltar al vacío.Ten cuidado"
	},
	{
		title: "Ambientación",
		content: "Facilitarle juguetes que estimulen su inteligencia. Puedes proporcionarle estanterías a diversas alturas y esconder algunos premios antes de irte de casa"
	},
	{
		title: "El rascador",
		content: "No te enfades si ves que tu gato se afila las uñas en el sofá. Piensa que ellos en libertad lo harían en un tronco de árbol, sólido y fuerte. Consigue uno estable"
	},
]
	return (
		<div className="text-center mt-5 m-4">
			<Jumbotron />
			<hr className="my-4"/>
			<h1>Conoce nuestros gatitos!<GiPawHeart /></h1>
			<Carousel cards={[<Card />]} /> 
			<hr className="my-4"/>
			<h1>Tips para cuidar de tu minino <MdOutlineTipsAndUpdates /></h1>
			<Carousel cards={tips.map((tip, index) => (
				<div key={tip.title} className="card text-bg-info m-3" style={{ width : 250, height : 250 }}>
                <div className="card-header">{`Tip #${index}`}</div>
                <div className="card-body">
                    <h5 className="card-title">{tip.title}</h5>
                    <p className="card-text">{tip.content}</p>
                </div>
            </div>
			))} />
		</div>
	);
}; 