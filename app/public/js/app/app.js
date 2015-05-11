(function($) { 
	$("#table").dataTable({
		"bDestroy" : false,
		"bProcessing": false,
		"bServerSide": false,
        "deferRender": true,
		 "oScroller": {
      		"loadingIndicator": true
    	},
		"aaSorting": [],
		"sAjaxSource": varGetUsersData // target url for  function setup table
	});
})(jQuery);

function addUser(){
	$("#modal-title").html('ADD USER');
	clearModalForm();
	$("#btnUpdate").hide();
	$("#btnSave").show();
	$("#modalForm").modal("toggle");
}

function saveUser(){
	var obj =  $("#formUser").serializeArray();
	//console.log(obj);
	
  	$.ajax({
		url: varSaveUser,
		type: "post",
		data: obj,
		success: function(data){
			var obj = jQuery.parseJSON(data);
			if(obj.status == 'ok'){
				location.reload();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

var varUserID;
function editUser(userID){
	$("#modal-title").html('EDIT USER');
	$("#btnSave").hide();
	$("#btnUpdate").show();
	clearModalForm();
	$("#modalForm").modal("toggle");
	
	varUserID = userID;
	getUserEditData(userID);
}

function getUserEditData(userID){
	//alert(deductionID);
	var obj =  [];
	obj.push({name: 'userID' ,value: userID});
	$.ajax({
		url: varGetUserEditData,
		type: "post",
		data: obj,
		success: function(data){
			var obj = jQuery.parseJSON(data);
			if(obj.status == 'ok'){
				$("#firstName").val(obj.first_name);
				$("#lastName").val(obj.last_name);
				$("#email").val(obj.email);				
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


function updateUser(){
	var obj =  $("#formUser").serializeArray();
	obj.push({name: 'userID' ,value: varUserID});
	//console.log(obj);
  	
  	$.ajax({
		url: varUpdateUser,
		type: "post",
		data: obj,
		success: function(data){
			var obj = jQuery.parseJSON(data);
			if(obj.status == 'ok'){
				location.reload();
			}
			//alert(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


function clearModalForm(){
	$(".clearModalForm").val('');
	
}

function deleteUser(userID){
	var obj =  [];
	obj.push({name: 'userID' ,value: userID});

	$.ajax({
		url: varDeleteUser,
		type: "post",
		data: obj,
		success: function(data){
			var obj = jQuery.parseJSON(data);
			if(obj.status == 'ok'){
				location.reload();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});	
}

/*
function changeStatus(holidayID, status){
	var status;
	if(status){
		status = 1;
		$('label#changeStatus').text('Do you want to activate this data?');
	}else{
		status = 0;
		$('label#changeStatus').text('Do you want to deactivate this data?');
	}

	$("div#changeStatus").dialog({
		resizable: false,
		height:200,
		width:400,
		title: 'Change Status',
		modal: true,
		buttons: [
			{
				text:"Yes",
				"class":'btn',
				click: function() {
					var obj =  [];
					obj.push({name: 'holidayID' ,value: holidayID});
		   			obj.push({name: 'status' ,value: status});
		   			console.log(obj);
					$.ajax({
						url: varUpdateStatus,
						type: "post",
						data: obj,
						success: function(data){
							var obj = jQuery.parseJSON(data);
							if(obj.status == 'ok'){
								//console.log(status);
				    			location.reload();
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log(XMLHttpRequest);
							console.log(textStatus);
							console.log(errorThrown);
						}

					});
				}
			},
			{
				text:"No",
				"class":'btn',
				click: function() {
					$( this ).dialog( "close" );
					var $chk=$('#checkbox' + holidayID);
					$chk.prop('checked',$chk.is(':checked') ? null:'checked');
				}
			}
		]
	});
	$(".ui-dialog-titlebar-close").hide();
}


/*
//for saving function data 
function saveFunction(){	
	$.post(varSaveFunction, { 
		functionName 		:	$('input#functionName').val(),
		description  		:	$('input#description').val(),
		backgroundColor     :	'#' + $('input#backgroundColor').val(),
		backgroundBoxColor 	:	'#' + $('input#backgroundBoxColor').val(),
		selectIcon	  		:	$('input#selectIcon').val(),		
	}, function(data){
		if (data.status == 'ok'){
			location.reload();
		}
	}, "json"); 
}

var varFunctionID;
function editFunction(functionID){
	$("#modalForm").modal("toggle");
	$("h3#modalFormTitle").html('Edit Function');
	$("button#modalBtnSave").hide();
	$("button#modalBtnUpdate").show();
	varFunctionID = functionID;
	getFunction(functionID);
}

function getFunction(functionID){
	$.post(varGetFunction, { functionID : functionID}, function(data){
		if (data.status == 'ok'){
			$('input#functionName')			.val(data.functionName),
			$('input#description')			.val(data.description),
			$('input#backgroundColor')		.val(data.backgroundColor.replace('#','')),
			$('input#backgroundBoxColor')	.val(data.backgroundBoxColor.replace('#','')),
			$('input#selectIcon')			.val(data.selectIcon)	
		}
	}, "json");  
}

function updateFunction(){	
	$.post(varUpdateFunction, { 
		functionName 		:	$('input#functionName').val(),
		description  		:	$('input#description').val(),
		backgroundColor     :	'#' + $('input#backgroundColor').val(),
		backgroundBoxColor 	:	'#' + $('input#backgroundBoxColor').val(),
		selectIcon	  		:	$('input#selectIcon').val(),	
		functionID 			:   varFunctionID	
	}, function(data){
		if (data.status == 'ok'){
			location.reload();
		}
	}, "json"); 
}


//delete user function
function deleteFunction(functionID){	
	$("#divDelete" ).dialog({
		resizable: false,
		height:200,
		width:350,
		title: 'Delete Function',
		modal: true,
		buttons: [
			{
				text:"Yes",
				"class":'btn',
				click: function() {
					$.post(varDeleteFunction, { functionID : functionID }, function(data){
						if (data.status == 'ok'){ 
							//alert('ok');
							location.reload();
						}else{
							alert('try again later');
						}	
					}, "json");          
				}
			},
			{
				text:"No",
				"class":'btn',
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});
}

function changeStatus(functionCategoryID, status){
	var status;
	if(status){
		status = 1;
		$('label#changeStatus').text('Do you want to activate this data?');
	}else{
		status = 0;
		$('label#changeStatus').text('Do you want to deactivate this data?');
	}

	$("div#changeStatus").dialog({
		resizable: false,
		height:200,
		width:400,
		title: 'Change Status',
		modal: true,
		buttons: [
			{
				text:"Yes",
				"class":'btn',
				click: function() {
					var obj =  [];
					obj.push({name: 'functionCategoryID' ,value: functionCategoryID});
		   			obj.push({name: 'status' ,value: status});
					$.ajax({
						url: varChangeFunctionCatategoryStatus,
						type: "post",
						data: obj,
						success: function(data){
							var obj = jQuery.parseJSON(data);
							if(obj.status == 'ok'){
								//console.log(status);
				    			location.reload();
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log(XMLHttpRequest);
							console.log(textStatus);
							console.log(errorThrown);
						}

					});
				}
			},
			{
				text:"No",
				"class":'btn',
				click: function() {
					$( this ).dialog( "close" );
					var $chk=$('#checkbox' + functionCategoryID);
					$chk.prop('checked',$chk.is(':checked') ? null:'checked');
				}
			}
		]
	});
}
------------------------------------------------===============--------------------------------------------------
*/
/*

//for dtpicker
if (typeof $.fn.bdatepicker == 'undefined')
    $.fn.bdatepicker = $.fn.datepicker.noConflict();

(function($) { 

	function fnInitCompleteCallback(that){
		var p = that.parents('.dataTables_wrapper').first();
		var l = p.find('.row').find('label');

		l.each(function(index, el){
			var iw = $("<div>").addClass('col-md-8').appendTo($(el).parent());
			$(el).parent().addClass('form-group margin-none').parent().addClass('form-horizontal');
			$(el).find('input, select').addClass('form-control').removeAttr('size').appendTo(iw);
			$(el).addClass('col-md-4 control-label');
		});

		//var s = p.find('select');
		//s.addClass('.selectpicker').selectpicker();
	}

	$('#table').dataTable({
		"bAutoWidth": false , 
		aoColumns : [
	      { "sWidth": "30%"},
	      { "sWidth": "60%"},
	      { "sWidth": "5%"},
	      { "sWidth": "5%"},
	    ],
		"bDestroy" : true,
		"bRetrieve" : true,
		"bProcessing": false,
		"bServerSide": false,
        "deferRender": true,
		 "oScroller": {
      		"loadingIndicator": true
    	},
		"aaSorting": [],
		"sAjaxSource": varGetHolidaysData, 
		//colvis______________________
		"sPaginationType": "bootstrap",
		"sDom": "<'row separator bottom'<'col-md-3'f><'col-md-3'l><'col-md-6'C>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
		"oLanguage": {
			"sLengthMenu": "_MENU_ per page"
		},
		"oColVis": {
			"buttonText": "Show / Hide Columns",
			"sAlign": "right"
		},
		"sScrollX": "100%",
       	"sScrollXInner": "100%",
        "bScrollCollapse": true,
		"fnInitComplete": function () {
	    	fnInitCompleteCallback(this);
        }
	});

	//$('#newsletter').checkbox('check');

	$('div#date').bdatepicker({
		autoclose: true,
		format: 'yyyy-mm-dd',
		startDate: "2013-02-14",
		todayBtn: true
	});

})(jQuery);	


*/