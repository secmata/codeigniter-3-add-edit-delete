<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Mod_app  extends CI_Model{

    public function getUsersData(){
        $query_str = '  
            SELECT
            id,
            first_name,
            last_name,
            email
            
            FROM users

            ORDER BY id DESC
        ';
                        
        $result = $this->db->query($query_str);
        return $result;
    } 

    public function saveUser($first_name, $last_name, $email, $password){
        $query_str = '
            INSERT INTO users(
                first_name,
                last_name,
                email,
                password
            )
            VALUES (?, ?, ?, ?)
        '; 

        $this->db->query($query_str, array($first_name, $last_name, $email, $password));
    }

    public function getUserEditData($userID){
        $query_str = '  
            SELECT 
            first_name,
            last_name,
            email,
            password
            FROM users
            WHERE id=?
        ';

        $result = $this->db->query($query_str, $userID);
        return $result;
    }

    public function updateUser($first_name, $last_name, $email, $userID){
        $query_str = '
            UPDATE users
            SET
            first_name  =?,
            last_name   =?,
            email       =?
            WHERE id    =?
        '; 

        $this->db->query($query_str, array($first_name, $last_name, $email, $userID));
    }

    public function deleteUser($userID){
        $query_str = '
            DELETE FROM users 
            WHERE id=?
        '; 

        $this->db->query($query_str, $userID); 
    }

}