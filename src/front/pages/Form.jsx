import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import fotobackground from '../assets/img/fotobackground.jpeg';

export const Form = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            if (!backendUrl) throw new Error('Backend error')
            const response = await fetch(`${backendUrl}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                    password,
                    birthdate
                })
            });
            const result = await response.json();
            alert('Formulario enviado correctamente');
            if (result){
                navigate('/login');
            }
        } catch (error) {
            console.error('Error al enviar:', error);
        }
    };
    return (
        <div className="p-5" style={{ backgroundImage:`url(${fotobackground})`, backgroundSize:"cover", backgroundPosition: "center" }}>
        <form onSubmit={handleSubmit}>
            <div className="container" style={{ maxWidth: "500px" }}>
                <div
                    className="p-4 border rounded-4 shadow-sm bg-white transition-hover"
                    style={{
                        borderColor: "#dee2e6",
                        transition: "box-shadow 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0.5rem 1rem rgb(0, 0, 0)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 .125rem .25rem rgb(0, 0, 0)";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}>
                    <h2 className="mb-4 text-center">Crear Nuevo Usuario</h2>
                        <div className="mb-3">
                            <label htmlFor="nombreCompleto" className="form-label fw-semibold">Nombre</label>
                            <input type="text" className="form-control" id="nombreCompleto" placeholder="Ej. Mizifú" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label fw-semibold">Apellidos</label>
                            <input type="text" className="form-control" id="apellido" placeholder="Ej. Alvarez Ortiz" onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label fw-semibold">Fecha de nacimiento</label>
                            <input type="date" className="form-control" id="birthdate" placeholder="Ej. Alvarez Ortiz" onChange={(e) => setBirthdate(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gmail" className="form-label fw-semibold">Correo Gmail</label>
                            <input type="email" className="form-control" id="gmail" placeholder="Ej. Mizifú22@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-canela">
                                Crear Usuario
                            </button>
                        </div>
                    <div style={{ marginTop: "1rem", textAlign: "center" }}>
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            style={{ color: "#25D366", margin: "0 8px" }}
                        >
                            <FaWhatsapp size={32} />
                        </a>
                        <a
                            href="https://instagram.com/tu_usuario"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            style={{ color: "#833AB4", margin: "0 8px" }}
                        >
                            <FaInstagram size={32} />
                        </a>
                        <a
                            href="https://facebook.com/tu_usuario"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            style={{ color: "#1877F2", margin: "0 8px" }}
                        >
                            <FaFacebook size={32} />
                        </a>
                    </div>
                </div>
            </div>
            </form>
            </div>
            )
}