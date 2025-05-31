'use strict';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Support = () => {

	const supportFormRef = useRef(null);
	const subjectRef = useRef(null);
	const messageRef = useRef(null);

	const [supportFormMessage, setSupportFormMessage] = useState(null);



	useEffect(() => {

		const killEvents = [];


		let supportCanSubmit = true;


		const handleSupportSubmit = (e) => {

			e.preventDefault();

			if(!supportCanSubmit) return;

			setSupportFormMessage(null);


			/*
			* Check subject
			*/
			if(window.countWords(subjectRef.current.value) < 3)
				subjectRef.current.classList.add('error');
			else
				subjectRef.current.classList.remove('error');


			/*
			* Check message
			*/
			if(window.countWords(messageRef.current.value) < 5)
				messageRef.current.classList.add('error');
			else
				messageRef.current.classList.remove('error');




	        if(supportFormRef.current.querySelector('.error')) return;

	        supportCanSubmit = false;

	        supportFormRef.current.style.opacity = .6;
	        supportFormRef.current.style.pointerEvents = 'none';


	        const formData = new FormData();

	        formData.append('action', 'support');
	        formData.append('subject', subjectRef.current.value);
	        formData.append('message', messageRef.current.value);

	        fetch(SYSTEM.ajaxPath, {
	        	method: 'POST',
	        	body: formData
	        })
	        .then(resp => resp.json())
	        .then(data => {

	        	console.log(data);
	        	
	        	supportCanSubmit = true;

	        	supportFormRef.current.style.opacity = 1;
	        	supportFormRef.current.style.pointerEvents = 'initial';

	        	setSupportFormMessage(data.message);

	        });


		}
		supportFormRef.current.addEventListener('submit', handleSupportSubmit);


		killEvents.push(() => {

			supportFormRef.current?.removeEventListener('submit', handleSupportSubmit);

		});

		return () => killEvents?.forEach(killEvent => killEvent());

	});



	useEffect(() => {

		ScrollTrigger.refresh();

	}, [supportFormMessage]);

	return(
		<>
			<div className="support">
				<div className="bloc">
					<div className="inner-bloc">
						<h2>Écrivez-nous</h2>
						<form ref={supportFormRef} method="POST" action="">
							<div className="fields">
								<div className="field">
									<label htmlFor="subject">Sujet</label>
									<input ref={subjectRef} type="text" id="subject" />
								</div>
								<div className="field">
									<label htmlFor="message">Message</label>
									<textarea ref={messageRef} id="message"></textarea>
								</div>
							</div>
							{supportFormMessage && (<p className="form-message">{supportFormMessage}</p>)}
							<button type="submit" className="btn">
								<span>Envoyer</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
	
};

export default Support;