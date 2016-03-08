<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="header.html"%>

<div class="container-fluid" style="margin-bottom: 50px;">
	<section class="container">
		<div class="container-page">
			<form>
				<div class="col-md-6">
					<h3 class="dark-grey">Authentication</h3>

					<div class="form-group col-lg-6">
						<label>Username</label> <input type="" name=""
							class="form-control" id="username" value="" required>
					</div>

					<div class="form-group col-lg-6">
						<label>Password</label> <input type="password" name=""
							class="form-control" id="password" value="" required>
					</div>
					
					<div class="col-md-2 col-md-offset-9">
						<button type="submit" class="btn btn-primary" id="authenticate">Auth</button>
					</div>

				</div>
				
				<div class="col-md-4 col-md-offset-2">
					<h2>Thank you for using sPM!</h2>
					
				</div>
			</form>
		</div>
	</section>
</div>

<%@include file="footer.html"%>