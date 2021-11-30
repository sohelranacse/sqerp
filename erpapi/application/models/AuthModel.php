<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class AuthModel extends CI_Model
{

    function getLoginInformation($username, $password) {
        return $this->db->query("SELECT * FROM users WHERE user_username = '$username' AND user_password = '$password'");
    }
    function getUserInformation($username) {
        $query = $this->db->query("
            SELECT a.user_id, a.user_username, a.user_sysacl_role_id, b.employee_id, b.employee_name, b.employee_email
            FROM users a
            INNER JOIN employee_information b ON (a.user_id = b.user_id)
            WHERE a.user_username = '$username'
        ");
        return $query->row();
    }
}
?>