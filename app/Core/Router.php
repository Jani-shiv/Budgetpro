<?php
declare(strict_types=1);

namespace App\Core;

class Router {
    private array $routes = [];
    private string $defaultController = 'Dashboard';
    private string $defaultAction = 'index';

    public function add(string $method, string $path, string $controller, string $action): void {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'controller' => $controller,
            'action' => $action
        ];
    }

    public function dispatch(string $method, string $uri): void {
        $method = strtoupper($method);
        $uri = parse_url($uri, PHP_URL_PATH);
        $uri = trim($uri, '/');

        // Find matching route
        foreach ($this->routes as $route) {
            if ($route['method'] === $method && $this->matchPath($route['path'], $uri)) {
                $controllerName = "App\\Controllers\\{$route['controller']}Controller";
                $controller = new $controllerName();
                $action = $route['action'];
                
                if (method_exists($controller, $action)) {
                    $controller->$action();
                    return;
                }
            }
        }

        // No route found - try default controller/action
        if (empty($uri)) {
            $controllerName = "App\\Controllers\\{$this->defaultController}Controller";
            $controller = new $controllerName();
            $controller->{$this->defaultAction}();
            return;
        }

        // 404 Not Found
        http_response_code(404);
        echo '404 Not Found';
    }

    private function matchPath(string $routePath, string $uri): bool {
        return $routePath === $uri;
    }
}
