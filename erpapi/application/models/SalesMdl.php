<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class SalesMdl extends CI_Model
{

	function get_item_type() {
		$role_id = $this->verifyToken->user_sysacl_role_id;
		$in_role_id = "";
		if ($role_id == 81) {
			$in_role_id = "WHERE Type_id IN (13,17,20)";
		}
		$query = $this->db->query("SELECT * FROM sales_item_type $in_role_id ORDER BY Item_Type");
        return $query->result();
	}

	function daily_sales_and_collection_report($type_id, $from_date, $todate) {
		$loggedRoleID = $this->verifyToken->user_sysacl_role_id;
		$query="";
     	$ADD_Type_ID = " ";$ADD_Type_ID_1=" "; $ADD_Type_ID_2 = " ";
		if($loggedRoleID == 91){
			$Distributor_Item_Type = $this->report_mdl->get_distributor_item_type();
			$Result_Type_id = '';
			foreach($Distributor_Item_Type AS $RowType_ID){
				$Result_Type_id .= $RowType_ID->Type_id.",";
			}
			$RowType_ID = rtrim($Result_Type_id,',');
			$ADD_Type_ID = " AND b.Item_Type IN(" . $RowType_ID . ") ";
			$ADD_Type_ID_1 = " AND b.Type_id IN(" . $RowType_ID . ") ";
			$ADD_Type_ID_2 = " AND c.Item_Type IN(" . $RowType_ID . ") ";
		}
			
		if(($type_id=="ALL") && $loggedRoleID !=81)
			{
				$query = $this->db->query("SELECT * FROM (SELECT Center_Name,Organization_id,sum( Gross_Sale ) AS Gross_Sale, sum( Total_Sale ) AS Total_Sale, sum( Total_Collection ) AS Total_Collection, sum( return_price) return_price FROM ( SELECT DISTINCT Center_Name,b.Organization_id, sum( c.Total_price ) AS Gross_Sale,SUM( c.Sales_price ) AS Total_Sale, 0 AS Total_Collection, 0 as return_price FROM sales_organization_information a, product_sales_agent_master b, product_sales_agent_detail c WHERE a.Organization_id = b.Organization_id AND b.sales_id = c.sales_id AND a.Organization_type =1 $ADD_Type_ID AND b.Sales_date BETWEEN '$from_date' AND '$todate' AND b.Transaction_posting_type =2 GROUP BY b.Organization_id 
	
			UNION ALL 
	  
				SELECT DISTINCT Center_Name,b.Organization_id,0 AS Gross_Sale, 0 AS Total_Sale, SUM( c.Pay_amount ) AS Total_Collection,0 as return_price FROM sales_organization_information a, payment_collection_agent_master b, payment_collection_agent_detail c WHERE a.Organization_id = b.Organization_id AND b.Payment_id = c.Payment_id AND a.Organization_type =1 $ADD_Type_ID_1 AND b.Payment_date BETWEEN '$from_date' AND '$todate' GROUP BY b.Organization_id
	   
			UNION ALL 
	   
				SELECT d.center_name,c.organization_id, 0 AS Gross_Sale,0 as Total_Sale,0 AS Total_Collection,sum(RETURN_PRICE) return_price FROM product_sales_agent_return_master a, product_sales_agent_return_detail b, product_sales_agent_master c, sales_organization_information d WHERE a.Sales_return_id = b.Sales_return_id AND a.sales_id=c.sales_id AND c.organization_id=d.organization_id AND d.Organization_type=1 $ADD_Type_ID_2 AND a.Return_date BETWEEN '$from_date' AND '$todate' AND a.Transaction_type =2 group by d.center_name,c.organization_id )a GROUP BY Center_Name)www ORDER BY Gross_Sale DESC");
		}
		elseif(($type_id=="ALL" ||$type_id=="" || $type_id==NULL) && $loggedRoleID==81)
		{
			$query = $this->db->query("SELECT * FROM (SELECT Center_Name,Organization_id,sum( Gross_Sale ) AS Gross_Sale, sum( Total_Sale ) AS Total_Sale, sum( Total_Collection ) AS Total_Collection, sum( return_price) return_price FROM ( SELECT DISTINCT Center_Name,b.Organization_id, sum( c.Total_price ) AS Gross_Sale,SUM( c.Sales_price ) AS Total_Sale, 0 AS Total_Collection, 0 as return_price FROM sales_organization_information a, product_sales_agent_master b, product_sales_agent_detail c WHERE a.Organization_id = b.Organization_id AND b.sales_id = c.sales_id AND a.Organization_type =1 AND b.Sales_date BETWEEN '$from_date' AND '$todate' AND b.Item_Type IN(13,17,20) AND b.Transaction_posting_type =2 GROUP BY b.Organization_id 
	 
			UNION ALL 
	  
				SELECT DISTINCT Center_Name,b.Organization_id,0 AS Gross_Sale, 0 AS Total_Sale, SUM( c.Pay_amount ) AS Total_Collection,0 as return_price FROM sales_organization_information a, payment_collection_agent_master b, payment_collection_agent_detail c WHERE a.Organization_id = b.Organization_id AND b.Payment_id = c.Payment_id AND a.Organization_type =1 AND b.Type_id IN(13,17,20) AND b.Payment_date BETWEEN '$from_date' AND '$todate' GROUP BY b.Organization_id
	   
			UNION ALL 
	   
				SELECT d.center_name,c.organization_id,0 AS Gross_Sale,0 as Total_Sale,0 AS Total_Collection,sum(RETURN_PRICE) return_price FROM product_sales_agent_return_master a, product_sales_agent_return_detail b, product_sales_agent_master c, sales_organization_information d WHERE a.Sales_return_id = b.Sales_return_id AND a.sales_id=c.sales_id and c.organization_id=d.organization_id and d.organization_type=1 and a.Return_date BETWEEN '$from_date' AND '$todate' AND c.Item_Type IN(13,17,20) AND a.Transaction_type =2 group by d.center_name,c.organization_id )a GROUP BY Center_Name)www ORDER BY Gross_Sale DESC");
		}
		else
		{
			$query = $this->db->query("SELECT * FROM (SELECT Center_Name,Organization_id,sum( Gross_Sale ) AS Gross_Sale, sum( Total_Sale ) AS Total_Sale, sum( Total_Collection ) AS Total_Collection, sum( return_price) return_price FROM ( SELECT DISTINCT Center_Name,b.Organization_id, sum( c.Total_price ) AS Gross_Sale,SUM( c.Sales_price ) AS Total_Sale, 0 AS Total_Collection, 0 as return_price FROM sales_organization_information a, product_sales_agent_master b, product_sales_agent_detail c WHERE a.Organization_id = b.Organization_id AND b.sales_id = c.sales_id AND a.Organization_type =1 AND b.Sales_date BETWEEN '$from_date' AND '$todate' AND b.Item_Type=$type_id AND b.Transaction_posting_type =2 GROUP BY b.Organization_id 
	 
			UNION ALL 
	  
				SELECT DISTINCT Center_Name,b.Organization_id,0 AS Gross_Sale, 0 AS Total_Sale, SUM( c.Pay_amount ) AS Total_Collection,0 as return_price FROM sales_organization_information a, payment_collection_agent_master b, payment_collection_agent_detail c WHERE a.Organization_id = b.Organization_id AND b.Payment_id = c.Payment_id AND a.Organization_type =1 AND b.Type_id=$type_id AND b.Payment_date BETWEEN '$from_date' AND '$todate' GROUP BY b.Organization_id
	   
			UNION ALL 
	   
				SELECT d.center_name,c.organization_id,0 AS Gross_Sale,0 as Total_Sale,0 AS Total_Collection,sum(RETURN_PRICE) return_price FROM product_sales_agent_return_master a, product_sales_agent_return_detail b, product_sales_agent_master c, sales_organization_information d WHERE a.Sales_return_id = b.Sales_return_id AND a.sales_id=c.sales_id and c.organization_id=d.organization_id and d.organization_type=1 and a.Return_date BETWEEN '$from_date' AND '$todate' AND c.Item_Type=$type_id AND a.Transaction_type =2 group by d.center_name,c.organization_id )a GROUP BY Center_Name)www ORDER BY Gross_Sale DESC");
		}
		return $query->result();
	}

}