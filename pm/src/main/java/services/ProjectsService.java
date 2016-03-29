package services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

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
}
