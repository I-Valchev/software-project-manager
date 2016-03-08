$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_USERS = "http://localhost:8080/pm/rest/users";
    var ENDPOINT_PORJECT_MANAGERS = "http://localhost:8080/pm/rest/projectmanagers";
    var ENDPOINT_DEVELOPERS = "http://localhost:8080/pm/rest/developers";

    function addUser(user){    	    	
    	var createPromise = $.ajax(ENDPOINT_USERS, {
    		method: "POST",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify(user),
    		dataType: "json"
    	}).then(function(response) {
    		console.log(response);
    		return response;
    	});
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
    
    function addDeveloper(userId){
    	var createPromise = $.ajax(ENDPOINT_DEVELOPERS, {
    		method: "POST",
    		contentType: "application/json; charset=utf-8",
    		data: JSON.stringify(userId),
    		dataType: "json"
    	}).then(function(response) {
    		console.log(response);
    		return response;
    	});
    }
    
    $("#register").click(function(){
    	username = $("#username").val();
    	password = $("#password").val();
    	repeat_password = $("#repeat_password").val();
    	
    	var user = {
        		username: username,
        		password: password
        };
    	
    	user = addUser(user);
    	
    	var val = $('input:radio[name=radio_pm]').is(':checked');
    	
    	if(val == true){
    		addProjectManager(user.id);
    	}else{
    		addDeveloper(user.id);
    	}
    	
    })
});