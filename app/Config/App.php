<?php
declare(strict_types=1);

namespace App\Config;

class App {
    private static array $config;

    public static function init(): void {
        // Load environment config
        self::$config = require_once __DIR__ . '/../../.env.php';

        // Configure session
        ini_set('session.name', self::getConfig('SESSION_NAME', 'BUDGETPROSESSID'));
        ini_set('session.cookie_httponly', '1');
        ini_set('session.cookie_samesite', 'Lax');
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
            ini_set('session.cookie_secure', '1');
        }

        // Start session if not already started
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Set timezone
        date_default_timezone_set('Asia/Kolkata');
    }

    public static function getConfig(string $key, $default = null) {
        return self::$config[$key] ?? $default;
    }
}
