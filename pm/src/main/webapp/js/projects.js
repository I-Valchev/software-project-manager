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
    
    displayProjects();
});