package services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import entities.User;

@Singleton
public class UsersService {
	private final EntityManagerService entityManagerService;
	
	@Inject
	public UsersService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}
	
	public User createUser(User user){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			em.persist(user);
			em.getTransaction().commit();
			
			return user;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public List<User> getUsers(){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final TypedQuery<User> query = em.createNamedQuery(User.QUERY_ALL, User.class);
			System.out.println("Returning result");
			return query.getResultList();
		}finally{
			em.close();
		}
	}
	
	public User getUser(long userId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			final User result = em.find(User.class, userId);
			if(result == null){
				throw new IllegalArgumentException("No user with id: " + userId);
			}
			System.out.println("Returning result with id" + userId);
			return result;
		}finally{
			em.close();
		}
	}
	
	public User updateUser(User user){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final User result = em.merge(user);
			em.getTransaction().commit();
			
			return result;
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public void deleteUser(long userId){
		final EntityManager em = entityManagerService.createEntityManager();
		try{
			em.getTransaction().begin();
			final User user = em.find(User.class, userId);
			if(user == null){
				throw new IllegalArgumentException("No user with id: " + userId);
			}
			
			em.remove(user);
			em.getTransaction().commit();
		}finally{
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}
