<?php
declare(strict_types=1);

namespace App\Core;

abstract class Controller {
    protected function render(string $view, array $data = []): void {
        // Extract data to make variables available in view
        extract($data);
        
        // Start output buffering
        ob_start();
        
        // Include the view file
        $viewFile = __DIR__ . '/../../views/' . $view . '.php';
        if (file_exists($viewFile)) {
            require $viewFile;
        } else {
            throw new \RuntimeException("View file not found: $view");
        }
        
        // Get buffered content
        $content = ob_get_clean();
        
        // Include the layout if it exists
        if (isset($layout)) {
            $layoutFile = __DIR__ . '/../../views/layouts/' . $layout . '.php';
            if (file_exists($layoutFile)) {
                require $layoutFile;
            } else {
                echo $content;
            }
        } else {
            echo $content;
        }
    }

    protected function json($data, int $status = 200): void {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    protected function redirect(string $url): void {
        header("Location: $url");
        exit;
    }

    protected function error(string $message, int $code = 400): void {
        http_response_code($code);
        $this->render('error', [
            'message' => $message,
            'code' => $code
        ]);
    }
}
