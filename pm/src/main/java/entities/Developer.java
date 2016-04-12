package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@NamedQueries({
	@NamedQuery(name=Developer.QUERY_ALL,
		query = "SELECT t from Developer t"),
	@NamedQuery(name=Developer.QUERY_BY_PROJECT, query = "SELECT t from Developer t where t.project = :project")
})

public class Developer {
	
	public static final String QUERY_ALL = "developersAll";
	public static final String QUERY_BY_PROJECT = "developersByProject";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name="DEVELOPER_ID")
	private long id;
	
	@Column(nullable = false)
	@OneToOne
	private User user;

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
