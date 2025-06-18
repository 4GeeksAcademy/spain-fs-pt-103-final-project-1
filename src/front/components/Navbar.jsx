import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpeg";
import styles from "../index.css"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
	const { store, dispatch} = useGlobalReducer();
	const navigate = useNavigate()
	const logoAnimal = logo
	 const handleLogout =()=>{
		localStorage.removeItem("token");
		dispatch({type: "Logout"});
		navigate("/")

	 }


	return (
		<>
			<nav className="navbar navbar-expand navbar-light bg-ligth border  border-dark">
				<div className="container">
					<Link to="/">
						<img src={logoAnimal} className="img-fluid rounded-circle" style={{ width: 90 }} alt="imagen" />
					</Link>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav mx-2">
							<a className="nav-link active mx-4 p-2 fs-5 fw-semibold link-pretty" aria-current="page" href="#">Home</a>
							<a className="nav-link active p-2 fs-5 fw-semibold link-pretty" href="#">Quiero adoptar</a>
							<a className="nav-link active p-2 fs-5 fw-semibold link-pretty" href="#">Quiero apadrinar</a>
						</div>
					</div>
					<div className="ml-auto nav-item dropdown">
						{store.user ? (
							<button className="dropdown-toggle btn btn-primary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								{store.user.email}
							</button>
						) : (
							<button className="dropdown-toggle btn btn-primary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Ingresar
							</button>
						)}

						<ul className="dropdown-menu">
							{store.user ? (
								<li>
									<span className="dropdown-item">{store.user.email}</span>
								</li>
							) : (
								<li>
									<Link to="/login">
										<button className="dropdown-item">Iniciar sesión</button>
									</Link>
								</li>
							)}
							<li><hr className="dropdown-divider" /></li>

							{store.user ? (
								<button className="btn btn-danger dropdown-item" onClick={handleLogout}>
									Logout
								</button>
							) : (
								<li>
									<Link to="/register">
										<button className="dropdown-item">Registrarme</button>
									</Link>
								</li>
							)}

						</ul>


					</div >
				</div >
			</nav >
		</>
	);
};