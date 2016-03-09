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
							<h2 class="panel-title"><b>sPM Projects</b></h2>
						</div>
						<div class="col col-xs-6 text-right">
							<button type="button" class="btn btn-sm btn-primary btn-create">Create
								New</button>
						</div>
					</div>
				</div>
				<div class="panel-body">
					<table class="table table-striped table-bordered table-list">
						<thead>
							<tr>
								<th class="col-md-2"><em class="fa fa-cog"></em></th>
								<th class="hidden-xs col-md-2">Project Manager</th>
								<th class="hidden-xs col-md-4">Developers</th>
								<th class="col-md-4">Tasks</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td align="center"><a class="btn btn-default"><em
										class="fa fa-pencil"></em></a> <a class="btn btn-danger"><em
										class="fa fa-trash"></em></a></td>
								<td id="project-manager-name"></td>
								<td id="developers-list"></td>
								<td id="tasks-list"></td>
							</tr>
						</tbody>
					</table>

				</div>
			</div>

		</div>
	</div>
</div>

<%@include file="footer.html"%>