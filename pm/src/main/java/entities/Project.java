package entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
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
	
	@Column(nullable = false, name="name")
	private String name;
	
	@Column(nullable = false, name="status")
	private boolean status;
	
	@Column(nullable = false, name="projectManagerId")
	@OneToOne(cascade=CascadeType.ALL)
	private ProjectManager projectManager;
	
	public long getId() {
		return id;
	}

	/*public void setId(long id) {
		this.id = id;
	}*/

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
	
	@JoinTable(
			joinColumns = {	@JoinColumn(name = "project_id", referencedColumnName = "PROJECT_ID", nullable = false) }, 
			inverseJoinColumns = {	@JoinColumn(name = "developer_id", referencedColumnName = "DEVELOPER_ID", nullable = false) })
	@ManyToMany(targetEntity=Developer.class, fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	public List<Developer> developers;

	public List<Developer> getDevelopers() {
		return developers;
	}

	public void setDevelopers(List<Developer> developers) {
		this.developers = developers;
	}
	
	public Project(){
		this.developers = new ArrayList<Developer>();
	}
	
	public void addDeveloper(Developer developer){
		this.developers.add(developer);
	}
	
}
