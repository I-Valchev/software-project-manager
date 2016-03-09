$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_PROJECTS = "http://localhost:8080/pm/rest/projects";
    
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
    
    function addProjectToTable(project){
    	projects_table.children('tbody').append($("<tr></tr>")
    		.append($("<td align=\"center\"><a class=\"btn btn-default\">" + 
    			"<em class=\"fa fa-pencil\"></em></a> <a class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></a></td>"))
    		.append($("<td></td>").text(project.projectManagerId))
    		.append($("<td></td>").text(project.developerIds))
    		.append($("<td></td>").text(project.taskIds)));
    }
    
    function displayProjects(){
    	listProjects().then(function(response){
    		clearTable();
    		
    		$(response).each(function(index, obj){
    			addProjectToTable(obj);
    		});
    	});
    }
    
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
    
//    displayProjects();
});