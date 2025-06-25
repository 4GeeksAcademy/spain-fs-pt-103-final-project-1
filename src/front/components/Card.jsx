import logo from "../assets/img/logo.jpeg";

export const Card = ({catName, image}) => {
    return (
        <div>
            <div className="col">
                <div className="card border-info" style={{ width: 200 }}>
                    <img src={logo}  className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title fw-semibold">{catName}</h5>
                            <button className="btn btn-outline-info">Quiero saber más!</button>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Card;