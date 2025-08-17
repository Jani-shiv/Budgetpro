<?php
declare(strict_types=1);

namespace App\Core;

class Csrf {
    private const TOKEN_LENGTH = 32;
    private const SESSION_KEY = '_csrf_token';

    public static function generateToken(): string {
        $token = bin2hex(random_bytes(self::TOKEN_LENGTH));
        $_SESSION[self::SESSION_KEY] = $token;
        return $token;
    }

    public static function getToken(): string {
        if (!isset($_SESSION[self::SESSION_KEY])) {
            return self::generateToken();
        }
        return $_SESSION[self::SESSION_KEY];
    }

    public static function verifyToken(?string $token): bool {
        if (!isset($_SESSION[self::SESSION_KEY]) || empty($token)) {
            return false;
        }
        return hash_equals($_SESSION[self::SESSION_KEY], $token);
    }

    public static function removeToken(): void {
        unset($_SESSION[self::SESSION_KEY]);
    }

    public static function formField(): string {
        return '<input type="hidden" name="_csrf" value="' . htmlspecialchars(self::getToken()) . '">';
    }
}
