
import React from "react";
import { PiDog } from "react-icons/pi";
import { PiCat } from "react-icons/pi";
import { PiHorse } from "react-icons/pi";
import { PiGithubLogoFill } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#E2E2E2',
      backgroundImage: 'url("https://i.pinimg.com/236x/b8/34/d1/b834d123cfec97f526584603d52787e6.jpg")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#fff',
      padding: '5px'
    }}>
      <div className="container-fluid text-center text-md-left">
        <div className="row align-items-center justify-content-center">
          {/* Imagen en el lado izquierdo */}
          <div className="col-md-1 d-flex justify-content-center mb-3 mb-md-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOFYUFQxyIQRExOKYBo_MP0grjqgZo0ZGVA&s"
              alt="Perfil"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Contenido principal del footer */}
          <div className="col-md-6 mt-md-0 mt-3 text-md-start text-center text-dark">
            <h5 className="text-uppercase">AYUDA ANIMAL JEREZ</h5>
            <p>Ellos te necesitan mas de lo que crees</p>
          </div>

          <div className="col-md-2 mt-5 mb-md-0 mb-3">
            <h5 className="text-dark fw-bold"> GitHub <PiGithubLogoFill/></h5>
            <ul className="list-unstyled">
              <li><a href="https://github.com/alejajaja30" className="link-footer">Alejandra ·alejajaja30 <PiDog /></a></li>
              <li> <a href="https://github.com/nael-dev" className="link-footer">Nael ·nael_dev <PiCat /></a></li>
              <li><a href="https://github.com/RCKCode" className="link-footer">Ricardo ·RCKCode <PiHorse /></a></li>
              <li><a href="#!"></a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-dark text-uppercase fw-bold text-dark">SIGUENOS</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="link-footer"><FaInstagram /> InstagramProtectora</a></li>
              <li><a href="#!" className="link-footer"><FaFacebook /> FacebookProtectora</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="text-center py-3 mt-4 text-dark" style={{ borderTop: "1px solid #ddd" }}>
        © 2025 Proyecto de — <a href="https://4geeks.com/es">4GeeksAcademy</a>
      </div>
    </footer>
  )
};