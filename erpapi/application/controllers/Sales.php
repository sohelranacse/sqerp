<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sales extends CI_Controller {

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
        $this->load->model('SalesMdl');
    }

	function get_item_type() {
		$result = $this->SalesMdl->get_item_type();
		$data['response'] = $result;
        $data['success'] = true;
		echo json_encode($data);

	}
	function daily_sales_and_collection_report($Type_id, $from_date, $to_date) {
		$result = $this->SalesMdl->daily_sales_and_collection_report($Type_id, $from_date, $to_date);
		$data['response'] = $result;
        $data['success'] = true;
		echo json_encode($data);
	}




}