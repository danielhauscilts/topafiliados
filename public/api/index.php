<?php

require __DIR__ . '/vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\UploadedFileInterface as UploadedFile;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// SDK do Mercado Pago
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;

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

function authAdmin($headers, $conn) {

    $authHeader = $headers['Authorization'][0];
    list($type, $token) = explode(" ", $authHeader, 2);

    if ($type !== 'Bearer') {
        // Haven´t token
        return 'Invalid';
    }

    $adminData = mysqli_query($conn, 'SELECT * FROM users WHERE token = "'.$token.'"');
    if(mysqli_num_rows($adminData) > 0) {
        $admin = array();
        while($row = mysqli_fetch_assoc($adminData)) {
            $admin = $row;
        }
        if($admin['type'] == 'a') {
            return "valid";
        }
    }
    return "invalid";
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

    if(authAdmin($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    if (validateToken($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    $userData = mysqli_query($conn, 'SELECT * FROM users ORDER BY id DESC');

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

    $valid = mysqli_query($conn, 'SELECT * FROM users WHERE mail = "'.$args['mail'].'"');

    if (mysqli_num_rows($valid) > 0) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "User registred"], true) );
        return $response->withStatus(409);
    }

    mysqli_query($conn, 'INSERT INTO users (name, type, date, mail, password) VALUES ( "'.$args['name'].'","p","'.date('Y-m-d').'", "'.$args['mail'].'", "'.md5($args['password']).'" )');

    $newUser = mysqli_query($conn, 'SELECT * FROM users WHERE mail = "'.$args['mail'].'"');
    $user = '';

    if (mysqli_num_rows($newUser) > 0) {

        sendMail($args['mail'], 'Conta AfiliPRO criada com sucesso!', 'PARABÉNS, <br />sua conta AfiliPRO foi criada com sucesso, acesse <a href="https://afilipro.com.br" target="_self">AfiliPRO</a> e veja mais detalhes!.');
        sendMail('administrador@afilipro.com.br', 'Novo cadastro de '.$args['mail'], 'Novo cadastro de '.$args['mail'].' em '.date('H:i:s d/m/Y'));

        while($row = mysqli_fetch_assoc($newUser)) {
            $user = $row;
        }

        $secretKey = '170918170918'; // **Important: Use a strong, unique key and never hardcode in production**
        $algorithm = 'HS256';

        $now = new DateTimeImmutable();
        $future = $now->modify('+160 hour'); // Token valid for 160 hour

        $payload = [
            'iat' => $now->getTimestamp(), // Issued at
            'exp' => $future->getTimestamp(), // Expiration time
            'sub' => $args['mail'], // Subject (e.g., user ID or username)
            // Add any other data you want to include in the token
        ];

        $token = JWT::encode($payload, $secretKey, $algorithm);

        mysqli_query($conn, 'UPDATE users SET token = "'.$token.'" WHERE mail = "'.$args['mail'].'"');

        mysqli_close($conn);
        
        unset($user['token']);
        unset($user['otp']);

        $response->getBody()->write(json_encode(["message" => "User registred and logged", "user" => $user, "token" => $token], true));
        return $response->withStatus(200);
    }
});

