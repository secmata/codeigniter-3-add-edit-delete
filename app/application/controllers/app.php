<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function __construct(){
		parent::__construct();
		$this->load->model('Mod_app', 'App');
	}

	public function index()
	{
		$this->load->view('app');
	}

	public function getUsersData(){
		$getUsersData = $this->App->getUsersData()->result();
		//print_r($getUsersData);

		if($getUsersData){
			foreach($getUsersData as $key => $user) {
				$data[$key] = array(
					$user->first_name,
					$user->last_name,
					$user->email,
					'<button class="btn btn-xs btn-default" onclick="editUser(\''. $user->id .'\');">Edit</button>
					<button class="btn btn-xs btn-default" onclick="deleteUser(\''. $user->id .'\');">Delete</button>'
				);
			}
		}else{
			$data=array();
		}

		echo json_encode(array('aaData'=> array_filter($data)));
		exit();
	}

	public function saveUser(){
		$first_name = $this->input->post('firstName');
		$last_name = $this->input->post('lastName');
		$email = $this->input->post('email');
		$password = md5($this->input->post('password'));
    	
    	$this->App->saveUser($first_name, $last_name, $email, $password);
    	
    	$result = array('status' => 'ok');
        echo json_encode($result);
        exit();
	}

	public function getUserEditData(){
		$userID = $this->input->post('userID');
    	$getUserEditData = $this->App->getUserEditData($userID)->result();
    	//print_r($getUserEditData);
    	$userData = $getUserEditData[0];
 
    	$result = array(
    		'status' 		=> 'ok',
			'first_name'	=> $userData->first_name,
			'last_name'		=> $userData->last_name,
			'email'			=> $userData->email,
			'password'		=> $userData->password
    	);

        echo json_encode($result);
        exit();
	}

	public function updateUser(){
		$first_name = $this->input->post('firstName');
		$last_name = $this->input->post('lastName');
		$email = $this->input->post('email');
		$userID = $this->input->post('userID');

    	$this->App->updateUser($first_name, $last_name, $email, $userID);

    	$result = array('status' => 'ok');
        echo json_encode($result);
        exit();
	}

	public function deleteUser(){
		$userID = $this->input->post('userID');
		$this->App->deleteUser($userID);

		$result = array('status' => 'ok');
        echo json_encode($result);
        exit();
	}
}
