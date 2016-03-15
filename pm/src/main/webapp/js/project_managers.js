$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_PROJECT_MANAGERS = "http://localhost:3000/projectmanagers";
    
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
    	var main_div = $("<div class='col-xs-12 col-sm-6 col-md-6'></div>");
    	var well_div = $("<div class='well well-sm'></div>");
    	
    	var row_div = $("<div class='row'></div>")
    	
    	var img_div = $("<div clas='col-sm-5 col-md-4'></div>");
    	
    	var img = $("<img src='http://placehold.it/380x500' alt='' class='img-rounded img-responsive'></img>");
    	
    	var body_div = $("<div class='col-sm-6 col-md-8'></div>");
    	
    	var project_manager_tag = $("<h4></h4>");
    	//TODO Change ID to username
    	project_manager_tag.text(projectManager.id);
    	body_div.append(project_manager_tag);
    	
    	var place = $("<small><cite>Sample place<i id='profile_glyph' class='glyphicon glyphicon-map-marker'> </i> </cite></small>")
    	body_div.append(place);
    	
    	var paragraph_info = $("<p> <i class='glyphicon glyphicon-envelope'></i>email@example.com <br /> <i class='glyphicon glyphicon-globe'></i><a href='http://www.jquery2dotnet.com'>www.sample.com</a> <br /> <i class='glyphicon glyphicon-gift'></i>01.01.1970 </p>");
    	body_div.append(paragraph_info);
    	
    	var buttons = $("<div class='btn-group'></div>");
    	
    	var projects_button = $("<button type='button' class='btn btn-primary'>Projects</button>");
    	var projects_dropdown = $("<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>");
    	var ul_dropdown = $("<ul class='dropdown-menu' role='menu' id='list-projects'></ul>");
    	
    	buttons.append(projecs_button);
    	buttons.append(projects_dropdown);
    	buttons.append(ul_dropdown);
    	body_div.append(buttons);
    	
    	row_div.append(body_div);
    	
    	well_div.append(row_div);
    	main_div.append(well_div);
    	
    	//TODO change project_link to build link to detailed project
    	var project_link = ENDPOINT_PROJECT_MANAGERS+'/'+ projectManager.id;
    	
    	$.each(projectManager.projectIds, function(index, value){
    		$("#list-projects").append($('<li></li>').append($('<a></a>').attr('href', project_link).text(value)));
    	})
    }
    
    function displayProjectManagers(){
    	listProjectManagers().then(function(response){
    		clearProjectManagers();
    		
    		$(response).each(function(index, obj){
    			addProjectManagerToContent(obj);
    		});
    	});
    }
    
    displayProjectManagers();

});