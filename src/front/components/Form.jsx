import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export const Form = () => {
    return (

        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 text-center">Crear Nuevo Usuario</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre y Apellidos</label>
                    <input type="text" className="form-control" id="nombre" placeholder="Ej. Juan Pérez" />
                </div>

                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="tel" className="form-control" id="telefono" placeholder="Ej. +34 600 123 456" />
                </div>

                <div className="mb-3">
                    <label htmlFor="gmail" className="form-label">Correo Gmail</label>
                    <input type="email" className="form-control" id="gmail" placeholder="Ej. juan@gmail.com" />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-canela">
                        Crear Usuario
                    </button>
                </div>
            </form>

            <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ color: "#25D366" }}
                >
                    <FaWhatsapp size={32} />
                </a>
                <a
                    href="https://instagram.com/tu_usuario"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ color: "#833AB4" }}
                >
                    <FaInstagram size={32} />
                </a>
                <a
                    href="https://facebook.com/tu_usuario"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ color: "#1877F2" }}
                >
                    <FaFacebook size={32} />
                </a>
            </div>
        </div>
    )
}