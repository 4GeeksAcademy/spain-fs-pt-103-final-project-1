import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import Carousel from "../components/Carousel.jsx";
import Jumbotron from "../components/Jumbotron.jsx";
import { GiPawHeart } from "react-icons/gi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import ListFoodCat from "../components/ListFoodCat.jsx";
import { identity } from "@cloudinary/url-gen/backwards/utils/legacyBaseUtil";
import ImageUploader from "../components/ImageUploader.jsx";
import { Link } from "react-router-dom";
import background from "../assets/img/background.jpeg"

export const Home = () => {

	const [cat, setCat] = useState([]);

	const { store, dispatch } = useGlobalReducer()
	useEffect(() => {
	const token = localStorage.getItem("token");
	if (!token || store.user) return;

	const fetchUser = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			const res = await fetch(`${backendUrl}/api/user/user-data`, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error("No se pudo recuperar el usuario");

			const data = await res.json();
			dispatch({ type: "set_user", payload: { user: data.user, token } });
			localStorage.setItem("user", JSON.stringify(data.user));
		} catch (err) {
			console.error("Error al recuperar el usuario:", err);
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		}
	};

	fetchUser();
}, []);

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
		<div className="text-center p-5" style={{backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }}>
			<Jumbotron />
			<hr className="my-4 border-3 border-dark opacity-50" />
			<h1>Conoce nuestros gatitos!<GiPawHeart /></h1>
			<Carousel cards={cat.map((cat) => (
			<Card cat={cat} key={cat.id} />	
			)
			)}
			/>
			<hr className="my-4 border-3 border-dark opacity-50" />
			<h1>Tips para cuidar de tu minino <MdOutlineTipsAndUpdates /></h1>
			<Carousel cards={tips.map((tip, index) => (
				<div key={tip.title} className="card text-bg-info m-3" style={{ width: 250, height: 250 }}>
					<div className="card-header">{`Tip #${index}`}</div>
					<div className="card-body">
						<h5 className="card-title">{tip.title}</h5>
						<p className="card-text">{tip.content}</p>
					</div>
				</div>

			))} />
			<hr className="my-4 border-3 border-dark opacity-50" />
			<ListFoodCat />
		</div>
	);
}; 