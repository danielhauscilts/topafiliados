<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\UploadedFileInterface as UploadedFile;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->setBasePath('/resbellavista'); 

$mysql_conn = $app->getContainer();

$_ENV = 'production'; // Change to 'production' in production environment

if ($_ENV == 'development') {
    // DB Local
    $mysql_conn['host'] = '127.0.0.1:3306';
    $mysql_conn['user'] = 'root';
    $mysql_conn['pass'] = '';
    $mysql_conn['db'] = 'resbellavista';
} else {
    // DB Hostgator
    $mysql_conn['host'] = 'br676.hostgator.com.br:3306';
    $mysql_conn['user'] = 'dan87952_admin';
    $mysql_conn['pass'] = 'D@n259083';
    $mysql_conn['db'] = 'dan87952_resbellavista';
}

function validateToken($headers, $conn) {
    $authHeader = $headers['Authorization'][0];
    list($type, $token) = explode(" ", $authHeader, 2);

    if ($type !== 'Bearer') {
        // Haven´t token
        return 'Invalid';
    }

    $secretKey = '170918170918';

    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

    if (!$decoded) {
        return 'Invalid';
    }

    $expirationTime = $decoded->exp;

    $currentTime = time();

    if ($currentTime > $expirationTime) {
        // Token is expired
        return 'Invalid';
    }

    $valid = mysqli_query($conn, 'SELECT token FROM users WHERE token = "'.$token.'"');

    if (mysqli_num_rows($valid) == 0) {
        mysqli_close($conn);
        return 'Invalid';
    }

    return 'valid';
}

function sendSMS($number, $password) {
    $ch = curl_init();
    if ($ch === false) {
        // Handle the error, e.g., log it or display a message
        die('Failed to initialize cURL session.');
    }
    curl_setopt($ch, CURLOPT_URL, 'https://api.smsdev.com.br/v1/send');
    curl_setopt($ch, CURLOPT_POST, true);
    $data = array(
        'key' => '96Q8OL54VT81RXUSUNO6ASBP40ZIUODP9EAR9G6YS70K7XXLM95AZHAD6PRI9IT57IT0D1RNVOQHP9BR94TT5O3G31AIZ030QTLKZO8HXWSOQM5GTKCE7XLBK3JC2VNL', 
        'type' => 9,
        "number" => $number,
        "msg" => "Res Bella Vista - Esta é a sua senha " . $password,
        "refer" => "Res Bella Vista"
    );
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the transfer as a string
    $apiResponse = curl_exec($ch);
    curl_close($ch);

    if ($apiResponse === false) {
        return false;
    }

    return true;
}

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
});

$app->addBodyParsingMiddleware();

$app->get('/api/signout', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $authHeader = $request->getHeaders()['Authorization'][0];
    list($type, $token) = explode(" ", $authHeader, 2);

    mysqli_query($conn, 'UPDATE users SET token = "", otp = "" WHERE token = "' . $token . '"');

    mysqli_close($conn);

    $response->getBody()->write(json_encode(['success'=>'Valid token']));
    return $response->withStatus(200);
});

$app->get('/api/validate-token', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $valid = validateToken($request->getHeaders(), $conn) === 'invalid' ? false : true;

    if ( $valid ) {
        $response->getBody()->write(json_encode(['success'=>'Valid token']));
        return $response->withStatus(200);
    }

    $response->getBody()->write(json_encode(['error'=>'Invalid token']));
    return $response->withStatus(401);
});

