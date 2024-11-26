import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalEditProduct from "../ModalEditProduct";

const Catalog = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = "http://localhost/products/api.php";
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

  const getAllProducts = async () => {
    const res = await axios.get(`${apiUrl}/productos`, config);
    console.log(res);
    setData(res.data);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="p-4">
        <Link to={"/registrar-producto"}>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Agregar producto</button>
        </Link>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data.map((item, key) => {
            return <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={key}>
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.id}</h3>
                <h2 className="text-white title-font text-lg font-medium">{item.nombre}</h2>
                <p className="mt-1">{item.precio}</p>
              </div>
              <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => setShowModal(true)}>Editar</button>
            </div>
          })
          };

        </div>
      </div>
        { showModal && <ModalEditProduct setShowModal={setShowModal} /> }
    </section>
  );
};

export default Catalog;