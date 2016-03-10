$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_TASKS = "http://localhost:3000/tasks";
    
    var tasks_table = $("#tasks-table");
    
    function createTask(){
    	
    	var name = $("#task-name-create").val();
    	
    	var type = $('[data-bind="label"]').text();
    	
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
	
	function clearTable(){
    	tasks_table.children('tbody').empty();
    }
	
	function addTaskToTable(task){
		task.id = 1;
		projects_table.children('tbody').append($("<tr></tr>")
	    		.append($("<td align=\"center\"><a class=\"btn btn-default\">" + 
	    			"<em class=\"fa fa-pencil\"></em></a> <button id='delete-task-button' task-id="+task.id+" class=\"btn btn-danger delete_button\"><em class=\"fa fa-trash\"></em></button></td>"))
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
    
    /* DROPDOWN */
    
    $(document.body).on('click', '.dropdown-menu li', function(event) {

        var $target = $(event.currentTarget);

        $target.closest('.btn-group')
           .find('[data-bind="label"]').text($target.text())
           .end()
           .children('.dropdown-toggle').dropdown('toggle');

        return false;

     });
    
});