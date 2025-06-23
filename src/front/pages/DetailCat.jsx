import logo from "../assets/img/logo.jpeg";

export const DetailCat = () => {
    return (
        <div className="container" style={{ height : 600}} >
             <div className="container">
            <div>
                <img src={logo} className="rounded float-start" alt="Image" style={{ width: 400}} />
            </div>
            <div className="text-center  text m-4 my-4">
                <h1 className='fw-bolder'>Cat</h1>
                <hr className="my-4"/>
                <p className="text-justify text fw-semibold">historia del gatito</p>
                <hr className="my-4"/>
                <p className="text-justify text fw-semibold">Edad:</p>
                <p className="text-justify text fw-semibold">Raza:</p>
                <p className="text-justify text fw-semibold">Castración:</p>
                <p className="text-justify text fw-semibold">Personalidad</p>
            </div>
            </div>
        </div>
    )
}