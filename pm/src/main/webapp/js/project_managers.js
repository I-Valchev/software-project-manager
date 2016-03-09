$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_PORJECT_MANAGERS = "http://localhost:8080/pm/rest/projectmanagers";
    
    function listProjectManagers(){
    	return $.ajax(ENDPOINT_PROJECT_MANAGERS, {
            method: "GET",
            dataType: "json"
        });
    }
    
    var project_managers = $("#project_managers_content");
    
    function clearProjectManagers(){
    	project_managers.empty();
    }
    
    function addProjectManagerToContent(projectManager){
    	var content = '<div class="col-xs-12 col-sm-6 col-md-6"> <div class="well well-sm"> <div class="row"> <div class="col-sm-6 col-md-4"> <img src="http://placehold.it/380x500" alt="" class="img-rounded img-responsive" /> </div> <div class="col-sm-6 col-md-8"> <h4 id="project-manager-name-'+projectManager.id+'"></h4> <small><cite>Sample place<i id="profile_glyph" class="glyphicon glyphicon-map-marker"> </i> </cite></small> <p> <i class="glyphicon glyphicon-envelope"></i>email@example.com <br /> <i class="glyphicon glyphicon-globe"></i><a href="http://www.jquery2dotnet.com">www.sample.com</a> <br /> <i class="glyphicon glyphicon-gift"></i>01.01.1970 </p> <div class="btn-group"> <button type="button" class="btn btn-primary">Projects</button> <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"> <span class="caret"></span><span class="sr-only">Social</span> </button> <ul class="dropdown-menu" role="menu" id="list-projects"></ul> </div> </div> </div> </div> </div>'
    	project_managers.append(content);
    	
    	$("#project-manager-name-"+projectManager.id).text(projectManager.id);
    	
    	$.each(projectManager.projectIds, function(index, value){
    		$("#list-projects").append('<li>'+value+'</li>');
    	})
    }
    
    function displayProjectManagers(){
    	listProjectManagers().then(function(response){
    		clearProjectManagers();
    		
    		$(response).each(function(index, obj){
    			addProjectManagerToContent(index, obj);
    		});
    	});
    }

});