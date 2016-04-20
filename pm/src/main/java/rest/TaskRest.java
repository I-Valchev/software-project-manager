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
import entities.Task;
import services.DevelopersService;
import services.ProjectsService;
import services.TasksService;

@Path("/tasks")
public class TaskRest {
	private final TasksService tasksService;
	private final ProjectsService projectsService;
	private final DevelopersService developersService;

	@Inject
	public TaskRest(TasksService tasksService, ProjectsService projectsService, DevelopersService developersService){
		this.tasksService = tasksService;
		this.projectsService = projectsService;
		this.developersService = developersService;
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Task> getTask(){
		return tasksService.getTasks();
	}
	
	@GET
	@Path("/project/{projectId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Task> getTaskByProject(@PathParam("projectId") long projectId){
		return tasksService.getTasksByProject(projectsService.getProject(projectId));
	}
	
	@GET
	@Path("/{taskId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Task getTask(@PathParam("taskId") long taskId){
		return tasksService.getTask(taskId);
	}
	
	@POST
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Consumes({MediaType.APPLICATION_JSON})
	@Path("/{projectId}/{developerId}")
	public Task createTask(Task task, @PathParam("projectId") long projectId, @PathParam("developerId") long developerId){
		task.setProject(projectsService.getProject(projectId));
		task.setDeveloper(developersService.getDeveloper(developerId));
		return tasksService.createTask(task);
	}
	
	
	@PUT
	@Path("/{taskId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Task updateTask(@PathParam("taskId") long taskId, Task task){
		final Task fromDb = tasksService.getTask(taskId);
		fromDb.setDateCreated(task.getDateCreated());
		fromDb.setDateAssigned(task.getDateAssigned());
		fromDb.setDateSubmitted(task.getDateSubmitted());
		fromDb.setDateCompleted(task.getDateCompleted());
		fromDb.setDeadline(task.getDeadline());
		fromDb.setName(task.getName());
		fromDb.setType(task.getType());
		fromDb.setProject(task.getProject());
		fromDb.setDeveloper(task.getDeveloper());
		
		return tasksService.updateTask(fromDb);
	}
}