function sendMail($to, $subject, $message) {

    $mail = new PHPMailer(true);

    try {
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->Host       = 'smtp.titan.email'; // Example host
        $mail->SMTPAuth   = true;
        $mail->Username   = 'no-reply@afilipro.com.br';
        $mail->Password   = 'No@reply';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465; // Example port

        $mail->setFrom('no-reply@afilipro.com.br', 'AfiliPRO');
        $mail->addAddress($to, 'Cliente');

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        return true;
    } catch (Exception $e) {
        print("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}

// Atualiza senha
$app->put('/api/password', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $args = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $newPass = rand(100000, 999999);

    $user = mysqli_query($conn, 'SELECT * FROM users WHERE mail = "'.$args['mail'].'"');
    
    if (mysqli_num_rows($user) < 1) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "User not registered"], true) );
        return $response->withStatus(409);
    }

    $valid = mysqli_query($conn, 'UPDATE users SET password = "' . md5($newPass) . '" WHERE mail = "'.$args['mail'].'"');

    $to = $args['mail'];
    $subject = "Sua nova senha na AfiliPRO";
    $message = "<html><body>Sua nova senha: ".$newPass."</body></html>";

    if (sendMail($to, $subject, $message)) {
        $response->getBody()->write(json_encode(["success" => "Password Updated"], true) );
        return $response;
    }
    
    $response->getBody()->write(json_encode(["error" => "Fail to send SMS", "mail" => $args['mail']], true) );
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

        $secretKey = '170918170918'; // **Important: Use a strong, unique key and never hardcode in production**
        $algorithm = 'HS256';

        $now = new DateTimeImmutable();
        $future = $now->modify('+160 hour'); // Token valid for 160 hour

        $payload = [
            'iat' => $now->getTimestamp(), // Issued at
            'exp' => $future->getTimestamp(), // Expiration time
            'sub' => $args['mail'], // Subject (e.g., user ID or username)
            // Add any other data you want to include in the token
        ];

        $token = JWT::encode($payload, $secretKey, $algorithm);

        mysqli_query($conn, 'UPDATE users SET token = "'.$token.'" WHERE mail = "'.$args['mail'].'"');

        mysqli_close($conn);
        
        unset($user['token']);
        unset($user['otp']);

        $otp = rand(100000, 999999);

        $response->getBody()->write(json_encode(["message" => "User logged", "user" => $user, "token" => $token], true) );
            return $response;
        }

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
    $future = $now->modify('+160 hour'); // Token valid for 160 hour

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

    // $data = mysqli_query($conn, 'SELECT *, (SELECT categoria as c WHERE c.id = pg.id_categoria) FROM produtos_categorias as pd GROUP BY id_categoria');
    $data = mysqli_query($conn, 'SELECT c.categoria, c.id FROM categorias as c INNER JOIN produtos_categorias as p ON c.id = p.id_categoria GROUP BY p.id_categoria ORDER BY c.categoria ASC');

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

