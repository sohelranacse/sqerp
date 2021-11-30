<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class HrdModel extends CI_Model
{
    function search_employee() {
        $com_id = $this->input->post('com_id');
        $and_com_id = "";
        if ($com_id !== "ALL") {
            $and_com_id = "AND a.com_id = $com_id";
        }
        $query = $this->db->query("
            SELECT a.*, b.name AS company_name, 
                b.address AS company_address,
                c.designation_name,
                t.hr_designation_name,
                d.Department_name,
                e.employee_name AS supervisor_name,
                s.salary AS em_salary,
                f.business_function_name,
                g.division_name,
                h.thana_name,
                i.union_name,
                j.highest_education_name,
                k.posting_location_name,
                l.district_name
            FROM employee_information a 
            LEFT JOIN company b ON (a.com_id = b.com_id)
            LEFT JOIN designation c ON (a.designation_id = c.designation_id)
            LEFT JOIN hr_designation t ON (a.hr_designation_id = t.hr_designation_id)
            LEFT JOIN department_information  d ON (a.Department_id = d.Department_id)
            LEFT JOIN employee_information e ON (a.supervisor = e.employee_id)
            LEFT JOIN hr_business_function f ON (a.business_function_id = f.business_function_id)
            LEFT JOIN division_information g ON (a.division_id = g.division_id)
            LEFT JOIN thana_information h ON (a.thana_id = h.thana_id)
            LEFT JOIN union_information i ON (a.union_id = i.union_id)
            LEFT JOIN hr_highest_education j ON (a.highest_education_id = j.highest_education_id)
            LEFT JOIN hr_posting_location k ON (a.posting_location = k.posting_location)
            LEFT JOIN district_information l ON (a.district_id = l.district_id)
            LEFT JOIN hr_employees_salary s ON (a.employee_id = s.employee_id)
            WHERE s.salary_id IN (select MAX(salary_id) from hr_employees_salary group by employee_id)
            AND a.active_status = 1
            $and_com_id
            ORDER BY a.business_function_id, a.Department_id
        ");
        return $query->result();
    }
    function get_all_business_unit() {
        $query = $this->db->query("SELECT com_id, name as company_name, short_name, address FROM company ORDER BY name");
        return $query->result();
    }














}