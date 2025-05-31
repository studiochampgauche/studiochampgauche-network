'use strict';
import React, {useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { loadStripe } from '@stripe/stripe-js';

const Inscription = () => {


	const [formMessage, setFormMessage] = useState(null);

	const formRef = useRef(null);
	const fieldsRef = useRef({addr: {}});

	const stripeRef = useRef(null);
	const stripeElementsRef = useRef(null);

	const yearlyRef = useRef(null);


	useEffect(() => {

		const killEvents = [];


		let formCanSubmit = true;


		const handleSubmit = async (e) => {

			e.preventDefault();

			if(!formCanSubmit) return;

			setFormMessage(null);


			/*
			* Check firstname
			*/
			if(fieldsRef.current.firstname.value.length < 3 || fieldsRef.current.firstname.value.length > 25 || window.countWords(fieldsRef.current.firstname.value) > 3)
				fieldsRef.current.firstname.classList.add('error');
			else
				fieldsRef.current.firstname.classList.remove('error');


			/*
			* Check lastname
			*/
			if(fieldsRef.current.lastname.value.length < 3 || fieldsRef.current.lastname.value.length > 25 || window.countWords(fieldsRef.current.lastname.value) > 3)
				fieldsRef.current.lastname.classList.add('error');
			else
				fieldsRef.current.lastname.classList.remove('error');


			/*
			* Check company
			*/
			if(fieldsRef.current.company.value.length && (fieldsRef.current.company.value.length > 25 || window.countWords(fieldsRef.current.company.value) > 3))
				fieldsRef.current.company.classList.add('error');
			else
				fieldsRef.current.company.classList.remove('error');


			/*
			* Check email
			*/
			if(!window.emailCheck(fieldsRef.current.email.value))
	            fieldsRef.current.email.classList.add('error');
	        else
	            fieldsRef.current.email.classList.remove('error');


	        /*
			* Check phone
			*/
			if(!window.phoneCheck(fieldsRef.current.phone.value))
	            fieldsRef.current.phone.classList.add('error');
	        else
	            fieldsRef.current.phone.classList.remove('error');



	        /*
			* Check Address line 1
			*/
			if(fieldsRef.current.addr.line1.value.length < 3 || fieldsRef.current.addr.line1.value.length > 60 || window.countWords(fieldsRef.current.addr.line1.value) < 2)
				fieldsRef.current.addr.line1.classList.add('error');
			else
				fieldsRef.current.addr.line1.classList.remove('error');


			/*
			* Check Address line 2
			*/
			if(fieldsRef.current.addr.line2.value.length && (fieldsRef.current.addr.line2.value.length < 2 || window.countWords(fieldsRef.current.addr.line2.value) > 5))
				fieldsRef.current.addr.line2.classList.add('error');
			else
				fieldsRef.current.addr.line2.classList.remove('error');


			/*
			* Check city
			*/
			if(fieldsRef.current.addr.city.value.length < 3 || window.countWords(fieldsRef.current.addr.city.value) > 7)
				fieldsRef.current.addr.city.classList.add('error');
			else
				fieldsRef.current.addr.city.classList.remove('error');



			/*
			* Check postal code
			*/
			if(!window.postalCodeCheck(fieldsRef.current.addr.postal_code.value))
	            fieldsRef.current.addr.postal_code.classList.add('error');
	        else
	            fieldsRef.current.addr.postal_code.classList.remove('error');



	        /*
	        * Check if form have errors
	        */
	        if(formRef.current.querySelector('.error')) return;


	        formCanSubmit = false;

	        formRef.current.style.opacity = .6;
	        formRef.current.style.pointerEvents = 'none';


	        /*
	        * Check credit card
	        */
	        const { token, error } = await stripeRef.current.createToken(stripeElementsRef.current.getElement('cardNumber'));


	        if(error){

	        	formCanSubmit = true;

		        formRef.current.style.opacity = 1;
		        formRef.current.style.pointerEvents = 'initial';


		        setFormMessage(error.message);


		        return;

	        }

	        console.log('all good');


		}
		formRef.current.addEventListener('submit', handleSubmit);


		const handleYearlyClick = () => {

			yearlyRef.current.classList.toggle('active');

		}
		yearlyRef.current?.addEventListener('click', handleYearlyClick);


		const mask = () => {

			if(fieldsRef.current.phone){

				const phoneInputHandle = (e) => {

					const x = fieldsRef.current.phone.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                    fieldsRef.current.phone.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

				}
                fieldsRef.current.phone.addEventListener('input', phoneInputHandle);

                killEvents.push(() => fieldsRef.current.phone?.removeEventListener('input', phoneInputHandle));
                
            }



            if(fieldsRef.current.addr.postal_code){

				const postalInputHandle = (e) => {

					let value = fieldsRef.current.addr.postal_code.value.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
				    let formatted = "";

				    for (let i = 0; i < value.length; i++) {
				        if (i === 0 || i === 2 || i === 5) {
				            if (!/[A-Z]/.test(value[i])) break;
				        } else if (i === 1 || i === 4 || i === 6) {
				            if (!/\d/.test(value[i])) break;
				        } else if (i === 3) {
				            if (value[i] !== " ") value = value.slice(0, 3) + " " + value.slice(3);
				        }
				        formatted += value[i];
				    }

				   	fieldsRef.current.addr.postal_code.value = formatted.slice(0, 7);

				}
                fieldsRef.current.addr.postal_code?.addEventListener('input', postalInputHandle);

                killEvents.push(() => fieldsRef.current.addr.postal_code?.removeEventListener('input', postalInputHandle));
                
            }

		}
		mask();



		killEvents.push(() => {

			formRef.current?.removeEventListener('submit', handleSubmit);
			yearlyRef.current?.removeEventListener('click', handleYearlyClick);

		});

		return () => killEvents?.forEach(killEvent => killEvent());

	});


	/*
	* Mount Stripe
	
	useEffect(() => {

		const killEvents = [];


		const init = async () => {

			stripeRef.current = await loadStripe(STRIPE.public_key);
			stripeElementsRef.current = stripeRef.current.elements();

			const cardNumber = stripeElementsRef.current.create('cardNumber');
			cardNumber.mount('#card-number');

			const cardExpiration = stripeElementsRef.current.create('cardExpiry');
			cardExpiration.mount('#card-expiration');

			const cardCvc = stripeElementsRef.current.create('cardCvc');
			cardCvc.mount('#card-cvc');

			killEvents.push(() => {

				cardNumber?.destroy();
				cardExpiration?.destroy();
				cardCvc?.destroy();

			});

		}

		init();


		return () => killEvents?.forEach(killEvent => killEvent());


	}, []);*/

	useEffect(() => {

		ScrollTrigger.refresh();

	}, [formMessage]);


	return(
		<>
			<div className="new-user">
				<form ref={formRef} method="POST" action="">
					<div className="bloc">
						<div className="inner-bloc">
							<h2>Général</h2>
							<div className="fields">
								<div className="field split">
									<label>Forfait</label>
									<select ref={(el) => (fieldsRef.current.package = el)} id="package" defaultValue="none" required>
										<option value="none" disabled={true}>Sélectionner</option>
										<option value="multi-pages">Multi-pages</option>
										<option value="multi-sections">Multi-sections</option>
										<option value="ecommerce" disabled={true}>eCommerce (non disponible)</option>
									</select>
								</div>
								<div className="field split">
									<label>Période des paiements</label>
									<select ref={(el) => (fieldsRef.current.period = el)} id="period" defaultValue="none" required>
										<option value="none" disabled={true}>Sélectionner</option>
										<option value="month">Mensuel</option>
										<option value="year">Annuel (-10%)</option>
									</select>
								</div>
								<div className="field">
									<label htmlFor="domain">Domaine</label>
									<input ref={(el) => (fieldsRef.current.domain = el)} type="text" id="domain" required />
								</div>
							</div>
						</div>
					</div>
					<div className="bloc">
						<div className="inner-bloc">
							<h2>Informations de contact</h2>
							<div className="fields">
								<div className="field split">
									<label htmlFor="firstname">Prénom</label>
									<input ref={(el) => (fieldsRef.current.firstname = el)} type="text" id="firstname" autoComplete="given-name" required />
								</div>
								<div className="field split">
									<label htmlFor="lastname">Nom de famille</label>
									<input ref={(el) => (fieldsRef.current.lastname = el)} type="text" id="lastname" autoComplete="family-name" required />
								</div>
								<div className="field">
									<label htmlFor="company">Compagnie (facultatif)</label>
									<input ref={(el) => (fieldsRef.current.company = el)} type="text" id="company" autoComplete="organization" />
								</div>
								<div className="field">
									<label htmlFor="email">Courriel</label>
									<input ref={(el) => (fieldsRef.current.email = el)} type="email" id="email" autoComplete="email" required />
								</div>
								<div className="field">
									<label htmlFor="phone">Téléphone</label>
									<input ref={(el) => (fieldsRef.current.phone = el)} type="tel" id="phone" minLength="14" maxLength="14" autoComplete="tel" required />
								</div>
							</div>
						</div>
					</div>
					<div className="bloc">
						<div className="inner-bloc">
							<h2>Adresse de facturation</h2>
							<div className="fields">
								<div className="field">
									<label htmlFor="addr-line1">Adresse - ligne 1</label>
									<input ref={(el) => (fieldsRef.current.addr.line1 = el)} type="text" id="addr-line1" autoComplete="address-line1" required />
								</div>
								<div className="field">
									<label htmlFor="addr-line2">Adresse - ligne 2</label>
									<input ref={(el) => (fieldsRef.current.addr.line2 = el)} type="text" id="addr-line2" autoComplete="address-line2" />
								</div>
								<div className="field">
									<label htmlFor="city">Ville</label>
									<input ref={(el) => (fieldsRef.current.addr.city = el)} type="text" id="city" autoComplete="address-level2" required />
								</div>
								<div className="field">
									<label>Province</label>
									<select ref={(el) => (fieldsRef.current.addr.province = el)} id="province" defaultValue="QC" required>
										<option disabled={true}>Sélectionner</option>
										<option value="AB">Alberta</option>
										<option value="BC">Colombie-Britanique</option>
										<option value="PE">Île-du-Prince-Édouard</option>
										<option value="MB">Manitoba</option>
										<option value="NB">Nouveau-Brunswick</option>
										<option value="NS">Nouvelle-Écosse</option>
										<option value="ON">Ontario</option>
										<option value="QC">Québec</option>
										<option value="SK">Saskatchewan</option>
										<option value="NL">Terre-Neuve-et-Labrador</option>
										<option value="NU">Nunavut</option>
										<option value="NT">Territoires du Nord-Ouest</option>
										<option value="YT">Yukon</option>
									</select>
								</div>
								<div className="field">
									<label htmlFor="postal-code">Code postal</label>
									<input ref={(el) => (fieldsRef.current.addr.postal_code = el)} type="text" id="postal-code" minLength="7" maxLength="7" autoComplete="postal-code" required />
								</div>
							</div>
						</div>
					</div>
					{/*<div className="bloc">
						<div className="inner-bloc">
							<h2>Paiement</h2>
							<div ref={yearlyRef} className="yearly">
								<div className="square"></div>
								<span>Payer annuellement et sauver 10%</span>
							</div>
							<div className="fields">
								<div className="field">
									<label>Numéro de la carte</label>
									<div ref={(el) => (fieldsRef.current.cardNumber = el)} id="card-number"></div>
								</div>
								<div className="field split">
									<label>Expiration</label>
									<div ref={(el) => (fieldsRef.current.cardExpiration = el)} id="card-expiration"></div>
								</div>
								<div className="field split">
									<label>Code de sécurité</label>
									<div ref={(el) => (fieldsRef.current.cardCvc = el)} id="card-cvc"></div>
								</div>
							</div>
						</div>
					</div>*/}
					{formMessage && (<p className="form-message">{formMessage}</p>)}
					<button type="submit" className="btn">
						<span>S'inscrire</span>
					</button>
				</form>
			</div>
		</>
	);
	
};

export default Inscription;