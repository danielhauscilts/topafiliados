<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\UploadedFileInterface as UploadedFile;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// SDK do Mercado Pago
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$mysql_conn = $app->getContainer();

$_ENV = 'production'; // Change to 'production' in production environment

if ($_ENV == 'development') {
    // DB Local
    $mysql_conn['host'] = '127.0.0.1:3306';
    $mysql_conn['user'] = 'root';
    $mysql_conn['pass'] = 'D@n259083';
    $mysql_conn['db'] = 'top_afiliado';
} else {
    // DB Hostgator
    $mysql_conn['host'] = 'sh00168.hostgator.com.br:3306';
    $mysql_conn['user'] = 'dan43856_admin';
    $mysql_conn['pass'] = 'D@n259083';
    $mysql_conn['db'] = 'dan43856_afilipro';
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

function sendSMS($number, $password, $context = null) {
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
        "msg" => ($context == 'senha' ? "Olá Afiliado, sua nova senha é ":"Olá Afiliado - Este é seu código ") . $password,
        "refer" => "Top Afiliados"
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

    // if (validateToken($request->getHeaders(), $conn) === "invalid") {
    //     $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
    //     return $response->withStatus(401);
    // }

    $valid = mysqli_query($conn, 'SELECT * FROM users WHERE mail = "'.$args['mail'].'" or phone = "'.$args['phone'].'"');

    if (mysqli_num_rows($valid) > 0) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "User registred"], true) );
        return $response->withStatus(409);
    }

    mysqli_query($conn, 'INSERT INTO users (name, phone, type, date, mail, password) VALUES ( "'.$args['name'].'","'.$args['phone'].'","p","'.date('Y-m-d').'", "'.$args['mail'].'", "'.md5($args['password']).'" )');

    $response->getBody()->write(json_encode(["success" => "User registred"], true) );
    return $response;

});

// Atualiza senha
$app->put('/api/password', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    // if (validateToken($request->getHeaders(), $conn) === "invalid") {
    //     $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
    //     return $response->withStatus(401);
    // }

    $newPass = rand(100000, 999999);

    $user = mysqli_query($conn, 'SELECT * FROM users WHERE mail = "'.$args['mail'].'"');

    
    if (mysqli_num_rows($user) < 1) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "User not registered"], true) );
        return $response->withStatus(409);
    }

    $valid = mysqli_query($conn, 'UPDATE users SET password = "' . md5($newPass) . '" WHERE mail = "'.$args['mail'].'"');

    $phone = '';

    while($row = mysqli_fetch_assoc($user)) {
        $phone = $row['phone'];
    }

    if ($phone !== '' && sendSMS($phone, $newPass, 'senha')) {
        $response->getBody()->write(json_encode(["success" => "Password Updated"], true) );
        return $response;
    }
    
    $response->getBody()->write(json_encode(["error" => "Fail to send SMS", "phone" => $user['phone']], true) );
    return $response->withStatus(400);

});

// Realiza o Login
$app->post('/api/login', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $valid = mysqli_query($conn, 'SELECT * FROM users WHERE mail = "'.$args['mail'].'" and password = "'.md5($args['password']).'"');

    if (mysqli_num_rows($valid) == 0) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "User not found"], true) );
        return $response->withStatus(401);
    }

    $user = array();

    if (mysqli_num_rows($valid) > 0) {
        while($row = mysqli_fetch_assoc($valid)) {
            $user = $row;
        }
    }

    $otp = rand(100000, 999999);

    mysqli_query($conn, 'UPDATE users SET otp = "'.$otp.'" WHERE mail = "'.$args['mail'].'"');

    $sendSMS = sendSMS($user['phone'], $otp);

    if ($sendSMS) {
        $response->getBody()->write(json_encode(["message" => "Login endpoint", "phone" => $user['phone']], true) );
        return $response;
    }

    $response->getBody()->write(json_encode(["error" => "Fail to send SMS", "phone" => $user['phone']], true) );
    return $response->withStatus(400);

});

//Valida o OTP
$app->post('/api/validate-otp', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $user = mysqli_query($conn, 'SELECT * FROM users WHERE mail = "'.$args['mail'].'" and otp = "'.$args['otp'].'"');

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
        'sub' => $args['mail'], // Subject (e.g., user ID or username)
        // Add any other data you want to include in the token
    ];

    $token = JWT::encode($payload, $secretKey, $algorithm);

    mysqli_query($conn, 'UPDATE users SET token = "'.$token.'" WHERE mail = "'.$args['mail'].'"');

    mysqli_close($conn);

    while($row = $user->fetch_assoc()) {    
        $userData = $row;
        unset($userData['token']);
        unset($userData['otp']);
    }

    $response->getBody()->write(json_encode(["message" => "Login otp", "user" => $userData, "token" => $token], true) );
    return $response;
});

