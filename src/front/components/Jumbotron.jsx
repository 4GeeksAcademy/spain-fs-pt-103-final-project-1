import logo from "../assets/img/logo.jpeg";

export const Jumbotron = () => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid d-flex">
                <div>
                    <img src={logo} />
                </div>
                <div className="container">
                    <h1 className="display-4 fw-semibold">Asociación Ayuda Animal Jerez</h1>
                    <p className="lead p-4">¡Bienvenid@ a Ayuda Animal Jerez!
                        ¿Sueñas con marcar la diferencia en la vida de un gatito? En nuestra asociación rescatamos, cuidamos y buscamos hogares llenos de amor para cientos de felinos vulnerables. Apadrinar significa brindarles cuidados vitales sin asumir una adopción física, mientras que adoptar es regalarles un futuro seguro. Cada ronroneo, cada juego y cada mirada agradecida son posibles gracias a ti.
                        ¡Únete a esta cadeta de esperanza! Juntos podemos transformar destinos.</p>
                </div>
                <div>
                    <img src={logo} />
                </div>
            </div>
        </div>
    )
}
export default Jumbotron;