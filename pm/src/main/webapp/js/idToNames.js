var ENDPOINT_USERS = "http://localhost:8080/pm/rest/users";
var ENDPOINT_DEVELOPERS = "http://localhost:8080/pm/rest/developers";
var ENDPOINT_PROJECT_MANAGERS = "http://localhost:8080/pm/rest/projectmanagers";
var ENDPOINT_TASKS = "http://localhost:8080/pm/rest/tasks";

function endpointProjectManagers(id){
	return ENDPOINT_PROJECT_MANAGERS + "/" + id;
}

function endpointTasks(id){
	return ENDPOINT_TASKS + "/" + id;
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

function getDevelopersByProject(projectId){
	return $.ajax(ENDPOINT_DEVELOPERS, {
		method : "GET",
		dataType : "json",
		data: {projectId: projectId}
	});
}

function getTasksByProject(projectId){
	return $.ajax(ENDPOINT_TASKS, {
		method : "GET",
		dataType : "json",
		data: {projectId: projectId}
	});
}

function getTask(id){
	return $.ajax(endpointTasks(id), {
		method : "GET",
		dataType : "json"
	});
}

