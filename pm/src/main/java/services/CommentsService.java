package services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import entities.Comment;
import entities.Task;

@Singleton
public class CommentsService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public CommentsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}
	
	public Comment createComment(Comment comment){
		final EntityManager em = entityManagerService.createEntityManager();
		
		try{
			em.getTransaction().begin();
			em.persist(comment);
			em.getTransaction().commit();

			return comment;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public List<Comment> getComments(){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<Comment> query = em.createNamedQuery(Comment.QUERY_ALL, Comment.class);
			return query.getResultList();
		}finally{
			em.close();
		}
	}
	
	public List<Comment> getCommentsByTask(Task task){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<Comment> query = em.createNamedQuery(Comment.QUERY_BY_TASK, Comment.class);
			query.setParameter("task", task);
			return query.getResultList();
		}finally{
			em.close();
		}
	}
	
	public Comment getComment(long commentId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final Comment result = em.find(Comment.class, commentId);
			if(result == null){
				throw new IllegalArgumentException("No comment with id: " + commentId);
			}
			return result;
		}finally{
			em.close();
		}
	}
	
	public Comment updateComment(Comment comment){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final Comment result = em.merge(comment);
			em.getTransaction().commit();
			
			return result;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public void deleteComment(long commentId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final Comment comment = em.find(Comment.class, commentId);
			if(comment == null){
				throw new IllegalArgumentException("No comment with id: " + commentId);
			}
			
			em.remove(comment);
			em.getTransaction().commit();
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}
