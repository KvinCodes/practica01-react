import axios from "axios";
import { useEffect, useState } from "react";

const ModalEditProduct = (props) => {

    const apiUrl = "http://localhost/products/api.php";
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    };

    const dataProductInit = {
        nombre: "",
        descripcion: "",
        precio: 0,
    };

    const [dataProduct, setDataProduct] = useState(dataProductInit);

    const getProduct = async () => {
        const response = await axios.get(`${apiUrl}/productos/${props.id}`, config);
        console.log(response)
        setDataProduct({
            nombre: response.data.nombre,
            descripcion: response.data.descripcion,
            precio: response.data.precio
        });
    }

    useEffect(() => {
        getProduct();
    }, []);

    const handleChange = (e) => {
        //Actualizando el valor segun propiedad y valor que proviende del input
        setDataProduct({...dataProduct, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`${apiUrl}/productos/${props.id}`, dataProduct, config)
        .then((e) => {
            console.log(e);
        }).catch((error) => {
            console.log(e);
        })
        props.setShowModal(false);
        props.getAllProducts()
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-1/2 my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Editar producto
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => props.setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="flex items-center justify-center w-full dark:bg-gray-950">
                            <section className="text-gray-400 bg-gray-900 body-font relative">
                                <div className="container px-1 py-2 mx-auto">
                                    <div className="flex flex-col text-center w-full mb-12">
                                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Agregar producto</h1>
                                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Ingresa a continuacion tus datos para agregar un producto</p>
                                    </div>
                                    <form className="lg:w-1/2 md:w-2/3 mx-auto" onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap -m-2">
                                            <div className="p-2 w-1/2">
                                                <div className="relative">
                                                    <label htmlFor="name" className="leading-7 text-sm text-gray-400">Nombre</label>
                                                    <input type="text" id="name" name="name" value={dataProduct.nombre} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => {
                                                        setDataProduct({
                                                            ...dataProduct,
                                                            nombre: e.target.value
                                                        })
                                                    }} placeholder="Ingresar el nombre del producto" required />
                                                </div>
                                            </div>
                                            <div className="p-2 w-1/2">
                                                <div className="relative">
                                                    <label htmlFor="email" className="leading-7 text-sm text-gray-400">Precio</label>
                                                    <input type="number" id="price" name="price" value={dataProduct.precio} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => {
                                                        setDataProduct({
                                                            ...dataProduct,
                                                            precio: e.target.value
                                                        })
                                                    }} placeholder="00.00" required />  
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label htmlFor="message" className="leading-7 text-sm text-gray-400">Descripción</label>
                                                    <textarea id="description" name="description" value={dataProduct.descripcion} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" onChange={(e) => {
                                                        setDataProduct({
                                                            ...dataProduct,
                                                            descripcion: e.target.value
                                                        })
                                                    }} placeholder="Ingresar la descripción del producto" required />
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Agregar producto</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default ModalEditProduct;