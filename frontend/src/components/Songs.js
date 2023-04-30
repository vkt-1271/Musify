import React, {useEffect} from 'react'
import {useHistory} from "react-router-dom"
const Songs = () => {

	const history = useHistory();

	const callAboutPage = async () => {
		try{
			const res = await fetch('/songs',{ 
				method: "GET",
				headers:{
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				credentials:"include"
			});
			const data = await res.json();
			console.log(data);

			if(!res.status === 200){
				const error = new Error(res.error);
				throw error;
			}
		}catch(e){
			console.log(e);
			history.push('/login');
		}
	}

	useEffect(() => {
		callAboutPage();
	}, [])

    return (
        <>
			<section className='signup'>
				<div className='container_mt-5'>
					<div className='signup-content'>
						<div className='signu-form'>
							<h2 className='from-title'>Songs</h2>
							<from method="Get" className='register-form' id='register-form'>
								<div class="form-group">
									<label for="exampleInputfname">First Name</label>
									<input type="name" name='fname' class="form-control" id="exampleInputfName" required="true" autoCapitalize='off'
										 placeholder="Enter Name" />
								</div>
								<div class="form-group">
									<label for="exampleInputlname">Last Name</label>
									<input type="name" name='lname' class="form-control" id="exampleInputlName" required="true" autoCapitalize='off'
										 placeholder="Enter Name" />
								</div>
								<div class="form-group">
									<label for="exampleInputEmail1">Email address</label>
									<input type="email" name='email' class="form-control" id="exampleInputEmail1" required="true" aria-describedby="emailHelp" placeholder="Enter email" autoCapitalize='off'
										/>
									<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
								</div>
								<div class="form-group">
									<label for="exampleInputPassword1">Password</label>
									<input type="password" name='password' class="form-control" id="exampleInputPassword1" required="true" placeholder="Password" autoComplete='off'
										 />
								</div>
								<div class="form-group">
									<label for="exampleInputPassword1">Confirm Password</label>
									<input type="password" name='confpassword' class="form-control" id="exampleInputPassword1" required="true" placeholder="Password" autoCapitalize='off'
										/>
								</div>
								{/* <div class="form-check">
										<input type="checkbox" class="form-check-input" id="exampleCheck1" />
										<label class="form-check-label" for="exampleCheck1">Check me out</label>
									</div> */}
								<div class="from-group form-button">
									<input type="submit" name='signup' class="form-submit"
										value="Sign Up" />
								</div>
							</from>
						</div>

					</div>
				</div>
			</section>
		</>
    )
}
export default Songs;