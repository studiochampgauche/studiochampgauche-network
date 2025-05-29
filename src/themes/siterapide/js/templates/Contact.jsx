'use strict';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Contents from './components/Contents';
import Form from './components/Form';

const Contact = () => {
	
	const introContentsRef = useRef(null);

	const formSectionRef = useRef(null);
	const formContentsRef = useRef(null);

	useEffect(() => {

		const killEvents = [];


		gsap.registerPlugin(SplitText);

		window.loader.init.then(() => {

			let split = SplitText.create(introContentsRef.current.querySelector('h1'), { type: 'lines', linesClass: 'line' });
			let animIntro = gsap.timeline();


			animIntro
			.to([introContentsRef.current.querySelectorAll('h1 .line, p'), formContentsRef.current.querySelector('.inner-contents'), formSectionRef.current.querySelector('form')], .4, {
				y: 0,
				opacity: 1,
				stagger: .05,
				delay: .2
			});


			killEvents.push(() => {

				if(split){

					split.revert();
					split = null;

				}


				if(animIntro){

					animIntro.kill();
					animIntro = null;
					
				}

			});

		});


		return () => killEvents?.forEach(killEvent => killEvent());

	});

	return(
		<>
			<section id="contact__intro" className="intro">
				<div className="container">
					<Contents
						ref={introContentsRef}
						titleTag='h1'
						title='Vous désirez <span>nous joindre</span> ?'
						text='<p>Contactez-nous dès maintenant pour découvrir nos forfaits, poser vos questions ou échanger avec un de nos représentants pour débuter une analyse de vos besoins.</p>'
					/>
				</div>
			</section>
			<section ref={formSectionRef} id="contact__form">
				<div className="container">
					<Contents
						ref={formContentsRef}
						title='Contactez-nous'
						text='<p>Remplissez notre formulaire et nous serons ravis de répondre à vos questions et de discuter de vos besoins.</p><ul><li><span>Questions&#8239;:</span><a href="mailto:info@siterapide.ca">info@siterapide.ca</a></li><li><span>Support&#8239;:</span><a href="mailto:support@siterapide.ca">support@siterapide.ca</a></li><li><span>Carrière&#8239;:</span><a href="mailto:cv@siterapide.ca">cv@siterapide.ca</a></li></ul>'
					/>
					<Form
						data={{
							form: 'contact'
						}}
					/>
				</div>
			</section>
		</>
	);
	
}

export default Contact;