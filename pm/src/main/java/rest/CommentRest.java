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

import entities.Comment;
import services.CommentsService;
import services.TasksService;

@Path("/comments")
public class CommentRest {
	private final CommentsService commentsService;
	private final TasksService tasksService;

	@Inject
	public CommentRest(CommentsService commentsService, TasksService tasksService){
		this.commentsService = commentsService;
		this.tasksService = tasksService;
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Comment> getComment(){
		return commentsService.getComments();
	}
	
	@GET
	@Path("/{commentId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Comment getComment(@PathParam("commentId") long commentId){
		return commentsService.getComment(commentId);
	}
	
	@GET
	@Path("/{commentId}/{taskId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Comment> getCommentsByTask(@PathParam("commentId") long commentId, @PathParam("taskId") long taskId){
		return commentsService.getCommentsByTask(tasksService.getTask(taskId));
	}
	
	@POST
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Consumes({MediaType.APPLICATION_JSON})
	public Comment createComment(Comment comment){
		return commentsService.createComment(comment);
	}
	
	
	@PUT
	@Path("/{commentId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Comment updateComment(@PathParam("commentId") long commentId, Comment comment){
		final Comment fromDb = commentsService.getComment(commentId);
		fromDb.setAuthor(comment.getAuthor());
		fromDb.setContent(comment.getContent());
		fromDb.setDate(comment.getDate());
		fromDb.setTask(comment.getTask());
		
		return commentsService.updateComment(fromDb);
	}
}
