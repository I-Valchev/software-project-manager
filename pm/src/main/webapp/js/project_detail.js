$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_TASKS = "http://localhost:3000/tasks";
    
    var tasks_table = $("#tasks-table");
    
    function createTask(){
    	
    	var name = $("#task-name-create").val();
    	
    	var type = $('#span-dropdown-create [data-bind="label"]').text();
    	
    	var date_created = $("#date-created-create").val();
    	var date_assigned = $("#date-assinged-create").val();
    	var date_submitted = $("#date-submitted-create").val();
    	var date_completed = $("#date-completed-create").val();
    	var deadline = $("#deadline-create").val();
    	
    	var developer = $("#developer-create").val();
    	
    	var task = {name: name, type: type, developersId: developer, dateCreated: date_created, 
    			dateAssigned: date_assigned, dateSubmitted: date_submitted, dateCompleted: date_completed, deadline: deadline};
    	
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
	
	function clearTable(){
    	tasks_table.children('tbody').empty();
    }
	
	function addTaskToTable(task){
		task.id = 1;
		tasks_table.children('tbody').append($("<tr></tr>")
	    		.append($("<td align=\"center\"><button id='edit-task-button' task-id="+task.id+" data-toggle=\"modal\" data-target=\"#edit-task-modal\" class=\"btn btn-default\">" + 
	    			"<em class=\"fa fa-pencil\"></em></button> <button id='delete-task-button' task-id="+task.id+" class=\"btn btn-danger delete_button\"><em class=\"fa fa-trash\"></em></button></td>"))
	    		.append($("<td></td>").text(task.name))
	    		.append($("<td></td>").text(task.developersId))
	    		.append($("<td></td>").text(task.dateCreated))
	    		.append($("<td></td>").text(task.dateAssigned))
	    		.append($("<td></td>").text(task.dateSubmitted))
	    		.append($("<td></td>").text(task.dateCompleted))
	    		.append($("<td></td>").text(task.deadline)));
	}
	
	function displayTasks(){
	    listTasks().then(function(response){
	    	clearTable();
	    	
	    	$(response).each(function(index, obj){
	    		addTaskToTable(obj);
	    	});
	    });
	}

    $("#create-task-form").submit(function(e){
    	var task = createTask();
    	addTask(task);
    })
    
    function deleteTask(id){
    	return $.ajax(ENDPOINT_TASKS + "/" + id, {
            method: "DELETE"
        });
    }
    
    $("#delete-task-button").click(function(){
    	deleteTask($(this).attr("task-id")).then(function(response){
    		displayTasks();
    	})
    })
    
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
    	
    	$('#span-dropdown-edit [data-bind="label"]').text(task.type);
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
    
    $("#edit-task-button").click(function(){
    	editTask(fakeTask)
    })
    
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