package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@NamedQueries({
	@NamedQuery(name=Task.QUERY_ALL,
		query = "SELECT t from Task t"),
	@NamedQuery(name=Task.QUERY_BY_PROJECT, query = "SELECT t from Task t where t.project = :project")
})

public class Task {
	
	public static final String QUERY_ALL = "tasksAll";
	public static final String QUERY_BY_PROJECT = "tasksByProject";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String type;
	
	@Column(nullable = false)
	@ManyToOne
	private Developer developer;
	
	@Column
	private String dateCreated;
	
	@Column
	private String dateAssigned;
	
	@Column
	private String dateSubmitted;
	
	@Column
	private String dateCompleted;
	
	@Column
	private String deadline;

	@Column
	@ManyToOne
	private Project project;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Developer getDeveloper() {
		return developer;
	}

	public void setDeveloper(Developer developer) {
		this.developer = developer;
	}

	public String getStringCreated() {
		return dateCreated;
	}

	public void setStringCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getStringAssigned() {
		return dateAssigned;
	}

	public void setStringAssigned(String dateAssigned) {
		this.dateAssigned = dateAssigned;
	}

	public String getStringSubmitted() {
		return dateSubmitted;
	}

	public void setStringSubmitted(String dateSubmitted) {
		this.dateSubmitted = dateSubmitted;
	}

	public String getStringCompleted() {
		return dateCompleted;
	}

	public void setStringCompleted(String dateCompleted) {
		this.dateCompleted = dateCompleted;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public static String getQueryAll() {
		return QUERY_ALL;
	}
	
}
