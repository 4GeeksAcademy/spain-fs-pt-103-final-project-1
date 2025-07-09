import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpeg";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom"
import { LuPawPrint } from "react-icons/lu";

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
						<img src={logoAnimal} className="img-fluid rounded-circle" style={{ width: 40 }} alt="imagen" />
					</Link>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav mx-2">
							<a className="nav-link active mx-4 p-2 fs-5 fw-semibold link-pretty" aria-current="page" href="#">Home</a>
							<a className="nav-link active p-2 fs-5 fw-semibold link-pretty" href="#">Quiero adoptar <LuPawPrint /></a>
							<a className="nav-link active p-2 fs-5 fw-semibold link-pretty" href="#">Quiero apadrinar <LuPawPrint /></a>
						</div>
					</div>
					<div className="ml-auto nav-item dropdown">
						<button
							className="dropdown-toggle btn btn-primary"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							onMouseDown={(e) => (e.target.style.backgroundColor = '#81D4FA ')}
                                onMouseUp={(e) => (e.target.style.backgroundColor = '#29B6F6 ')}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#039BE5')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = '#29B6F6')} 
						>
							{isLoggedIn ? userEmail : "Ingresar"}
						</button>

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