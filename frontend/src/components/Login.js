import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const Login = () => {

	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const LoginUser = async (e) => { 
		e.preventDefault();
		const res = await fetch('/login',{
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				email, password
			})
		});

		const data = await res.json();
		
		if(data==="Not"){
			window.alert("Wrong Data");
		}
		else{
			window.alert("LogIn successfully");
			history.push("/home");
		}
	}

	return (
		<>
			<section className='LogIn'>
				<div className='container_mt-5'>
					<div className='signin-content'>
						<div className='signin-form'>
							<h2 className='from-title'>Sign In</h2>
							<from method="POST" className='register-form' id='register-form'>
									<div class="form-group">
										<label for="exampleInputEmail1">Email address</label>
										<input type="email" class="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" autoCapitalize='off'
											value={email} onChange={(e) => setEmail(e.target.value)} />
									</div>
									<div class="form-group">
										<label for="exampleInputPassword1">Password</label>
										<input type="password" name='password' class="form-control" id="password" placeholder="Password" autoComplete='off'
											value={password} onChange={(e) => setPassword(e.target.value)} />
									</div>

									<div class="from-group form-button">
										<input type="submit" name='login' class="form-submit"
											value="Log In" onClick={LoginUser} />
									</div>
							</from>
							<div className='singnup-image'>
								<figure>
									{/* <img src={signup1} alt='registration pic' /> */}
								</figure>
							</div>
						</div>

					</div>
				</div>
			</section>

		</>
	)
}
export default Login
