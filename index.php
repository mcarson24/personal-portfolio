<?php

use Slim\App;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;

require 'vendor/autoload.php';

// Create app
$app = new \Slim\App([
	'displayErrorDetails' => true
]);

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    $view = new Twig('templates');
    
    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new TwigExtension($container['router'], $basePath));

    return $view;
};

// Render Twig template in route
$app->get('/', function ($request, $response, $args) {
    return $this->view->render($response, 'main.twig');
})->setName('home');

// Run app
$app->run();