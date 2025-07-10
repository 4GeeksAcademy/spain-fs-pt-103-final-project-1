import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer";
import fotobackground from '../assets/img/fotobackground.jpeg';
import {Link} from "react-router-dom"


export const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { store, dispatch } = useGlobalReducer();

    const handleLogin = async (email, password) => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

            const response = await fetch(`${backendUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })

            })
            const data = await response.json()

            if (!data.token)
                return undefined;

            localStorage.setItem('token', data.token)
            localStorage.setItem('is_admin', JSON.stringify(data.is_admin))
            dispatch({ type: "set_token", payload: data.token });
            dispatch({ type: "admin", payload: { is_admin: data.is_admin } });
            return data;




        } catch (err) {
            setError(err.error)
            throw new Error("Error en login")
        }
    }

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();
        const response = await handleLogin(email, password);

        if (!response) {
            setError('Error en el login')
            return;
        }

        dispatch({
            type: 'admin',
            payload: {
                is_admin: response.is_admin
            }
        })

        if (response) {
            if (response.is_admin === true) {
                navigate('/');
            } else {
                navigate('/user-data');
            }
        }
    }


    return (
        <div className="p-5" style={{ backgroundImage:`url(${fotobackground})`, backgroundSize:"cover", backgroundPosition: "center" }}>
                    <div className="container" style={{ maxWidth: "500px" }}>
        <section
            className="container d-flex flex-column justify-content-center align-items-center"
            style={{
                minHeight: '60vh',
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                color: '#1e1e1e',
            }}
        >
            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : null}

            <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '1rem' }}>
                Login
            </h1>

            <form
                className="d-flex justify-content-center my-2"
                onSubmit={handleOnSubmit}
            >
                <fieldset
                    className="d-flex flex-column p-4 rounded"
                    style={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        border: '1px solid #ccc',
                        borderRadius: '12px',
                        width: '300px',
                    }}
                >
                    <label style={{ fontWeight: '500', marginBottom: '4px' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="email"
                        required
                        onChange={(evt) => setEmail(evt.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            marginBottom: '1rem',
                            outlineColor: '#3b82f6',
                        }}
                    />

                    <label style={{ fontWeight: '500', marginBottom: '4px' }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        required
                        onChange={(evt) => setPassword(evt.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            marginBottom: '1rem',
                            outlineColor: '#3b82f6',
                        }}
                    />
                    <div className="d-grid text-center">
                    <button
                        type="submit"
                        className="btn btn-canela"   
                    >
                    Login
                    </button>
                    <span className="mt-2">No tienes cuenta? <Link to="/form">Registrate</Link></span>
                    </div>
                </fieldset>
            </form>
        </section>
        </div>
</div>
    )
}