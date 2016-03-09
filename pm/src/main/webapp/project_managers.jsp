<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="header.html"%>

<br>
<br>

<div class="container">
	<div class="row">
		<div class="col-xs-12 col-sm-6 col-md-6">
			<div class="well well-sm">
				<div class="row">
					<div class="col-sm-6 col-md-4">
						<img src="http://placehold.it/380x500" alt=""
							class="img-rounded img-responsive" />
					</div>
					<div class="col-sm-6 col-md-8">
						<h4 id="project_manager_name"></h4>
						<small><cite>Sample place<i id="profile_glyph"
								class="glyphicon glyphicon-map-marker"> </i>
						</cite></small>
						<p>
							<i class="glyphicon glyphicon-envelope"></i>email@example.com <br />
							<i class="glyphicon glyphicon-globe"></i><a
								href="http://www.jquery2dotnet.com">www.sample.com</a> <br />
							<i class="glyphicon glyphicon-gift"></i>01.01.1970
						</p>
						<!-- Split button -->
						<div class="btn-group">
							<button type="button" class="btn btn-primary">Projects</button>
							<button type="button" class="btn btn-primary dropdown-toggle"
								data-toggle="dropdown">
								<span class="caret"></span><span class="sr-only">Social</span>
							</button>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#">Twitter</a></li>
								<!--
								<li class="divider"></li>
								<li><a href="#">Github</a></li>
								-->
								
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<%@include file="footer.html"%>