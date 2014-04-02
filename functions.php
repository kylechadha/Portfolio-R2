<?php

function __($s){
	return $s;
}

define("prints_format", '/^[\x20-\x7E\x80-\xFF]+$/');

define("name_format", '/^[\w\s]+$/');

define("email_format", "/^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+/");

define("digits_format", '/^[0-9]+$/');

define("chars_format", '/^[0-9A-Za-z_]+$/');

define("symbols_format", '/^[\x21-\x7E]+$/');

define("texts_format", '/^[\x09\x0A\x0D\x20-\x7E\x80-\xFF]+$/');

define("zip_format", '/^[0-9][0-9][0-9][0-9][0-9](-[0-9][0-9][0-9][0-9])?$/');

define("phone_format", '/^(\(( )?\d{2,6}( )?\))?( )?(\d{2,18}(( |\-|( \- )))?){0,8}(\d{1,18}){1,18}$/');

define("float_format", '/^[0-9]+(\\.[0-9]+)?$/');

define("url_format", "~^(?:(?:https?|ftp|telnet)://(?:[a-z0-9_-]{1,32}".

   "(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|".

   "org|mil|edu|arpa|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?".

   "!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:/[a-z0-9.,_@%&".

   "?+=\~/-]*)?(?:#[^ '\"&<>]*)?$~i");



$formats = array(
	'*' => prints_format, 
	"password" => symbols_format,
	"identifier" => chars_format,
	"number" => digits_format, 
	"title" => prints_format,
	"name" => name_format,
	"description" => prints_format,
	"text" => texts_format,
	"email" => email_format,
	"checkbox" => chars_format,
	"url" => url_format, 
	"path" => symbols_format,
	"phone" => phone_format,
	"zip" => zip_format,
	"float" => float_format
);

function checkdata(&$form, $items,$type=1){
	global $formats;
	$errorList = array();

		function setError(&$arr,$msg,$key=""){

			if ($key!=""){

				$arr[$key] = $msg;

			}else{

				$arr[] = $msg;

			}

		}

		foreach($items as $key => $def) {

		//echo $key."<br>";
		if ($type==2) $std = ""; else $std = $key;

			$value = $form[$key];

				$def = $items["$key"];

				if(isset($formats[$def["type"]])){

					

					$curformat = $formats[$def["type"]];

					if ($value=="" && $def['min']>0){

						 setError($errorList,$def['name']." is empty",$std);

					}elseif (strlen($value) < $def['min']) {

            			 setError($errorList,$def['name']."is too short (min ".$def['min']." number of characters)",$std);

        			} elseif (strlen($value) > $def['max']) {

			             setError($errorList,$def['name']." is too long (max ".$def['max']." number of characters)",$std);

			        }

			        elseif ($value != "" && !preg_match($curformat,$value)) {

			             setError($errorList,"Inadmissible ".$def['name'],$std);

			        }

					elseif (($def["type"]=="number"||$def["type"]=="float")&&(isset($def['minv'])&& $value<$def['minv'])) {

			             setError($errorList,$def['name']." must be >=".$def['minv'],$std);

			        }

					elseif (($def["type"]=="number"||$def["type"]=="float")&&(isset($def['maxv'])&& $value>$def['maxv'])) {

			             setError($errorList,$def['name']." must be <=".$def['maxv'],$std);

			        }

			        else {

			        	$value = trim($value," ");

						$form[$key] = $value;

			        }
			}	
		}
		return $errorList;
}
?>