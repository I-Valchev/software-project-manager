package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@NamedQueries({
	@NamedQuery(name=User.QUERY_ALL,
		query = "SELECT t from User t")
})

@Table(name="pmUser")
public class User {
	
	public static final String QUERY_ALL = "usersAll";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;
	
	@Column(nullable = false)
	private String username;
	
	@Column(nullable = false)
	private String email;
	
	
	//TODO Password needs to be protected
	@Column(nullable = false)
	private String password;

}
