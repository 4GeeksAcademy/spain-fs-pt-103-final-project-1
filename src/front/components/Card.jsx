import logo from "../assets/img/logo.jpeg";
import ImageUploader from "../components/ImageUploader";
import { Link } from "react-router-dom";


export const Card = ({ cat }) => {



export const Card = ({catName, image}) => {
    return (
        <div>
            <div className="col">
                <div className="card border-info rounded-top-5" style={{ width: 200 }}>
                    <div className="card-img-top" ><ImageUploader idImage={cat.image} size={200} /> </div>
                    <div className="card-body">
                        <h5 className="card-title fw-semibold">{cat.name}</h5>
                        <Link to={`/detail-cat-page/${cat.id}`} >
                            <button className="btn btn-info" color="black"
                                onMouseDown={(e) => (e.target.style.backgroundColor = '#81D4FA ')}
                                onMouseUp={(e) => (e.target.style.backgroundColor = '#29B6F6 ')}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#039BE5')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = '#29B6F6')} >Quiero saber más!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}