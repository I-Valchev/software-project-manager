package services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import entities.Project;

@Singleton
public class ProjectsService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public ProjectsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}
	
	public Project createProject(Project project){
		final EntityManager em = entityManagerService.createEntityManager();
		
		try{
			em.getTransaction().begin();
			em.persist(project);
			em.getTransaction().commit();

			return project;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public List<Project> getProjects(){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<Project> query = em.createNamedQuery(Project.QUERY_ALL, Project.class);
			return query.getResultList();
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public Project getProject(long projectId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final Project result = em.find(Project.class, projectId);
			if(result == null){
				throw new IllegalArgumentException("No project with id: " + projectId);
			}
			return result;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public Project updateProject(Project project){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final Project result = em.merge(project);
			em.getTransaction().commit();
			
			return result;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public void deleteProject(long projectId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final Project project = em.find(Project.class, projectId);
			if(project == null){
				throw new IllegalArgumentException("No project with id: " + projectId);
			}
			
			em.remove(project);
			em.getTransaction().commit();
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}
