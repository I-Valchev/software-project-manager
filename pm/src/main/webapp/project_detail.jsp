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
					<table class="table table-striped table-bordered table-list"
						id="project_table_detail">
						<thead>
							<tr>
								<th class="hidden-xs col-md-1">Task</th>
								<th class="hidden-xs col-md-1">Developer</th>
								<th class="col-md-2">Date created</th>
								<th class="col-md-2">Date assigned</th>
								<th class="col-md-2">Date submitted</th>
								<th class="col-md-2">Date completed</th>
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
							<button id="create-task" type="button" class="btn btn-sm btn-primary btn-create"
								data-toggle="modal" data-target="#create-task-modal">New
								Task</button>
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
							<span data-bind="label">Select type</span>&nbsp;<span
								class="caret"></span>
						</button>
						<ul class="dropdown-menu" role="menu">
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
						id="date-created-create" type="date" class="form-control" /> <br>

					<span class="input-group-addon">Date assigned</span> <input
						id="date-assinged-create" type="date" class="form-control" /> <br>

					<span class="input-group-addon">Deadline</span> <input
						id="deadline-create" type="date" class="form-control" /> <br>
				</fieldset>

				<fieldset>
					<legend>Developer</legend>

					<input id="developer-create" type="text" class="form-control"></input>
				</fieldset>

				<button class="btn btn-lg btn-primary btn-block"
					type="submit">Create</button>
			</form>
		</div>
	</div>
</div>

<%@include file="footer.html"%>