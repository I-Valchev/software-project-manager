$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_PROJECTS = "http://localhost:3000/projects";
    
    var projects_table = $("#projects_table");
    
    function listProjects() {
        return $.ajax(ENDPOINT_PROJECTS, {
            method: "GET",
            dataType: "json"
        });
    }
    
    function clearTable(){
    	projects_table.children('tbody').empty();
    }
    
    function addProjectToTable(index, project){
    	projects_table.children('tbody').append($("<tr></tr>")
    		.append($("<td align=\"center\"><a href='project_detail.jsp' id='info-project-button' project-id=" + project.id + " class=\"btn btn-default\">" + 
    			"<em class=\"fa fa-info-circle\"></em></a> <button id='delete-project-button' project-id="+project.id+" class=\"btn btn-danger \"><em class=\"fa fa-trash\"></em></button></td>"))
    		.append($("<td></td>").text(project.projectManagerId))
    		.append($("<td></td>").text(project.developerIds))
    		.append($("<td></td>").text(project.taskIds)));
    }
    
    function displayProjects(){
    	listProjects().then(function(response){
    		clearTable();
    		
    		$(response).each(function(index, obj){
    			addProjectToTable(index, obj);
    		});
    	});
    }
    
    function deleteProject(id) {
        return $.ajax(ENDPOINT_PROJECTS + "/" + id, {
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
    
    $("#create_project_form").submit(function(e){
    	var project_name = $("#project_name_create").val();
    	var project_status = $("project_active_create").is(":checked");
    	
    	var project = {projectManagerId: 1, name: project_name, status: project_status};

    	var createPromise = $.ajax(ENDPOINT_PROJECTS, {
    		method: "POST",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify(project),
    		dataType: "json"
    	}).then(function(response) {
    		console.log(response);
    		return response;
    	});
    })
    
    displayProjects();
});