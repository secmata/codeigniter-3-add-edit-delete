<!DOCTYPE html>
<html>
  <head>
    <link rel='stylesheet' href='./public/bower/bootstrap/dist/css/bootstrap.min.css' />
	<link rel='stylesheet' href='./public/bower/bootstrap/dist/css/bootstrap-theme.min.css' />
	<link rel='stylesheet' href='./public/plugins/datatable/media/css/jquery.dataTables.min.css' />

	<script src="./public/bower/jquery/dist/jquery.min.js"></script>
	<script src="./public/bower/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="./public/plugins/datatable/media/js/jquery.dataTables.min.js"></script>
  </head>
  <body>
    <div>
	    <div class="container">
	    	<br><br>
	    	<button class="btn btn-default" onclick="addUser();">Add User</button>
	    	<br><br>
			<table id="table" class="table table-condensed table-striped table-responsive table-hover">
				 <thead>
	                <tr>
	                    <th>First Name</th>
	                    <th>Last Name</th>
	                    <th>Email</th>
	                    <th>Action</th>
	                </tr>
	            </thead>
				<tbody></tbody>
			</table> 
	    </div>
	</div>

	<fieldset>
	 <div  class="modal fade" id="modalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	      <div class="modal-content" >  
	        <div  class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	          <center><strong><h3 class="modal-title" id="modal-title">ADD USER</h3></strong></center>
	        </div>
	        <div id="idMODAL_BODY" class="modal-body" id="p2">
	        	<form id="formUser">
		        	First Name :
		            <input id="firstName" name="firstName" type="text" class="form-control input-default clearModalForm" required ><br>
		            Last Name :
		            <input id="lastName" name="lastName" type="text" class="form-control input-default clearModalForm" required ><br>
		            Email :
		            <input id="email" name="email" type="text" class="form-control input-default clearModalForm" required ><br>
		            Password :
		            <input id="password" name="password" type="password" class="form-control input-default clearModalForm" required ><br>	
	            </form>	           
	        </div>
	        <div class="modal-footer" >
	             <div class="pull-right">
	             	<button id="btnUpdate" class="btn btn-default" onclick="updateUser();">Update</button>
	             	<button id="btnSave" class="btn btn-default" onclick="saveUser();">Save</button>
	             	<a data-dismiss="modal" class="btn btn-default" >Cancel</a>
	             </div>
	        </div>
	      </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	  </div><!-- /.modal --> 
	</fieldset>

    <script type="text/javascript">
    	var varGetUsersData = './app/getUsersData';
    	var varSaveUser = './app/saveUser';
    	var varGetUserEditData = './app/getUserEditData';
    	var varUpdateUser = './app/updateUser';
    	var varDeleteUser = './app/deleteUser';
    </script>

    <script src="./public/js/app/app.js"></script>
  </body>
</html>