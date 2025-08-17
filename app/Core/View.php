<?php
declare(strict_types=1);

namespace App\Core;

class View {
    public static function render(string $template, array $data = []): string {
        extract($data);
        
        ob_start();
        include __DIR__ . '/../../views/' . $template . '.php';
        return ob_get_clean();
    }

    public static function escape(string $string): string {
        return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
    }

    public static function formatMoney(float $amount, string $currency = 'INR'): string {
        return number_format($amount, 2) . ' ' . $currency;
    }

    public static function formatDate(string $date): string {
        return date('d M Y', strtotime($date));
    }
}
