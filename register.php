<?php
require 'vendor/autoload.php';

use MongoDB\Client;

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos']);
    exit;
}

$nombre = $data['nombre'];
$apellidos = $data['apellidos'];
$correo = $data['correo'];
$contrasena = $data['contrasena'];
$cesta = $data['cesta'];

try {
    $client = new Client('mongodb+srv://bfanvei:Lolitofernandez10@cluster0.3swo1.mongodb.net/?retryWrites=true&w=majority');
    $collection = $client->ecolivery->usuarios;

    $existing = $collection->findOne(['correo' => $correo]);

    if ($existing) {
        http_response_code(409);
        echo json_encode(['error' => 'El correo ya está registrado']);
        exit;
    }

    $collection->insertOne([
        'nombre' => $nombre,
        'apellidos' => $apellidos,
        'correo' => $correo,
        'contrasena' => $contrasena,
        'cesta' => $cesta
    ]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error del servidor: ' . $e->getMessage()]);
}
