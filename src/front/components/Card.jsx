import logo from "../assets/img/logo.jpeg";
import ImageUploader from "../components/ImageUploader";
import { Link } from "react-router-dom";


export const Card = ({ cat }) => {



    return (
        <div>
            <div className="col">
                <div
                    className="card border border-info"
                    style={{
                        width: 200,
                        borderTopLeftRadius:  '1.90rem',
                        borderTopRightRadius:  '1.90rem',
                        borderBottomLeftRadius: '1.50rem',
                        borderBottomRightRadius: '1.50rem'
                    }}
                >
                    <div className="card-img-top pt-2"><ImageUploader idImage={cat.image} size={185}/></div>
                    <div className="card-body">
                        <h5 className="card-title fw-semibold">{cat.name}</h5>
                        <Link to={`/detail-cat-page/${cat.id}`} >
                            <button className="btn-info btn mt-auto w-100" target="_blank" rel="noopener noreferrer" onMouseDown={(e) => (e.target.style.backgroundColor = '#81D4FA ')}
                    onMouseUp={(e) => (e.target.style.backgroundColor = '#29B6F6 ')}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#039BE5')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#29B6F6')}>Quiero saber mas !</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
