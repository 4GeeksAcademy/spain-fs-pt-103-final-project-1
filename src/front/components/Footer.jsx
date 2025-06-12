import React from "react";

export const Footer = () => {
	return (
    <footer style={{
  backgroundColor:'#E2E2E2',
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
          style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} 
        />
      </div>

      {/* Contenido principal del footer */}
      <div className="col-md-5 mt-md-0 mt-3 text-md-start text-center">
        <h5 className="text-uppercase">AYUDA ANIMAL JEREZ</h5>
        <p>Here you can use rows and columns to organize your footer content.</p>
      </div>

      <div className="col-md-3 mb-md-0 mb-3">
        <h5 className="text-uppercase">Nosotros</h5>
        <ul className="list-unstyled">
          <li><a href="#!">Ricardo (githubprofile)</a></li>
          <li><a href="#!">Maria Alejandra (githubprofile)</a></li>
          <li><a href="#!">Nael (githubprofile)</a></li>
          <li><a href="#!"></a></li>
        </ul>
      </div>

      <div className="col-md-3 mb-md-0 mb-3">
        <h5 className="text-uppercase">Links</h5>
        <ul className="list-unstyled">
          <li><a href="#!">InstagramProtectora</a></li>
          <li><a href="#!">FacebookProtectora</a></li>
          <li><a href="#!">YoutubeProtectora</a></li>
          <li><a href="#!">Link 4</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div className="text-center py-3 mt-4" style={{ borderTop: "1px solid #ddd" }}>
    © 2025 Tu Sitio Web — <a href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
</footer>
)
};
