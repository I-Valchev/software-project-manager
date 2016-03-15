var ENDPOINT_USERS = "http://localhost:3000/users";

function requestUser(id) {
	return $.ajax(ENDPOINT_USERS + "/" + id, {
		method : "GET",
		dataType : "json"
	});
}
