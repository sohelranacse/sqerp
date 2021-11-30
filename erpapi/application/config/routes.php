<?php
defined('BASEPATH') OR exit('No direct script access allowed');



$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route['login'] = 'AuthController/login';

// hrd
$route['search-employee'] = 'Hrd/search_employee';
$route['business-unit'] = 'Hrd/business_unit';

// test
// $route['user-info/(:any)'] = 'AuthController/user_info/$1';
$route['user-info'] = 'AuthController/user_info';
