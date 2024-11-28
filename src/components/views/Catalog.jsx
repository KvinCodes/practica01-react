import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalEditProduct from "../ModalEditProduct";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import DataTable from "react-data-table-component";

const Catalog = () => {

  const [dataProducts, setDataProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);

  const apiUrl = "http://localhost/products/api.php";
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

  const columns = [
    {
      name: 'id',
      selector: row => row.id,
    },
    {
      name: 'nombre',
      selector: row => row.nombre,
    },
    {
      name: 'Precio',
      selector: row => row.precio,
    },
    {
      name: 'Descripcion',
      selector: row => row.descripcion,
    },
    {
      name: 'Editar',
      selector: row => <div onClick={() => {
        openModalEdit(row.id)
      }} className="cursor-pointer hover:text-indigo-500">Editar</div>,
    },
    {
      name: 'Eliminar',
      selector: row => <div onClick={() => {
        deleteProduct(row.id);
      }}>Eliminar producto <FontAwesomeIcon icon={faTrash} />Eliminar</div>,
    },
  ];

  const getAllProducts = async () => {
    const res = await axios.get(`${apiUrl}/productos`, config);
    console.log(res);
    setDataProducts(res.data);
  }

  const openModalEdit = (id) => {
    setId(id);
    setShowModal(true);
  }

  const deleteProduct = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "advertencia",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${apiUrl}/productos/${id}`, config)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
        getAllProducts();
        Swal.fire({
          title: "Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "con éxito"
        });
      }
    });
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
          {dataProducts.length > 0
            ? dataProducts.map((item, key) => {
              return <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={key}>
                <a className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.id}</h3>
                  <h2 className="text-white title-font text-lg font-medium">{item.nombre}</h2>
                  <p className="mt-1">{item.precio}</p>
                </div>
                <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => {
                  setShowModal(true);
                  setId(item.id);
                }}>Editar producto</button>
                <button className="text-white bg-indigo-500 border-0 py-2 px-8 my-2 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => {
                  deleteProduct(item.id);
                }}>Eliminar producto <FontAwesomeIcon icon={faTrash} /> </button>
              </div>
            })
            :
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">No hay productos</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Agrega algun producto para verlo aqui</p>
            </div>
          };

        </div>
      </div>
      {showModal && <ModalEditProduct id={id} setShowModal={setShowModal} getAllProducts={getAllProducts} />}
      {/* <DataTable */}
      <DataTable>
        columns={columns}
        data={dataProducts}
      </DataTable>
    </section>
  );
};

export default Catalog;