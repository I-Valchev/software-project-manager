package rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import entities.User;
import services.UsersService;

@Path("/users")
public class UserRest {
	private final UsersService usersService;
	
	@Inject
	public UserRest(UsersService usersService){
		this.usersService = usersService;
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<User> getUser(){
		return usersService.getUsers();
	}
	
	@GET
	@Path("/{userId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public User getUser(@PathParam("userId") long userId){
		return usersService.getUser(userId);
	}
	
	@POST
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Consumes({MediaType.APPLICATION_JSON})

	public User createUser(User user){
		return usersService.createUser(user);
	}
	
	@DELETE
	@Path("/{userId}")
	public void deleteUser(@PathParam("userId") long userId){
		usersService.deleteUser(userId);
	}
	
	@PUT
	@Path("/{userId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public User updateUser(@PathParam("userId") long userId, User user){
		final User fromDb = usersService.getUser(userId);
		fromDb.setUsername(user.getUsername());
		fromDb.setPassword(user.getPassword());
		
		return usersService.updateUser(fromDb);
	}
}
