# BudgetPro

A modern, secure PHP application for comprehensive budget and expense management. BudgetPro helps individuals and teams track expenses, manage budgets, and gain insights into their financial habits.

## Features

### 💰 Financial Management
- **Transaction Tracking**: Record income and expenses with detailed categorization
- **Budget Management**: Set and monitor monthly/yearly budgets with alerts
- **Multiple Wallets**: Support for multiple wallets with shared access capabilities
- **File Uploads**: Import transactions via file upload (images, PDFs)
- **Real-time Balance**: Automatic balance calculations and updates

### 👥 User Management
- **Secure Authentication**: Registration, login with session management
- **Role-based Access**: User and admin roles with appropriate permissions
- **Shared Wallets**: Collaborate with family or team members
- **User Profiles**: Manage personal information and preferences

### 📊 Analytics & Reporting
- **Visual Reports**: Comprehensive spending analysis and trends
- **Category Insights**: Track spending by categories with color-coded visualization
- **API Access**: RESTful API for external integrations
- **Export Capabilities**: Generate reports for accounting purposes

### 🔒 Security Features
- **CSRF Protection**: Built-in Cross-Site Request Forgery protection
- **Secure Sessions**: HTTP-only cookies with proper security headers
- **Input Validation**: Comprehensive data validation and sanitization
- **File Security**: Secure file upload handling with type restrictions

## Tech Stack

- **Backend**: PHP 8.0+ with custom MVC framework
- **Database**: MySQL 8.0+ / MariaDB 10.4+
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Server**: Apache 2.4+ with mod_rewrite
- **Security**: Built-in CSRF protection, secure headers, input validation

## Installation

### Prerequisites

- PHP 8.0 or higher
- MySQL 8.0 or MariaDB 10.4+
- Apache web server with mod_rewrite enabled
- Composer (optional, for dependencies)

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jani-shiv/Budgetpro.git
   cd Budgetpro
   ```

2. **Configure your web server**
   
   Point your web server document root to the `public/` directory.
   
   **Apache Virtual Host Example:**
   ```apache
   <VirtualHost *:80>
       ServerName budgetpro.local
       DocumentRoot /path/to/Budgetpro/public
       
       <Directory /path/to/Budgetpro/public>
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. **Set up the database**
   ```bash
   # Create database and user
   mysql -u root -p
   CREATE DATABASE budgetpro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'budgetpro_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON budgetpro.* TO 'budgetpro_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   
   # Import database schema
   mysql -u budgetpro_user -p budgetpro < scripts/migrate.sql
   mysql -u budgetpro_user -p budgetpro < scripts/seed.sql
   ```

4. **Configure environment**
   ```bash
   # Copy environment configuration
   cp .env.php.example .env.php
   ```
   
   Edit `.env.php` with your database credentials and other settings:
   ```php
   return [
       'APP_URL' => 'http://your-domain.com',
       'DB_HOST' => 'localhost',
       'DB_NAME' => 'budgetpro',
       'DB_USER' => 'budgetpro_user',
       'DB_PASS' => 'your_password',
       'DB_CHARSET' => 'utf8mb4',
       'SESSION_NAME' => 'BUDGETPROSESSID',
       'CSRF_SECRET' => 'your-random-secret-key',
       'BASE_CURRENCY' => 'INR', // or USD, EUR, etc.
       // ... other settings
   ];
   ```

5. **Set proper permissions**
   ```bash
   # Ensure web server can read files
   chmod -R 755 public/
   chmod -R 644 public/assets/
   
   # Secure sensitive files
   chmod 600 .env.php
   ```

6. **Access the application**
   
   Open your browser and navigate to your configured domain. Use the demo account to get started:
   - **Email**: demo@example.com
   - **Password**: Demo@123

## Configuration

### Environment Variables

All configuration is managed through `.env.php`. Key settings include:

| Setting | Description | Default |
|---------|-------------|---------|
| `APP_URL` | Application base URL | `http://localhost/budgetpro` |
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_NAME` | Database name | `budgetpro` |
| `DB_USER` | Database username | `root` |
| `DB_PASS` | Database password | `''` |
| `BASE_CURRENCY` | Default currency | `INR` |
| `UPLOAD_MAX_SIZE` | Max upload size in bytes | `5242880` (5MB) |
| `CSRF_SECRET` | CSRF token secret | `CHANGE_ME_IN_PRODUCTION` |

### Security Configuration

- Change the `CSRF_SECRET` to a random string in production
- Use HTTPS in production and uncomment HSTS headers in `.htaccess`
- Set strong database passwords
- Regularly update PHP and server software

## Usage

### Basic Operations

1. **Register/Login**: Create an account or use the demo credentials
2. **Create Wallet**: Set up your first wallet for transaction tracking
3. **Add Categories**: Customize income and expense categories
4. **Record Transactions**: Add income and expense entries
5. **Set Budgets**: Define spending limits for categories
6. **View Reports**: Analyze your financial data through reports

### API Usage

BudgetPro provides a RESTful API for external integrations:

```bash
# Get transactions
GET /api/transactions

# Create transaction
POST /api/transactions
Content-Type: application/json
{
    "amount": 100.00,
    "type": "expense",
    "category_id": 1,
    "description": "Coffee",
    "date": "2024-01-15"
}
```

## Development

### Setting up Development Environment

1. **Clone and install**
   ```bash
   git clone https://github.com/Jani-shiv/Budgetpro.git
   cd Budgetpro
   ```

2. **Generate sample data**
   ```bash
   php scripts/seed-dev.php
   ```
   This creates 200 sample transactions for testing.

3. **Development server**
   ```bash
   # Using PHP built-in server
   cd public
   php -S localhost:8000
   ```

### Project Structure

```
Budgetpro/
├── app/                    # Core application files
│   ├── Config/            # Configuration classes
│   └── Core/              # Core framework classes
├── src/                   # Main application code
│   ├── Controllers/       # Request handlers
│   ├── Models/           # Data models
│   ├── Services/         # Business logic
│   └── Utils/            # Utility classes
├── public/               # Web server document root
│   ├── assets/          # CSS, JS, images
│   └── index.php        # Application entry point
├── views/               # View templates
├── scripts/             # Database and utility scripts
└── .env.php            # Environment configuration
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow PSR-12 coding standards
- Use strict typing (`declare(strict_types=1)`)
- Document all public methods
- Write meaningful commit messages
- Add tests for new features

## Database Schema

The application uses the following main tables:

- **users**: User accounts and authentication
- **wallets**: Financial containers with balance tracking
- **categories**: Income and expense categorization
- **transactions**: Individual financial entries
- **budgets**: Monthly/yearly spending limits
- **wallet_members**: Shared wallet access control

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check database credentials in `.env.php`
   - Ensure MySQL service is running
   - Verify database exists and user has proper permissions

2. **Permission Errors**
   - Check file permissions: `chmod -R 755 public/`
   - Ensure web server user can read files

3. **Session Issues**
   - Clear browser cookies and cache
   - Check session configuration in `.env.php`
   - Verify write permissions on session directory

4. **File Upload Issues**
   - Check `upload_max_filesize` and `post_max_size` in PHP config
   - Verify `UPLOAD_MAX_SIZE` setting in `.env.php`
   - Ensure proper file permissions on upload directory

## Security

If you discover any security vulnerabilities, please email shivjani2005@gmail.com instead of using the issue tracker.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Jani-shiv**
- Email: shivjani2005@gmail.com
- GitHub: [@Jani-shiv](https://github.com/Jani-shiv)

## Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

Made with ❤️ for better financial management
