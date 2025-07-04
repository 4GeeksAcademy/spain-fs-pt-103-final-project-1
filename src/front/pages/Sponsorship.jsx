import Carousel from "../components/Carousel.jsx"
import  {Card}  from "../components/Card.jsx";

export const Sponsorship = ({cat}) => {
 /* hacer fetch y hacer map*/ 
    return (
        <div className="content m-4">
           <h1 className="text-center m-3">Quieres apadrinar?</h1>
           <div className="text-center m-3" >
                <div className="card border-info mb-3 m-auto" style={{ width: 800 }}>
                    <div className="card-body">
                        <h5 className="card-title">Si estás interesado en apadrinar, pulsa en el botón de "Quiero saber más"  </h5>
                    </div>
                </div>
            </div>
            <div>
                <Carousel cards={[<Card/>]} />
            </div>
        </div>
    )
}