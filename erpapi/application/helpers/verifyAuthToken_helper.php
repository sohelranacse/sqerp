<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	if ( ! function_exists('generateToken')) {	
		function generateToken($data) {
			$jwt = new JWT();
			$JwtSecretKey = "MdSohelRanaMnbvcxz1!";
			return $jwt->encode($data, $JwtSecretKey, 'HS256');
		}
	}

	if ( ! function_exists('verifyAuthToken')) {	
		function verifyAuthToken() {
			$jwt = new JWT();
			$JwtSecretKey = "MdSohelRanaMnbvcxz1!";

			// extract headers
			$headers = apache_request_headers();
			
			if (!isset($headers['token'])) {
				return false;
			}
			try {
				$tokenValue = $headers['token'];
				$token = explode(' ', $tokenValue);
				if (array_key_exists(1, $token))
					return $jwt->decode($token[1], $JwtSecretKey, 'HS256');
					// return $jwt->jsonEncode($decode);
			} catch (Exception $e) {
				return false;
			}
		}
	}

	if ( ! function_exists('getToken')) {	
		function getToken() {
			$headers = apache_request_headers();
			return $headers['token'];
		}
	}