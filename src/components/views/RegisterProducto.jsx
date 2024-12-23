import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrarProducto = () => {

    const navigate = useNavigate();

    const apiUrl = "http://localhost/products/api.php";
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    };

    const dataProductInit = {
        name: "",
        description: "",
        price: 0,
    };

    const [dataProduct, setDataProduct] = useState(dataProductInit);

    const handleChange = (e) => {
        //Actualizando el valor segun propiedad y valor que proviende del input
        setDataProduct({
            ...dataProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(dataProduct);
        console.log(dataProduct);
        await axios.post(`${apiUrl}/productos`, dataProduct, config)
            .then(response => {
                console.log(response);
                navigate("/catalog");
            })
            .catch(err => {
                console.log(err);
            });

    }

    return (
        <section className="text-gray-400 bg-gray-900 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Agregar producto</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Ingresa a continuacion tus datos para agregar un producto</p>
                </div>
                <form className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-400">Nombre</label>
                                <input type="text" id="name" name="name" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange} placeholder="Ingresar el nombre del producto" required />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="price" className="leading-7 text-sm text-gray-400">Precio</label>
                                <input type="number" id="price" name="price" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange} placeholder="00.00" required />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="description" className="leading-7 text-sm text-gray-400">Descripción</label>
                                <textarea id="description" name="description" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" onChange={handleChange} placeholder="Ingresar la descripción del producto" required />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={handleSubmit}>Agregar producto</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RegistrarProducto;