package rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import entities.Developer;
import services.DevelopersService;

@Path("/developers")
public class DeveloperRest {
	private final DevelopersService developersService;

	@Inject
	public DeveloperRest(DevelopersService developersService){
		this.developersService = developersService;
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Developer> getDeveloper(){
		return developersService.getDevelopers();
	}
	
	@GET
	@Path("/{developerId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Developer getDeveloper(@PathParam("developerId") long developerId){
		return developersService.getDeveloper(developerId);
	}
	
	@POST
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Consumes({MediaType.APPLICATION_JSON})
	public Developer createDeveloper(Developer developer){
		return developersService.createDeveloper(developer);
	}
	
	
	@PUT
	@Path("/{developerId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Developer updateDeveloper(@PathParam("developerId") long developerId, Developer developer){
		final Developer fromDb = developersService.getDeveloper(developerId);
		fromDb.setUser(developer.getUser());
		
		return developersService.updateDeveloper(fromDb);
	}
}
