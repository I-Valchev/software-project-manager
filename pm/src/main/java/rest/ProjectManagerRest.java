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

import entities.ProjectManager;
import services.ProjectManagersService;
import services.UsersService;

@Path("/projectmanagers")
public class ProjectManagerRest {
	private final ProjectManagersService projectManagersService;
	private final UsersService usersService;

	@Inject
	public ProjectManagerRest(ProjectManagersService projectManagersService, UsersService usersService){
		this.projectManagersService = projectManagersService;
		this.usersService = usersService;
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<ProjectManager> getProjectManager(){
		return projectManagersService.getProjectManagers();
	}
	
	@GET
	@Path("/{projectManagerId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public ProjectManager getProjectManager(@PathParam("projectManagerId") long projectManagerId){
		return projectManagersService.getProjectManager(projectManagerId);
	}
	
	@POST
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Consumes({MediaType.APPLICATION_JSON})
	public ProjectManager createProjectManager(ProjectManager projectManager){
		return projectManagersService.createProjectManager(projectManager);
	}
	
	
	@PUT
	@Path("/{projectManagerId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public ProjectManager updateProjectManager(@PathParam("projectManagerId") long projectManagerId, ProjectManager projectManager){
		final ProjectManager fromDb = projectManagersService.getProjectManager(projectManagerId);
		fromDb.setUser(projectManager.getUser());
		
		return projectManagersService.updateProjectManager(fromDb);
	}
}
