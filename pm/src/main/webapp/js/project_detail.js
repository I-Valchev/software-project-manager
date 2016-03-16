$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_TASKS = "http://localhost:3000/tasks";
    var ENDPOINT_COMMENTS = "http://localhost:3000/taskcomments";
    var DETAIL_PROJECT_URL = "detailProjectDisplay";
    var PROJECT_ID = null;
    
    var tasks_table = $("#tasks-table");
    
    function endpointTask(id){
    	return ENDPOINT_TASKS = "http://localhost:3000/tasks" + "/" + id;
    }
    
    
    function createTask(){
    	var projectId = PROJECT_ID;
    	var name = $("#task-name-create").val();
    	var type = $('#span-dropdown-create').text();
    	var date_created = $("#date-created-create").val();
    	var date_assigned = $("#date-assigned-create").val();
    	var date_submitted = $("#date-submitted-create").val();
    	var date_completed = $("#date-completed-create").val();
    	var deadline = $("#deadline-create").val();
    	
    	var developer = $("#developer-create").val();
    	
    	var task = {name: name, type: type, developersId: developer, dateCreated: date_created, 
    			dateAssigned: date_assigned, dateSubmitted: date_submitted, dateCompleted: date_completed, deadline: deadline, projectId: projectId};
    	
    	$("#task-name-create").val("");
    	$('#span-dropdown-create').text("Select type")
    	$("#date-created-create").val("");
    	$("#date-assigned-create").val("");
    	$("#date-submitted-create").val("");
    	$("#date-completed-create").val("");
    	$("#deadline-create").val("");
    	$("#developer-create").val("");
    	
    	//TODO Developer should be dropdown, not text input field
    	
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
		return $.ajax(endpointTask(id), {
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
		var action_column = $("<td align='center'></td>");
		
		var comments_button = $("<button id='comments-task-button' data-toggle='modal' data-target='#comments-modal' class='btn btn-default'></button>");
		comments_button.attr("data-task-id", task.id);
		var em_comment_icon = $("<em class='fa fa-commenting'></em>");
		comments_button.append(em_comment_icon);
		action_column.append(comments_button);
		
		var edit_button = $("<button id='edit-task-button' data-toggle='modal' data-target='#edit-task-modal' class='btn btn-default'></button>");
		var em_edit_icon = $("<em class='fa fa-pencil'></em>");
		edit_button.attr("data-task-id", task.id);
		edit_button.append(em_edit_icon);
		action_column.append(edit_button);
		
		var delete_button = $("<button id='delete-task-button' class='btn btn-danger'></button>");
		delete_button.attr("data-task-id", task.id);
		var em_delete_icon = $("<em class='fa fa-trash'></em>");
		delete_button.append(em_delete_icon);
		action_column.append(delete_button);
		
		tasks_table.children('tbody')
			.append($("<tr></tr>")
			.append(action_column)
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
    	return $.ajax(endpointTask(id), {
            method: "DELETE"
        });
    }

    $(document).on("click", "#delete-task-button", function(){
    	deleteTask($(this).attr("data-task-id")).then(function(response){
    		displayTasks(PROJECT_ID);
    	})
	});
    
    function updateTask(task){
    	$.ajax(endpointTask(task.id), {
    		method: "PUT",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify({
    			name: task.name,
    			type: task.type,
    			dateCreated: task.dateCreated,
    			dateAssigned: task.dateAssigned,
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
    	
    	var type = $('#span-dropdown-edit').text();
    	var date_created = $("#date-created-edit").val();
    	var date_assigned = $("#date-assigned-edit").val();
    	var date_submitted = $("#date-submitted-edit").val();
    	var date_completed = $("#date-completed-edit").val();
    	var deadline = $("#deadline-edit").val();
    	var developer = $("#span-dropdown-developers-edit").attr("data-developer-id");

    	var task = {name: name, type: type, developersId: developer, dateCreated: date_created, dateAssigned: date_assigned, dateSubmitted: date_submitted, dateCompleted: date_completed, deadline: deadline};

    	return task;
    }
    
    function editTask(task){
    	function addDeveloperToEdit(task, developerId){
    		getDevelopers().then(function(response){
        		
        		function addDeveloperToList(developer){
        			getUser(developer.usersId).then(function(response){
        				var list_developers = $("#dropdown-developers-edit");
        				
        				var li = $("<li></li>");
        				li.attr("data-developer-id", developerId);
        				
        				var anchor =$("<a href='#'></a>");
        				anchor.text(response.username);
        				li.append(anchor);

        				list_developers.append(li);
        				
        			})
        		}
        		
        		$(response).each(function(index, obj){
    	    		addDeveloperToList(obj);
    	    	});
        		
        		getDeveloper(developerId).then(function(response){
        			getUser(response.usersId).then(function (user){
        				$("#span-dropdown-developers-edit").attr("data-developer-id", developerId);
        				$("#span-dropdown-developers-edit").text(user.username);
        			})
        		})
        		
        		$("#span-dropdown-developers-edit").attr("data-developer-id", developerId);
        	});
		}
    	
    	//TODO Developer should be dropdown, not text input field
    	$("#task-name-edit").val(task.name);
    	$('#span-dropdown-edit').text(task.type);
    	$("#date-created-edit").val(task.dateCreated);
    	$("#date-assigned-edit").val(task.dateAssigned);
        $("#date-submitted-edit").val(task.dateSubmitted);
    	$("#date-completed-edit").val(task.dateCompleted);
    	$("#deadline-edit").val(task.deadline);
    	addDeveloperToEdit(task, task.developersId);

    }
    
    $("#edit-task-form").submit(function(e){
		e.preventDefault();
		var new_task = getEditedTask();
		new_task.id = $("#edit-task-button").attr("data-task-id");;
		updateTask(new_task);
		
    	$("#task-name-edit").val("");
    	$('#span-dropdown-edit').text("Select type");
    	$("#date-created-edit").val("");
    	$("#date-assigned-edit").val("");
        $("#date-submitted-edit").val("");
    	$("#date-completed-edit").val("");
    	$("#deadline-edit").val("");
    	$("#developer-edit").text("Select dev");
    	$("#dropdown-developers-edit").empty();
    	
    	$("#edit-task-modal").modal('hide');
	})
    
    $(document).on("click", "#edit-task-button", function(e){
    	e.preventDefault();
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
    	fillCommentsForTask(taskId);
    })
    
    function fillCommentsForTask(taskId){
    	listTaskComments(taskId).then(function(response){
    		clearComments();
    		
    		$("#comments-modal").attr("data-task-id", taskId);
	    	
	    	$(response).each(function(index, obj){
	    		console.log(obj);
	    		addCommentToModal(obj);
	    	});
    	})
    }
    
    function clearComments(){
    	$("#comments-row").empty();
    	$("#new-comment-content").val("");
    }
    
    function addCommentToModal(comment){
    	getUser(comment.usersId).then(function(response){
    		
    		$("#comments-row").append("<div class='col-sm-10'> <div class='panel panel-default'> <div class='panel-heading'> <strong>"+response.username+"</strong> <span class='text-muted'>commented on "+comment.date+"</span> </div> <div class='panel-body'>"+comment.content+"</div> </div> </div>")
    	})
    	
    }
    
    function addComment(comment_content, taskId){
    	
    	function getCurrentDate(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            var today = dd+'/'+mm+'/'+yyyy;
            
            return today;
    	}
    	

    	//TODO Get current user posting the comment
    	var new_comment = {date: getCurrentDate(), content:comment_content, tasksId: taskId, usersId: 1};
    	
    	return $.ajax(ENDPOINT_COMMENTS, {
    		method: "POST",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify(new_comment),
    		dataType: "json"
    	})
    }
    
    $(document).on("click", "#new-comment-button", function(e){
    	e.preventDefault();
    	
    	var comment_content = $("#new-comment-content").val();
    	var taskId = $("#comments-modal").attr("data-task-id");
    	addComment(comment_content, taskId).then(function(){
    		fillCommentsForTask(taskId);
    	});
    	
    });
    
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
    
    /* DROPDOWN */
    
    $(document.body).on('click', '#dropdown-edit li', function(event) {

        var $target = $(event.currentTarget);

        $target.closest('.btn-group')
           .find('[data-bind="label"]').text($target.text())
           .end()
           .children('.dropdown-toggle').dropdown('toggle');

        return false;

     });

    
    /* DROPDOWN */
    
    $(document.body).on('click', '#dropdown-developers-edit li', function(event) {

        var $target = $(event.currentTarget);
        $target.closest('.btn-group')
           .find('[data-bind="label"]').text($target.text())
           .attr("data-developer-id", $target.attr("data-developer-id"))
           .end()
           .children('.dropdown-toggle').dropdown('toggle');

        return false;

     });
});