package services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import entities.Developer;
import entities.Project;

@Singleton
public class DevelopersService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public DevelopersService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}
	
	public Developer createDeveloper(Developer developer){
		final EntityManager em = entityManagerService.createEntityManager();
		
		try{
			em.getTransaction().begin();
			em.persist(developer);
			em.getTransaction().commit();

			return developer;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public List<Developer> getDevelopers(){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<Developer> query = em.createNamedQuery(Developer.QUERY_ALL, Developer.class);
			return query.getResultList();
		}finally{
			em.close();
		}
	}
	
	public List<Developer> getDevelopersByProject(Project project){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<Developer> query = em.createNamedQuery(Developer.QUERY_BY_PROJECT, Developer.class);
			query.setParameter("project", project);
			return query.getResultList();
		}finally{
			em.close();
		}
	}
	
	public Developer getDeveloper(long developerId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final Developer result = em.find(Developer.class, developerId);
			if(result == null){
				throw new IllegalArgumentException("No developer with id: " + developerId);
			}
			return result;
		}finally{
			em.close();
		}
	}
	
	public Developer updateDeveloper(Developer developer){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final Developer result = em.merge(developer);
			em.getTransaction().commit();
			
			return result;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public void deleteDeveloper(long developerId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final Developer developer = em.find(Developer.class, developerId);
			if(developer == null){
				throw new IllegalArgumentException("No developer with id: " + developerId);
			}
			
			em.remove(developer);
			em.getTransaction().commit();
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}
