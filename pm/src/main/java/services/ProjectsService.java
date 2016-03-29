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
}
