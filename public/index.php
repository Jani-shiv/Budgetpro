<?php
declare(strict_types=1);

require_once __DIR__ . '/../app/Config/App.php';
require_once __DIR__ . '/../app/Core/Router.php';

// Initialize application
App\Config\App::init();

// Create router instance
$router = new App\Core\Router();

// Define routes
$router->add('GET', '', 'Dashboard', 'index');
$router->add('GET', 'login', 'Auth', 'loginForm');
$router->add('POST', 'login', 'Auth', 'login');
$router->add('GET', 'register', 'Auth', 'registerForm');
$router->add('POST', 'register', 'Auth', 'register');
$router->add('GET', 'logout', 'Auth', 'logout');

$router->add('GET', 'dashboard', 'Dashboard', 'index');

$router->add('GET', 'transactions', 'Transaction', 'index');
$router->add('POST', 'transactions/create', 'Transaction', 'create');
$router->add('POST', 'transactions/delete', 'Transaction', 'delete');
$router->add('GET', 'transactions/upload', 'Transaction', 'uploadForm');
$router->add('POST', 'transactions/upload', 'Transaction', 'upload');

$router->add('GET', 'budgets', 'Budget', 'index');
$router->add('POST', 'budgets/save', 'Budget', 'save');

$router->add('GET', 'wallets', 'Wallet', 'index');
$router->add('GET', 'wallets/new', 'Wallet', 'new');
$router->add('POST', 'wallets/create', 'Wallet', 'create');
$router->add('POST', 'wallets/invite', 'Wallet', 'invite');

$router->add('GET', 'reports', 'Report', 'index');

// API Routes
$router->add('GET', 'api/transactions', 'Api\\Transaction', 'list');
$router->add('POST', 'api/transactions', 'Api\\Transaction', 'create');

// Dispatch the request
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
