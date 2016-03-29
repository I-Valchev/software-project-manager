package services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import entities.ProjectManager;


@Singleton
public class ProjectManagersService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public ProjectManagersService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public ProjectManager createProject(ProjectManager projectManager){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			em.persist(projectManager);
			em.getTransaction().commit();
			
			return projectManager;
		}finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}

	public List<ProjectManager> getProjectManagers(){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<ProjectManager> query = em.createNamedQuery(ProjectManager.QUERY_ALL, ProjectManager.class);
			return query.getResultList();
		}finally {
			em.close();
		}
	}
	
	public ProjectManager getProjectManager(long projectManagerId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final ProjectManager result = em.find(ProjectManager.class, projectManagerId);
			if(result == null){
				throw new IllegalArgumentException("No project manager with id: " + projectManagerId);
			}
			
			return result;
		}finally {
			em.close();
		}
	}
}
