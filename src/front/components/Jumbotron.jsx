import logo from "../assets/img/logo.jpeg";

export const Jumbotron = () => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid d-flex">
                <div>
                    <img src={logo} />
                </div>
                <div className="text-center px-3 py-4">
                    <h1
                        className="display-4 fw-semibold"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: '#3B2F2F'
                        }}
                    >
                        Asociación Ayuda Animal Jerez
                    </h1>
                    <p
                        className="lead px-4 pt-3"
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: '#4A3A2D',
                            fontSize: '1.1rem',
                            lineHeight: '1.8'
                        }}
                    >
                        ¡Bienvenid@ a Ayuda Animal Jerez!<br />
                        ¿Sueñas con marcar la diferencia en la vida de un gatito? En nuestra asociación rescatamos, cuidamos y buscamos hogares llenos de amor para cientos de felinos vulnerables. <strong>Apadrinar</strong> significa brindarles cuidados vitales sin asumir una adopción física, mientras que <strong>adoptar</strong> es regalarles un futuro seguro. Cada ronroneo, cada juego y cada mirada agradecida son posibles gracias a ti. <br />
                        <br />
                        <em>¡Únete a esta cadena de esperanza!</em> Juntos podemos transformar destinos.
                    </p>
                </div>
                <div>
                    <img src={logo} />
                </div>
            </div>
        </div>
    )
}
export default Jumbotron;