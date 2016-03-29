package rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import entities.Project;
import services.ProjectsService;

@Path("/projects")
public class ProjectRest {
	private final ProjectsService projectsService;

	@Inject
	public ProjectRest(ProjectsService projectsService){
		this.projectsService = projectsService;
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Project> getProject(){
		return projectsService.getProjects();
	}
	
	@GET
	@Path("/{projectId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Project getProject(@PathParam("projectId") long projectId){
		return projectsService.getProject(projectId);
	}
}
