-- BudgetPro Seed Data
-- Execute this after migrate.sql to populate initial data

USE budgetpro;

-- Default Categories (Income)
INSERT INTO categories (name, type, color, icon, is_system) VALUES
('Salary', 'income', '#50fa7b', 'wallet', TRUE),
('Freelance', 'income', '#bd93f9', 'briefcase', TRUE),
('Investments', 'income', '#ffb86c', 'trending-up', TRUE),
('Other Income', 'income', '#8be9fd', 'plus-circle', TRUE);

-- Default Categories (Expense)
INSERT INTO categories (name, type, color, icon, is_system) VALUES
('Housing', 'expense', '#ff5555', 'home', TRUE),
('Food', 'expense', '#f1fa8c', 'utensils', TRUE),
('Transportation', 'expense', '#bd93f9', 'car', TRUE),
('Shopping', 'expense', '#ff79c6', 'shopping-bag', TRUE),
('Healthcare', 'expense', '#8be9fd', 'heart', TRUE),
('Entertainment', 'expense', '#ffb86c', 'film', TRUE),
('Utilities', 'expense', '#50fa7b', 'zap', TRUE),
('Education', 'expense', '#f1fa8c', 'book', TRUE),
('Other', 'expense', '#6272a4', 'grid', TRUE);

-- Demo User (password: Demo@123)
INSERT INTO users (name, email, password, role) VALUES
('Demo User', 'demo@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- Demo Wallet
INSERT INTO wallets (name, owner_id, currency) VALUES
('Personal Wallet', LAST_INSERT_ID(), 'INR');

-- Get the wallet ID
SET @wallet_id = LAST_INSERT_ID();
SET @user_id = (SELECT id FROM users WHERE email = 'demo@example.com');

-- Add wallet member (owner)
INSERT INTO wallet_members (wallet_id, user_id, role) VALUES
(@wallet_id, @user_id, 'owner');

-- Demo Transactions (last 3 months)
INSERT INTO transactions (wallet_id, user_id, category_id, type, amount, description, date) VALUES
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Salary'), 'income', 50000.00, 'Monthly Salary', DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH)),
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Housing'), 'expense', 15000.00, 'Rent Payment', DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH)),
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Food'), 'expense', 8000.00, 'Groceries', DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH)),
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Salary'), 'income', 50000.00, 'Monthly Salary', DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)),
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Housing'), 'expense', 15000.00, 'Rent Payment', DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)),
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Transportation'), 'expense', 3000.00, 'Fuel', DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)),
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Salary'), 'income', 50000.00, 'Monthly Salary', CURRENT_DATE),
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Housing'), 'expense', 15000.00, 'Rent Payment', CURRENT_DATE),
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Entertainment'), 'expense', 5000.00, 'Movie Night', CURRENT_DATE);

-- Demo Budget (current month)
INSERT INTO budgets (user_id, category_id, wallet_id, amount, month_year) VALUES
(@user_id, (SELECT id FROM categories WHERE name = 'Housing'), @wallet_id, 15000.00, DATE_FORMAT(CURRENT_DATE, '%Y-%m')),
(@user_id, (SELECT id FROM categories WHERE name = 'Food'), @wallet_id, 10000.00, DATE_FORMAT(CURRENT_DATE, '%Y-%m')),
(@user_id, (SELECT id FROM categories WHERE name = 'Transportation'), @wallet_id, 5000.00, DATE_FORMAT(CURRENT_DATE, '%Y-%m')),
(@user_id, (SELECT id FROM categories WHERE name = 'Entertainment'), @wallet_id, 3000.00, DATE_FORMAT(CURRENT_DATE, '%Y-%m'));

-- Demo Recurring Transaction
INSERT INTO recurring_transactions (wallet_id, user_id, category_id, type, amount, description, frequency, start_date, day_of_month) VALUES
(@wallet_id, @user_id, (SELECT id FROM categories WHERE name = 'Housing'), 'expense', 15000.00, 'Monthly Rent', 'monthly', CURRENT_DATE, 1);

-- Demo Goal
INSERT INTO goals (user_id, wallet_id, name, target_amount, current_amount, target_date) VALUES
(@user_id, @wallet_id, 'Emergency Fund', 100000.00, 25000.00, DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH));
