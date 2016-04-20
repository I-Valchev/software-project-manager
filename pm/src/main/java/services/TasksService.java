package services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import entities.Task;
import entities.Project;

@Singleton
public class TasksService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public TasksService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}
	
	public Task createTask(Task task){
		final EntityManager em = entityManagerService.createEntityManager();
		
		try{
			em.getTransaction().begin();
			em.persist(task);
			em.getTransaction().commit();

			return task;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public List<Task> getTasks(){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<Task> query = em.createNamedQuery(Task.QUERY_ALL, Task.class);
			return query.getResultList();
		}finally{
			em.close();
		}
	}
	
	public List<Task> getTasksByProject(Project project){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<Task> query = em.createNamedQuery(Task.QUERY_BY_PROJECT, Task.class);
			query.setParameter("project", project);
			return query.getResultList();
		}finally{
			em.close();
		}
	}
	
	public Task getTask(long taskId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final Task result = em.find(Task.class, taskId);
			if(result == null){
				throw new IllegalArgumentException("No task with id: " + taskId);
			}
			return result;
		}finally{
			em.close();
		}
	}
	
	public Task updateTask(Task task){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final Task result = em.merge(task);
			em.getTransaction().commit();
			
			return result;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public void deleteTask(long taskId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final Task task = em.find(Task.class, taskId);
			if(task == null){
				throw new IllegalArgumentException("No task with id: " + taskId);
			}
			
			em.remove(task);
			em.getTransaction().commit();
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}
