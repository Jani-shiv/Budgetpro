<?php
declare(strict_types=1);

/**
 * BudgetPro Environment Configuration
 * Returns an array of configuration settings.
 * DO NOT commit sensitive values to version control.
 */
return [
    'APP_URL' => 'http://localhost/budgetpro',
    'DB_HOST' => '127.0.0.1',
    'DB_NAME' => 'budgetpro',
    'DB_USER' => 'root',
    'DB_PASS' => '',
    'DB_CHARSET' => 'utf8mb4',
    'SESSION_NAME' => 'BUDGETPROSESSID',
    'CSRF_SECRET' => 'CHANGE_ME_IN_PRODUCTION',
    'BASE_CURRENCY' => 'INR',
    'UPLOAD_MAX_SIZE' => 5242880, // 5MB in bytes
    'ALLOWED_MIMES' => ['image/jpeg', 'image/png', 'application/pdf'],
    'MAIL_HOST' => 'smtp.example.com',
    'MAIL_PORT' => 587,
    'MAIL_USER' => 'your@email.com',
    'MAIL_PASS' => 'your_password',
    'MAIL_FROM' => 'BudgetPro <noreply@example.com>'
];
