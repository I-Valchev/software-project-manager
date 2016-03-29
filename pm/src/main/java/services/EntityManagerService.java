package services;


import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@Singleton
public class EntityManagerService {
	private final EntityManagerFactory emf;

	public EntityManagerService() {
		//TODO what should be in
		emf = Persistence.
			createEntityManagerFactory("");
	}
	
	public EntityManager createEntityManager() {
		return emf.createEntityManager();
	}

}