<?php
require 'vendor/autoload.php';

use MongoDB\Client;

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['correo']) || empty($data['contrasena'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos']);
    exit;
}

$correo = $data['correo'];
$contrasena = $data['contrasena'];

try {
    $client = new Client("mongodb+srv://bfanvei:Lolitofernandez10@cluster0.3swo1.mongodb.net/?retryWrites=true&w=majority");
    $collection = $client->ecolivery->usuarios;

    $usuario = $collection->findOne(['correo' => $correo]);

    if (!$usuario) {
        echo json_encode(['success' => false, 'error' => 'El correo no está registrado.']);
        exit;
    }

    if ($usuario['contrasena'] !== $contrasena) {
        echo json_encode(['success' => false, 'error' => 'Contraseña incorrecta.']);
        exit;
    }
    
    echo json_encode([
        'success' => true,
        'correo' => $usuario['correo'],
        'nombre' => $usuario['nombre']
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error del servidor']);
}
