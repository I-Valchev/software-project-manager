<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="header.html"%>

<br>
<br>
<div class="container">

	<div class="row">
		<div class="col-md-10 col-md-offset-1">

			<div class="panel panel-raunded panel-table">
				<div class="panel-heading">
					<div class="row">
						<div class="col col-xs-6">
							<h2 class="panel-title">
								<b id="project_name_detail">Sample</b>
							</h2>
						</div>
					</div>
					<div class="row">
						<div class="col col-xs-6">
							<h2 class="panel-title">
								<b id="project_manager_name">My Name</b>
							</h2>
						</div>
					</div>
				</div>
				<div class="panel-body">
					<table id="tasks-table"
						class="table table-striped table-bordered table-list"
						id="project_table_detail">
						<thead>
							<tr>
								<th class="col-md-1"><em class="fa fa-cog"></em></th>
								<th class="hidden-xs col-md-1">Task</th>
								<th class="col-md-1">Type</th>
								<th class="hidden-xs col-md-1">Dev</th>
								<th class="col-md-1">Created</th>
								<th class="col-md-1">Assigned</th>
								<th class="col-md-2">Submitted</th>
								<th class="col-md-2">Completed</th>
								<th class="col-md-2">Deadline</th>
							</tr>
						</thead>
						<tbody id="tasks-list">
						</tbody>
					</table>
				</div>

				<div class="panel-footer">
					<div class="row">
						<div class="col col-md-2 col-md-offset-10">
							<button id="create-task" type="button"
								class="btn btn-sm btn-primary btn-create" data-toggle="modal"
								data-target="#create-task-modal">New Task</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>


<div class="modal fade" id="create-task-modal" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
	style="display: none;">
	<div class="modal-dialog">
		<div class="createmodal-container">
			<form id="create-task-form">
				<fieldset>
					<legend>Task name</legend>
					<input id="task-name-create" class="form-control" name="task-name"
						type="text" required autofocus />
				</fieldset>

				<fieldset>
					<legend>Type</legend>

					<div class="btn-group">
						<button type="button"
							class="btn btn-default dropdown-toggle form-control"
							data-toggle="dropdown">
							<span id="span-dropdown-create" data-bind="label">Select
								type</span>&nbsp;<span class="caret"></span>
						</button>
						<ul id="dropdown-create" class="dropdown-menu" role="menu">
							<li><a href="#">Front-end</a></li>
							<li><a href="#">Back-end</a></li>
							<li><a href="#">Test</a></li>
							<li><a href="#">Bugfix</a></li>
							<li><a href="#">Deployment</a></li>
						</ul>
					</div>

					<br>
				</fieldset>
				
				<fieldset>
					<legend>Developer</legend>
					
					<div class="btn-group">
						<button type="button"
							class="btn btn-default dropdown-toggle form-control"
							data-toggle="dropdown">
							<span id="span-dropdown-developers-create" data-bind="label">Select
								dev</span>&nbsp;<span class="caret"></span>
						</button>
						<ul id="dropdown-developers-create" class="dropdown-menu" role="menu">

						</ul>
					</div>
				</fieldset>

				<fieldset>
					<legend>Task dates</legend>
					<span class="input-group-addon">Date created</span> <input
						id="date-created-create" type="date" class="form-control" />
					<br> <span class="input-group-addon">Date assigned</span> <input
						id="date-assigned-create" type="date" class="form-control"
						/> <br> <span class="input-group-addon">Date
						submitted</span> <input id="date-submitted-create" type="date"
						class="form-control" /> <br> <span
						class="input-group-addon">Date completed</span> <input
						id="date-completed-create" type="date" class="form-control"
						/> <br> <span class="input-group-addon">Deadline</span>
					<input id="deadline-create" type="date" class="form-control"
						 /> <br>
				</fieldset>

				<button class="btn btn-lg btn-primary btn-block" type="submit">Create</button>
			</form>
		</div>
	</div>
</div>

<div class="modal fade" id="edit-task-modal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="display: none;">
	<div class="modal-dialog">
		<div class="createmodal-container">
			<form id="edit-task-form">
				<fieldset>
					<legend>Task name</legend>
					<input id="task-name-edit" class="form-control" name="task-name"
						type="text" required autofocus />
				</fieldset>
				
				<fieldset>
					<legend>Developer</legend>
					
					<div class="btn-group">
						<button type="button"
							class="btn btn-default dropdown-toggle form-control"
							data-toggle="dropdown">
							<span id="span-dropdown-developers-edit" data-bind="label">Select
								dev</span>&nbsp;<span class="caret"></span>
						</button>
						<ul id="dropdown-developers-edit" class="dropdown-menu" role="menu">

						</ul>
					</div>
				</fieldset>

				<fieldset>
					<legend>Type</legend>

					<div class="btn-group">
						<button type="button"
							class="btn btn-default dropdown-toggle form-control"
							data-toggle="dropdown">
							<span id="span-dropdown-edit" data-bind="label">Select
								type</span>&nbsp;<span class="caret"></span>
						</button>
						<ul id="dropdown-edit" class="dropdown-menu" role="menu">
							<li><a href="#">Front-end</a></li>
							<li><a href="#">Back-end</a></li>
							<li><a href="#">Test</a></li>
							<li><a href="#">Bugfix</a></li>
							<li><a href="#">Deployment</a></li>
						</ul>
					</div>

					<br>
				</fieldset>

				<fieldset>
					<legend>Task dates</legend>
					<span class="input-group-addon">Date created</span> <input
						id="date-created-edit" type="date" class="form-control" /> <br>

					<span class="input-group-addon">Date assigned</span> <input
						id="date-assigned-edit" type="date" class="form-control" /> <br>

					<span class="input-group-addon">Date submitted</span> <input
						id="date-submitted-edit" type="date" class="form-control" /> <br>

					<span class="input-group-addon">Date completed</span> <input
						id="date-completed-edit" type="date" class="form-control" /> <br>

					<span class="input-group-addon">Deadline</span> <input
						id="deadline-edit" type="date" class="form-control" /> <br>
				</fieldset>

				<button class="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
			</form>
		</div>
	</div>
</div>

<div class="modal fade" id="comments-modal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="display: none;">
	<div class="modal-dialog">
		<div class="createmodal-container">
			<div class="row" id="comments-row"></div>

			<form>
				<div class="form-group">
					<label>Comment:</label> <input required type="text" class="form-control" id="new-comment-content">
					<button id="new-comment-button" class="btn btn-default btn-block" type="submit">Add comment</button>
				</div>
			</form>
		</div>
	</div>
</div>

<script src="js/project_detail.js"></script>

<%@include file="footer.html"%>