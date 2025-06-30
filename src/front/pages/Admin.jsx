import { useState } from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';


export const Admin = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [castration, setCastration] = useState('');
    const [character, setCharacter] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            if (!backendUrl) throw new Error('Backend error')
            const response = await fetch(`${backendUrl}/api/cat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    age,
                    race,
                    castration,
                    character
                })
            });
            const result = await response.json();
            console.log(result);
           
            alert('Formulario enviado correctamente');
        } catch (error) {
            console.error('Error al enviar:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="container mt-5" style={{ maxWidth: "500px" }}>
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
                    <h2 className="mb-4 text-center">Registrar Nuevo Gato</h2>
                    <div className="mb-3">
                        <label htmlFor="nombreCompleto" className="form-label fw-semibold">Nombre</label>
                        <input type="text" className="form-control" id="nombreCompleto" placeholder="Ej. Mizifú" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label fw-semibold">Edad</label>
                        <input type="text" className="form-control" id="age" placeholder="Ej. 5" onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="character" className="form-label fw-semibold">Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            id="character"
                            placeholder="Ingresa una descripción"
                            onChange={(e) => setCharacter(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="race" className="form-label fw-semibold">Raza</label>
                        <input type="text" className="form-control" id="race" placeholder="Ej. Siames" onChange={(e) => setRace(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="castration" className="form-label fw-semibold">¿Está castrado? </label>
                        <input type="checkbox" className="form-check-input" id="castration" onChange={(e) => setCastration(e.target.checked)} />
                    </div>
                

                    <div className="d-grid">
                        <button type="submit" className="btn btn-canela">
                            Registar Gato
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
    )
}