$app->get('/api/categorias/all', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    // $data = mysqli_query($conn, 'SELECT *, (SELECT categoria as c WHERE c.id = pg.id_categoria) FROM produtos_categorias as pd GROUP BY id_categoria');
    $data = mysqli_query($conn, 'SELECT * FROM categorias ORDER BY categoria ASC');

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

    if(authAdmin($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    if (validateToken($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    mysqli_query($conn, 'INSERT INTO categorias (categoria) VALUES ( "'.$args['categoria'].'")');

    $response->getBody()->write(json_encode(["success" => "Category registred"], true) );
    return $response;

});

// PRODUTOS

$app->get('/api/produtos', function (Request $request, Response $response, $args) use ($mysql_conn) {
    
    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);
    
    $queryParams = $request->getQueryParams();
    $page = $queryParams['page'] ?? 0;
    $filter = '';
    $terms = $queryParams['terms'] ?? null;
    $ce = $queryParams['ce'] ?? null;

    if ($terms || $ce) {
        $filter = 'AND ' . ($terms ? 'titulo LIKE "%'. $terms .'%"': '') . ($terms && $ce ? ' AND ': '') . ($ce ? 'ce = "1"' : '');
    }

    $data = mysqli_query($conn, 'SELECT * FROM produtos WHERE ativo = "1" ' .$filter. ' ORDER BY data DESC, id DESC LIMIT ' . ($page === 0 ? 0 : (int)($page*10)) . ', 10');
    $totalData = mysqli_query($conn, 'SELECT * FROM produtos WHERE ativo = "1" ' . $filter);

    mysqli_close($conn);

    if ( mysqli_num_rows($data) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not products listed']));
        return $response->withStatus(302);
    }

    $produtos = array();
    $produtos['items'] = array();

    while($row = mysqli_fetch_assoc($data)) {
        $produtos['items'][] = $row;
    }

    $produtos['total'] = mysqli_num_rows($totalData);

    $response->getBody()->write(json_encode($produtos));
    return $response->withStatus(200);
});

$app->get('/api/links', function (Request $request, Response $response, $args) use ($mysql_conn) {
    
    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $data = mysqli_query($conn, 'SELECT id, titulo, link FROM produtos WHERE link NOT LIKE "%/product/%" AND ativo = "1"');

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

$app->get('/api/produtos/home', function (Request $request, Response $response, $args) use ($mysql_conn) {
    
    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $data = mysqli_query($conn, 'SELECT * FROM produtos WHERE ativo = "1" ORDER BY data DESC, id DESC LIMIT 0, 1');

    mysqli_close($conn);

    if ( mysqli_num_rows($data) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not products listed']));
        return $response->withStatus(302);
    }

    $produtos = array();
    $produtos['items'] = array();

    while($row = mysqli_fetch_assoc($data)) {
        $produtos['items'][] = $row;
    }

    $response->getBody()->write(json_encode($produtos));
    return $response->withStatus(200);
});

$app->get('/api/produtos/{categoria}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $queryParams = $request->getQueryParams();
    $page = $queryParams['page'] ?? 0;
    $filter = '';
    $terms = $queryParams['terms'] ?? null;
    $ce = $queryParams['ce'] ?? null;

    if ($terms || $ce) {
        $filter = ' AND ' . ($terms ? 'p.titulo LIKE "%'. $terms .'%"': '') . ($terms && $ce ? ' AND ': '') . ($ce ? 'p.ce = "1"' : '');
    }

    $data = mysqli_query($conn, 'SELECT p.id, p.video, p.titulo, p.capa, p.link, p.texto, p.data FROM produtos p INNER JOIN produtos_categorias c ON p.id = c.id_produto WHERE p.ativo = "1" AND c.id_categoria = "'.$args['categoria'].'" ' . $filter . ' ORDER BY p.data DESC, p.id DESC LIMIT ' . ($page === 0 ? 0 : (int)($page*10)) . ', 10');
    $totalData = mysqli_query($conn, 'SELECT p.id, p.video, p.titulo, p.capa, p.link, p.texto, p.data FROM produtos p INNER JOIN produtos_categorias c ON p.id = c.id_produto WHERE p.ativo = "1" AND c.id_categoria = "'.$args['categoria'].'" ' . $filter);

    mysqli_close($conn);

    if ( mysqli_num_rows($data) === 0 ) {
        $response->getBody()->write(json_encode(['error'=>'Not products listed']));
        return $response->withStatus(302);
    }

    $produtos = array();
    $produtos['items'] = array();

    while($row = mysqli_fetch_assoc($data)) {
        $produtos['items'][] = $row;
    }

    $produtos['total'] = mysqli_num_rows($totalData);

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
        $pathVideo = 'video/' . uniqid() . "_". $filename;
        $video->moveTo('./' . $pathVideo);
    } else {
        $response->getBody()->write(json_encode(["error" => "Fail to upload or unsupported extension video"], true) );
        return $response->withStatus(500);
    }

    $capa = $uploadedFiles['capa'];

    if ($capa->getError() === UPLOAD_ERR_OK) {
        $filename = $capa->getClientFilename();
        $pathCapa = 'capa/' . uniqid() . "_" . $filename;
        $capa->moveTo('./' . $pathCapa);
    } else {
        $response->getBody()->write(json_encode(["error" => "Fail to upload or unsupported extension capa"], true) );
        return $response->withStatus(500);
    }

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    if(authAdmin($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    if (validateToken($request->getHeaders(), $conn) === "invalid") {
        $response->getBody()->write(json_encode(["error" => "User not authorized"], true) );
        return $response->withStatus(401);
    }

    mysqli_query($conn, 'INSERT INTO produtos (
        titulo, 
        video, 
        capa, 
        link, 
        link_2,
        link_3,
        data,
        texto,
        ativo,
        ce
        ) VALUES ( 
        "'.$data['titulo'].'",
        "'.$pathVideo.'",
        "'.$pathCapa.'",
        "'.$data['link'].'",
        "'.$data['linkDois'].'",
        "'.$data['linkTres'].'",
        "'.date('Y-m-d').'",
        "'.$data['texto'].'",
        "1",
        "'.$data['ce'].'")');
    
    $id_product = mysqli_insert_id($conn);

    mysqli_query($conn, 'INSERT INTO produtos_categorias (id_produto, id_categoria) VALUES ("'.$id_product.'", "'.$data['categoria'].'")');

    $response->getBody()->write(json_encode(["success" => "Product registred"], true) );
    return $response;

});

// Gera ID de pagamento
$app->post('/api/pagamento', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();
    $order = rand(10000000, 99999999);

    MercadoPagoConfig::setAccessToken("APP_USR-3887967945664963-010215-d64eccfb01703791b2b630537df74c7a-95453539");

    $client = new PreferenceClient();
    $preference = $client->create([
        "items"=> array(
            array(
            "title" => "AfiliPRO",
            "quantity" => 1,
            "unit_price" => ($data['plain'] == "20") ? 29.9 : 197.9
            )
        ),
        "back_urls"=> array(
            "success" => "https://afilipro.com.br/pagamento/sucesso",
            "failure" => "https://afilipro.com.br/pagamento/falha",
            "pending" => "https://afilipro.com.br/pagamento/pendente"
        ),
        "payment_methods" => array(
            "installments" => 1
        ),
        "external_reference" => $order
    ]);

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $date = new DateTime();
    
    if ($data['plain'] == "20") {
        $endDate = $date->modify("+30 days")->format('Y-m-d');
    }

    if ($data['plain'] == "120") {
        $endDate = $date->modify("+1 year")->format('Y-m-d');
    }

    mysqli_query($conn, 'INSERT INTO pagamentos (
        id_pagamento, 
        id_user,
        status, 
        data, 
        external_reference,
        end_date
        ) VALUES ( 
        "'.$preference->id.'",
        "'.$data['user_id'].'",
        "0",
        "'.date('Y-m-d').'",
        "'.$order.'",
        "'.$endDate.'")');

    $users = mysqli_query($conn, 'SELECT * FROM users WHERE id = "'.$data['user_id'].'"');
    $user = '';

    if (mysqli_num_rows($users) > 0) {
        while($row = mysqli_fetch_assoc($users)) {
            $user = $row;
        }
    }

    sendMail($user['mail'], 'Falta pouco para ser um Afiliado!', 'Seu pagamento deve ser finalizado para habilitar todas as funções AfiliPRO. <b>APROVEITE!</b>');
    sendMail('administrador@afilipro.com.br', 'Novo pagamento gerado de '.$user['name'].' - '.$user['mail'], 'Novo pagamento gerado de '.$user['name'].' - '.$user['mail'].' em '.date('H:i:s d/m/Y'));

    $response->getBody()->write(json_encode(["id" => $preference->id, "data"=>date('Y-m-d'), "endDate"=>$endDate, "external_reference"=>$order], true));
    return $response;

});

function GetCurl($url){

    $token = "APP_USR-3887967945664963-010215-d64eccfb01703791b2b630537df74c7a-95453539";

    //open connection
    $ch = curl_init();
    
    //curl options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . $token
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,0);
        
    //execute response
    $response = curl_exec($ch);

    //close connection
    curl_close($ch);

    return json_decode($response, true);
}

$app->get('/api/pagamento/{pid}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $paymentData = GetCurl("https://api.mercadopago.com/v1/payments/" . $args['pid'] ) ;

    $response->getBody()->write(json_encode(["status" => $paymentData["status"]], true));
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
        action
        ) VALUES ( 
        "'.$data['data']['id'].'",
        "'.$data['type'].'",
        "'.$data['date_created'].'",
        "'.$data['user_id'].'",
        "'.$data['action'].'")');

    $paymentData = GetCurl("https://api.mercadopago.com/v1/payments/".$data['data']['id']);

    if($paymentData["status"] === 'approved') {
        mysqli_query($conn, 'UPDATE pagamentos SET status = "1" WHERE external_reference = "' . $paymentData["external_reference"] . '"');
        $userData = mysqli_query($conn, 'SELECT * FROM pagamentos WHERE external_reference = "' . $paymentData["external_reference"] . '"');
        if(mysqli_num_rows($userData) > 0) {
            $user = array();
            while($row = mysqli_fetch_assoc($userData)) {
                $user = $row;
            }
        }
        mysqli_query($conn, 'UPDATE users SET type = "u" WHERE id = "' . $user["id_user"] . '"');
        $users = mysqli_query($conn, 'SELECT * FROM users WHERE id ="' . $user["id_user"] . '"');
        $usr = '';

        if(mysqli_num_rows($users)>0) {
            while($roq = mysqli_fetch_assoc($users)) {
                $usr = $row;
            }
        }

        sendMail($usr['mail'], 'Parabéns você se tornou um Afiliado!', 'Seu pagamento foi aprovado e você já pode utilizar todas as funções AfiliPRO até '.$user['end-date'].explode('-')[2].'/'.$user['end-date'].explode('-')[1].'/'.$user['end-date'].explode('-')[0].'<b><a href="https://afilipro.com.br target="_blank">Acesse agora</a></b>');
        sendMail('administrador@afilipro.com.br', 'Pagamento aprovado de '.$usr['name'].' - '.$usr['mail'], 'Pagamento de '.$usr['name'].' - '.$usr['mail'].' aprovado em '.date('H:i:s d/m/Y'));
    }

    $response->getBody()->write(json_encode(["id" => $data['data']['id']], true));
    return $response;

});

