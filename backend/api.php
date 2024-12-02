<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');


class API {
    private $db;

    function __construct() {
        // Conexión a la base de datos usando PDO
        $dsn = 'mysql:host=localhost;dbname=productosdb';
        $username = 'root';
        $password = '';

        try {
            $this->db = new PDO($dsn, $username, $password);
            $this->db->exec("set names utf8");
        } catch (PDOException $e) {
            die(json_encode(array('error' => 'Error de conexión: ' . $e->getMessage())));
        }
    }

    function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

        switch ($request[0]) {
            case 'productos':
                if ($method == 'GET') {
                    if (isset($request[1])) {
                        $id = $request[1];
                        $this->getProducto($id);
                    } else {
                        $this->getAllProductos();
                    }
                } elseif ($method == 'POST') {
                    // Obtener datos del cuerpo de la solicitud en formato JSON
                    $data = json_decode(file_get_contents("php://input"), true);
                    $this->createProducto($data);
                } elseif ($method == 'PUT' && isset($request[1])) {
                    // Lógica para actualizar un producto existente
                    $id = $request[1];
                    $data = json_decode(file_get_contents("php://input"), true);
                    $this->updateProducto($id, $data); // Suponiendo que los datos para actualizar un producto se envían por PUT
                } elseif ($method == 'DELETE' && isset($request[1])) {
                    // Lógica para eliminar un producto
                    $id = $request[1];
                    $this->deleteProducto($id);
                } else {
                    // Método no permitido
                    http_response_code(405); // Método no permitido
                    echo json_encode(array('error' => 'Método no permitido'));
                }
                break;
            default:
                // Ruta no encontrada
                http_response_code(404); // No encontrado
                echo json_encode(array('error' => 'Ruta no encontrada'));
        }
    }

    function getAllProductos() {
        $query = $this->db->prepare("SELECT * FROM productos WHERE deleted = 1");
        $query->execute();
        $productos = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($productos);
    }

    function getProducto($id) {
        $query = $this->db->prepare("SELECT * FROM productos WHERE id = :id AND deleted = 1");
        $query->bindParam(':id', $id);
        $query->execute();
        $producto = $query->fetch(PDO::FETCH_ASSOC);
        if ($producto) {
            http_response_code(200); //Peticion exitosa
            echo json_encode($producto);
        } else {
            http_response_code(404); // No encontrado
            echo json_encode(array('error' => 'El producto no existe'));
        }
    }

    function createProducto($data) {
        try {
            $query = $this->db->prepare("INSERT INTO productos (nombre, descripcion, precio) VALUES (:nombre, :descripcion, :precio)");
            $query->bindParam(':nombre', $data['name']);
            $query->bindParam(':descripcion', $data['description']);
            $query->bindParam(':precio', $data['price']);
            $success = $query->execute();
            if ($success) {
                $producto_id = $this->db->lastInsertId();
                $query = $this->db->prepare("SELECT * FROM productos WHERE id = :id AND deleted = 1");
                $query->bindParam(':id', $producto_id);
                $query->execute();
                $producto = $query->fetch(PDO::FETCH_ASSOC);
                http_response_code(201); // Creado
                echo json_encode(
                    array(
                        'message' => 'Producto guardado',
                        'data' => $producto
                    )
                );
            }
        } catch (\Throwable $error) {
            http_response_code(500); // Error interno del servidor
            echo json_encode(array('error' => 'No se pudo crear el producto '.$error->GetMessage()));
        }
    }

    function updateProducto($id, $data) {
        try {
            $query = $this->db->prepare("UPDATE productos SET nombre = :nombre, descripcion = :descripcion, precio = :precio WHERE id = :id");
            $query->bindParam(':id', $id);
            $query->bindParam(':nombre', $data['nombre']);
            $query->bindParam(':descripcion', $data['descripcion']);
            $query->bindParam(':precio', $data['precio']);
            $success = $query->execute();
            if ($success) {
                $query = $this->db->prepare("SELECT * FROM productos WHERE id = :id AND deleted = 1");
                $query->bindParam(':id', $id);
                $query->execute();
                $producto = $query->fetch(PDO::FETCH_ASSOC);
                http_response_code(201); // Actualizado
                echo json_encode(
                    array(
                        'message' => 'Producto actualizado',
                        'data' => $producto 
                    )
                );
            }
        } catch (\Throwable $th) {
            http_response_code(500); // Error interno del servidor
            echo json_encode(array('error' => 'No se pudo actualizar el producto '.$error->GetMessage()));
        }
        
    }

    function deleteProducto($id) {
        $query = $this->db->prepare("UPDATE productos SET deleted = 3 WHERE id = :id");
        $query->bindParam(':id', $id);
        $success = $query->execute();
        if ($success) {
            $query = $this->db->prepare("SELECT id, nombre, descripcion, precio FROM productos WHERE id = :id");
            $query->bindParam(':id', $id);
            $query->execute();
            $producto = $query->fetch(PDO::FETCH_ASSOC);
            http_response_code(201); // Eliminado
            echo json_encode(
                array(
                    'message' => 'Producto eliminado',
                    'data' => $producto 
                )
            );
        }
    }
}

// Instanciar la clase API
$api = new API();
$api->handleRequest();
?>
