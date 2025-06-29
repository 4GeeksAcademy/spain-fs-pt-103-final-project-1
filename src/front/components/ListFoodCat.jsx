import { useState, useEffect } from "react"
import Carousel from "./Carousel.jsx";
 const ListFoodCat = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const ListProduct = async () => {
            try {
                const response = await fetch('./productos.json');
                const products = await response.json();
                setData(products);

            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        ListProduct();
    }, []);
   
    const cards = data.map((item, index) => (
        <div
            className="card m-2 h-100 d-flex flex-column justify-content-between"
            style={{ width: "18rem", minHeight: "450px"  }}
            key={index}
        >
            <img 
                src={item.imagen} 
                className="card-img-top"
                alt={item.nombre}
                style={{ objectFit: "cover", height: "200px" }}/>
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{item.nombre}</h5>
                <p className="card-text">{item.precio}</p>
                <a href={item.url} className="btn btn-primary mt-auto w-100">Comprar</a>
            </div>
        </div>
    ));
    return(
    <div className="container mt-4">
        <h1>Piensos para tu gato</h1>
        <Carousel cards={cards} />
    </div>
   );
};

export default ListFoodCat;