// Pagamento sucesso
$app->put('/api/pagamento', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $pagamentos = mysqli_query($conn, 'SELECT * FROM pagamentos WHERE external_reference = "'.$data['external_reference'].'"');
    $pagamento = array();

    if(mysqli_num_rows($pagamentos) > 0) {
        while($row = mysqli_fetch_assoc($pagamentos)) {
            $pagamento = $row;
        }
        mysqli_query($conn, 'UPDATE pagamentos SET status="1", mp_pagamento_id = "'.$data['payment_id'].'" WHERE external_reference = "'.$data['external_reference'].'"');
        mysqli_query($conn, 'UPDATE users SET type="u" WHERE id = "'.$pagamento['id_user'].'"');

        $userData = mysqli_query($conn, 'SELECT * FROM users WHERE id = "'.$pagamento['id_user'].'"');
        $user = array();

        while($row = mysqli_fetch_assoc($userData)) {
            $user = $row;
        }

        sendMail($user['mail'], 'Parabéns você se tornou um Afiliado!', 'Seu pagamento foi aprovado e você já pode utilizar todas as funções AfiliPRO, <b><a href="https://afilipro.com.br target="_blank">Acesse agora</a></b>');
        sendMail('administrador@afilipro.com.br', 'Pagamento aprovado de '.$user['name'].' - '.$user['mail'], 'Pagamento de '.$user['name'].' - '.$user['mail'].' aprovado em '.date('H:i:s d/m/Y'));
        
        $response->getBody()->write(json_encode($user, true));
        return $response;
    }

    $response->getBody()->write(json_encode(["error" => "Fail to update payment"], true) );
    return $response->withStatus(500);
});

