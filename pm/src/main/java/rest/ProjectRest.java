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

import entities.Project;
import entities.ProjectManager;
import javassist.compiler.ast.Member;
import services.ProjectsService;

@Path("/projects")
public class ProjectRest {
	private final ProjectsService projectsService;
	private final ProjectManagersService projectManagersService;
	
	@Inject
	public ProjectRest(ProjectsService projectsService, ProjectManagersService projectManagersService){
		this.projectsService = projectsService;
		this.projectManagersService = projectManagersService;
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
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Project createProject(Project project){
		//TODO get current member after security
		final List<ProjectManager> members = projectManagersService.getMembers();
		project.setProjectManager(members.iterator().next());
	}
	
	@DELETE
	@Path("/{projectId}")
	public void deleteProject(@PathParam("projectId") long projectId){
		projectsService.deleteProject(projectId);
	}
	
	@PUT
	@Path("/{projectId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Project updateProject(@PathParam("projectId") long projectId, Project project){
		final Project fromDb = projectsService.getProject(projectId);
		fromDb.setName(project.getName());
		fromDb.setDeveloper(project.getDeveloper());
		fromDb.setProjectManager(project.getProjectManager());
		fromDb.setStatus(project.getStatus());
		
		return projectsService.updateProject(fromDb);
	}
}