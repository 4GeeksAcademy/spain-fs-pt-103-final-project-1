import logo from "../assets/img/logo.jpeg";
import ImageUploader from "../components/ImageUploader";
import { Link } from "react-router-dom";


export const Card = ({cat}) => {



    return (
        <div>
            <div className="col">
                <div className="card rounded-top-5 border border-info" style={{ width: 200 }}>
                    <div className="card-img-top" ><ImageUploader idImage={cat.image} size={200}/> </div>
                        <div className="card-body">
                            <h5 className="card-title fw-semibold">{cat.name}</h5>
                            <Link to={`/detail-cat-page/${cat.id}`} >
                                <button className="btn btn-outline-info">Quiero saber más!</button>
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    )
}