// Update Link
$app->put('/api/link', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    mysqli_query($conn, 'UPDATE produtos SET link="'.$data['link'].'" WHERE id = "'.$data['id'].'"');
    
    $response->getBody()->write(json_encode($user, true));
    return $response;
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

// LINK DA BIO

// Bio
$app->get('/api/bio/{user_id}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $query = mysqli_query($conn, 'SELECT * FROM bio WHERE id_user = "'.$args['user_id'].'"');
    $bio = array();

    if(mysqli_num_rows($query) > 0) {
        while($row = mysqli_fetch_assoc($query)) {
            $bio = $row;
        }

        $queryBio = mysqli_query($conn, 'SELECT b.id as id, b.id_produto as id_produto, b.link as link, (SELECT p.titulo FROM produtos as p WHERE p.id = b.id_produto) as titulo, (SELECT p.capa FROM produtos as p WHERE p.id = b.id_produto) as capa FROM bio_produtos as b WHERE b.id_bio = "'.$bio['id'].'"');
        $produtos = array();

        if(mysqli_num_rows($queryBio) > 0) {
            while($row = mysqli_fetch_assoc($queryBio)) {
                $produtos[] = $row;
            }
        }

        $bio['produtos'] = $produtos;
        
        $response->getBody()->write(json_encode($bio, true));
        return $response;
    }

    $response->getBody()->write(json_encode(["error" => "No bio registered"], true) );
    return $response->withStatus(302);
});

