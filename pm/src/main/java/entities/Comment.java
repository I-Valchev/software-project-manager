package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	private User author;
	
	@Column(nullable=false)
	private Task task;
	
}
