var ENDPOINT_USERS = "http://localhost:3000/users";
var ENDPOINT_DEVELOPERS = "http://localhost:3000/developers";

function endpointUsers(id){
	return ENDPOINT_USERS + "/" + id;
}

function endpointDevelopers(id){
	return ENDPOINT_DEVELOPERS + "/" + id;
}

function requestUser(id) {
	return $.ajax(endpointUsers(id), {
		method : "GET",
		dataType : "json"
	});
}

function getDeveloper(id){
	return $.ajax(endpointDevelopers(id), {
		method : "GET",
		dataType : "json"
	});
}

function getDeveloperUsername(developerId){
	getDeveloper(developerId).then(function(response){
		getUsers(response).then(function(user){
			return user.username
		})
	})
}