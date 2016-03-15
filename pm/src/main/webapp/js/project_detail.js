$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_TASKS = "http://localhost:3000/tasks";
    var ENDPOINT_COMMENTS = "http://localhost:3000/taskcomments";
    var DETAIL_PROJECT_URL = "detailProjectDisplay";
    var PROJECT_ID = null;
    
    var tasks_table = $("#tasks-table");
    
    function createTask(){
    	var projectId = PROJECT_ID;
    	var name = $("#task-name-create").val();
    	var type = $('#span-dropdown-create').text();
    	var date_created = $("#date-created-create").val();
    	var date_assigned = $("#date-assinged-create").val();
    	var date_submitted = $("#date-submitted-create").val();
    	var date_completed = $("#date-completed-create").val();
    	var deadline = $("#deadline-create").val();
    	
    	var developer = $("#developer-create").val();
    	
    	var task = {name: name, type: type, developersId: developer, dateCreated: date_created, 
    			dateAssigned: date_assigned, dateSubmitted: date_submitted, dateCompleted: date_completed, deadline: deadline, projectId: projectId};
    	
    	return task;
    }

    function addTask(task){
    	var createPromise = $.ajax(ENDPOINT_TASKS, {
    		method: "POST",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify(task),
    		dataType: "json"
    	}).then(function(response) {
    		displayTasks();
    		return response;
    	});
    }
	
	function getTask(id){
		return $.ajax(ENDPOINT_TASKS + "/" + id, {
			method: "GET",
			dataType: "json"
		});
	}
	
    function listTasks(project_id) {       
        return $.ajax(ENDPOINT_TASKS, {
			method: "GET",
			data: {
				projectId: project_id
			},
			dataType: "json"
		});
    }
	
	function clearTable(){
    	tasks_table.children('tbody').empty();
    }
	
	function addTaskToTable(task){
		tasks_table.children('tbody').append($("<tr></tr>")
	    		.append($("<td align=\"center\"><button id='comments-task-button' data-toggle=\"modal\" data-target=\"#comments-modal\" data-task-id="+task.id+" class='btn btn-default'><em class='fa fa-commenting'></em></button> <button id='edit-task-button' data-task-id="+task.id+" data-toggle=\"modal\" data-target=\"#edit-task-modal\" class=\"btn btn-default\">" + 
	    			"<em class=\"fa fa-pencil\"></em></button> <button id='delete-task-button' data-task-id="+task.id+" class=\"btn btn-danger delete_button\"><em class=\"fa fa-trash\"></em></button></td>"))
	    		.append($("<td></td>").text(task.name))
	    		.append($("<td></td>").text(task.type))
	    		.append($("<td></td>").text(task.developersId))
	    		.append($("<td></td>").text(task.dateCreated))
	    		.append($("<td></td>").text(task.dateAssigned))
	    		.append($("<td></td>").text(task.dateSubmitted))
	    		.append($("<td></td>").text(task.dateCompleted))
	    		.append($("<td></td>").text(task.deadline)));
	}
	
	function displayTasks(project_id){
	    listTasks(project_id).then(function(response){
	    	clearTable();
	    	
	    	$(response).each(function(index, obj){
	    		addTaskToTable(obj);
	    	});
	    });
	}

    $("#create-task-form").submit(function(e){
    	e.preventDefault();
    	var task = createTask();
    	addTask(task);
    	$("#create-task-modal").modal('hide');
    })
    
    function deleteTask(id){
    	return $.ajax(ENDPOINT_TASKS + "/" + id, {
            method: "DELETE"
        });
    }

    $(document).on("click", "#delete-task-button", function(){
    	deleteTask($(this).attr("data-task-id")).then(function(response){
    		displayTasks(PROJECT_ID);
    	})
	});
    
    function updateTask(task){
    	$.ajax(ENDPOINT_TASKS + "/" + task.id, {
    		method: "PUT",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify({
    			name: task.name,
    			type: task.type,
    			dateCreated: task.dateCreated,
    			dateAssigned: task.DateAssigne,
    			dateSubmitted: task.dateSubmitted,
    			dateCompleted: task.dateCompleted,
    			deadline: task.deadline,
    			developersId: task.developersId
    		}),
    		dataType: "json"
    	}).then(function(response) {
    		console.log(response);
    	});
    }
    
    function getEditedTask(){
    	var name = $("#task-name-edit").val();
    	
    	var type = $('#span-dropdown-edit [data-bind="label"]').text();
    	
    	var date_created = $("#date-created-edit").val();
    	var date_assigned = $("#date-assinged-edit").val();
    	var date_submitted = $("#date-submitted-edit").val();
    	var date_completed = $("#date-completed-edit").val();
    	var deadline = $("#deadline-edit").val();
    	
    	var developer = $("#developer-edit").val();
    	
    	var task = {name: name, type: type, developersId: developer, dateCreated: date_created, 
    			dateAssigned: date_assigned, dateSubmitted: date_submitted, dateCompleted: date_completed, deadline: deadline};
    	
    	return task;
    }
    
    function editTask(task){
    	$("#task-name-edit").val(task.name);
    	$('#span-dropdown-edit').text(task.type);
    	$("#date-created-edit").val(task.dateCreated);
    	$("#date-assinged-edit").val(task.dateAssigned);
        $("#date-submitted-edit").val(task.dateSubmitted);
    	$("#date-completed-edit").val(task.dateCompleted);
    	$("#deadline-edit").val(task.deadline);
    	$("#developer-edit").val(task.developersId);
    	
    	$("#edit-task-form").submit(function(e){
    		var new_task = getEditedTask();
    		new_task.id = task.id;
    		updateTask(new_task);
    	})
    }
    
    $(document).on("click", "#edit-task-button", function(e){
    	var taskId = $(this).attr("data-task-id");
    	getTask(taskId).then(function(response){
    		editTask(response);
    	});
	});
    
    function listTaskComments(task_id) {       
        return $.ajax(ENDPOINT_COMMENTS, {
			method: "GET",
			data: {
				tasksId: task_id
			},
			dataType: "json"
		});
    }
    
    $(document).on("click", "#comments-task-button", function(e){
    	var taskId = $(this).attr("data-task-id");
    	listTaskComments(taskId).then(function(response){
    		clearComments();
	    	
	    	$(response).each(function(index, obj){
	    		console.log(obj);
	    		addComment(obj);
	    	});
    	})
    })
    
    function clearComments(){
    	$("#comment-row").empty();
    }
    
    function addComment(comment){
    	$("#comments-row").append("<div class='col-sm-10'> <div class='panel panel-default'> <div class='panel-heading'> <strong>"+comment.usersId+"</strong> <span class='text-muted'>commented on "+comment.date+"</span> </div> <div class='panel-body'>"+comment.content+"</div> </div> </div>")
    }
    
    function getProjectIdFromURL(){
    	
    	if(window.location.href.indexOf(DETAIL_PROJECT_URL) != -1)
    		return window.location.href.substr(window.location.href.indexOf(DETAIL_PROJECT_URL)+DETAIL_PROJECT_URL.length +1)
    	return null
    }
    
    function handleDetailedProject(){
    	PROJECT_ID = getProjectIdFromURL();
    	if(PROJECT_ID != null)
    		displayTasks(PROJECT_ID);
    }
    
    handleDetailedProject();
    
    /* DROPDOWN */
    
    $(document.body).on('click', '#dropdown-create li', function(event) {

        var $target = $(event.currentTarget);

        $target.closest('.btn-group')
           .find('[data-bind="label"]').text($target.text())
           .end()
           .children('.dropdown-toggle').dropdown('toggle');

        return false;

     });
    
});