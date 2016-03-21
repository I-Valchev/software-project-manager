var ENDPOINT_USERS = "http://localhost:3000/users";
var ENDPOINT_DEVELOPERS = "http://localhost:3000/developers";
var ENDPOINT_PROJECT_MANAGERS = "http://localhost:3000/projectmanagers";

function endpointProjectManagers(id){
	return ENDPOINT_PROJECT_MANAGERS + "/" + id;
}

function endpointUsers(id){
	return ENDPOINT_USERS + "/" + id;
}

function endpointDevelopers(id){
	return ENDPOINT_DEVELOPERS + "/" + id;
}

function getDevelopers(){
	return $.ajax(ENDPOINT_DEVELOPERS, {
		method : "GET",
		dataType : "json"
	});
}

function getUser(id) {
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

function getProjectManager(id){
	return $.ajax(endpointProjectManagers(id), {
		method : "GET",
		dataType : "json"
	});
}

