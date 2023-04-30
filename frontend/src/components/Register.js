import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import signup1 from '../images/signupbac.png'

const Register = () => {

	const history = useHistory();

	const [user, setUser] = useState({
		fname: "", lname: "", email: "", password: "", confpassword: ""
	})
	let name, value;
	const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;
		console.log(value);

		setUser({ ...user, [name]: value })
	}

	const PostData = async (e) => {
		e.preventDefault();
		const { fname, lname, email, password, confpassword } = user;
		if (password.length < 8) {
			window.alert("Minimum length 8");
		}
		else {
			
			const req = await fetch("/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					fname, lname, email, password, confpassword
				})
			});
			const data = await req.json();
			if (data.status === 422 || data === "Not") {
				window.alert("InValid Registration");
				console.log("InValid Registration");
			} else {
				window.alert("Registration Successfuly");
				console.log("Registration Successfuly");
				history.push("/login");
			}
		}

	}

	return (
		<div>
			<section className='signup'>
				<div className='container_mt-5'>
					<div className='signup-content'>
						<div className='signu-form'>
							<h2 className='from-title'>Sign Up</h2>
							<from method="POST" className='register-form' id='register-form'>
								<div class="form-group">
									<label for="exampleInputfname">First Name</label>
									<input type="name" name='fname' class="form-control" id="exampleInputfName" required="true" autoCapitalize='off'
										value={user.fname} onChange={handleInputs} placeholder="Enter Name" />
								</div>
								<div class="form-group">
									<label for="exampleInputlname">Last Name</label>
									<input type="name" name='lname' class="form-control" id="exampleInputlName" required="true" autoCapitalize='off'
										value={user.lname} onChange={handleInputs} placeholder="Enter Name" />
								</div>
								<div class="form-group">
									<label for="exampleInputEmail1">Email address</label>
									<input type="email" name='email' class="form-control" id="exampleInputEmail1" required="true" aria-describedby="emailHelp" placeholder="Enter email" autoCapitalize='off'
										value={user.email} onChange={handleInputs} />
									<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
								</div>
								<div class="form-group">
									<label for="exampleInputPassword1">Password</label>
									<input type="password" name='password' class="form-control" id="exampleInputPassword1" required="true" placeholder="Password" autoComplete='off'
										value={user.password} onChange={handleInputs} />
								</div>
								<div class="form-group">
									<label for="exampleInputPassword1">Confirm Password</label>
									<input type="password" name='confpassword' class="form-control" id="exampleInputPassword1" required="true" placeholder="Password" autoCapitalize='off'
										value={user.confpassword} onChange={handleInputs} />
								</div>
								{/* <div class="form-check">
										<input type="checkbox" class="form-check-input" id="exampleCheck1" />
										<label class="form-check-label" for="exampleCheck1">Check me out</label>
									</div> */}
								<div class="from-group form-button">
									<input type="submit" name='signup' class="form-submit"
										value="Sign Up" onClick={PostData} />
								</div>
							</from>
							{/* <div className='singnup-image'>
								<figure>
									<img src={signup1} alt='registration pic' />
								</figure>
							</div> */}
						</div>

					</div>
				</div>
			</section>
		</div>
	)
}
export default Register