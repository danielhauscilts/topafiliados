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
    $mysql_conn['db'] = 'res_bv';
} else {
    // DB Hostgator
    $mysql_conn['host'] = 'br676.hostgator.com.br:3306';
    $mysql_conn['user'] = 'dan87952_admin';
    $mysql_conn['pass'] = 'D@n259083';
    $mysql_conn['db'] = 'dan87952_danielhaus';
}

function validateToken($headers, $conn) {
    $authHeader = $headers['Authorization'][0];
    list($type, $token) = explode(" ", $authHeader, 2);

    if ($type !== 'Bearer') {
        $response->getBody()->write(json_encode(["error" => "Token"], true));
        return $response->withStatus(401);
    }

    $valid = mysqli_query($conn, 'SELECT token FROM users WHERE token = "'.$token.'"');

    if (mysqli_num_rows($valid) == 0) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "Token"], true));
        return $response->withStatus(401);
    }

    $secretKey = '170918170918';

    try {
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    } catch (Exception $e) {
        mysqli_close($conn);
        $response->getBody()->write(json_encode(["error" => "Token"], true));
        return $response->withStatus(401);
    }
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
        "msg" => "Olá, sua senha de acesso " + $password,
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
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->addBodyParsingMiddleware();

$app->post('/api/login', function (Request $request, Response $response, $args) use ($mysql_conn) {

    // $data = $request->getParsedBody();

    // $conn = new mysqli($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pass'], $mysql_conn['db']);

    // if ($conn) {
    //     $signin = mysqli_query($conn, 'SELECT * FROM users WHERE phone = "'.$data['phone'].'"');
    //     mysqli_close($conn);
    // }

    $response->getBody()->write("success");
    return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    
    // $response->getBody()->write(json_encode(['status' => 'error', 'message' => 'cURL Error'], true));
    // return $response->withStatus(500);
});

$app->run();