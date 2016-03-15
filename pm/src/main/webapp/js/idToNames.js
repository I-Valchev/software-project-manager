$(document).ready(function() {
    "use strict";
    
    var ENDPOINT_USERS = "http://localhost:3000/users";
    
    function requestUser(){
    	return $.ajax(ENDPOINT_USERS + "/" + id, {
			method: "GET",
			dataType: "json"
		});
    }
    
    function getUsername(user_id){
    	requestUser(user_id).then(function(response){
    		return response.username
    	})
    }
});