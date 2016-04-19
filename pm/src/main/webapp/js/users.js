$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_USERS = "http://localhost:8080/pm/rest/users";
    var ENDPOINT_PROJECT_MANAGERS = "http://localhost:8080/pm/rest/projectmanagers";
    var ENDPOINT_DEVELOPERS = "http://localhost:8080/pm/rest/developers";

    function addUser(user){    	    	
    	return $.ajax(ENDPOINT_USERS, {
    		method: "POST",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify(user),
    		dataType: "json"
    	})
    }
    
    function addProjectManager(userId){
    	var createPromise = $.ajax(ENDPOINT_PROJECT_MANAGERS, {
    		method: "POST",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify(userId),
    		dataType: "json"
    	}).then(function(response) {
    		console.log(response);
    		return response;
    	});
    }
    
    function addDeveloper(developer){
    	var createPromise = $.ajax(ENDPOINT_DEVELOPERS, {
    		method: "POST",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify(developer),
    		dataType: "json"
    	}).then(function(response) {
    		console.log(response);
    		return response;
    	});
    }
    
    $("#register").click(function(e){
    	e.preventDefault();
    	var username = $("#username").val();
    	var password = $("#password").val();
    	var repeat_password = $("#repeat_password").val();
    	
    	var user = {
        		username: username,
        		password: password
        };
    	
    	addUser(user).then(function(user){
    		var val = $('#radio_pm').is(':checked');
        	
        	if(val == true){
        		var developer = {user: user}
        		addProjectManager(developer);
        	}else{
        		var project_manager = {user: user}
        		addDeveloper(project_manager);
        	}
    	})
    })
});