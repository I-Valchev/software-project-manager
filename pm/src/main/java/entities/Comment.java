package entities;

import javax.persistence.CascadeType;
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
	@NamedQuery(name=Comment.QUERY_ALL,
		query = "SELECT t from Comment t"),
	@NamedQuery(name=Comment.QUERY_BY_TASK, query = "SELECT t from Comment t where t.task = :task")
})

public class Comment {
	
	public static final String QUERY_ALL = "commentssAll";
	public static final String QUERY_BY_TASK = "commentsByTask";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;
	
	@Column(nullable=false)
	private String date;
	
	@Column
	private String content;
	
	@Column(nullable=false)
	@ManyToOne(cascade=CascadeType.ALL)
	private User user;
	
	@Column(nullable=false)
	@ManyToOne(cascade=CascadeType.ALL)
	private Task task;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}
}