$app->get('/api/users', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $userData = mysqli_query($conn, 'SELECT Users.id, Users.name, Users.phone, Users.type, Imobiliarias.nome as imobiliaria FROM users as Users 
	INNER JOIN imobiliaria as Imobiliarias 
    ON Users.id_imobiliaria = Imobiliarias.id 
    WHERE Users.type != "clt"');

    mysqli_close($conn);

    if ( mysqli_num_rows($userData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not users listed']));
        return $response->withStatus(302);
    }

    $users = array();

    while($row = mysqli_fetch_assoc($userData)) {
        $users[] = $row;
    }

    $response->getBody()->write(json_encode($users));
    return $response->withStatus(200);
});

$app->get('/api/clients', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $userData = mysqli_query($conn, 'SELECT * FROM users WHERE type = "clt"');

    mysqli_close($conn);

    if ( mysqli_num_rows($userData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not users listed']));
        return $response->withStatus(302);
    }

    $users = array();

    while($row = mysqli_fetch_assoc($userData)) {
        $users[] = $row;
    }

    $response->getBody()->write(json_encode($users));
    return $response->withStatus(200);
});

$app->get('/api/admin', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $userData = mysqli_query($conn, 'SELECT * FROM users WHERE type = "adm"');

    mysqli_close($conn);

    if ( mysqli_num_rows($userData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not users listed']));
        return $response->withStatus(302);
    }

    $users = array();

    while($row = mysqli_fetch_assoc($userData)) {
        $users[] = $row;
    }

    $response->getBody()->write(json_encode($users));
    return $response->withStatus(200);
});

$app->delete('/api/user/{id}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    mysqli_query($conn, 'DELETE FROM users WHERE id = "'.$args['id'].'"');

    mysqli_close($conn);

    $response->getBody()->write(json_encode(["success"=>"true"]));
    return $response->withStatus(200);
});

// Cadastra usuarios
$app->post('/api/user', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    if (validateToken($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    $valid = mysqli_query($conn, 'SELECT * FROM users WHERE phone = "'.$args['phone'].'"');

    if (mysqli_num_rows($valid) > 0) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "User exist"], true) );
        return $response->withStatus(409);
    }

    mysqli_query($conn, 'INSERT INTO users (name, phone, type, date, id_imobiliaria) VALUES ( "'.$args['name'].'","'.$args['phone'].'","'.$args['type'].'","'.date('Y-m-d').'", "'.$args['imobiliaria'].'" )');

    $response->getBody()->write(json_encode(["success" => "User registred"], true) );
    return $response;

});

// Cadastra Unidade
$app->post('/api/unit', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    if (validateToken($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    mysqli_query($conn, 'INSERT INTO compras (unidade, id_cliente, id_corretor, data) VALUES ( "'.$args['unit'].'","'.$args['id_client'].'","'.$args['id_corretor'].'","'.date('Y-m-d').'")');

    $response->getBody()->write(json_encode(["success" => "Unit registred"], true) );
    return $response;

});

// Cadastra boleto
$app->post('/api/boleto', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();
    $data = json_decode($data["boleto"], true);
    $uploadedFiles = $request->getUploadedFiles();

    $file = $uploadedFiles['file'];

    if ($file->getError() === UPLOAD_ERR_OK && $file->getClientMediaType() === 'application/pdf') {
        $filename = $file->getClientFilename();
        $pathFile = 'boletos/' . $data['unidade'] . '_' . $data['data'] . '_' . $filename;
        $file->moveTo('./' . $pathFile);
    } else {
        $response->getBody()->write(json_encode(["error" => "Fail to upload or unsupported extension"], true) );
        return $response->withStatus(500);
    }

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    if (validateToken($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    mysqli_query($conn, 'INSERT INTO financeiro (id_compra, data, status, boleto) VALUES ( "'.$data['unidade'].'","'.$data['data'].'","pendente","'.$pathFile.'" )');

    $response->getBody()->write('Sucesso');
    return $response->withStatus(200);

});

// Cadastra boleto
$app->put('/api/boleto/{id}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    if (validateToken($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    mysqli_query($conn, 'UPDATE financeiro SET status = "'.$data['status'].'" WHERE id = "'.$args['id'].'"');

    $response->getBody()->write(json_encode(["success" => "Boleto registred"], true) );
    return $response;

});

// Realiza o Login
$app->post('/api/login', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $valid = mysqli_query($conn, 'SELECT * FROM users WHERE phone = "'.$args['phone'].'"');

    if (mysqli_num_rows($valid) == 0) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "User not found"], true) );
        return $response->withStatus(401);
    }

    $otp = rand(100000, 999999);

    mysqli_query($conn, 'UPDATE users SET otp = "'.$otp.'" WHERE phone = "'.$args['phone'].'"');

    $phone = $args['phone'];
    $validatePhone = preg_match('/^55\d{2}9\d{8}$/', $phone);
    $sendSMS = $validatePhone && sendSMS($phone, $otp);

    print('success');

    if (isset($phone) && $validatePhone && $sendSMS) {
        $response->getBody()->write(json_encode(["message" => "Login endpoint", "phone" => $phone], true) );
        return $response;
    }

    $response->getBody()->write(json_encode(["error" => "Fail to send SMS", "phone" => $phone], true) );
    return $response->withStatus(400);

});

