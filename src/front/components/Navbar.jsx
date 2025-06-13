import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpeg";
import styles from "../index.css"

export const Navbar = () => {

	const logoAnimal = logo
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
						
							<button class="dropdown-toggle btn btn-primary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Ingresar
							</button>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">Iniciar sesion</a></li>
								<li><hr class="dropdown-divider"/></li>
								<li><a class="dropdown-item" href="#">Registrarme</a></li>
							</ul>
						

					</div>
				</div>
			</nav>
		</>
	);
};