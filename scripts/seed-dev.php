<?php
declare(strict_types=1);

require_once __DIR__ . '/../app/Config/App.php';
require_once __DIR__ . '/../app/Config/Database.php';

use App\Config\Database;

/**
 * Generate realistic test data for BudgetPro
 * Usage: php scripts/seed-dev.php
 */

// Configuration
$numTransactions = 200;
$startDate = strtotime('-6 months');
$endDate = time();
$merchants = [
    'Food' => ['Grocery Store', 'Restaurant', 'Cafe', 'Food Delivery'],
    'Transportation' => ['Fuel Station', 'Uber', 'Metro', 'Parking'],
    'Shopping' => ['Amazon', 'Mall', 'Clothing Store', 'Electronics Shop'],
    'Entertainment' => ['Cinema', 'Netflix', 'Gaming', 'Concert'],
    'Healthcare' => ['Pharmacy', 'Doctor', 'Hospital', 'Insurance'],
    'Utilities' => ['Electricity Co', 'Water Utility', 'Internet Provider', 'Gas Company']
];

try {
    $pdo = Database::getConnection();
    
    // Get demo user and wallet
    $stmt = $pdo->query("SELECT id FROM users WHERE email = 'demo@example.com' LIMIT 1");
    $userId = $stmt->fetchColumn();
    
    $stmt = $pdo->query("SELECT id FROM wallets WHERE owner_id = {$userId} LIMIT 1");
    $walletId = $stmt->fetchColumn();
    
    // Get all expense categories
    $stmt = $pdo->query("SELECT id, name FROM categories WHERE type = 'expense'");
    $categories = $stmt->fetchAll();
    
    // Generate random transactions
    $pdo->beginTransaction();
    
    for ($i = 0; $i < $numTransactions; $i++) {
        $category = $categories[array_rand($categories)];
        $date = date('Y-m-d', rand($startDate, $endDate));
        
        // Random amount based on category
        switch ($category['name']) {
            case 'Housing':
                $amount = rand(10000, 20000);
                break;
            case 'Food':
                $amount = rand(100, 2000);
                break;
            case 'Transportation':
                $amount = rand(50, 3000);
                break;
            case 'Shopping':
                $amount = rand(500, 5000);
                break;
            default:
                $amount = rand(100, 3000);
        }
        
        // Get random merchant for category
        $merchant = $merchants[$category['name']] ?? ['Other'];
        $merchantName = $merchant[array_rand($merchant)];
        
        $stmt = $pdo->prepare("
            INSERT INTO transactions (
                wallet_id, user_id, category_id, type, amount, 
                description, merchant, date, created_at
            ) VALUES (
                ?, ?, ?, 'expense', ?,
                ?, ?, ?, DATE_SUB(?, INTERVAL RAND()*24 HOUR)
            )
        ");
        
        $stmt->execute([
            $walletId,
            $userId,
            $category['id'],
            $amount,
            "Payment at {$merchantName}",
            $merchantName,
            $date,
            $date
        ]);
    }
    
    // Add monthly salary (income)
    $salaryCategory = $pdo->query("SELECT id FROM categories WHERE name = 'Salary' LIMIT 1")->fetchColumn();
    $currentDate = $startDate;
    
    while ($currentDate <= $endDate) {
        $salaryDate = date('Y-m-d', strtotime(date('Y-m-05', $currentDate)));
        
        $stmt = $pdo->prepare("
            INSERT INTO transactions (
                wallet_id, user_id, category_id, type, amount,
                description, date, created_at
            ) VALUES (
                ?, ?, ?, 'income', ?,
                'Monthly Salary', ?, ?
            )
        ");
        
        $stmt->execute([
            $walletId,
            $userId,
            $salaryCategory,
            50000.00, // Fixed salary
            $salaryDate,
            $salaryDate
        ]);
        
        $currentDate = strtotime('+1 month', $currentDate);
    }
    
    $pdo->commit();
    echo "Successfully generated " . $numTransactions . " test transactions plus monthly salary entries.\n";
    
} catch (Exception $e) {
    if (isset($pdo)) {
        $pdo->rollBack();
    }
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