// CATEGORIAS

$app->get('/api/categorias', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $data = mysqli_query($conn, 'SELECT * FROM categorias');

    mysqli_close($conn);

    if ( mysqli_num_rows($data) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not categories listed']));
        return $response->withStatus(302);
    }

    $categorias = array();

    while($row = mysqli_fetch_assoc($data)) {
        $categorias[] = $row;
    }

    $response->getBody()->write(json_encode($categorias));
    return $response->withStatus(200);
});

// Cadastra categoria
$app->post('/api/categoria', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    // if (validateToken($request->getHeaders(), $conn) === "invalid") {
    //     $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
    //     return $response->withStatus(401);
    // }

    mysqli_query($conn, 'INSERT INTO categorias (categoria) VALUES ( "'.$args['categoria'].'")');

    $response->getBody()->write(json_encode(["success" => "Category registred"], true) );
    return $response;

});

// PRODUTOS

$app->get('/api/produtos', function (Request $request, Response $response, $args) use ($mysql_conn) {

    
    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);
    
    $queryParams = $request->getQueryParams();
    $filter = '';
    $terms = $queryParams['terms'] ?? null;
    $today = $queryParams['today'] ?? null;

    if ($terms || $today) {
        $filter = 'WHERE ' . ($terms ? 'titulo LIKE "%'. $terms .'%"': '') . ($terms && $today ? ' AND ': '') . ($today ? 'data = "'. date('Y-m-d') .'"': '');
    }

    $data = mysqli_query($conn, 'SELECT * FROM produtos ' .$filter. ' ORDER BY data DESC, id DESC');

    mysqli_close($conn);

    if ( mysqli_num_rows($data) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not products listed']));
        return $response->withStatus(302);
    }

    $produtos = array();

    while($row = mysqli_fetch_assoc($data)) {
        $produtos[] = $row;
    }

    $response->getBody()->write(json_encode($produtos));
    return $response->withStatus(200);
});

$app->get('/api/produtos/{categoria}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $queryParams = $request->getQueryParams();

    $filter = '';
    $terms = $queryParams['terms'] ?? null;
    $today = $queryParams['today'] ?? null;

    if ($terms || $today) {
        $filter = ' AND ' . ($terms ? 'p.titulo LIKE "%'. $terms .'%"': '') . ($terms && $today ? ' AND ': '') . ($today ? 'p.data = "'. date('Y-m-d') .'"': '');
    }

    $data = mysqli_query($conn, 'SELECT p.id, p.video, p.titulo, p.capa, p.link, p.texto, p.data FROM produtos p INNER JOIN produtos_categorias c ON p.id = c.id_produto WHERE c.id_categoria = "'.$args['categoria'].'" ' . $filter . ' ORDER BY p.data DESC, p.id DESC ');

    mysqli_close($conn);

    if ( mysqli_num_rows($data) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not products listed']));
        return $response->withStatus(302);
    }

    $produtos = array();

    while($row = mysqli_fetch_assoc($data)) {
        $produtos[] = $row;
    }

    $response->getBody()->write(json_encode($produtos));
    return $response->withStatus(200);
});

