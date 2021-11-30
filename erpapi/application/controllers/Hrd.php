<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Hrd extends CI_Controller {

	function __construct() {		
		parent::__construct();		
		if(!verifyAuthToken()) {
			$data['response'] = "Token is not valid!";
			echo json_encode($data);
			exit();
		}

		// get login information
		$this->verifyToken = verifyAuthToken();

		// load model
        $this->load->model('HrdModel');
    }

	function search_employee()
	{
		$data['success'] = false;

		if (!empty($_POST)) {
			$this->form_validation->set_rules('com_id', 'com_id', 'trim|required|min_length[3]|max_length[3]');
			if($this->form_validation->run() == TRUE) {
				
				$result = $this->HrdModel->search_employee();

				$data['response'] = $result;
		        $data['success'] = true;

			} else {
				$data['response'] = 'Wrong input!'; // form validation error
			}
		} else {
			$data['response'] = 'Not allowd!';
		}

		echo json_encode($data);
	}
	function business_unit() {
		$data['success'] = false;

		$result = $this->HrdModel->get_all_business_unit();
		$data['response'] = $result;
        $data['success'] = true;

		echo json_encode($data);
	}


}
