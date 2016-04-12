package entities;

import java.util.List;

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
	@NamedQuery(name=Project.QUERY_ALL,
		query = "SELECT t from Project t")
})

public class Project {
	public static final String QUERY_ALL = "projectsAll";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name="PROJECT_ID")
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private boolean status;
	
	@Column(nullable = false)
	@OneToOne
	private ProjectManager projectManager;
	
	/*
	@Column(nullable = true)
	@ManyToMany(mappedBy="projects")
	private List<Developer> developers;
	*/

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public ProjectManager getProjectManager() {
		return projectManager;
	}

	public void setProjectManager(ProjectManager projectManager) {
		this.projectManager = projectManager;
	}

	public List<Developer> getDevelopers() {
//	TODO: Get all developers for a project
		return null;
	}
	
	public void setDevelopers(List<Developer> developers){
//		this.developers = developers;
	//TODO: Set all developers for a project
	}
	
}
