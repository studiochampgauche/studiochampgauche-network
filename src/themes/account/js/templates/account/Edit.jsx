'use strict';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Edit = () => {

	const contactFormRef = useRef(null);
	const passwordFormRef = useRef(null);
	const addressFormRef = useRef(null);

	const [contactFormMessage, setContactFormMessage] = useState(null);
	const [passwordFormMessage, setPasswordFormMessage] = useState(null);
	const [addressFormMessage, setAddressFormMessage] = useState(null);


	const fieldsRef = useRef({addr: {}});


	useEffect(() => {

		const killEvents = [];


		let contactCanSubmit = true,
			passwordCanSubmit = true,
			addressCanSubmit = true;


		const handleContactSubmit = (e) => {

			e.preventDefault();

			if(!contactCanSubmit) return;

			setContactFormMessage(null);


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
			if(fieldsRef.current.company.value.length < 3 || fieldsRef.current.company.value.length > 25 || window.countWords(fieldsRef.current.company.value) > 3)
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


	        if(contactFormRef.current.querySelector('.error')) return;

	        contactCanSubmit = false;

	        contactFormRef.current.style.opacity = .6;
	        contactFormRef.current.style.pointerEvents = 'none';


	        const formData = new FormData();

	        formData.append('action', 'edit-contact');
	        formData.append('firstname', fieldsRef.current.firstname.value);
	        formData.append('lastname', fieldsRef.current.lastname.value);
	        formData.append('company', fieldsRef.current.company.value);
	        formData.append('email', fieldsRef.current.email.value);
	        formData.append('phone', fieldsRef.current.phone.value);

	        fetch(SYSTEM.ajaxPath, {
	        	method: 'POST',
	        	body: formData
	        })
	        .then(resp => resp.json())
	        .then(data => {

	        	contactCanSubmit = true;

	        	contactFormRef.current.style.opacity = 1;
	        	contactFormRef.current.style.pointerEvents = 'initial';

	        	setContactFormMessage(data.message);

	        	USER.firstname = data.args.first_name;
	        	USER.lastname = data.args.last_name;
	        	USER.email = data.args.user_email;
	        	USER.company = data.args.company;
	        	USER.phone = data.args.phone;

	        });


		}
		contactFormRef.current.addEventListener('submit', handleContactSubmit);


		const handlePasswordSubmit = (e) => {

			e.preventDefault();

			if(!passwordCanSubmit) return;

			setPasswordFormMessage(null);

			/*
			* Check password
			*/
			if(fieldsRef.current.password.value !== fieldsRef.current.password_confirmation.value || !window.passwordCheck(fieldsRef.current.password.value)){
				fieldsRef.current.password.classList.add('error');
				fieldsRef.current.password_confirmation.classList.add('error');
			} else{
				fieldsRef.current.password.classList.remove('error');
				fieldsRef.current.password_confirmation.classList.remove('error');
			}



			if(passwordFormRef.current.querySelector('.error')) return;

	        passwordCanSubmit = false;

	        passwordFormRef.current.style.opacity = .6;
	        passwordFormRef.current.style.pointerEvents = 'none';

	        const formData = new FormData();

	        formData.append('action', 'edit-password');
	        formData.append('password', fieldsRef.current.password.value);
	        formData.append('password_confirmation', fieldsRef.current.password_confirmation.value);

	        fetch(SYSTEM.ajaxPath, {
	        	method: 'POST',
	        	body: formData
	        })
	        .then(resp => resp.json())
	        .then(data => {

	        	setPasswordFormMessage(data.message);


	        	if(data.status === 'error'){

	        		passwordCanSubmit = true;

	        		passwordFormRef.current.style.opacity = 1;
	       			passwordFormRef.current.style.pointerEvents = 'initial';

	        	} else
	        		window.location.reload();

	        });


		}
		passwordFormRef.current.addEventListener('submit', handlePasswordSubmit);


		const handleAddressSubmit = (e) => {

			e.preventDefault();

			if(!addressCanSubmit) return;

			setAddressFormMessage(null);

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




			if(addressFormRef.current.querySelector('.error')) return;

	        addressCanSubmit = false;

	        addressFormRef.current.style.opacity = .6;
	        addressFormRef.current.style.pointerEvents = 'none';

	        const formData = new FormData();

	        formData.append('action', 'edit-billing-addr');
	        formData.append('line1', fieldsRef.current.addr.line1.value);
	        formData.append('line2', fieldsRef.current.addr.line2.value);
	        formData.append('city', fieldsRef.current.addr.city.value);
	        formData.append('province', fieldsRef.current.addr.province.value);
	        formData.append('postal_code', fieldsRef.current.addr.postal_code.value);

	        fetch(SYSTEM.ajaxPath, {
	        	method: 'POST',
	        	body: formData
	        })
	        .then(resp => resp.json())
	        .then(data => {
	        	
	        	addressCanSubmit = true;

	        	addressFormRef.current.style.opacity = 1;
	        	addressFormRef.current.style.pointerEvents = 'initial';


	        	setAddressFormMessage(data.message);


	        	USER.addr = data.addr;

	        });


		}
		addressFormRef.current.addEventListener('submit', handleAddressSubmit);


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

			contactFormRef.current?.removeEventListener('submit', handleContactSubmit);
			passwordFormRef.current?.removeEventListener('submit', handlePasswordSubmit);
			addressFormRef.current?.removeEventListener('submit', handleAddressSubmit);

		});

		return () => killEvents?.forEach(killEvent => killEvent());

	});

	useEffect(() => {

		ScrollTrigger.refresh();

	}, [contactFormMessage, passwordFormMessage, addressFormMessage]);

	return(
		<>
			<div className="edit">
				<div className="bloc">
					<div className="inner-bloc">
						<h2>Informations de contact</h2>
						<form ref={contactFormRef} method="POST" action="">
							<div className="fields">
								<div className="field split">
									<label htmlFor="firstname">Prénom</label>
									<input ref={(el) => (fieldsRef.current.firstname = el)} type="text" id="firstname" defaultValue={USER.firstname} autoComplete="given-name" required />
								</div>
								<div className="field split">
									<label htmlFor="lastname">Nom de famille</label>
									<input ref={(el) => (fieldsRef.current.lastname = el)} type="text" id="lastname" defaultValue={USER.lastname} autoComplete="family-name" required />
								</div>
								<div className="field">
									<label htmlFor="company">Compagnie (facultatif)</label>
									<input ref={(el) => (fieldsRef.current.company = el)} type="text" id="company" defaultValue={USER.company} autoComplete="organization" />
								</div>
								<div className="field">
									<label htmlFor="email">Courriel</label>
									<input ref={(el) => (fieldsRef.current.email = el)} type="email" id="email" defaultValue={USER.email} autoComplete="email" required />
								</div>
								<div className="field">
									<label htmlFor="phone">Téléphone</label>
									<input ref={(el) => (fieldsRef.current.phone = el)} type="tel" id="phone" minLength="14" maxLength="14" defaultValue={USER.phone} autoComplete="tel" required />
								</div>
							</div>
							{contactFormMessage && (<p className="form-message">{contactFormMessage}</p>)}
							<button type="submit" className="btn">
								<span>Enregistrer</span>
							</button>
						</form>
					</div>
				</div>
				<div className="bloc">
					<div className="inner-bloc">
						<h2>Mot de passe</h2>
						<form ref={passwordFormRef} method="POST" action="">

							<input ref={(el) => (fieldsRef.current.username = el)} type="text" id="username" defaultValue={USER.username} autoComplete="username" required />

							<div className="fields">
								<div className="field split">
									<label htmlFor="password">Nouveau mot de passe</label>
									<input ref={(el) => (fieldsRef.current.password = el)} type="password" id="password" minLength="8" maxLength="25" autoComplete="new-password" required />
								</div>
								<div className="field split">
									<label htmlFor="confirm-password">Confirmer le mot de passe</label>
									<input ref={(el) => (fieldsRef.current.password_confirmation = el)} type="password" id="confirm-password" minLength="8" maxLength="25" autoComplete="new-password" required />
								</div>
							</div>
							{passwordFormMessage && (<p className="form-message">{passwordFormMessage}</p>)}
							<button type="submit" className="btn">
								<span>Enregistrer</span>
							</button>
						</form>
					</div>
				</div>
				<div className="bloc">
					<div className="inner-bloc">
						<h2>Adresse de facturation</h2>
						<form ref={addressFormRef} method="POST" action="">

							<div className="fields">
								<div className="field">
									<label htmlFor="addr-line1">Adresse - ligne 1</label>
									<input ref={(el) => (fieldsRef.current.addr.line1 = el)} type="text" id="addr-line1" defaultValue={USER.addr?.line1} autoComplete="address-line1" required />
								</div>
								<div className="field">
									<label htmlFor="addr-line2">Adresse - ligne 2</label>
									<input ref={(el) => (fieldsRef.current.addr.line2 = el)} type="text" id="addr-line2" defaultValue={USER.addr?.line2} autoComplete="address-line2" />
								</div>
								<div className="field">
									<label htmlFor="city">Ville</label>
									<input ref={(el) => (fieldsRef.current.addr.city = el)} type="text" id="city" defaultValue={USER.addr?.city} autoComplete="address-level2" required />
								</div>
								<div className="field">
									<label>Province</label>
									<select ref={(el) => (fieldsRef.current.addr.province = el)} id="province" defaultValue={USER.addr?.province || undefined} required>
										<option>Sélectionner</option>
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
									<input ref={(el) => (fieldsRef.current.addr.postal_code = el)} type="text" id="postal-code" minLength="7" maxLength="7" defaultValue={USER.addr?.postal_code} autoComplete="postal-code" required />
								</div>
							</div>
							{addressFormMessage && (<p className="form-message">{addressFormMessage}</p>)}
							<button type="submit" className="btn">
								<span>Enregistrer</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
	
};

export default Edit;