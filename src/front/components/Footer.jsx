
import React from "react";
import { PiDog } from "react-icons/pi";
import { PiCat } from "react-icons/pi";
import { PiHorse } from "react-icons/pi";
import { PiGithubLogoFill } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import footer from "../assets/img/footer.png"

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'white',
      backgroundImage: `url(${footer})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: 'white'
    }}>
      <div className="container-fluid text-center text-md-left">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-1 d-flex justify-content-center ">
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

          <div className="col-md-6 text-md-start text-center text-dark">
            <h5 className="text-uppercase">AYUDA ANIMAL JEREZ</h5>
            <p>Ellos te necesitan mas de lo que crees</p>
          </div>
          <div className="col-md-2 mt-2 ">
            <h5 className="text-dark fw-bold"> GitHub <PiGithubLogoFill/></h5>
            <ul className="list-unstyled">
              <li><a href="https://github.com/alejajaja30" className="link-footer">Alejandra ·alejajaja30 <PiDog /></a></li>
              <li> <a href="https://github.com/nael-dev" className="link-footer">Nael ·nael_dev <PiCat /></a></li>
              <li><a href="https://github.com/RCKCode" className="link-footer">Ricardo ·RCKCode <PiHorse /></a></li>
              <li><a href="#!"></a></li>
            </ul>
          </div>

          <div className="col-md-2 ">
            <h5 className="text-dark text-uppercase fw-bold text-dark">SIGUENOS</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.instagram.com/ayudaanimal.jerez/" className="link-footer"><FaInstagram /> InstagramProtectora</a></li>
              <li><a href="https://www.instagram.com/ayudaanimal.jerez/" className="link-footer"><FaFacebook /> FacebookProtectora</a></li>
            </ul>
          </div>
              <div className="text-center text-dark" style={{ borderTop: "1px solid #ddd" }}>
        © 2025 Proyecto de — <a href="https://4geeks.com/es">4GeeksAcademy</a>
      </div>
        </div>
      </div>
    </footer>
  )
};