//Valida o OTP
$app->post('/api/validate-otp', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $user = mysqli_query($conn, 'SELECT * FROM users WHERE phone = "'.$args['phone'].'" and otp = "'.$args['otp'].'"');

    if (mysqli_num_rows($user) == 0) {
        $response->getBody()->write(json_encode(["error" => "User not found"], true) );
        return $response->withStatus(401);
    }

    $secretKey = '170918170918'; // **Important: Use a strong, unique key and never hardcode in production**
    $algorithm = 'HS256';

    $now = new DateTimeImmutable();
    $future = $now->modify('+12 hour'); // Token valid for 1 hour

    $payload = [
        'iat' => $now->getTimestamp(), // Issued at
        'exp' => $future->getTimestamp(), // Expiration time
        'sub' => $args['phone'], // Subject (e.g., user ID or username)
        // Add any other data you want to include in the token
    ];

    $token = JWT::encode($payload, $secretKey, $algorithm);

    mysqli_query($conn, 'UPDATE users SET token = "'.$token.'" WHERE phone = "'.$args['phone'].'"');

    mysqli_close($conn);

    while($row = $user->fetch_assoc()) {
        $userData = $row;
        unset($userData['token']);
        unset($userData['otp']);
    }

    $response->getBody()->write(json_encode(["message" => "Login otp", "user" => $userData, "token" => $token], true) );
    return $response;
});

$app->get('/api/client/{id_client}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $userData = mysqli_query($conn, 'SELECT * FROM users WHERE id = "'.$args['id_client'].'"');
    
    
    if ( mysqli_num_rows($userData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not clients listed']));
        return $response->withStatus(404);
    }
    
    $unitsData = mysqli_query($conn, 'SELECT compras.id, compras.unidade, (SELECT users.name FROM users WHERE users.id = compras.id_corretor) as corretor FROM compras WHERE compras.id_cliente = "'.$args['id_client'].'"');
    
    mysqli_close($conn);

    $client = '';
    $units = array();

    while($unit = mysqli_fetch_assoc($unitsData)) {
        $units[] = $unit;
    }
    
    while($row = mysqli_fetch_assoc($userData)) {
        $client = $row;
        $client['unidades'] = $units;
    }

    $response->getBody()->write(json_encode($client));
    return $response->withStatus(200);
});

