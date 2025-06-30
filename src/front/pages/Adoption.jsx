import Carousel from "../components/Carousel.jsx"
import Card from "../components/Card.jsx";

export const Adoption = () => {
    return (
        <div className="content m-4">
            <h1 className="text-center m-3">Quieres adoptar?</h1>
            <div className="text-center m-3" >
                <div className="card border-info mb-3 m-auto" style={{ width: 800 }}>
                    <div className="card-body">
                        <h5 className="card-title">Si estás interesado en adoptar, envíanos un correo con tu nombre, e-mail y número de teléfono y nos comunicaremos contigo lo más pronto posible.<br></br> Nuestro correo:  </h5>
                    </div>
                </div>
            </div>
            <div>
                <Carousel cards={[<Card />]} />
            </div>
        </div>
    )
}