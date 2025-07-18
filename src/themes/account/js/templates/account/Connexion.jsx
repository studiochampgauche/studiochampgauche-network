'use strict';
import React, {useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Connexion = () => {


	const [formMessage, setFormMessage] = useState(null);

	const formRef = useRef(null);
	const emailRef = useRef(null);
	const pwdRef = useRef(null);

	useEffect(() => {

		const killEvents = [];
		
		let canSubmit = true;

		const handleSubmit = (e) => {

			e.preventDefault();

			if(!canSubmit) return;

			setFormMessage(null);

			/*
			* Check Email
			*/
			if(!window.emailCheck(emailRef.current.value))
	            emailRef.current.classList.add('error');
	        else
	            emailRef.current.classList.remove('error');


	        /*
			* Check password
			*/
			if(!window.passwordCheck(pwdRef.current.value))
				pwdRef.current.classList.add('error')
			else
				pwdRef.current.classList.remove('error');



			/*
			* stop process on first error
			*/
			if(formRef.current.querySelector('.error')) return;
			

			/*
			* If no error, make sure you can't double send.
			*/
			canSubmit = false;

			formRef.current.style.opacity = .6;
			formRef.current.style.pointerEvents = 'none';



			/*
			* Send
			*/
			const formData = new FormData();

			formData.append('action', 'connexion');
			formData.append('email', emailRef.current.value);
			formData.append('password', pwdRef.current.value);

			fetch(SYSTEM.ajaxPath, {
				method: 'POST',
				body: formData
			})
			.then(resp => resp.json())
			.then(data => {

				setFormMessage(data.message);

				if(data.status === 'error'){

					formRef.current.style.opacity = 1;
					formRef.current.style.pointerEvents = 'initial';

					canSubmit = true;

				} else if(data.status === 'success'){

					window.location.reload();

				}

			});


		}

		formRef.current.addEventListener('submit', handleSubmit);

		killEvents.push(() => formRef.current?.removeEventListener('submit', handleSubmit));

	});

	useEffect(() => {

		ScrollTrigger.refresh();

	}, [formMessage]);


	return(
		<>
			<div className="faker"></div>
			<div className="content">
				<div className="logo">
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 628.8 99.6"><path d="M10.3,78.7c-3.9-1.9-6.6-4.5-8.2-7.6-1.6-3.1-2.3-6.5-2.1-10.3h16.3c-.3,5.7,2.9,8.5,9.7,8.5s5.1-.5,6.7-1.5c1.6-1,2.3-2.3,2.3-4s-.8-3.1-2.4-4c-1.6-.9-4.1-1.9-7.6-2.9l-2.6-.8c-5.4-1.7-9.6-3.7-12.6-6-3-2.3-4.5-5.7-4.5-10.2s1.1-6.9,3.2-9.8c2.2-2.9,5.2-5.1,9.3-6.8s8.7-2.5,14-2.5,10.3.9,14.1,2.8c3.7,1.9,6.4,4.3,7.9,7.2,1.6,2.9,2.2,6,1.8,9.2h-16.4c.1-2.5-.4-4.3-1.8-5.5s-3.5-1.8-6.6-1.8-4.5.4-5.9,1.3c-1.4.9-2.1,2.1-2.1,3.6s.7,2.9,2.1,3.7c1.4.8,3.8,1.8,7.3,2.8,1.2.3,2.1.6,2.7.8,5.8,1.8,10.3,3.9,13.4,6.4,3.1,2.5,4.7,6,4.7,10.6s-1,6.7-3,9.7c-2,3-5,5.4-9.1,7.3-4.1,1.9-9.2,2.8-15.4,2.8s-11.3-1-15.2-2.9Z"/><path d="M67.6,22.7h17.9l-11.2,57.2h-17.9l11.2-57.2ZM72.1,0h17.9l-3.1,15.9h-17.9l3.1-15.9Z"/><path d="M95.3,77.9c-2.4-2-3.6-5.2-3.6-9.6s.3-4.5.8-7l4.9-25.2h-7.9l2.6-13.4h7.9l3.1-16h17.9l-3.1,16h9.9l-2.6,13.4h-9.9l-4.8,24.8c-.2,1.1-.3,2.1-.3,2.9,0,1.6.4,2.6,1.2,3.1.8.5,2,.7,3.6.7s2.9-.1,4.9-.4l-2.5,12.6c-3.6.8-7.3,1.2-10.8,1.2-5.1,0-8.9-1-11.3-3Z"/><path d="M133.3,75.1c-4.3-4.4-6.5-10.8-6.5-19.2s1.4-12.2,4.2-17.5c2.8-5.4,6.9-9.6,12.2-12.8,5.3-3.2,11.6-4.8,18.7-4.8s15.1,2.2,19,6.5c3.9,4.3,5.8,10.4,5.8,18.2s-.4,6.7-1.1,10.6h-41.8v.9c0,4.2.9,7.1,2.8,8.8,1.9,1.7,4.4,2.6,7.7,2.6s5.7-.6,7.6-1.9c2-1.3,3.1-2.8,3.5-4.6h18.2c-2.8,6.3-6.8,11.2-12,14.7s-11.6,5.2-19.1,5.2-15-2.2-19.3-6.6ZM169.4,45c.1-.7.2-1.6.2-2.9,0-2.8-.8-4.9-2.3-6.3s-3.8-2.2-6.7-2.2-7,1-9.5,3.1c-2.5,2-4.4,4.8-5.6,8.3h23.9Z"/><path d="M202.8,79.8h-7.3V22.9h7.3v11.6h.2c1.6-3.9,3.7-7.1,6.4-9.4,2.7-2.3,6-3.5,9.8-3.5s3.6.1,4.9.3v7.1c-1.1-.2-2.3-.3-3.5-.3-3.3,0-6.4.8-9.1,2.5-2.7,1.7-4.9,4-6.4,6.9-1.6,2.9-2.3,6.2-2.3,9.9v31.8Z"/><path d="M231.6,76.9c-3.4-2.9-5.1-6.7-5.1-11.5s.9-7.1,2.7-9.6c1.8-2.5,4.4-4.4,7.7-5.7,3.3-1.3,7.7-2.5,13.1-3.5,4.2-.7,7.3-1.4,9.1-1.8s3.3-1.3,4.5-2.4c1.2-1.1,1.8-2.8,1.8-4.9s-1.1-5.4-3.2-7.1c-2.1-1.7-5.4-2.6-9.8-2.6s-9.2,1-11.6,2.9c-2.3,1.9-3.7,5.1-4,9.4h-7.7c.3-5.5,2.3-10,6.1-13.5,3.8-3.5,9.6-5.2,17.3-5.2s10.6,1.4,14.2,4.3c3.7,2.9,5.5,7.5,5.5,13.8v28.5c0,2.4.2,4.1.7,5.1.4,1,1.3,1.6,2.6,1.6s1.1,0,1.6-.1v5.2c-1.6.3-2.9.4-3.8.4-2.5,0-4.4-.7-5.8-2-1.3-1.3-2.1-3.7-2.3-7.1h-.2c-1.9,3.3-4.6,5.8-8,7.5-3.4,1.7-7.4,2.6-12,2.6s-10.2-1.5-13.6-4.4ZM246,74.9c5.9,0,10.6-1.5,14.1-4.4,3.5-2.9,5.2-6.9,5.2-12v-10.6c-.7,1-2.4,1.9-4.9,2.7-2.5.7-5.7,1.5-9.7,2.1-5.9,1-10.1,2.4-12.8,4.2-2.6,1.7-4,4.4-4,7.9,0,6.8,4,10.2,11.9,10.2Z"/><path d="M301.9,78.2c-3.1-2-5.6-4.6-7.5-8h-.2v29.4h-7.3V22.9h7.3v9.2h.2c1.9-3.1,4.5-5.7,7.6-7.6,3.1-2,7-3,11.6-3s8.9,1.2,12.7,3.6c3.8,2.4,6.8,5.9,9,10.4,2.2,4.5,3.4,9.8,3.4,15.9s-1.1,11.3-3.4,15.8c-2.2,4.5-5.2,8-9,10.4-3.8,2.4-8,3.6-12.7,3.6s-8.6-1-11.7-3ZM296.5,63.7c1.6,3.5,3.8,6.3,6.6,8.2,2.8,1.9,6.1,2.9,9.7,2.9s7.1-1,9.9-3.1,4.9-4.9,6.3-8.5c1.4-3.6,2.1-7.5,2.1-11.8,0-6.7-1.6-12.3-4.9-16.8-3.2-4.5-7.7-6.8-13.5-6.8s-6.9,1-9.7,2.9c-2.8,1.9-5,4.7-6.6,8.3-1.6,3.6-2.3,7.7-2.3,12.4s.8,8.8,2.3,12.3Z"/><path d="M348,2.1h9.4v9.4h-9.4V2.1ZM349.1,22.9h7.3v56.9h-7.3V22.9Z"/><path d="M379.1,77.7c-3.8-2.4-6.9-5.9-9-10.4-2.2-4.5-3.3-9.8-3.3-15.9s1.1-11.3,3.3-15.8c2.2-4.5,5.2-8,9-10.4,3.8-2.4,8.1-3.6,12.7-3.6s8.6,1,11.7,3c3.1,2,5.6,4.6,7.5,8h.2V0h7.3v79.8h-7.3v-9.3h-.2c-1.9,3.1-4.4,5.7-7.5,7.7-3.2,2-7.1,3-11.7,3s-8.8-1.2-12.7-3.6ZM379.2,68.2c3.2,4.5,7.7,6.8,13.5,6.8s6.9-1,9.7-2.9c2.8-1.9,5-4.7,6.5-8.2,1.6-3.5,2.3-7.7,2.3-12.4s-.8-8.8-2.3-12.3c-1.6-3.5-3.7-6.3-6.5-8.2-2.8-1.9-6-2.9-9.7-2.9s-7.1,1-9.9,3.1c-2.8,2.1-4.9,4.9-6.3,8.5-1.4,3.6-2.1,7.5-2.1,11.8,0,6.7,1.6,12.3,4.9,16.8Z"/><path d="M441.4,77.5c-4.1-2.6-7.2-6.1-9.3-10.7-2.1-4.5-3.2-9.7-3.2-15.5s1.1-11.3,3.3-15.8c2.2-4.5,5.4-8,9.5-10.4,4.1-2.5,8.9-3.7,14.3-3.7s10,1.2,13.8,3.5c3.9,2.3,6.8,5.6,8.8,9.7,2,4.1,3,8.8,3,14.1s0,3.4-.1,4h-45.1c0,4,.8,7.7,2.3,11.1,1.5,3.4,3.6,6.1,6.6,8.2,2.9,2,6.5,3.1,10.8,3.1s9.2-1.3,12.1-4c2.8-2.7,4.6-5.6,5.4-8.7h7.4c-1.5,5.7-4.3,10.2-8.5,13.7-4.2,3.5-9.6,5.2-16.4,5.2s-10.5-1.3-14.6-3.9ZM474,46.4c0-3.4-.7-6.6-2.2-9.4-1.5-2.9-3.6-5.1-6.3-6.8-2.8-1.7-6-2.5-9.8-2.5-5.4,0-9.9,1.8-13.5,5.4-3.5,3.6-5.5,8-5.8,13.4h37.5Z"/><path d="M487.2,62.9h17l-3.4,17h-17l3.4-17Z"/><path d="M517,75.4c-4.5-4.2-6.8-10.2-6.8-17.9s1.3-12.7,4-18.3,6.6-10,11.8-13.4c5.2-3.4,11.4-5,18.7-5s10.1,1,13.9,3.1c3.8,2,6.5,4.8,8.3,8.4,1.7,3.5,2.4,7.5,2.1,12h-17.4c.2-2.9-.3-5.3-1.5-7.2-1.2-1.9-3.4-2.8-6.6-2.8s-5.9,1.1-8.3,3.2c-2.4,2.1-4.2,4.9-5.5,8.4-1.3,3.5-1.9,7.2-1.9,11.1s.8,6.6,2.3,8.5c1.5,2,3.8,3,6.8,3s6.1-.9,7.8-2.6c1.7-1.7,3.1-4.2,4.2-7.4h17.4c-1.8,7-5.4,12.7-10.8,17-5.4,4.3-12.1,6.5-20,6.5s-14-2.1-18.5-6.4Z"/><path d="M573.9,77.8c-2.8-2.5-4.2-6.1-4.2-10.7s2.3-10.9,7-14.1c4.7-3.1,11.1-5.6,19.1-7.4,5.7-1.3,9.8-2.5,12.3-3.6,2.5-1.1,3.7-2.8,3.7-5s-2.3-4.4-6.8-4.4-5.8.7-7.6,2.1c-1.9,1.4-3.3,3.5-4.1,6.4h-16.9c1.4-6.1,4.6-11,9.7-14.8,5-3.8,12-5.6,20.9-5.6s12.5,1.4,16.2,4.1c3.7,2.7,5.6,7.1,5.6,13s-.3,4.7-.9,7.8l-4.4,21c-.2,1-.3,1.8-.3,2.5s.2,1.2.6,1.5c.4.3,1.1.4,2.1.4h.9c0-.1-1.8,9-1.8,9-3.8.7-6.9,1-9.3,1-6.9,0-10.3-2.7-10.3-8.2h-.2c-2.1,2.6-4.8,4.7-8.2,6.3-3.3,1.6-7.1,2.4-11.3,2.4s-9.1-1.3-11.9-3.8ZM589.5,67.7c1.2.9,2.7,1.4,4.6,1.4,7.4,0,12.1-4.2,14.1-12.7l1.1-4.7c-1.5.8-2.8,1.5-4.1,1.9s-3.6,1-7,1.8c-3.6.8-6.3,1.8-8,3-1.7,1.2-2.5,2.9-2.5,5.1s.6,3.3,1.7,4.2Z"/></svg>
					<div className="gbar"></div>
				</div>
				<div className="box">
					<div className="inner-box">
						<span>Connexion</span>
						<form ref={formRef} action="" method="POST">
							{formMessage && (
								<p className="form-message" dangerouslySetInnerHTML={{ __html: formMessage }} />
							)}
							<div className="fields">
								<div className="field">
									<label htmlFor="email">Courriel</label>
									<input ref={emailRef} type="email" id="email" autoComplete="username" required />
								</div>
								<div className="field">
									<label htmlFor="email">Mot de passe</label>
									<input ref={pwdRef} type="password" id="password" autoComplete="current-password" required />
								</div>
							</div>
							<button className="btn">
								<span>Connexion</span>
							</button>
						</form>
					</div>
				</div>
				<Link to="/mdp-perdu/">J'ai perdu mon mot de passe</Link>
			</div>
			<ul>
				<li>
					<span>&copy; siterapide.ca</span>
				</li>
			</ul>
		</>
	);
	
};

export default Connexion;