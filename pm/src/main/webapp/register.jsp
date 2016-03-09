<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="header.html"%>

<div class="container-fluid" style="margin-bottom: 50px;">
	<section class="container">
		<div class="container-page">
			<form>
				<div class="col-md-6">
					<h3 class="dark-grey">Registration</h3>

					<div class="form-group col-lg-12">
						<label>Username</label> <input type="" name=""
							class="form-control" id="username" value="" required>
					</div>

					<div class="form-group col-lg-6">
						<label>Password</label> <input type="password" name=""
							class="form-control" id="password" value="" required>
					</div>

					<div class="form-group col-lg-6">
						<label>Repeat Password</label> <input type="password" name=""
							class="form-control" id="repeat_password" value="" required>
					</div>
					
					<label class="radio-inline">
				      <input id="radio_pm" type="radio" name="radio_register" val="pm">Project Manager
				    </label>
				    <label class="radio-inline">
				      <input id="radio_dev" type="radio" name="radio_register" val="dev">Developer
				    </label>

				</div>

				<div class="col-md-6">
					<h3 class="dark-grey">Terms and Conditions</h3>
					<p>By clicking on "Register" you agree to The Company's' Terms
						and Conditions</p>
					<p>To use sPM for software projects only.</p>
					<p>To use all provided information and services under our
						published licenses.</p>
					<p>Not to try to break our code or attack our servers.</p>

					<button type="submit" class="btn btn-primary" id="register">Register</button>
				</div>
			</form>
		</div>
	</section>
</div>

<%@include file="footer.html"%>