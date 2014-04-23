<?php
    if(!(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'))) return;
    
	$res = $error = array();
	
	if(isset($_POST)){
	
		require_once('functions.php');
	
		foreach($_POST as $post_index=>$post_value){
		if(!is_array($post_value))
			$_POST[$post_index] = strip_tags(trim(stripcslashes($post_value)));
		}
		
		$j_name = $_POST['user_name'];
		$j_email = $_POST['user_email'];
		
		/* Add your email address here */
		$contact_email = 'kyle.chadha@gmail.com';
		$reply_email = $j_email;
		$reply_name = $j_name;
		$contact_subject = __('Contact Form','am');
		$contact_alt_body = __('To view the message, please use an HTML compatible email viewer!','am');
	
		$valid_items = array(
						 "user_name"=>array("type"=>"title","min"=>1,"max"=>255,"name"=>__('Name','am')),
						 "user_email"=>array("type"=>"email","min"=>1,"max"=>255,"name"=>__('Email','am')),
						 "user_message"=>array("type"=>"text","min"=>1,"max"=>10000,"name"=>__('Comments','am'))
						 );
	
		$errors =  checkdata($_POST, $valid_items);
		
		foreach($errors as $k=>$v){
			$res['error'][] = $k;
		}
			
		if(count($errors)==0)
		{
			$res['succ'] = $valid_items;
			$res['send'] = false;
			
			$body = '<table>';
			
			foreach($valid_items as $item_index=>$item_value){
				$body .= '<tr><td>'.$item_value['name'].':</td><td>'.$_POST[$item_index].'</td></tr>';
			}
			$body .= '</table>';
			require_once('mailer/class.phpmailer.php');
			
			$mail = new PHPMailer();
			
			$body = '<table>';
			
			foreach($valid_items as $item_index=>$item_value){
				$body .= '<tr><td>'.$item_value['name'].':</td><td>'.$_POST[$item_index].'</td></tr>';
			}
			$body .= '</table>';
		
			$mail->SetFrom($reply_email,$reply_name);
			$mail->AddReplyTo($reply_email);
			$mail->AddAddress($contact_email);
			$mail->Subject    = $contact_subject;
			$mail->AltBody    = $contact_alt_body;
			$mail->MsgHTML($body);	
			$mail->Send();
			unset($_POST);
		}
	}
	
	echo json_encode($res);
	exit;
?>