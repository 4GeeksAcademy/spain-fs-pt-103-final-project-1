import { useState,useEffect } from "react"

export const ListFoodCat = () => {

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
     console.log('list product',data);
    return (
        <>
        <h1>Hola</h1>
        <div className="card-container">
            {data.map((item, index) => (
                <div className="card" style={{ width: '18rem' }} key={index}>
                    <img src={item.imagen} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.nombre}</h5>
                        <p className="card-text">
                            {item.precio}
                        </p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
}