$app->get('/api/bio/page/{nickname}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $query = mysqli_query($conn, 'SELECT * FROM bio WHERE nickname = "'.$args['nickname'].'"');
    $bio = array();

    if(mysqli_num_rows($query) > 0) {
        while($row = mysqli_fetch_assoc($query)) {
            $bio = $row;
        }

        $bio['descricao'] = nl2br(stripslashes($bio['descricao']));

        $queryBio = mysqli_query($conn, 'SELECT b.id as id, b.id_produto as id_produto, b.link as link, (SELECT p.titulo FROM produtos as p WHERE p.id = b.id_produto) as titulo, (SELECT p.capa FROM produtos as p WHERE p.id = b.id_produto) as capa FROM bio_produtos as b WHERE b.id_bio = "'.$bio['id'].'"');
        $produtos = array();

        if(mysqli_num_rows($queryBio) > 0) {
            while($row = mysqli_fetch_assoc($queryBio)) {
                $produtos[] = $row;
            }
        }

        $bio['produtos'] = $produtos;
        
        $response->getBody()->write(json_encode($bio, true));
        return $response;
    }

    $response->getBody()->write(json_encode(["error" => "No bio registered"], true) );
    return $response->withStatus(302);
});

$app->post('/api/bio', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    mysqli_query($conn, 'INSERT INTO bio (
        name,
        descricao,
        date_created,
        nickname,
        id_afiliado,
        id_user
        ) VALUES ( 
        "'.$data['name'].'",
        "'.addslashes($data['descricao']).'",
        "'.date('Y-m-d').'",
        "'.$data['nickname'].'",
        "'.$data['id_afiliado'].'",
        "'.$data['id_user'].'")');

    $response->getBody()->write(json_encode(["success" => "true"], true));
    return $response;

});

$app->post('/api/access', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    mysqli_query($conn, 'INSERT INTO access (
        button,
        page,
        date
        ) VALUES ( 
        "'.$data['button'].'",
        "'.$data['page'].'",
        "'.date('Y-m-d H:i:s').'")');

    $response->getBody()->write(json_encode(["success" => "true"], true));
    return $response;

});

$app->put('/api/bio', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    mysqli_query($conn, 'UPDATE bio SET name="'.$data['name'].'", nickname="'.$data['nickname'].'", descricao="'.addslashes($data['descricao']).'", id_afiliado="'.$data['id_afiliado'].'" WHERE id = "'.$data['id'].'"');

    $response->getBody()->write(json_encode(["success" => "true"], true));
    return $response;

});

function gerarLinkShopee($originalUrl, $affiliateId, $subId = '') {
    // A chave para o rastreamento é passar o sub_id (af_sub1)
    // O formato da URL de rastreamento da Shopee é mais seguro via API ou
    // gerando o Deeplink no portal. Abaixo está a estrutura de tracking.
    
    // Adiciona o parâmetro de afiliado se necessário
    $urlSeparada = explode('?', $originalUrl);
    $baseUrl = $urlSeparada[0];
    
    // Adiciona os parâmetros de rastreamento
    $params = [
        'af_sub1' => $subId,
        'af_click_lookback' => '7d', // Opcional: janela de 7 dias
        'pid' => 'affiliate_programme',
        'c' => $affiliateId // Algumas estruturas usam 'c' ou 'af_id'
    ];
    
    return $baseUrl . '?' . http_build_query($params);
}

$app->post('/api/bio-produtos', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $data = $request->getParsedBody();

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    $queryBio = mysqli_query($conn, 'SELECT * FROM bio WHERE id_user = "'.$data['id_user'].'"');
    $bio = '';

    if(mysqli_num_rows($queryBio) > 0) {
        while($row = mysqli_fetch_assoc($queryBio)) {
            $bio = $row;
        }

        mysqli_query($conn, 'INSERT INTO bio_produtos (
            id_bio,
            id_produto,
            link,
            orderProduct
            ) VALUES ( 
            "'.$bio['id'].'",
            "'.$data['id_produto'].'",
            "'.gerarLinkShopee($data['link'], $bio['id_afiliado']).'",
            "1000")');
    
        $response->getBody()->write(json_encode(["success" => "true"], true));
        return $response;
    }


});

$app->delete('/api/bio-produtos/{id}', function (Request $request, Response $response, $args) use ($mysql_conn) {

    $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    mysqli_query($conn, 'DELETE FROM bio_produtos WHERE id = "'.$args['id'].'"');

    $response->getBody()->write(json_encode(["success" => "true"], true));
    return $response;

});

$app->run();