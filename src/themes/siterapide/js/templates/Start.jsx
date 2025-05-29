'use strict';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Contents from './components/Contents';
import Form from './components/Form';

const Start = () => {
	

	const introContentsRef = useRef(null);
	const stepItemsRef = useRef([]);

	const formSectionRef = useRef(null);
	const formContentsRef = useRef(null);

	useEffect(() => {

		const killEvents = [];


		gsap.registerPlugin(SplitText);

		window.loader.init.then(() => {

			let split = SplitText.create(introContentsRef.current.querySelector('h1'), { type: 'lines', linesClass: 'line' });
			let animIntro = gsap.timeline();


			animIntro
			.to([introContentsRef.current.querySelectorAll('h1 .line, p'), stepItemsRef.current], .4, {
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


		let animFormContents = gsap.to(formContentsRef.current.querySelector('.inner-contents'), .4, {
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: formContentsRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});


		let animFormBox = gsap.to(formSectionRef.current.querySelector('form'), .4, {
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: formSectionRef.current.querySelector('form'),
				start: 'top +=' + (window.innerHeight - 100),
			}
		});



		killEvents.push(() => {

			if(animFormContents){

				animFormContents.revert();
				animFormContents = null;

			}


			if(animFormBox){

				animFormBox.kill();
				animFormBox = null;
				
			}

		});


		return () => killEvents?.forEach(killEvent => killEvent());

	});

	return(
		<>
			<section id="start__intro" className="intro">
				<div className="container">
					<Contents
						ref={introContentsRef}
						titleTag='h1'
						title='Prêt à <span>débuter</span> votre site ?'
						text={'<p>Obtenez un site web professionnel, rapide et clé en main en moins de 30 jours, avec un design moderne et responsive, le tout sans contrat. Choisissez entre la tarification annuelle ou mensuelle, annuler à tout moment.</p><p style="font-weight: 700;">Analyse des besoins sans frais.</p>'}
					/>
				</div>
			</section>
			<section id="start__steps">
				<div className="container">
					<div className="list">
						<div ref={(el) => (stepItemsRef.current[0] = el)} className="item">
							<div className="number">
								<span>1</span>
							</div>
							<Contents
								title='Prise de contact'
								text='<p>Prenez contact avec nous via le formulaire ci-dessous.</p>'
							/>
						</div>
						<div ref={(el) => (stepItemsRef.current[1] = el)} className="item">
							<div className="number">
								<span>2</span>
							</div>
							<Contents
								title='Analyse des besoins'
								text='<p>Un représentant vous contactera dans les 48h ouvrables.</p>'
							/>
						</div>
						<div ref={(el) => (stepItemsRef.current[2] = el)} className="item">
							<div className="number">
								<span>3</span>
							</div>
							<Contents
								title='Prêt avant 30 jours'
								text='<p>Votre site web prêt dans les 30 jours suivant votre paiement initial.</p>'
							/>
						</div>
					</div>
				</div>
			</section>
			<section ref={formSectionRef} id="start__form">
				<div className="container">
					<Contents
						ref={formContentsRef}
						title='Contactez-nous'
						text='<p>Remplissez le formulaire suivant pour recevoir l’appel d’un de nos représentants.</p>'
						buttons={[
							{
								text: 'Des questions ?',
								url: '/contact/',
								className: 'gray has-arrow'
							}
						]}
					/>
					<Form
						data={{
							form: 'start'
						}}
					/>
				</div>
			</section>
		</>
	);
	
}

export default Start;