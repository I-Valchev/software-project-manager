$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_PROJECTS = "http://localhost:8080/pm/rest/projects";
    
    var projects_table = $("#projects_table");
    
    function projectEndpoint(id){
    	return ENDPOINT_PROJECTS + "/" + id
    }
    
    function listProjects() {
        return $.ajax(ENDPOINT_PROJECTS, {
            method: "GET",
            dataType: "json"
        });
    }
    
    function clearTable(){
    	projects_table.children('tbody').empty();
    }
    
    function addProjectToTable(project){
    	var row = $("<tr></tr>");
    	var action_column = $("<td></td>");
    	action_column.attr("align", "center");
    	
    	
    	var anchor_info = $("<a></a>");
    	anchor_info.attr("href", "project_detail.jsp");
    	anchor_info.attr("id", "info-project-button");
    	anchor_info.attr("project-id", project.id);
    	anchor_info.attr("class", "btn btn-default");
    	var em_info = $("<em></em>");
    	em_info.attr("class", "fa fa-info-circle");
    	anchor_info.append(em_info);
    	
    	var delete_button = $("<button></button>");
    	delete_button.attr("id", "delete-project-button");
    	delete_button.attr("project-id", project.id);
    	delete_button.attr("class", "btn btn-danger");
    	var em_delete = $("<em></em>");
    	em_delete.attr("class", "fa fa-trash");
    	delete_button.append(em_delete);
    	
    	action_column.append(anchor_info);
    	action_column.append(delete_button);

    	var project_manager_column = $("<td></td>");
    	project_manager_column.text(project.projectManager.user.username)

    	var developers_column = $("<td></td>");
    	
    	var developers_string = "";
    	
    	$(project.developers).each(function(index, developer){
    		developers_string += developer.user.username + " ";
    	})
    	
    	developers_column.text(developers_string)
    	
    	var tasks_column = $("<td></td>");
    	tasks_column.text(project.taskIds);
    	
    	row.append(action_column);
    	row.append(project_manager_column);
    	row.append(developers_column);
    	row.append(tasks_column);
    	
    	projects_table.children('tbody').append(row);
    	
    }
    
    function displayProjects(){
    	listProjects().then(function(response){
    		clearTable();

    		$(response).each(function(index, obj){
    			addProjectToTable(obj);
    		});
    	});
    }
    
    function deleteProject(id) {
        return $.ajax(projectEndpoint(id), {
            method: "DELETE"
        });
    }
    
    $(document).on("click", "#delete-project-button", function(){
    	deleteProject($(this).attr("project-id")).then(function(response){
    		displayProjects();
    	})
	});

    $(document).on("click", "#info-project-button", function(e){
    	e.preventDefault();
    	var object = {"detailProjectDisplay": $(this).attr("project-id")}
    	var location_string = $(this).attr("href") + "?" + $.param(object, true);
    	window.location = location_string;
	});
    
    $("#create-project-button").click(function(){
    	
    	var list_developers = $("#dropdown-developers");
    
    	getDevelopers().then(function(response){
    		function addDeveloperToList(developer){
    			var li = $("<li></li>");
    			li.attr("data-developer-id", developer.id);
    				
    			var anchor =$("<a href='#'></a>");
    			anchor.text(developer.user.username);
    			li.append(anchor);

    			list_developers.append(li);
    		}
    		
    		$(response).each(function(index, obj){
	    		addDeveloperToList(obj);
	    	});
    		
    	});
    })
    
    $("#create_project_form").submit(function(e){
    	//TODO More than one developer per project
    	e.preventDefault();
    	
    	var project_name = $("#project_name_create").val();
    	var project_status = $("#project_active_create").is(":checked");
    	var developer_id = $("#span-dropdown-developers").attr("data-developer-id");

    	getDeveloper(developer_id).then(function(developer){
    		var developers = new Array(developer)
    		console.log(developers[0])
        	var project = {name: project_name, status: project_status, developers: developers};
        	var createPromise = $.ajax(ENDPOINT_PROJECTS, {
        		method: "POST",
        		contentType: "application/json; charset=utf-8",
        		data: JSON.stringify(project),
        		dataType: "json"
        	}).then(function(response) {
        		return response;
        	});

    	});
    	
    	$("#project_name_create").val("");
    	$("#project_active_create").val("")
    	$("#span-dropdown-developers").empty();
    	$("#create-modal").modal('hide')
    	location.reload();
    	
    })

    /* DROPDOWN */
    
    $(document.body).on('click', '#dropdown-developers li', function(event) {

        var $target = $(event.currentTarget);
        $target.closest('.btn-group')
           .find('[data-bind="label"]').text($target.text())
           .attr("data-developer-id", $target.attr("data-developer-id"))
           .end()
           .children('.dropdown-toggle').dropdown('toggle');

        return false;

     });
    
    displayProjects();
});