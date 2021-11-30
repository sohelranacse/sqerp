<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AuthController extends CI_Controller {

	function __construct() {
		header("Access-Control-Allow-Origin: *");
		// header("Access-Control-Allow-Origin: https://programmingd.com");
		header('Access-Control-Allow-Credentials: true');
		header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
		header("Content-Type: application/json; charset=UTF-8");

        parent::__construct();
        $this->load->model('AuthModel');
    }


	public function index()
	{
		echo 'Auth Controller works fine!';
	}

	function login()
	{;
		$data['success'] = false;
		if (!empty($_POST)) {
			$this->form_validation->set_rules('username', 'username', 'trim|required|min_length[4]|max_length[11]');
			$this->form_validation->set_rules('password', 'password', 'trim|required|min_length[3]|max_length[25]');
			if($this->form_validation->run() == TRUE) {

				// form data
				$username = $this->input->post('username');
				$password = $this->input->post('password');
				
				$checkLogin = $this->AuthModel->getLoginInformation($username, md5($password));
				if ($checkLogin->num_rows() > 0) {

					// get user information
					$user_info = $this->AuthModel->getUserInformation($username);

					// push token
		            $user_info->token = generateToken($user_info);

		            $data['response'] = $user_info;
		            $data['success'] = true;
				} else {
					$data['response'] = 'Username or Password doesn not matched!'; // not matched
				}

			} else {
				$data['response'] = 'Wrong credentials!'; // form validation error
			}
		} else {
			$data['response'] = 'Not allowd!';
		}

		echo json_encode($data);
	}


	// test
	function user_info() {
		$data['success'] = false;
		$verifyToken = verifyAuthToken();

		if(verifyAuthToken()) {

			// get user informaiton
			$user_username = $verifyToken->user_username;
			$user_id = $verifyToken->user_id;
			$employee_id = $verifyToken->employee_id;

			$data['response'] = $user_username;
			$data['success'] = true;
		}
		else $data['response'] = "Token is not valid!";

		echo json_encode($data);
	}


}
