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
					<table class="table table-striped table-bordered table-list" id="project_table_detail">
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
						<tbody>
							<tr>
							</tr>
						</tbody>
					</table>

				</div>
			</div>

		</div>
	</div>
</div>

<%@include file="footer.html"%>