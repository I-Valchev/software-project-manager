$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_TASKS = "http://localhost:3000/tasks";
    
    function createTask(){
    	
    	var name = $("#task-name-create").val();
    	
    	var type = $('[data-bind="label"]').text();
    	
    	var date_created = $("#date-created-create").val();
    	var date_assigned = $("#date-assinged-create").val();
    	var deadline = $("#deadline-create").val();
    	
    	var developer = $("#developer-create").val();
    	
    	var task = {name: name, type: type, developersId: developer, dateCreated: date_created, 
    			dateAssigned: date_assigned, deadline: deadline};
    	
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

    $("#create-task-form").submit(function(e){
    	var task = createTask();
    	alert(task.name + " " + task.type);
    	addTask(task);
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