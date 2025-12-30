<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\UploadedFileInterface as UploadedFile;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$mysql_conn = $app->getContainer();

$_ENV = 'development'; // Change to 'production' in production environment

if ($_ENV == 'development') {
    // DB Local
    $mysql_conn['host'] = '127.0.0.1:3306';
    $mysql_conn['user'] = 'root';
    $mysql_conn['pass'] = 'D@n259083';
    $mysql_conn['db'] = 'top_afiliado';
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
        "msg" => "Olá Afiliado - Este é seu senha " . $password,
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

    mysqli_query($conn, 'INSERT INTO users (name, phone, type, date, mail, password) VALUES ( "'.$args['name'].'","'.$args['phone'].'","u","'.date('Y-m-d').'", "'.$args['mail'].'", "'.md5($args['password']).'" )');

    $response->getBody()->write(json_encode(["success" => "User registred"], true) );
    return $response;

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
        'sub' => $args['mail    '], // Subject (e.g., user ID or username)
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

$app->run();