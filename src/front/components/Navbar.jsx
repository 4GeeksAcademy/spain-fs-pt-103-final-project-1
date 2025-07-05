import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpeg";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { LuPawPrint } from "react-icons/lu";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate()
	const logoAnimal = logo
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("is_admin"); 
		dispatch({ type: "Logout" });
		navigate("/")
	}

	const isLoggedIn = !!store.user || store.is_admin;
	const userEmail = store.user?.email || (store.is_admin ? "Admin" : "Invitado");
	return (
		<>
			<nav className="navbar navbar-expand navbar-light bg-ligth border border-dark">
				<div className="container">
					<Link to="/">
						<img src={logoAnimal} className="img-fluid rounded-circle" style={{ width: 40 }} alt="imagen" />
					</Link>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav mx-2">
							<Link className="no-link" to="/">
								<span className="nav-link active mx-4 p-2 fs-5 fw-semibold link-pretty" aria-current="page" href="#">Home</span>
							</Link>
							<Link className="no-link" to="/adoption">
								<span className="nav-link active p-2 fs-5 fw-semibold link-pretty" aria-current="page" href="#">Quiero adoptar <LuPawPrint /></span>
							</Link>
							<Link className="no-link" to="/sponsorship">
								<span className="nav-link active p-2 fs-5 fw-semibold link-pretty" aria-current="page" href="#" >Quiero apadrinar <LuPawPrint /></span>
							</Link>
							{store.is_admin === true && (
								<>
									<Link className="no-link" to="/Admin">
										<span className="nav-link active p-2 fs-5 fw-semibold link-pretty" aria-current="page" href="#">Gestionar Gatos <LuPawPrint /></span>
									</Link>
									<Link className="no-link" to="/admin-list-sponsor">
										<span className="nav-link active p-2 fs-5 fw-semibold link-pretty" aria-current="page" href="#"> Listado de sponsor <LuPawPrint /></span>
									</Link>
								</>
							)}
						</div>
					</div>
					<div className="ml-auto nav-item dropdown">
						<button
							className="dropdown-toggle btn btn-primary"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{isLoggedIn ? userEmail : "Ingresar"}
						</button>

						<ul className="dropdown-menu">
							{isLoggedIn ? (
								<li>
									<Link className="no-link" to="/user-data">
										<span className="dropdown-item">{userEmail}</span>
									</Link>
								</li>
							) : (
								<li>
									<Link className="no-link" to="/login">
										<button className="dropdown-item">Iniciar sesión</button>
									</Link>
								</li>
							)}

							<li><hr className="dropdown-divider" /></li>

							{isLoggedIn ? (
								<li>
									<button className="btn btn-danger dropdown-item" onClick={handleLogout}>
										Logout
									</button>
								</li>
							) : (
								<li>
									<Link className="no-link" to="/form">
										<button className="dropdown-item">Registrarme</button>
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};