// Cadastra produto
$app->post('/api/produto', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();
    $data = json_decode($data["produto"], true);
    $uploadedFiles = $request->getUploadedFiles();

    $video = $uploadedFiles['video'];

    if ($video->getError() === UPLOAD_ERR_OK) {
        $filename = $video->getClientFilename();
        $pathVideo = 'video/' . $filename;
        $video->moveTo('./' . $pathVideo);
    } else {
        $response->getBody()->write(json_encode(["error" => "Fail to upload or unsupported extension"], true) );
        return $response->withStatus(500);
    }

    $capa = $uploadedFiles['capa'];

    if ($capa->getError() === UPLOAD_ERR_OK) {
        $filename = $capa->getClientFilename();
        $pathCapa = 'capa/' . $filename;
        $capa->moveTo('./' . $pathCapa);
    } else {
        $response->getBody()->write(json_encode(["error" => "Fail to upload or unsupported extension"], true) );
        return $response->withStatus(500);
    }

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    // if (validateToken($request->getHeaders(), $conn) === "invalid") {
    //     $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
    //     return $response->withStatus(401);
    // }

    mysqli_query($conn, 'INSERT INTO produtos (
        titulo, 
        video, 
        capa, 
        link, 
        data
        texto,
        ) VALUES ( 
        "'.$data['titulo'].'",
        "'.$pathVideo.'",
        "'.$pathCapa.'",
        "'.$data['link'].'",
        "'.date('Y-m-d').'",
        "'.$data['texto'].'")');
    
    $id_product = mysqli_insert_id($conn);

    mysqli_query($conn, 'INSERT INTO produtos_categorias (id_produto, id_categoria) VALUES ("'.$id_product.'", "'.$data['categoria'].'")');

    $response->getBody()->write(json_encode(["success" => "Product registred"], true) );
    return $response;

});

// Gera ID de pagamento
$app->post('/api/pagamento', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    MercadoPagoConfig::setAccessToken("APP_USR-8937348424652122-010215-cfe65c14df58950d87717d56ab7a4831-3107446168");

    $client = new PreferenceClient();
    $preference = $client->create([
    "items"=> array(
            array(
            "title" => "AfiliPRO",
            "quantity" => 1,
            "unit_price" => 20
            )
        ),
        "back_urls"=> array(
            "success" => "https://afiliapro.com.br/pagamento/sucesso",
            "failure" => "https://afiliapro.com.br/pagamento/falha",
            "pending" => "https://afiliapro.com.br/pagamento/pendente"
        ),
        "payment_methods" => array(
            "installments" => 1
        )
    ]);

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $date = new DateTime();
    $endDate = $date->modify("+30 days")->format('Y-m-d');

    mysqli_query($conn, 'INSERT INTO pagamentos (
        id_user, 
        id_pagamento, 
        status, 
        data, 
        end_date
        ) VALUES ( 
        '.$data['user'].',
        "'.$preference->id.'",
        0,
        "'.date('Y-m-d').'",
        "'.$endDate.'")');

    $response->getBody()->write(json_encode(["id" => $preference->id, "user"=>$data['user'], "data"=>date('Y-m-d'), "endDate"=>$endDate], true));
    return $response;

});

// Notificações de pagamento
$app->post('/api/notify', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    mysqli_query($conn, 'INSERT INTO notificacoes (
        id_transaction,
        type,
        date_created,
        user_id,
        action,
        id_payment
        ) VALUES ( 
        "'.$data['id'].', "
        "'.$data['date_created'].', "
        "'.$data['user_id'].', "
        "'.$data['action'].', "     
        "'.$data['data']['id'].'")');

    $response->getBody()->write(json_encode(["id" => $preference->id, "user"=>$data['user'], "data"=>date('Y-m-d'), "endDate"=>$endDate], true));
    return $response;

});

// Pagamento sucesso
$app->put('/api/pagamento', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $pagamentos = mysqli_query($conn, 'SELECT * FROM pagamentos WHERE id_pagamento = "'.$data['id_pagamento'].'"');
    $pagamento = '';

    if(mysqli_num_rows($pagamentos) > 0) {
        while($row = mysqli_fetch_assoc($pagamentos)) {
            $pagamento = $row;
        }
        mysqli_query($conn, 'UPDATE pagamentos SET status="1" WHERE id_pagamento = "'.$data['id_pagamento'].'"');
        mysqli_query($conn, 'UPDATE users SET type="u" WHERE id = "'.$pagamento['id_user'].'"');
        
        $response->getBody()->write(json_encode(["success" => true], true));
        return $response;
    }

    $response->getBody()->write(json_encode(["error" => "Fail to update payment"], true) );
    return $response->withStatus(500);
});

// Pagamentos
$app->get('/api/pagamentos/{user_id}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $pagamentos = mysqli_query($conn, 'SELECT * FROM pagamentos WHERE id_user = "'.$args['user_id'].'" and status != "0"');
    $pagamento = array();

    if(mysqli_num_rows($pagamentos) > 0) {
        while($row = mysqli_fetch_assoc($pagamentos)) {
            $pagamento[] = $row;
        }
        
        $response->getBody()->write(json_encode($pagamento, true));
        return $response;
    }

    $response->getBody()->write(json_encode(["error" => "No payments"], true) );
    return $response->withStatus(302);
});

$app->run();