$app->get('/api/units', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $unitData = mysqli_query($conn, 'SELECT unidade.unidade, unidade.id, 
            (SELECT users.phone FROM users WHERE users.id = unidade.id_cliente) as cliente_telefone, 
            (SELECT users.name FROM users WHERE users.id = unidade.id_cliente) as cliente_nome, 
            (SELECT users.id FROM users WHERE users.id = unidade.id_cliente) as cliente_id, 
            (SELECT users.phone FROM users WHERE users.id = unidade.id_corretor) as corretor_telefone, 
            (SELECT users.name FROM users WHERE users.id = unidade.id_corretor) as corretor_nome,
            (SELECT users.id FROM users WHERE users.id = unidade.id_corretor) as corretor_id,
            (SELECT imobiliaria.nome FROM imobiliaria
                INNER JOIN users ON users.id_imobiliaria WHERE users.id = unidade.id_corretor AND imobiliaria.id = users.id_imobiliaria) as corretor_imobiliaria 
        FROM compras as unidade');
    
    
    if ( mysqli_num_rows($unitData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not clients listed']));
        return $response->withStatus(404);
    }
    
    mysqli_close($conn);

    $units = array();
    
    while($row = mysqli_fetch_assoc($unitData)) {
        $units[] = $row;
    }

    $response->getBody()->write(json_encode($units));
    return $response->withStatus(200);
});

$app->get('/api/unit/{id_unidade}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $unitData = mysqli_query($conn, 'SELECT unidade.unidade, unidade.id, 
            (SELECT users.phone FROM users WHERE users.id = unidade.id_cliente) as cliente_telefone, 
            (SELECT users.name FROM users WHERE users.id = unidade.id_cliente) as cliente_nome, 
            (SELECT users.phone FROM users WHERE users.id = unidade.id_corretor) as corretor_telefone, 
            (SELECT users.name FROM users WHERE users.id = unidade.id_corretor) as corretor_nome,
            (SELECT imobiliaria.nome FROM imobiliaria
                INNER JOIN users ON users.id_imobiliaria WHERE users.id = unidade.id_corretor AND imobiliaria.id = users.id_imobiliaria) as corretor_imobiliaria 
        FROM compras as unidade WHERE unidade.id = "'.$args['id_unidade'].'"');
    
    
    if ( mysqli_num_rows($unitData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not clients listed']));
        return $response->withStatus(404);
    }
    
    $financialData = mysqli_query($conn, 'SELECT * FROM financeiro WHERE id_compra = "'.$args['id_unidade'].'"');
    
    mysqli_close($conn);

    $unit = '';
    $pays = array();

    while($pay = mysqli_fetch_assoc($financialData)) {
        $pays[] = $pay;
    }
    
    while($row = mysqli_fetch_assoc($unitData)) {
        $unit = $row;
        $unit['boletos'] = $pays;
    }

    $response->getBody()->write(json_encode($unit));
    return $response->withStatus(200);
});

$app->get('/api/corretor/{id_corretor}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $userData = mysqli_query($conn, 'SELECT users.name, users.phone, users.id, imobiliaria.nome as imobiliaria FROM users INNER JOIN imobiliaria ON users.id_imobiliaria = imobiliaria.id WHERE users.id = "'.$args['id_corretor'].'"');
    
    
    if ( mysqli_num_rows($userData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not clients listed']));
        return $response->withStatus(404);
    }
    
    $clientesData = mysqli_query($conn, 'SELECT users.name, users.id, users.phone FROM corretagem INNER JOIN users ON users.id = corretagem.id_cliente WHERE corretagem.id_corretor = "'.$args['id_corretor'].'"');
    
    mysqli_close($conn);

    $corretor = '';
    $clientes = array();

    while($cliente = mysqli_fetch_assoc($clientesData)) {
        $clientes[] = $cliente;
    }
    
    while($row = mysqli_fetch_assoc($userData)) {
        $corretor = $row;
        $corretor['clientes'] = $clientes;
    }

    $response->getBody()->write(json_encode($corretor));
    return $response->withStatus(200);
});

$app->get('/api/imobiliaria', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $userData = mysqli_query($conn, 'SELECT * FROM imobiliaria');

    mysqli_close($conn);

    if ( mysqli_num_rows($userData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not clients listed']));
        return $response->withStatus(302);
    }

    $clientes = array();

    while($row = mysqli_fetch_assoc($userData)) {
        $imobiliarias[] = $row;
    }

    $response->getBody()->write(json_encode($imobiliarias));
    return $response->withStatus(200);
});

$app->get('/api/imobiliaria/{id}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $userData = mysqli_query($conn, 'SELECT * FROM imobiliaria WHERE id = "'.$args['id'].'"');

    mysqli_close($conn);

    if ( mysqli_num_rows($userData) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not clients listed']));
        return $response->withStatus(302);
    }

    while($row = mysqli_fetch_assoc($userData)) {
        $imobiliaria = $row;
    }

    $response->getBody()->write(json_encode($imobiliaria));
    return $response->withStatus(200);
});

$app->run();