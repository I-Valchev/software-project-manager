<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>PM - Home</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- styles -->
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/style-single-page.css" rel="stylesheet">
<link href="font/css/fontello.css" rel="stylesheet">
<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700'
	rel='stylesheet' type='text/css'>
<!-- Add jQuery library -->
<script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
<!-- Add fancyBox main JS and CSS files -->
<script type="text/javascript" src="js/jquery.fancybox.js?v=2.1.5"></script>
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<script>
	$(document).ready(function() {
		$(".fancybox-thumb").fancybox({
			helpers : {
				title : {
					type : 'inside'
				},
				overlay : {
					css : {
						'background' : 'rgba(1,1,1,0.65)'
					}
				}
			}
		});
	});
</script>
</head>
<body>
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<a class="btn btn-navbar" data-toggle="collapse"
					data-target=".nav-collapse"> <span class="icon-bar"></span> <span
					class="icon-bar"></span> <span class="icon-bar"></span>
				</a> <a class="brand" href="#profile"><img src="img/user.jpg" /></a>
				<ul class="nav nav-collapse pull-right">
					<li><a href="#profile"><i class="icon-user"></i> Profile</a></li>
					<li><a href="#skills"><i class="icon-trophy"></i> Skills</a></li>
					<li><a href="#work"><i class="icon-picture"></i> Work</a></li>
					<li><a href="#resume"><i class="icon-doc-text"></i> Resume</a></li>
				</ul>
				<!-- Everything you want hidden at 940px or less, place within here -->
				<div class="nav-collapse collapse">
					<!-- .nav, .navbar-search, .navbar-form, etc -->
				</div>
			</div>
		</div>
	</div>

	<%@include  file="home.jsp" %>
	
	<!-- Footer -->
	<div class="footer">
		<div class="container">
			<p class="pull-left">
				<a href="http://www.bootstrapstage.com">By Ivo Valchev, 2016, ELSYS</a>
			</p>
			<p class="pull-right icon-mail">
				Ivo.V.Valchev at gmail.com
			</p>
		</div>
	</div>
	
	<!-- Scripts -->
	<script src="js/vertical-scroll.js"></script>
	<script src="js/bootstrap.min.js"></script>
</body>
</html>
