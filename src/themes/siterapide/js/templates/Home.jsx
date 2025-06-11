'use strict';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import Contents from './components/Contents';
import Image from './components/Image';
import Button from './components/Button';

const Home = () => {
	
	const introContentsRef = useRef(null);
	const introEndRef = useRef(null);
	const introSmallTextRef = useRef(null);
	const introBigTextRef = useRef(null);

	const priceContentsRef = useRef(null);
	const priceListRef = useRef(null);
	const priceItemsRef = useRef([]);

	const benefitsContentsRef = useRef(null);
	const benefitsListRef = useRef(null);
	const benefitsItemsRef = useRef([]);

	const saRef = useRef(null);
	const saContentsRef = useRef(null);
	const saListRef = useRef(null);
	const saTrackRef = useRef(null);
	const saItemsRef = useRef([]);

	const ctaContentsRef = useRef(null);

	useEffect(() => {
		
		const killEvents = [];

		gsap.registerPlugin(Draggable, InertiaPlugin, SplitText);

		window.loader.init.then(() => {

			let split = SplitText.create(introContentsRef.current.querySelector('h1'), { type: 'lines', linesClass: 'line' });
			let animIntro = gsap.timeline();


			animIntro
			.to([introContentsRef.current.querySelectorAll('h1 .line, .btn'), introEndRef.current], .4, {
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



		let animSmallText = gsap.to(introSmallTextRef.current.querySelector('.inner-contents'), .4, {
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: introSmallTextRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});


		let animBigText = gsap.to(introBigTextRef.current.querySelector('.inner-contents'), .4, {
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: introBigTextRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});


		let animPriceContents = gsap.to(priceContentsRef.current.querySelector('.inner-contents'), .4, {
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: priceContentsRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});


		let animPriceItems = gsap.to(priceItemsRef.current, .4, {
			y: 0,
			opacity: 1,
			stagger: .05,
			scrollTrigger: {
				trigger: priceListRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});



		let animBenefitsContents = gsap.to(benefitsContentsRef.current.querySelector('.inner-contents'), .4, {
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: benefitsContentsRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});


		let animBenefitsItems = gsap.to(benefitsItemsRef.current, .4, {
			x: 0,
			opacity: 1,
			stagger: .05,
			scrollTrigger: {
				trigger: benefitsListRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});



		let animSaContents = gsap.to(saContentsRef.current.querySelector('.inner-contents'), .4, {
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: saContentsRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});


		let animSaItems = gsap.to([saItemsRef.current, saRef.current.querySelector('.btn')], .4, {
			y: 0,
			opacity: 1,
			stagger: .05,
			scrollTrigger: {
				trigger: saListRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});



		let animCtaContents = gsap.to(ctaContentsRef.current.querySelector('.inner-contents'), .4, {
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: ctaContentsRef.current,
				start: 'top +=' + (window.innerHeight - 100),
			}
		});



		//const positions = saItemsRef.current.map(item => -(item.getBoundingClientRect().left - saListRef.current.getBoundingClientRect().left));
		let draggableAnim = gsap.to('#mouser .arrows', .2, {
			paddingLeft: 30,
			paddingRight: 30
		});

		draggableAnim.paused(true);

		Draggable.create(saTrackRef.current, {
			type: 'x',
			bounds: {
				minX: 0,
				maxX: -(saTrackRef.current.getBoundingClientRect().right - saListRef.current.getBoundingClientRect().right)
			},
			inertia: true,
			//snap: positions,
			onPress: () => {

				draggableAnim.play();
				draggableAnim.reversed(false);

			},
			onRelease: () => {

				draggableAnim.play();
				draggableAnim.reversed(true);

			}
		});


		priceItemsRef.current?.forEach(item => {

			const thead = item.querySelector('.thead');
			const tbody = item.querySelector('.tbody');

			const itemsToSwitch = tbody?.querySelectorAll('.inner .bottom .items .item');


			let tl = null;

			if(tbody){

				tl = gsap.timeline({
					onComplete: () => ScrollTrigger.refresh(),
					onReverseComplete: () => ScrollTrigger.refresh(),
				});

				tl
				.to(tbody, .2, {
					height: tbody.querySelector('.inner').clientHeight,
				})
				.to(thead.parentNode.querySelector('.thead > span'), .1, {
					opacity: 0,
					onComplete: () => {
						thead.parentNode.querySelector('.thead > span').innerText = 'Fermer les détails -';
					}
				}, 0)
				.to(thead.parentNode.querySelector('.thead > span'), .1, {
					opacity: 1,
					onReverseComplete: () => {
						thead.parentNode.querySelector('.thead > span').innerText = 'Voir les détails +';
					}
				}, .1)
				.paused(true);
			}


			const handleClick = () => {

				item.classList.toggle('active');

				if(item.classList.contains('active')){

					tl?.play();
					tl?.reversed(false);

				} else {

					tbody?.querySelector('.inner .top ul li:nth-child(1)')?.dispatchEvent(new Event('click'));

					tl?.play();
					tl?.reversed(true);

				}

			}
			thead.addEventListener('click', handleClick);


			tbody?.querySelectorAll('.inner .top ul li')?.forEach((li, i) => {

				const handleLiClick = () => {

					tbody.querySelector('.inner .top ul li.active').classList.remove('active');
					li.classList.add('active');

					itemsToSwitch[(i ? 0 : 1)].style.display = 'none';
					itemsToSwitch[i].style.display = 'block';

					gsap.set(tbody, {
						height: tbody.querySelector('.inner').clientHeight
					});

					ScrollTrigger.refresh();

				}

				li.addEventListener('click', handleLiClick);

				killEvents.push(() => {

					li?.removeEventListener('click', handleLiClick);

				});

			});

			killEvents.push(() => {

				thead?.removeEventListener('click', handleClick);

				if(tl){

					tl.kill();
					tl = null;

				}

			});

		});


		benefitsItemsRef.current?.forEach(btn => {

            let anim2 = gsap.timeline();
            const btnSpan = btn.querySelector('span');
            const btnH3 = btn.querySelector('h3');

            anim2
            .to(btnH3, .2, {
                y: '+=20px',
                opacity: 0
            })
            .to(btnSpan, .2, {
                y: '+=20px',
                opacity: 1
            }, 0)
            .paused(true);


            const handleMouseEnter = () => {

                anim2.play();
                anim2.reversed(false);

            };


            const handleMouseLeave = () => {

                anim2.play();
                anim2.reversed(true);

            };

            btn.addEventListener('mouseenter', handleMouseEnter);
            btn.addEventListener('mouseleave', handleMouseLeave);


            killEvents.push(() => {

            	if(anim2){

            		anim2.kill();
            		anim2 = null;

            	}

            	btn?.removeEventListener('mouseenter', handleMouseEnter);
            	btn?.removeEventListener('mouseleave', handleMouseLeave);

            });


        });


		killEvents.push(() => {

			Draggable.get(saTrackRef.current)?.kill();

			if(draggableAnim){

				draggableAnim.kill();
				draggableAnim = null;

			}


			if(animSmallText){

				animSmallText.kill();
				animSmallText = null;

			}


			if(animBigText){

				animBigText.kill();
				animBigText = null;

			}


			if(animPriceContents){

				animPriceContents.kill();
				animPriceContents = null;

			}


			if(animPriceItems){

				animPriceItems.kill();
				animPriceItems = null;

			}



			if(animBenefitsContents){

				animBenefitsContents.kill();
				animBenefitsContents = null;

			}


			if(animBenefitsItems){

				animBenefitsItems.kill();
				animBenefitsItems = null;

			}


			if(animSaContents){

				animSaContents.kill();
				animSaContents = null;

			}


			if(animSaItems){

				animSaItems.kill();
				animSaItems = null;

			}


			if(animCtaContents){

				animCtaContents.kill();
				animCtaContents = null;

			}

		});


		return () => killEvents?.forEach(killEvent => killEvent());
	});

	return(
		<>
			<section id="h__intro">
				<div className="container">
					<Contents
						ref={introContentsRef}
						titleTag='h1'
						title='Un <span>site web</span> à votre image. <br>Simple, rapide & abordable!'
						buttons={[
							{
								text: 'Tarifs & forfaits',
								url: '#h__prices',
								className: 'gray has-arrow turn'
							}
						]}
					/>
					<div ref={introEndRef} className="end">
						<Image />
						<div className="after-image">
							<div className="left">
								<Contents
									ref={introSmallTextRef}
									title='Personnalisé pour vos besoins'
									text='<p>Obtenez un site web professionnel, rapidement et clé en main pour votre entreprise, qui reflète votre image et attire vos clients. Le tout sans contrat et facturable au mois ou à l’année.</p>'
								/>
							</div>
							<div className="right">
								<Contents
									ref={introBigTextRef}
									text='<p>Obtenez un site web de calibre professionnel à une fraction du prix.</p>'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="h__prices">
				<div className="container">
					<Contents
						ref={priceContentsRef}
						title='Tarifs & forfaits'
						text='<p>Démarrez avec le forfait qui convient le mieux à votre entreprise. Changez de forfait ou annulez à tout moment votre abonnement.</p>'
						buttons={[
							{
								text: 'Débuter',
								url: '/debuter-mon-site/',
								className: 'blue has-arrow'
							}
						]}
					/>
					<div ref={priceListRef} className="list">
						<div ref={(el) => (priceItemsRef.current[0] = el)} className="item">
							<div className="thead">
								<div className="price">
									<span><span>119$</span>/mois*</span>
									<i>+ frais de départ&#8239;: 499$</i>
									<i>* Les mensualités débutent 30 jours suivant le paiement des frais initiaux.</i>
								</div>
								<Contents
									titleTag='h3'
									title='Multi-sections'
									text='<p>Site web d’une page comprenant plusieurs modules.</p>'
								/>
								<span>Voir les détails +</span>
							</div>
							<div className="tbody">
								<div className="inner">
									<div className="top">
										<ul>
											<li className="active">
												<span>Inclusions</span>
											</li>
											<li>
												<span>Options</span>
											</li>
										</ul>
										<span>*Des conditions s'appliquent</span>
									</div>
									<div className="bottom">
										<div className="items">
											<div className="item">
												<ul>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>1 module "Hero"</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Jusqu'à 7 modules au choix</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Jusqu'à 2 langues</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>1 nom de domaine .com ou .ca</span>
													</li>
													<li>
														<Link to="#h__benefits">
															<div className="arrow">
																<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
															</div>
															<span>Les avantages siterapide.ca</span>
														</Link>
													</li>
												</ul>
											</div>
											<div className="item">
												<ul>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Module supplémentaire&#8239;: 3$/mois</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Langue supplémentaire&#8239;: 8$/mois</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Nom de domaine .com&#8239;: 35$/an</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Nom de domaine .ca&#8239;: 25$/an</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Prix pour une autre extension de domaine, à discuter</span>
													</li>
												</ul>
											</div>
										</div>
										<Button
											text='Débuter mon site'
											to='/debuter-mon-site/'
											className='gray has-arrow'
										/>
										<i>* Les mensualités débutent 30 jours suivant le paiement des frais initiaux.</i>
									</div>
								</div>
							</div>
						</div>
						<div ref={(el) => (priceItemsRef.current[1] = el)} className="item">
							<div className="thead">
								<div className="price">
									<span><span>159$</span>/mois*</span>
									<i>+ frais de départ&#8239;: 799$</i>
									<i>* Les mensualités débutent 30 jours suivant le paiement des frais initiaux.</i>
								</div>
								<Contents
									titleTag='h3'
									title='Multi-pages'
									text='<p>Site web de plusieurs pages, personnalisé et modulable.</p>'
								/>
								<span>Voir les détails +</span>
							</div>
							<div className="tbody">
								<div className="inner">
									<div className="top">
										<ul>
											<li className="active">
												<span>Inclusions</span>
											</li>
											<li>
												<span>Options</span>
											</li>
										</ul>
										<span>*Des conditions s'appliquent</span>
									</div>
									<div className="bottom">
										<div className="items">
											<div className="item">
												<ul>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Jusqu'à 5 pages</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Jusqu'à 30 modules</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Jusqu'à 2 langues</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>1 nom de domaine .com ou .ca</span>
													</li>
													<li>
														<Link to="#h__benefits">
															<div className="arrow">
																<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
															</div>
															<span>Les avantages siterapide.ca</span>
														</Link>
													</li>
												</ul>
											</div>
											<div className="item">
												<ul>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Page supplémentaire&#8239;: 8$/mois<br /><small>(Ajout de 6 modules à votre forfait)</small></span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Module supplémentaire&#8239;: 3$/mois</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Langue supplémentaire&#8239;: 15$/mois</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Nom de domaine .com&#8239;: 35$/an</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Nom de domaine .ca&#8239;: 25$/an</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Prix pour une autre extension de domaine, à discuter</span>
													</li>
												</ul>
											</div>
										</div>
										<Button
											text='Débuter mon site'
											to='/debuter-mon-site/'
											className='gray has-arrow'
										/>
										<i>* Les mensualités débutent 30 jours suivant le paiement des frais initiaux.</i>
									</div>
								</div>
							</div>
						</div>
						<div ref={(el) => (priceItemsRef.current[2] = el)} className="item">
							<div className="thead">
								<div className="price">
									<span><span>399$</span>/mois*</span>
									<i>+ frais de départ&#8239;: 1 499$</i>
									<i>* Les mensualités débutent 30 jours suivant le paiement des frais initiaux.</i>
								</div>
								<Contents
									titleTag='h3'
									title='Boutique en ligne'
									text='<p>Site web transactionnel permettant d’afficher et de vendre vos produits sans cassage de tête.</p>'
								/>
								<span>Bientôt disponible</span>
							</div>
						</div>
						<div ref={(el) => (priceItemsRef.current[3] = el)} className="item">
							<div className="thead">
								<div className="price">
									<span><span>199$</span>/an*</span>
									<i>+ frais de départ&#8239;: 499$</i>
									<i>* La facture initiale comprend les frais de départ et les frais annuels.</i>
								</div>
								<Contents
									titleTag='h3'
									title='Petit budget'
									text='<p>Site web d’une page de 4 modules dont 2 au choix.</p>'
								/>
								<span>Voir les détails +</span>
							</div>
							<div className="tbody">
								<div className="inner">
									<div className="top">
										<ul>
											<li className="active">
												<span>Inclusions</span>
											</li>
											<li>
												<span>Options</span>
											</li>
										</ul>
										<span>*Des conditions s'appliquent</span>
									</div>
									<div className="bottom">
										<div className="items">
											<div className="item">
												<ul>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>1 module "Hero"</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>1 module contact</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>2 modules au choix</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>1 langue</span>
													</li>
													<li>
														<Link to="#h__benefits">
															<div className="arrow">
																<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
															</div>
															<span>Les avantages siterapide.ca<br /><small>(Excluant le nom de domaine gratuit.)</small></span>
														</Link>
													</li>
												</ul>
											</div>
											<div className="item">
												<ul>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Langue supplémentaire&#8239;: 48$/an</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Nom de domaine .com&#8239;: 35$/an</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Nom de domaine .ca&#8239;: 25$/an</span>
													</li>
													<li>
														<div className="arrow">
															<svg xmlns="http://www.w3.org/2000/svg"width="32" height="31.918" viewBox="0 0 32 31.918"><g><path d="M14.834.03C28.5-.764,37.013,14.565,28.742,25.577A16.018,16.018,0,0,1,.928,21.364C-2.608,11.513,4.373.637,14.834.03m.223,1.058A14.9,14.9,0,1,0,28.04,24.708c7.425-10.22-.456-24.3-12.983-23.62" transform="translate(0 0)" fill="#214cf3"/><path d="M163.276,200.222h0a.514.514,0,0,1-.012.712l-8.762,8.814c-.376.316-.529.485-.978.139l-4.931-4.93a.538.538,0,0,1,.64-.862l4.7,4.645,8.6-8.533a.514.514,0,0,1,.738.015" transform="translate(-140.129 -188.9)" fill="#214cf3"/></g></svg>
														</div>
														<span>Prix pour une autre extension de domaine, à discuter</span>
													</li>
												</ul>
											</div>
										</div>
										<Button
											text='Débuter mon site'
											to='/debuter-mon-site/'
											className='gray has-arrow'
										/>
										<i>* La facture initiale comprend les frais de départ et les frais annuels.</i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="h__benefits">
				<div className="container">
					<Contents
						ref={benefitsContentsRef}
						title='Avantages <br>& inclusions'
						text='<p>Bénéficiez de plusieurs avantages et inclusions pensés pour favoriser votre marketing web et soutenir la croissance de votre entreprise</p>'
						buttons={[
							{
								text: 'Débuter',
								url: '/debuter-mon-site/',
								className: 'blue has-arrow'
							}
						]}
					/>
					<div ref={benefitsListRef} className="list">
						<Link ref={(el) => (benefitsItemsRef.current[0] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><g><path d="M94.1,102.5v-8c0-.7-.6-1.3-1.3-1.3s-1.3.6-1.3,1.3v8h-2.8v-38.8h2.8v22.7c0,.7.6,1.3,1.3,1.3s1.3-.6,1.3-1.3v-19.9c0-1.3,0-2.6,0-3.9,0-1-.6-1.5-1.2-2.3-1.5-1.9-2.9-3.8-4.4-5.7l-6.7-8.6c-.7-.9-2.1-1.1-3-.4-.1.1-.3.2-.4.4l-4.3,5.5-4.8,6.2-1.9,2.4c-.5.6-1.4,1.5-1.4,2.2v7.8c0,.7.5,1.3,1.3,1.4.7,0,1.3-.5,1.4-1.3,0,0,0,0,0,0v-6.4h2.8v38.8h-2.8v-24.2c0-.7-.5-1.3-1.3-1.4-.7,0-1.3.5-1.4,1.3,0,0,0,0,0,0v24.3c-1.4.3-2.4,1.5-2.4,3v6.3c0,1.7,1.4,3,3,3h1.4v2.6c0,4.3,3.5,7.8,7.8,7.8h8.3c4.3,0,7.8-3.5,7.8-7.8v-2.6h1.4c1.7,0,3-1.4,3-3v-6.3c0-1.4-1-2.6-2.4-3M83.7,52.7h-7.3l3.6-4.7,3.6,4.7ZM70.1,60.9l4.3-5.5h11.4l4.3,5.5h-20ZM86,102.4h-2.1v-38.8h2.1v38.8ZM81.3,102.4h-2.4v-38.8h2.4v38.8ZM76.2,102.4h-2.1v-38.8h2.1v38.8ZM89.4,117.4c0,2.8-2.3,5.2-5.2,5.2h-8.3c-2.8,0-5.2-2.3-5.2-5.2v-2.6h18.6v2.6ZM93.8,111.7c0,.2-.2.4-.4.4h-26.7c-.2,0-.4-.2-.4-.4v-6.3c0-.2.2-.4.4-.4h26.7c.2,0,.4.2.4.4v6.3Z" fill="#1d1d1b"/><path d="M122.7,45.5c1.3,0,2.4-1.1,2.4-2.4v-5.8c0-1.3-1.1-2.4-2.4-2.4h-5.8c-1.3,0-2.4,1.1-2.4,2.4v1.6h-29.5c-3.2-.2-6.5-.2-9.7,0-.2,0-.5,0-.7,0h-29.1v-1.6c0-1.3-1.1-2.4-2.4-2.4h-5.8c-1.3,0-2.4,1.1-2.4,2.4v5.8c0,1.3,1.1,2.4,2.4,2.4h1.6v25.1c0,.2,0,.4,0,.6,0,0,0,0,0,.1v10.4h-1.6c-1.3,0-2.4,1.1-2.4,2.4v5.8c0,1.3,1.1,2.4,2.4,2.4h5.8c1.3,0,2.4-1.1,2.4-2.4v-5.8c0-1.3-1.1-2.4-2.4-2.4h-1.6v-11c0-5.2,1.7-10.3,4.7-14.6,5.6-7.5,13.8-12.5,23-14.1,1.8-.3,3.6-.6,5.4-.7h10.3c4.6.3,9.1,1.2,13.4,2.9,6.2,2.4,11.5,6.5,15.4,11.9,3.1,4.4,4.8,9.6,4.7,15,0,0,0,0,0,.1v10.4h-1.6c-1.3,0-2.4,1.1-2.4,2.4v5.8c0,1.3,1.1,2.4,2.4,2.4h5.8c1.3,0,2.4-1.1,2.4-2.4v-5.8c0-1.3-1.1-2.4-2.4-2.4h-1.6v-36.3h1.6ZM43,89.7h-5.3v-5.3h5.3v5.3ZM37.7,37.5h5.3v5.3h-5.3v-5.3ZM44.2,54.7c-1,1.4-1.9,2.9-2.6,4.4v-13.7h1.6c1.3,0,2.4-1.1,2.4-2.4v-1.6h16.3c-7.1,2.5-13.3,7.1-17.7,13.2M115.9,54.7c-4.2-5.8-9.9-10.2-16.6-12.8-.4-.1-.7-.3-1.1-.4h16.3v1.6c0,1.3,1.1,2.4,2.4,2.4h1.6v13.7c-.7-1.6-1.6-3-2.6-4.4M122.5,89.7h-5.3v-5.3h5.3v5.3ZM117.2,37.5h5.3v5.3h-5.3v-5.3Z" fill="#1d1d1b"/></g></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Design moderne</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[1] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><path d="M111.4,60.8v-26.2c0-4.8-3.9-8.7-8.7-8.7h-45.3c-4.8,0-8.7,3.9-8.7,8.7v22.7h26.2v31.8l-9.9-11.9c-5.9-7.1-16.4-8-23.4-2.1-.8.6-1.5,1.4-2.1,2.1l-9.9,11.9v-31.8h15.7v-3.5h-19.2v41.9h22.7v29.6c0,4.8,3.9,8.7,8.7,8.7h45.3c4.8,0,8.7-3.9,8.7-8.7v-22.7h-26.2v-38.4h45.3v38.4h-15.7v3.5h19.2v-45.3h-22.7ZM31.4,92.2l10.6-12.7c4.7-5.6,12.9-6.3,18.5-1.7.6.5,1.2,1.1,1.7,1.7l10.6,12.7H31.4ZM107.9,125.4c0,2.9-2.3,5.2-5.2,5.2h0s-45.3,0-45.3,0c-2.9,0-5.2-2.3-5.2-5.2v-5.2h55.8v5.2ZM104.4,106.2h3.5v10.5s-55.8,0-55.8,0v-20.9h3.5v17.4h48.8v-7ZM100.9,60.8h-19.2v45.3h19.2v3.5h-41.9v-14h19.2v-41.9h-19.2v-3.5h41.9v10.5ZM107.9,60.8h-3.5v-14h-48.8v7h-3.5v-10.5h55.8v17.4ZM107.9,39.9h-55.8v-5.2c0-2.9,2.3-5.2,5.2-5.2h45.3c2.9,0,5.2,2.3,5.2,5.2v5.2Z" fill="#1d1d1b"/><path d="M95.1,89.3c-3.8.9-6.4,4.3-6.4,8.2v1.7h38.4v-1.7c0-3.9-2.6-7.3-6.4-8.2l-7.6-1.9v-.4c2.2-1.6,3.5-4.2,3.5-6.9v-3.1c0-4.6-3.4-8.5-8-9-4.8-.4-9,3.1-9.4,7.9,0,.3,0,.5,0,.8v3.5c0,2.7,1.3,5.3,3.5,6.9v.4l-7.6,1.9ZM105.3,84.5c-1.6-.9-2.6-2.6-2.6-4.5v-3.5c0-1.5.6-2.9,1.7-3.9,1.1-1,2.5-1.5,4-1.4,2.8.4,4.8,2.8,4.8,5.6v3.1c0,1.9-1,3.6-2.6,4.5l-.9.5v5.1l10.2,2.5c1.6.4,2.9,1.5,3.4,3.1h-30.8c.6-1.5,1.9-2.7,3.4-3l10.2-2.5v-5.1l-.9-.5Z" fill="#1d1d1b"/><path d="M32.9,66.1c0,2.9,2.3,5.2,5.2,5.2,2.9,0,5.2-2.3,5.2-5.2,0-2.9-2.3-5.2-5.2-5.2-2.9,0-5.2,2.3-5.2,5.2ZM39.9,66.1c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7.8-1.7,1.7-1.7h0c1,0,1.7.8,1.7,1.7Z" fill="#1d1d1b"/></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Optimisation pour mobile</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[2] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><g><path d="M77.7,68.9c-8.4,0-15.2,6.8-15.2,15.2s6.8,15.2,15.2,15.2,15.2-6.8,15.2-15.2c0-8.4-6.8-15.2-15.2-15.2M77.7,96.4c-6.8,0-12.3-5.5-12.3-12.3,0-6.8,5.5-12.3,12.3-12.3s12.3,5.5,12.3,12.3h0c0,6.8-5.5,12.3-12.3,12.3" fill="#1d1d1b"/><path d="M41.8,36.8c-2.3,0-4.2,1.9-4.2,4.2,0,2.3,1.9,4.2,4.2,4.2,2.3,0,4.2-1.9,4.2-4.2,0-2.3-1.9-4.2-4.2-4.2M41.8,42.3c-.7,0-1.3-.6-1.3-1.3s.6-1.3,1.3-1.3c.7,0,1.3.6,1.3,1.3h0c0,.7-.6,1.3-1.3,1.3" fill="#1d1d1b"/><path d="M52.5,36.8c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2,4.2-1.9,4.2-4.2h0c0-2.3-1.9-4.2-4.2-4.2M52.5,42.3c-.7,0-1.3-.6-1.3-1.3s.6-1.3,1.3-1.3c.7,0,1.3.6,1.3,1.3h0c0,.7-.6,1.3-1.3,1.3" fill="#1d1d1b"/><path d="M63.1,36.8c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2c2.3,0,4.2-1.9,4.2-4.2,0-2.3-1.9-4.2-4.2-4.2M63.1,42.3c-.7,0-1.3-.6-1.3-1.3,0-.7.6-1.3,1.3-1.3.7,0,1.3.6,1.3,1.3,0,.7-.6,1.3-1.3,1.3" fill="#1d1d1b"/><path d="M52.5,60.9c-.8,0-1.4.6-1.4,1.4h0v6.3c0,.8.8,1.4,1.6,1.3.7,0,1.2-.6,1.3-1.3v-6.3c0-.8-.6-1.4-1.4-1.4" fill="#1d1d1b"/><path d="M122.4,31.4H37.6c-3.5,0-6.3,2.8-6.3,6.3v69c0,3.5,2.8,6.3,6.3,6.3,0,0,0,0,0,0h27.7v5.1h-4.3c-2.9,0-5.2,2.3-5.2,5.2v3.1c0,1.3,1.1,2.4,2.4,2.4h43.5c1.3,0,2.4-1.1,2.4-2.4v-3.1c0-2.9-2.3-5.2-5.2-5.2h-4.3v-5.1h8.8l2.9,2.4c1.2,1,2.8,1.6,4.4,1.6.2,0,.4,0,.6,0,2.5-.2,4.6-1.7,5.7-4h5.4c3.5,0,6.3-2.8,6.3-6.3,0,0,0,0,0,0V37.6c.1-3.5-2.7-6.3-6.2-6.3M98.9,120.8c1.3,0,2.4,1.1,2.4,2.4v2.6h-42.6v-2.6c0-1.3,1.1-2.4,2.4-2.4h37.9ZM68.2,112.9h23.6v5.1h-23.6v-5.1ZM37.6,110c-1.9,0-3.4-1.5-3.4-3.4v-5.4h29.9c7.6,6.1,18.3,6.4,26.3.8l9.6,8h-62.4ZM113.7,112.6c-1.4,1.7-4,1.9-5.7.5l-15.4-12.9c2-1.8,3.6-4,4.8-6.5l15.8,13.2c1.7,1.4,1.9,4,.5,5.7M125.7,106.6c0,1.9-1.5,3.4-3.4,3.4h-4.8c0-.2,0-.4,0-.6-.2-1.8-1-3.5-2.4-4.7l-4.2-3.5h14.9v5.4ZM125.7,98.3h-18.3l-8.9-7.4c.3-.8.5-1.7.7-2.6.2-.8-.2-1.6-1-1.8-.8-.2-1.6.2-1.8,1,0,0,0,.2,0,.3-2.1,10.3-12.1,17-22.4,15-10.3-2.1-17-12.1-15-22.4,1.8-8.9,9.6-15.4,18.7-15.4,4.3,0,8.5,1.5,11.9,4.2,3.3,2.7,5.7,6.3,6.7,10.5.1.8.8,1.3,1.6,1.2.8-.1,1.3-.8,1.2-1.6,0,0,0-.2,0-.3-.3-1.1-.6-2.2-1-3.2h14.4c1.6,0,2.9-1.3,2.9-2.9v-14.5c0-1.6-1.3-2.9-2.9-2.9h-42.4c-.8,0-1.5.5-1.6,1.3,0,.8.5,1.5,1.3,1.6,0,0,.2,0,.3,0h42.4c0,0,0,0,0,0h0v14.5c0,0,0,0,0,0h-15.9c-6.2-10.4-19.6-13.8-30-7.7-3.2,1.9-5.8,4.5-7.7,7.7h-11.2c0,0,0,0,0,0v-14.5c0,0,0,0,0,0h13.6c.8,0,1.5-.5,1.6-1.3,0-.8-.5-1.5-1.3-1.6,0,0-.2,0-.3,0h-13.6c-1.6,0-2.9,1.3-2.9,2.9v14.5c0,1.6,1.3,2.9,2.9,2.9h9.8c-3.1,7.6-1.7,16.4,3.7,22.6h-26.9v-47.6h91.6v47.6ZM125.7,47.9H34.3v-10.3c0-1.9,1.5-3.4,3.4-3.4h84.6c1.9,0,3.4,1.5,3.4,3.4v10.3Z" fill="#1d1d1b"/><path d="M75.1,84.4l3.1-4c.5-.6.5-1.5,0-2-.6-.5-1.5-.5-2,0,0,0-.1.2-.2.2l-3.1,4c-.4.7-.2,1.6.5,2,.6.4,1.3.3,1.8-.2" fill="#1d1d1b"/><path d="M84.3,77.7c-.6-.5-1.5-.4-2,.2l-8.2,10.5c-.6.6-.5,1.5,0,2,.6.6,1.5.5,2,0,0,0,.1-.2.2-.2l8.2-10.5c.5-.6.4-1.5-.2-2" fill="#1d1d1b"/></g></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>SEO friendly</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[3] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><g><path d="M51.8,38.5c-.3-.8-1.2-1.2-2-.8s-1.2,1.2-.8,2c.3.8,1.2,1.2,2,.8,0,0,.1,0,.2,0,.7-.4.9-1.2.6-1.9" fill="#1d1d1b"/><path d="M62.3,38.5c-.3-.8-1.2-1.2-2-.8-.8.3-1.2,1.2-.8,2,.3.8,1.2,1.2,2,.8,0,0,.1,0,.2-.1.7-.4.9-1.2.6-1.9" fill="#1d1d1b"/><path d="M57.1,38.5c-.3-.8-1.2-1.2-2-.8-.8.3-1.2,1.2-.8,2,.3.8,1.2,1.2,2,.8,0,0,.2,0,.3-.1.6-.4.9-1.2.6-1.9" fill="#1d1d1b"/><path d="M125.2,31.1H48.6c-3.9,0-7,3.1-7,7v27.2c0,.9.7,1.6,1.6,1.6.9,0,1.6-.7,1.6-1.6v-19.1h46.2v20.2c0,.9.7,1.6,1.6,1.6.3,0,.7-.1,1-.3l19.6-15.2c.7-.5.8-1.5.3-2.2,0,0,0,0,0,0-1.2-1.5-2.5-2.8-3.9-4h19.8v60.3c0,2.2-1.8,3.9-3.9,3.9h-44.9v-6.8c14.1,3.6,28.5-4.9,32.2-19,1-3.8,1.1-7.7.4-11.6-.2-.8-1-1.4-1.8-1.2s-1.4,1-1.2,1.8c.3,1.4.4,2.9.4,4.4,0,6.9-3.1,13.5-8.4,17.9l-12.7-17.6,17.2-13.3c.9,1.3,1.7,2.7,2.3,4.2.3.8,1.2,1.2,2,.8.8-.3,1.2-1.2.8-2h0c-.9-2.2-2.1-4.3-3.6-6.2-.5-.7-1.5-.8-2.2-.3,0,0,0,0,0,0l-17.1,13.3v-21.7c0-.9-.7-1.6-1.6-1.6h0c-14.6,0-26.4,11.8-26.4,26.4,0,7.8,3.5,15.3,9.5,20.3v12.1h-3.9v-9.7c0-.9-.7-1.6-1.6-1.6h-7.2c-.9,0-1.6.7-1.6,1.6h0v9.7h-4v-39.9c0-.9-.7-1.6-1.6-1.6h-7.2c-.9,0-1.6.7-1.6,1.6v57c0,.9.7,1.6,1.6,1.6h7.2c.9,0,1.6-.7,1.6-1.6h0v-14h4v14c0,.9.7,1.6,1.5,1.6h7.2c.9,0,1.6-.7,1.6-1.5h0v-14h3.9v14c0,.9.7,1.6,1.6,1.6h7.2c.9,0,1.6-.7,1.6-1.6h0v-14h44.9c3.9,0,7-3.1,7-7V38.1c0-3.9-3.1-7-7-7M44.7,72.1h4.1v53.8h-4.1v-53.8ZM58.9,102.2h4.1v23.7h-4.1v-23.7ZM63.6,78c0-12.3,9.5-22.4,21.7-23.2v23.2c0,.3.1.6.3.9h0l13.6,18.8c-5.7,3.5-12.6,4.5-19,2.6v-12.1c0-.9-.7-1.6-1.6-1.6h-7.2c-.9,0-1.6.7-1.6,1.6h0v5.8c-4.1-4.3-6.4-10.1-6.4-16.1M73.1,89.8h4.1v36.1h-4.1v-36.1ZM93.9,63.2v-20c6.1.4,11.8,3.2,15.8,7.7l-15.8,12.3ZM104.7,43.1c-3.8-2-8-3-12.3-3-.9,0-1.6.7-1.6,1.6h0v1.4h-46.2v-5c0-2.2,1.8-3.9,3.9-3.9h76.6c2.2,0,3.9,1.8,3.9,3.9v5h-24.4Z" fill="#1d1d1b"/><path d="M36.5,79.5h-7.2c-.9,0-1.6.7-1.6,1.6s0,0,0,0v46.4c0,.9.7,1.6,1.6,1.6h7.2c.9,0,1.6-.7,1.6-1.6v-12.5c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6,1.6v11h-4.1v-43.3h4.1v27.1c0,.9.7,1.6,1.6,1.6s1.6-.7,1.6-1.6v-28.7c0-.9-.7-1.6-1.6-1.6" fill="#1d1d1b"/><path d="M125.3,102.9h-16.5c-.9,0-1.6.7-1.6,1.6s.7,1.6,1.6,1.6h16.5c.9,0,1.6-.7,1.6-1.6s-.7-1.6-1.6-1.6" fill="#1d1d1b"/><path d="M125.3,96.3h-11.5c-.9,0-1.6.7-1.6,1.6s.7,1.6,1.6,1.6h11.5c.9,0,1.6-.7,1.6-1.6s-.7-1.6-1.6-1.6" fill="#1d1d1b"/></g></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Rapport statistique</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[4] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><g><path d="M88.2,110c-.2,2,.9,5.6-2.1,5.9h-12.7c-2.4-1-1.1-3.8-1.5-5.8-2.5-.8-4.9-1.8-7.2-3.1-1.5,1.1-2.9,4.1-5.1,2.9-2.7-2.9-6.3-5.7-8.7-8.6-2.4-2.9,1-3.7,2.3-5.9-1.2-2.3-2.2-4.8-3-7.3-1.9-.3-4.7.8-5.7-1.5v-13.5c.6-2.2,4.1-.9,5.6-1.5.8-2.5,1.8-4.9,3-7.2-1-1.7-4.3-3-2.7-5.5,3-2.5,5.8-6.5,8.8-8.8,2.5-1.9,3.7,1.5,5.5,2.5,2.3-1.2,4.7-2.2,7.1-2.9.6-1.9-.9-5,1.8-5.8h13.2c2.2.6,1.2,4.1,1.5,5.7,2.4.7,4.7,1.7,6.9,2.9.2,0,.5,0,.6-.1,1.5-.9,2.6-4.2,5-2.5,2.5,2.7,5.5,5.2,8,8,.6.7,1.4,1.4,1.4,2.4,0,1.4-2.5,2.8-3.1,4,1.2,2.3,2.1,4.8,2.9,7.3,1.9.7,5-.9,5.8,1.8v13.2c-.9,2.4-3.8,1.1-5.7,1.5-.7,2.5-1.8,4.9-3.1,7.2,1.1,1.6,4.3,3.1,2.8,5.3-2.8,2.5-5.3,5.8-8.1,8.3-1,.9-1.8,1.7-3.2.9-.6-.4-2.7-2.9-3.1-2.9-2.2,1.3-4.6,2.3-7.2,2.9M111.8,75.9h-3.7c-.6-.2-1.2-.6-1.5-1.2-.8-1.7-1.1-4.2-2-6.2-.9-1.3-1.6-2.8-2.2-4.3,0-1.5,2.5-2.7,2.8-4l-5.6-5.5c-1.3.7-2.4,3-4.1,2.8-.7,0-3.5-1.9-4.5-2.4-1-.4-2-.8-3-1.1-.9-.2-1.8-.4-2.7-.7-.3-.1-1-.9-1-1.1v-3.8l-.2-.2h-8.1v3.7c0,.6-.8,1.3-1.3,1.5-1.4.6-3.5.9-5.1,1.6-1.6.9-3.3,1.8-5,2.5-1.5.1-2.8-2.1-3.9-2.9l-5.7,5.7c-.2.1-.2.2,0,.4.4.7,2.3,1.9,2.6,2.7.6,1.6-.9,3.2-1.6,4.6-.3.7-.7,1.6-1,2.3-.5,1.3-.8,3.5-1.4,4.5-.3.6-.9,1-1.6,1.2h-3.5v8.4h3.9c.2,0,1.1.7,1.2.9.4,1.7,1,3.5,1.6,5.1.5,1.2,2.4,4.3,2.5,5,0,.5,0,.9,0,1.4-.3.9-2.2,2.1-2.6,2.8,0,.2,0,.3,0,.4,1,.7,4.8,5.3,5.5,5.5.9.2,2.2-3.1,4.4-2.8.7.1,3.8,2.1,4.9,2.5.7.3,1.5.6,2.2.8,1,.3,4.1.7,4.1,2.2v3.9h8.1l.2-.2v-3.8c0-.4.8-1.1,1.2-1.3,1.5-.7,3.6-1,5.4-1.7,1-.5,3.8-2.3,4.5-2.4,2.1-.3,2.7,1.9,4.3,2.8l5.8-5.8c-1.2-1.6-3.6-2.5-2.7-4.8.9-2.1,2.2-3.8,3-6.2.4-1,.8-4.4,2.2-4.4h3.9v-8.4Z" fill="#1d1d1b"/><path d="M43.4,108.5c2.1-1,4.5-1.2,6.7-.5,4.3,1.4,6.7,6.1,5.3,10.4-1.4,4.3-6.1,6.7-10.4,5.3-4.2-1.4-6.6-5.8-5.4-10.1.2-.9.8-1.6,1-2.5-6.2-8-9.9-17.6-10.6-27.7-1.9-27.4,18.5-51.3,45.9-53.7,3.8-.3,10.6-.3,14.2.9,1.1.2,1.8,1.3,1.5,2.3-.2,1-1.1,1.7-2.1,1.6-1.7,0-3.8-.7-5.6-.8-19.8-1.5-38.3,9.6-46.2,27.8-6.7,15.6-4.5,33.5,5.8,47M50.5,118.9c3.8-3.7-1.5-10-5.9-6.4-4.4,3.6,1.6,10.6,5.9,6.4" fill="#1d1d1b"/><path d="M116.7,51.6c-1,.1-1.9.7-2.9.8-4.5.7-8.7-2.4-9.4-6.9-.3-1.9,0-3.9,1.1-5.5,4.8-8.4,18.8-2.7,14.4,8,0,.2-.3.5-.4.6-.1.5,1.8,2.8,2.2,3.4,15.5,23.3,9.1,54.7-14.2,70.2-.4.2-.7.5-1.1.7-9.9,6.3-24.1,9.3-35.6,6.8-1.3-.3-2.5-.7-2.4-2.3.3-2.9,4.6-1.3,6.6-1.1,25.5,2.6,48.3-16,51-41.5.4-4.1.3-8.2-.4-12.2-1.3-7.6-4.4-14.8-9-21M111.8,39.9c-1.6.3-2.9,1.5-3.3,3.1-.6,2.3.7,4.7,3,5.3,2.3.6,4.7-.7,5.3-3s-.7-4.7-3-5.3c-.6-.2-1.3-.2-2,0" fill="#1d1d1b"/><path d="M61.8,123c1.1,0,2,.7,2.1,1.8,0,1-.6,1.9-1.5,2.1-1.1.3-2.1-.4-2.4-1.5-.3-1.1.4-2.1,1.5-2.4,0,0,.2,0,.3,0" fill="#1d1d1b"/><path d="M97.5,33.2c1.1-.3,2.1.3,2.5,1.4.3,1.1-.3,2.1-1.4,2.5-.1,0-.2,0-.4,0-1.1.1-2.1-.7-2.2-1.8,0-.9.5-1.8,1.4-2.1" fill="#1d1d1b"/><path d="M79.1,63.7c9-.5,16.6,6.4,17.1,15.3.5,9-6.4,16.6-15.3,17.1-5.1.3-10.1-1.9-13.4-5.8-5.7-7-4.7-17.3,2.3-23,2.6-2.2,5.9-3.4,9.3-3.7M79.2,67.7c-6.8.4-12,6.2-11.5,13,.4,6.8,6.2,12,13,11.5,6.8-.4,12-6.2,11.5-13,0,0,0,0,0,0-.5-6.8-6.3-11.9-13-11.5" fill="#1d1d1b"/></g></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Soutien technique</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[5] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><g><path d="M38.4,121.7c-3.8-3.7-4.1-7.2-4.3-12.2-1-19,.4-38.6-.2-57.8-.7-11.1,6.9-18.6,18-17.9,18.6.5,37.5-.6,56.1,0,5.9.2,10.5.8,14.6,5.5,3.4,4,3.2,7.6,3.4,12.5.7,18.3-.2,36.8.2,55.1-.2,6.1-.5,11.2-5.4,15.4-4,3.5-7.6,3.4-12.7,3.6-18.3.7-36.8-.2-55.1.2-5.6-.2-10.5-.3-14.7-4.5M58.4,37.7c-4.7,0-12.1-.6-16,2.3-5.4,4-4.4,9.3-4.5,15.2-.4,16.4-.4,33.2,0,49.7.1,5.7-.8,10.8,4.1,14.8,2.5,2.1,5.3,2.3,8.5,2.6,19.5-.7,39.6.9,59.1,0,6.3-.3,10.8-2.3,12.4-8.9.7-21.7.4-43.5.2-65.3-1.5-11.5-10.9-10.1-19.7-10.3-14.6-.3-29.4-.4-44-.1" fill="#1d1d1b"/><path d="M66.7,51.2h26.8c-.3-1.8.2-4.5,2.6-3.7,1.8.6.8,3.3,1.3,3.6,2.6.3,5.2-.2,7.8.3,4.2,1,7.3,4.6,7.6,8.9v43.5c-.4,4.7-4.1,8.5-8.8,9h-47.6c-4.7-.4-8.5-4.1-9-8.8v-44.4c.3-3.9,4.8-8.3,8.6-8.3h6.7c0-1.5-.2-3.7,1.9-3.8s2.2,2.2,2.1,3.8M62.7,55.1h-6.8c-2,0-4.7,3.1-4.7,5v2.5h57.8c.3-2.4-.5-4.8-2.2-6.4-.7-.6-1.6-1-2.4-1.2h-7v2.5c0,.7-1.5,1.3-2.2,1.2-1.9-.4-1.6-2.3-1.6-3.8h-26.8c.4,1.9-.8,4.8-3,3.4-1.3-.8-.9-2.1-.9-3.4M51.2,66.6v37.1c0,2.5,3.3,5.3,5.8,5.2,15.8-.1,31.6.3,47.3-.2,2.5-.6,4.4-2.9,4.6-5.5v-36.4l-.2-.2h-57.5Z" fill="#1d1d1b"/><path d="M83.6,81.6c.8-.8,2.5-3,3.5-3.3,1-.4,2.1.1,2.5,1.1.2.6.2,1.2-.2,1.7l-6.5,6.7,6.5,6.6c.6.9.3,2.1-.6,2.7-.7.4-1.6.4-2.2-.1l-6.4-6.4-6.1,6.1c-1.9,1.7-4.5,0-3.2-2.4l6.4-6.6-6.3-6.4c-.7-.8-.5-2.1.3-2.7.6-.5,1.4-.6,2.1-.2l6.6,6.6c1.2-1.1,2.5-2.2,3.6-3.3" fill="#1d1d1b"/></g></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Annuler à tout moment</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[6] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><g><path d="M46.1,40c-4.3,0-7.8,3.5-7.8,7.8,0,4.3,3.5,7.8,7.8,7.8,4.3,0,7.8-3.5,7.8-7.8h0c0-4.3-3.5-7.8-7.8-7.8M46.1,52.2c-2.4,0-4.3-1.9-4.3-4.3,0-2.4,1.9-4.3,4.3-4.3,2.4,0,4.3,1.9,4.3,4.3h0c0,2.4-1.9,4.3-4.3,4.3" fill="#1d1d1b"/><path d="M116.5,45.2c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7.8-1.7,1.7-1.7c1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/><path d="M109.6,45.2c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7.8-1.7,1.7-1.7c1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/><path d="M120,50.4c0,1-.8,1.7-1.7,1.7-1,0-1.7-.8-1.7-1.7,0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7,0,0,0,0,0,0" fill="#1d1d1b"/><path d="M113,50.4c0,1-.8,1.7-1.7,1.7-1,0-1.7-.8-1.7-1.7,0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7,0,0,0,0,0,0" fill="#1d1d1b"/><path d="M102.6,45.2c0,1-.8,1.7-1.7,1.7-1,0-1.7-.8-1.7-1.7,0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7h0" fill="#1d1d1b"/><path d="M106.1,50.4c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7.8-1.7,1.7-1.7c1,0,1.7.8,1.7,1.7,0,0,0,0,0,0" fill="#1d1d1b"/><path d="M95.6,45.2c0,1-.8,1.7-1.7,1.7-1,0-1.7-.8-1.7-1.7,0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7,0,0,0,0,0,0" fill="#1d1d1b"/><path d="M99.1,50.4c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7.8-1.7,1.7-1.7c1,0,1.7.8,1.7,1.7,0,0,0,0,0,0" fill="#1d1d1b"/><path d="M88.7,45.2c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7.8-1.7,1.7-1.7c1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/><path d="M92.2,50.4c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7c0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7,0,0,0,0,0,0" fill="#1d1d1b"/><path d="M132.2,58.1v-20.5c0-4.4-3.6-8-8-8H35.8c-4.4,0-8,3.6-8,8v20.5c0,2.5,1.1,4.8,3.1,6.3-1.9,1.5-3.1,3.8-3.1,6.3v20.5c0,4.4,3.6,8,8,8h42.4v14.1c-3.4.7-6.1,3.4-6.8,6.8H29.6c-1,0-1.7.8-1.7,1.7s.8,1.7,1.7,1.7h41.9c1,4.7,5.6,7.7,10.3,6.8,3.4-.7,6.1-3.4,6.8-6.8h41.9c1,0,1.7-.8,1.7-1.7s-.8-1.7-1.7-1.7h-41.9c-.7-3.4-3.4-6.1-6.8-6.8v-14.1h42.4c4.4,0,8-3.6,8-8v-20.5c0-2.5-1.1-4.8-3.1-6.3,1.9-1.5,3.1-3.8,3.1-6.3M85.2,121.7c0,2.9-2.3,5.2-5.2,5.2s-5.2-2.3-5.2-5.2c0-2.9,2.3-5.2,5.2-5.2,2.9,0,5.2,2.3,5.2,5.2M128.7,70.6v20.5c0,2.5-2,4.5-4.5,4.5H35.8c-2.5,0-4.5-2-4.5-4.5,0,0,0,0,0,0v-20.5c0-2.5,2-4.5,4.5-4.5h88.3c2.5,0,4.5,2,4.5,4.5h0M35.8,62.6c-2.5,0-4.5-2-4.5-4.5,0,0,0,0,0,0v-20.5c0-2.5,2-4.5,4.5-4.5h88.3c2.5,0,4.5,2,4.5,4.5h0v20.5c0,2.5-2,4.5-4.5,4.5H35.8Z" fill="#1d1d1b"/><path d="M46.1,88.7c4.3,0,7.8-3.5,7.8-7.8,0-4.3-3.5-7.8-7.8-7.8-4.3,0-7.8,3.5-7.8,7.8,0,0,0,0,0,0,0,4.3,3.5,7.8,7.8,7.8M46.1,76.5c2.4,0,4.3,1.9,4.3,4.3,0,2.4-1.9,4.3-4.3,4.3-2.4,0-4.3-1.9-4.3-4.3,0-2.4,1.9-4.3,4.3-4.3h0" fill="#1d1d1b"/><path d="M116.5,78.3c0,1-.8,1.7-1.7,1.8-1,0-1.7-.8-1.8-1.7,0-1,.8-1.7,1.7-1.8,0,0,0,0,0,0,1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/><path d="M109.6,78.3c0,1-.8,1.7-1.7,1.8-1,0-1.7-.8-1.8-1.7,0-1,.8-1.7,1.7-1.8,0,0,0,0,0,0,1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/><path d="M120,83.5c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7c0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7h0" fill="#1d1d1b"/><path d="M113,83.5c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7c0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7h0" fill="#1d1d1b"/><path d="M102.6,78.3c0,1-.8,1.7-1.7,1.7-1,0-1.7-.8-1.7-1.7s.8-1.7,1.7-1.7c0,0,0,0,0,0,1,0,1.7.8,1.7,1.7h0" fill="#1d1d1b"/><path d="M106.1,83.5c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7.8-1.7,1.7-1.7c1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/><path d="M95.6,78.3c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7c0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7,0,0,0,0,0,0" fill="#1d1d1b"/><path d="M99.1,83.5c0,1-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7.8-1.7,1.7-1.7c1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/><path d="M88.7,78.3c0,1-.8,1.7-1.7,1.8-1,0-1.7-.8-1.8-1.7,0-1,.8-1.7,1.7-1.8,0,0,0,0,0,0,1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/><path d="M92.2,83.5c0,1-.8,1.7-1.7,1.7-1,0-1.7-.8-1.7-1.7,0-1,.8-1.7,1.7-1.7,1,0,1.7.8,1.7,1.7" fill="#1d1d1b"/></g></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Hébergement web</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[7] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><path d="M124.8,81.6l-1.8-1.5,1.8-1.5c6.6-5.4,6.6-13.5,3.8-19.1-2.6-5.2-8.6-9.9-17.4-7.7l-2.5.6v-2.5c.2-6-2.5-11.1-7.2-14-4.9-3-11.1-2.9-16.6.1-.7.4-2,1.7-2.8,2.5l-2.2,2.2-1.4-1.6c-1.1-1.3-2.7-2.8-3.4-3.2-5.5-3.1-11.7-3.1-16.6-.2-4.8,2.9-7.4,7.9-7.3,13.9v2.5s-2.4-.6-2.4-.6c-8.8-2.3-14.8,2.4-17.4,7.6-2.9,5.6-2.8,13.6,3.7,19.1l1.8,1.5-1.8,1.5c-6.6,5.4-6.6,13.5-3.8,19.1,2.6,5.2,8.6,9.9,17.4,7.7l2.5-.6v2.5c-.2,6,2.5,11.1,7.2,14,4.9,3,11.1,2.9,16.6-.1.7-.4,2.3-1.9,3.4-3.2l1.4-1.5,2.2,2.2c.8.8,2.1,2.2,2.8,2.6,5.5,3.1,11.7,3.1,16.6.2,4.8-2.9,7.4-7.9,7.3-13.9v-2.5s2.4.6,2.4.6c8.8,2.3,14.8-2.4,17.4-7.6,2.9-5.6,2.8-13.6-3.7-19.1ZM77.9,112c-.9,7.2-6.6,10.5-11.5,10.5s-.1,0-.2,0c-4.9,0-10.4-3.4-11.2-10.6-.4-4.3,2.5-9.8,8.1-11.6,2.9-.9,4.3-3.7,3.9-5.9-.6-3.7-3.9-4.9-5.6-4.7-1.7.2-4.8,1.1-5.2,4.8-.9,6.9-6.5,10.7-11.5,10.3-7.8-.5-11.3-6.4-11.2-11.7.1-5.2,3.7-10.9,11.4-11h33c0,0,0,30.1,0,30.1ZM78,78h-33c-7.7-.3-11.3-6-11.4-11.2,0-5.3,3.4-11.2,11.2-11.7,5.1-.3,10.6,3.5,11.5,10.4.5,3.8,3.5,4.7,5.2,4.9,1.6.2,5-1,5.6-4.7.4-2.2-1-5-3.9-5.9-5.6-1.8-8.5-7.3-8-11.6.7-7.2,6.3-10.6,11.2-10.6,5,0,10.7,3.2,11.6,10.5v.2s0,29.8,0,29.8ZM82.1,48c.9-7.2,6.6-10.5,11.5-10.5s0,0,.2,0c4.9,0,10.4,3.4,11.2,10.7.4,4.3-2.5,9.8-8.1,11.6-2.9.9-4.3,3.7-3.9,5.9.6,3.7,4,4.9,5.6,4.7,1.7-.2,4.7-1.1,5.2-4.8.9-6.9,6.5-10.7,11.5-10.3,7.8.5,11.3,6.4,11.2,11.7-.1,5.2-3.7,10.9-11.4,11h-33c0,0,0-30.1,0-30.1ZM115.2,104.9c-5,.3-10.6-3.5-11.5-10.4-.5-3.7-3.5-4.6-5.2-4.9-1.7-.2-5,1-5.6,4.7-.4,2.2,1,5,3.9,5.9,5.6,1.8,8.5,7.3,8,11.6-.7,7.2-6.3,10.6-11.2,10.6h-.1c-4.9,0-10.6-3.3-11.5-10.5v-.2s0-29.8,0-29.8h33c7.7.3,11.3,5.9,11.4,11.2,0,5.3-3.4,11.2-11.2,11.7Z" fill="#1d1d1b" fillRule="evenodd"/></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Serveur dédié canadien</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[8] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><path d="M59.3,72.7h0c.4.7,1.2,1.1,2,.7.7-.4,1.1-1.2.7-2-1.1-2.3-2-4.6-2.7-7-1.7-5.3-2.8-10.8-3.3-16.3l24-8,24,8c-.6,5.6-1.7,11.2-3.4,16.6-4.2,12.9-11.1,20.8-20.6,23.5-6.7-2-12.3-6.5-15.7-12.6-.4-.7-1.3-.9-2-.5-.7.4-.9,1.3-.5,2,4.5,7.4,10.5,12.1,17.9,14,.2,0,.5,0,.8,0,10.7-2.8,18.5-11.4,23.1-25.5,1.9-6,3.1-12.2,3.6-18.4,0-.7-.4-1.3-1-1.5l-25.6-8.5c-.3-.1-.6-.1-.9,0l-25.6,8.5c-.7.2-1.1.9-1,1.5.5,6.2,1.7,12.2,3.6,18.1.8,2.5,1.8,5,2.9,7.4Z" fill="#1d1d1b"/><path d="M77.7,72.5c0,1.3,1,2.3,2.3,2.3,1.3,0,2.3-1.1,2.3-2.3,0-1.3-1-2.3-2.3-2.3-1.3,0-2.3,1-2.3,2.3,0,0,0,0,0,0Z" fill="#1d1d1b"/><path d="M80,67.7c.7,0,1.7-.4,1.7-1.3,0-2.2.1-4.9.2-7.5.1-2.6.2-5.2.2-7.5,0-1.1-.9-1.9-2-1.9,0,0-.1,0-.2,0-1-.1-2,.6-2.1,1.7,0,0,0,.1,0,.2,0,2.2.1,4.9.2,7.5s.2,5.2.2,7.5.6,1.3,1.7,1.3Z" fill="#1d1d1b"/><path d="M128.7,114.5h-4.9v-52.9c0-5.2-4.2-9.3-9.3-9.3h-1.3c.5-3.3.7-6.6.8-9.9,0-.6-.4-1.2-1-1.4l-32.5-10.8c-.3-.1-.6-.1-.9,0l-32.5,10.8c-.6.2-1,.8-1,1.4,0,3.3.3,6.6.8,9.9h-1.3c-5.2,0-9.3,4.2-9.3,9.3v52.9h-4.9c-.8,0-1.5.7-1.5,1.5v2.1c0,6.6,5.4,12,12,12h76.3c6.6,0,12-5.4,12-12v-2.1c0-.8-.7-1.5-1.5-1.5ZM80,33.1l31,10.3c-.3,7.8-1.7,15.5-4,23-1.9,6.5-5.1,12.5-9.4,17.8-4.5,5.5-10.7,9.3-17.6,10.8-6.9-1.5-13.1-5.3-17.6-10.7-4.3-5.3-7.4-11.3-9.4-17.8-2.3-7.5-3.7-15.3-4-23.1l31-10.3ZM39.2,61.6c0-3.5,2.8-6.4,6.4-6.4h1.7c.2,1,.3,2,.5,3h-2.3c-1.9,0-3.4,1.5-3.4,3.4v48.5c0,.8.7,1.5,1.5,1.5h72.7c.8,0,1.5-.7,1.5-1.5v-8.6c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5,1.5v7.1H45.1v-47c0-.2.2-.4.4-.4h2.9c.5,2,1,4.1,1.7,6.1,2,6.9,5.4,13.3,9.9,18.8,5,6.1,11.9,10.2,19.6,11.8.2,0,.4,0,.6,0,7.7-1.6,14.6-5.8,19.6-11.8,4.5-5.6,7.9-12,9.9-18.8.7-2.1,1.2-4.2,1.7-6.1h2.9c.2,0,.4.2.4.4v34.9c0,.8.7,1.5,1.5,1.5s1.5-.7,1.5-1.5v-34.9c0-1.9-1.5-3.4-3.4-3.4h-2.3c.2-1,.4-2,.5-3h1.7c3.5,0,6.4,2.8,6.4,6.4v52.9H39.2v-52.9ZM89,117.5c-.2,1.7-1.7,3-3.4,3h-11.3c-1.7,0-3.2-1.3-3.4-3h18.1ZM127.2,118.1c0,5-4,9-9,9H41.8c-5,0-9-4-9-9v-.6h35.1c.3,3.4,3.1,5.9,6.4,6h11.3c3.4,0,6.2-2.6,6.4-6h35.1v.6Z" fill="#1d1d1b"/></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Certicat SSL</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[9] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><path d="M27.6,95.2h10.3s.2.5.2.5c8,22.3,33.1,34.4,56,27.1,12.9-4.2,23.5-14.2,28.3-27v-.2c0,0,.3-.1.3-.1.4-.3,1.3-.3,5.9-.2,1.7,0,3.5,0,4,0,1.2-.1,1.8-.6,1.8-1.7v-27.8c-.2-.3-.4-1-1.7-1.2-.6,0-2.5,0-4.4,0-4.4,0-5.3,0-5.7-.2h-.2c0-.1,0-.3,0-.3-7.5-19.7-28-31.8-48.8-28.7-12.6,1.9-23.9,9.1-31,19.7-1.9,2.8-3.3,5.9-4.6,9l-.2.4h-.4c-1.6.3-3.4.2-5.1.1-.9,0-1.7,0-2.5,0s-1.4,0-2.1.1c-1.1.1-1.6.6-1.7,1.9-.4,4.5-.2,9.3,0,14,.1,4.3.3,8.8,0,13.1,0,.9.8,1.5,1.7,1.7ZM41.1,95.2h9.5l1.6,5.9h-8.4l-2.8-5.9ZM60.6,115.9v.4c-.1,0-.8.2-.8.2h-.2c-4.2-2.5-8.1-5.6-11-8.9-.5-.6-1.2-1.4-1.5-2.2l-.3-.9h6.9l.2.4c1.6,3.7,3.9,6.6,6.3,9.8h0c.2.4.5.8.3,1.3ZM53.7,95.2h14.1l.7,5.9h-12.4l-.2-.3c-.6-.9-.9-1.8-1.1-2.8-.2-.6-.4-1.2-.6-1.8l-.4-1ZM72.4,120.1c-5.9-2.5-11.2-7.9-14.4-14.7l-.5-1h11.1c.6.2.7.7,1.2,3.5,0,.4.1.7.1.8.4,1.6.7,3,1.1,4.1.4,1.5,1,2.9,1.5,4.3.3.7.5,1.4.8,2.1l.5,1.5-1.5-.6ZM71.1,95.2h18.1v.8c-.2.5-.2,1.1-.2,1.7,0,.8,0,1.6-.2,2.3,0,.2-.1.8-.8,1h0s-16,0-16,0l-.7-5.9ZM80.6,121.6c-.2,0-.3,0-.5,0-.4,0-.7-.1-1.1-.3-3.1-2-5.6-11.2-6.2-14.3v-.3c-.2-.5-.3-1.1-.2-1.7v-.6h15.4l-.5,2.1c-.9,3.9-1.8,8-3.7,11.5-.9,1.6-1.9,3.3-3.3,3.7ZM87.8,120.1l-1.5.6.6-1.5c.2-.6.5-1.3.7-1.9.5-1.2,1-2.5,1.4-3.8.8-2.6,1.4-5.4,2-8.1l.2-1h11.8l-.5,1c-3.9,7.4-8.8,12.3-14.6,14.7ZM91.7,101.1l.7-5.9h13.9l-1.9,5.9h-12.8ZM113.1,105.5c-3.3,4.4-7.6,8.2-12.5,10.8l-2.6,1.4,5.6-8,2.9-5.3h7.5l-.8,1.1ZM118.6,96.2c-.6,1.6-1.3,3.2-2.3,4.6l-.2.3h-8.2l1.6-5.9h9.4l-.4.9ZM116.3,58.9c.9,1.3,1.7,2.8,2.3,4.6l.3.9h-9.4l-1.6-5.9h8.2l.2.3ZM100.6,43.5c4.8,2.5,9.2,6.3,12.5,10.8l.8,1.1h-7.4l-3.1-5.7-5.4-7.5,2.6,1.3ZM106.4,64.5h-13.9l-.7-5.9h12.8l1.9,5.9ZM86.9,39.9c.2-.2.5-.3.9-.2,1,.2,4.3,2.3,4.3,2.4,3.9,2.7,7.3,6.7,10.3,12.3l.6,1h-11.8v-.6c-1-4.7-2.1-9.7-4.4-14.1l-.2-.4.3-.4ZM89.2,64.5h-18.1l.7-5.8h16.1c.7.2.8.8.8,1,.1.7.2,1.5.2,2.3,0,.6,0,1.2.1,1.7v.8ZM80.1,38.1h0c1.3,0,2.4,1.1,3.8,3.7,1.8,3.4,2.7,7.3,3.5,11.1l.6,2.5h-15.8l.2-.9c.2-.7.4-1.5.5-2.3.8-3.5,1.7-7.1,3.3-10.3,1.4-2.7,2.5-3.8,3.8-3.8ZM72.4,39.7l1.5-.6-.5,1.5c-.3.7-.5,1.4-.8,2.1-.6,1.6-1.2,3.2-1.7,4.9-.7,2.5-1.2,5-1.5,7.2v.6h-12.1l.6-1c4.1-7.5,8.9-12.3,14.6-14.7ZM68.5,58.6l-.7,5.9h-13.7l.2-.8c.3-1.6.8-3.3,1.6-4.7l.2-.3h12.4ZM47.1,54.3c3.5-4.6,7.8-8.3,12.5-10.8l2.6-1.3-5.7,8-2.8,5.2h-7.5l.9-1.1ZM44.1,58.6h8.3l-1.6,5.9h-9.5l2.9-5.9ZM29.2,67.8h102.1v23.5l-.7.7H29.2v-24.2Z" fill="#1d1d1b"/><g><path d="M78.6,80.9l.5.2c.5.2.8.8,1.8,2.3.5.8,1.2,1.9,1.5,2.2.4.3.9.5,1.4.4.5,0,.9-.4,1.2-.9,1.1-2,2.2-5.1,3.2-7.7.3-.7.5-1.4.7-1.9v-.2c.3-.5.4-.8.4-1.1-.4-.1-.8-.3-1.4-.6-.4-.2-1.1-.5-1.5-.6l-3.1,7.6-.7-.7c-.4-.4-.8-1-1.2-1.6-.7-1.1-1.5-2.2-2.4-2.4-.4,0-.8.1-1.2.5-.3.2-1,1.5-1.4,2.1-.6.9-.7,1.1-.9,1.2-.3.2-.6.1-.8.1h-.4s-.3-.4-.3-.4l-2.5-6.4c-.7.2-2.2.8-3,1.1l4.3,10.9c.4.7.8.9,1.8.8.9-.1,1.8-1.6,2.5-2.9.4-.7.8-1.3,1.1-1.7l.3-.4Z" fill="#1d1d1b"/></g><g><path d="M54.9,80.9l.5.2c.5.2.8.8,1.8,2.3.5.8,1.2,1.9,1.5,2.2.4.3.9.5,1.4.4.5,0,.9-.4,1.2-.9,1.1-2,2.2-5.1,3.2-7.7.3-.7.5-1.4.7-1.9v-.2c.3-.5.4-.8.4-1.1-.4-.1-.8-.3-1.4-.6-.4-.2-1.1-.5-1.5-.6l-3.1,7.6-.7-.7c-.4-.4-.8-1-1.2-1.6-.7-1.1-1.5-2.2-2.4-2.4-.4,0-.8.1-1.2.5-.3.2-1,1.5-1.4,2.1-.6.9-.7,1.1-.9,1.2-.3.2-.6.1-.8.1h-.4s-.3-.4-.3-.4l-2.5-6.4c-.7.2-2.2.8-3,1.1l4.3,10.9c.4.7.8.9,1.8.8.9-.1,1.8-1.6,2.5-2.9.4-.7.8-1.3,1.1-1.7l.3-.4Z" fill="#1d1d1b"/></g><g><path d="M101.8,80.9l.5.2c.5.2.8.8,1.8,2.3.5.8,1.2,1.9,1.5,2.2.4.3.9.5,1.4.4.5,0,.9-.4,1.2-.9,1.1-2,2.2-5.1,3.2-7.7.3-.7.5-1.4.7-1.9v-.2c.3-.5.4-.8.4-1.1-.4-.1-.8-.3-1.4-.6-.4-.2-1.1-.5-1.5-.6l-3.1,7.6-.7-.7c-.4-.4-.8-1-1.2-1.6-.7-1.1-1.5-2.2-2.4-2.4-.4,0-.8.1-1.2.5-.3.2-1,1.5-1.4,2.1-.6.9-.7,1.1-.9,1.2-.3.2-.6.1-.8.1h-.4s-.3-.4-.3-.4l-2.5-6.4c-.7.2-2.2.8-3,1.1l4.3,10.9c.4.7.8.9,1.8.8.9-.1,1.8-1.6,2.5-2.9.4-.7.8-1.3,1.1-1.7l.3-.4Z" fill="#1d1d1b"/></g></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>1 domaine .com ou .ca</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[10] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><g><path d="M83.1,95.9c.3-9.5,2.5-19.8,8.9-27.1.6-.7,2.6-2.3,3-2.9,1.5-2.5,2.8-9.8,2.9-12.8.6-12.6-7-22.2-18-27.3-3.1,1.5-6,3.4-8.6,5.6-1.1,1-3.8,4.9-5.2,2.2-.6-1.2.3-2.1,1.1-3,3.4-3.4,7.3-6.1,11.6-8.1,1.7-.7,2.4,0,3.9.7,6.1,3.2,11.3,7.9,14.9,13.8,4.6,8.1,4.5,17.1,2,25.9,7.3-3.3,15.8-2.1,21.9,3,5.6,5.3,8.2,13,7,20.6-.4.9-1.4,1.3-2.3.9,0,0-.1,0-.2,0-1.3-.7-.5-3.1-.5-4.2-.2-17.9-20.3-25.4-31.5-11.5-5.4,6.7-7.2,15.7-7.5,24.2h6.8c1.2-8,6.1-17.3,15.6-15.5,6.6,1.2,7.8,8,7.5,13.8,0,1.5-1.3,4.8,0,5.7,1.7,1.4,3.3-1.2,4.3-2.4,1.1-1.7,2.1-3.5,3.1-5.4.4-.9,1.4-1.2,2.2-.9.8.4,1.2,1.3.9,2.1-1.5,3.5-3.7,6.7-6.4,9.4-2.3,1.6-5.5,1.1-7.2-1.2,0,0,0,0,0,0-1.7-2.5-.4-4.8-.2-7.5.3-4.4-.2-10.1-5.7-10.4-6.6-.4-9.4,7-10.6,12.3,2.5,0,5,.7,5.4,3.6.3,2.6.1,5.1-.4,7.6-.3.6-.7,1.1-1.3,1.5-.6.3-1.2.5-1.8.7h-5.9c0,1.9.9,3.6,2.4,4.9,2.3,1.5,5.4-.5,7.5,1.7,2.9,3.2-1.4,8.1-4.5,9.4-2.5.9-5.1,1-7.6.3-.7,5-3.1,10.9-8.6,11.9-7.6,1.5-11.3-5.5-12.4-11.9-2.4.5-4.8.4-7.1-.2-3.2-1.1-8-6.1-5.2-9.5,1.9-2.4,4.7-.7,7-1.6,1.8-1.1,2.9-3.1,2.8-5.2h-5.5c-1.6-.3-2.8-1.3-3.4-2.8-.2-2.5-.2-4.9,0-7.4.4-2.4,3.3-3.3,5.4-3.2-1.2-5-3.7-12.1-9.8-12.3-6.4-.2-6.8,6-6.5,10.8.2,3.1,1.7,6.8-2,8.7-4,2-6.6-1.1-8.7-4-4.7-6.2-6.3-14.1-4.6-21.6,2.2-11,12.9-18,23.8-15.8,1.6.3,3.1.8,4.5,1.5-.3-2.4-1.1-4.7-1.3-7.1-.7-5.6,0-11.2,2.2-16.4.4-.9.9-1.8,1.4-2.6.7-.6,1.9-.5,2.5.2.2.3.4.6.4,1,0,.5-1.9,4.5-2.2,5.6-1.6,6.3-1.4,13,.7,19.2,1.1,3.6,1.5,3.1,3.8,5.6,4.4,5.2,7.2,11.5,8.3,18.2.5,3.1.7,6.2,1,9.2h6.2ZM66.8,95.9h6.5l.2-.4c-.2-11.3-5-27.1-17.2-30.3-16.3-4.3-26,13-19.9,27,.7,1.6,4.2,7.6,5.7,8,3.3.7,1.7-4,1.6-5.7-.4-6.6.9-13.7,8.7-14.4,8.8-.7,13.1,8.5,14.3,15.8M61.4,105.7l1,.2h36c.1-.2.3-.3.4-.5v-5.6l-.3-.3h-37.1v6.2ZM74.3,109.3h-3.7c-.3.8-.5,1.7-.6,2.6-.7,3.1-3.1,5.5-6.2,6.2-2.4.3-6.3-1-2.8,2.7,3.2,3.3,9.2,2.2,11.5-1.6.9-1.7,1.5-3.5,1.7-5.4v-4.4ZM82,109.3h-4.3v4.8c-.3,3.4-1.7,6.5-3.9,9-.9,1-1.1.3-.9,2.2.5,4.2,3.3,10.2,8.4,8.9,4.1-1,5.4-6.3,6-10-.7-.7-1.3-1.4-2.1-2.1-2.9-3.5-3.4-8.5-3.2-12.9M85.4,109.3c-.4,6.6,1.5,14.2,9.7,13.3,2.3-.4,4.2-1.9,5.1-4.1l-.3-.4h-4.1c-2,0-4.7-2.8-5.4-4.5-.6-1.4-.7-3-1.3-4.3h-3.7Z" fill="#1d1d1b"/></g></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Entreprise québécoise</h3>
							</div>
						</Link>
						<Link ref={(el) => (benefitsItemsRef.current[11] = el)} to="/contact/" className="item">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 160 160"><path d="M87,78.7c-.9.1-1.7,1.2-2.3,1.8-2.4,2.4-4.8,4.8-7.2,7.1l-3.6-3.5c-.6-.6-1.5-.7-2.3-.3-1,.5-1.3,1.7-.8,2.7.6.7,1.2,1.4,1.9,2,1,1.2,2.2,2.4,3.4,3.4.7.8,1.9.8,2.7,0l10.2-10.4c.2-.4.3-.8.2-1.3-.2-1.1-1.2-1.8-2.3-1.7Z" fill="#1d1d1b"/><polygon points="38.4 121.7 38.4 121.7 38.4 121.7 38.4 121.7" fill="#1d1d1b"/><path d="M126,51.9c-.2-4.9,0-8.5-3.4-12.5-4-4.8-8.6-5.3-14.6-5.5-18.6-.6-37.5.5-56.1,0-11.1-.7-18.7,6.7-18,17.9.6,19.1-.8,38.7.2,57.8.3,5,.6,8.5,4.3,12.2,4.2,4.2,9,4.3,14.7,4.5,18.3-.4,36.8.6,55.1-.2,5-.2,8.6-.1,12.7-3.6,4.9-4.2,5.2-9.3,5.4-15.4-.4-18.3.6-36.8-.2-55.1ZM121.9,113.4c-1.6,6.5-6.1,8.6-12.4,8.9-19.4.9-39.6-.7-59.1,0-3.2-.2-5.9-.4-8.5-2.6-4.9-4.1-4-9.1-4.1-14.8-.4-16.4-.4-33.2,0-49.7.2-5.9-.8-11.2,4.5-15.2,3.8-2.9,11.3-2.2,16-2.3h0c14.6-.2,29.4-.1,44,.1,8.8.2,18.2-1.2,19.7,10.3.1,21.7.5,43.6-.2,65.3Z" fill="#1d1d1b"/><path d="M105.1,51.4c-2.5-.5-5.2,0-7.8-.3-.5-.3.5-3.1-1.3-3.6-2.4-.8-2.9,1.9-2.6,3.7h-26.8c.1-1.6,0-3.9-2.1-3.8-2.1,0-2,2.3-1.9,3.8h-6.7c-3.9,0-8.3,4.5-8.6,8.3v44.4c.4,4.7,4.2,8.4,8.9,8.8h47.6c4.7-.5,8.4-4.2,8.8-9v-43.5c-.3-4.3-3.4-7.9-7.6-8.9ZM108.9,103.2c-.2,2.6-2,4.8-4.6,5.5-15.7.5-31.6,0-47.3.2-2.5.2-5.8-2.7-5.8-5.2v-37.1h57.5s.2.3.2.3v36.4ZM108.9,62.7h-57.8v-2.5c0-1.9,2.7-5,4.7-5h6.8c0,1.3-.3,2.6.9,3.4,2.3,1.4,3.4-1.5,3-3.4h26.8c0,1.5-.2,3.4,1.6,3.8.6.1,2.2-.5,2.2-1.2v-2.5h7c.9.2,1.7.6,2.4,1.2,1.8,1.6,2.6,4,2.2,6.4Z" fill="#1d1d1b"/></svg>
							</div>
							<div className="title">
								<span>Contactez-nous</span>
								<h3>Prêt en 30 jours</h3>
							</div>
						</Link>
					</div>
				</div>
			</section>
			<section ref={saRef} id="h__sectors-activity">
				<div className="container">
					<Contents
						ref={saContentsRef}
						title="La meilleure solution peu importe votre <span>secteur d'activité</span>"
					/>
					<div ref={saListRef} className="list">
						<div ref={saTrackRef} className="track">
							<div ref={(el) => (saItemsRef.current[0] = el)} className="item">
								<Image />
								<h3>Construction et rénovation</h3>
							</div>
							<div ref={(el) => (saItemsRef.current[1] = el)} className="item">
								<Image />
								<h3>Services professionnels</h3>
							</div>
							<div ref={(el) => (saItemsRef.current[2] = el)} className="item">
								<Image />
								<h3>Transport</h3>
							</div>
							<div ref={(el) => (saItemsRef.current[3] = el)} className="item">
								<Image />
								<h3>Finances</h3>
							</div>
							<div ref={(el) => (saItemsRef.current[4] = el)} className="item">
								<Image />
								<h3>Industrie manufacturière</h3>
							</div>
							<div ref={(el) => (saItemsRef.current[5] = el)} className="item">
								<Image />
								<h3>Loisir et divertissement</h3>
							</div>
						</div>
					</div>
					<Button
						text='Débuter'
						to='/debuter-mon-site/'
						className='blue has-arrow'
					/>
				</div>
			</section>
			<section id="h__cta">
				<div className="container">
					<Contents
						ref={ctaContentsRef}
						title={'Besoin <span>d\'informations</span> ?'}
						text='<p>Contactez-nous dès maintenant pour découvrir nos forfaits, poser vos questions ou échanger avec un de nos représentants pour débuter une analyse de vos besoins.</p>'
						buttons={[
							{
								text: 'Demande d\'informations',
								url: '/contact/',
								className: 'gray has-arrow'
							}
						]}
					/>
				</div>
			</section>
		</>
	);
	
}

export default Home;