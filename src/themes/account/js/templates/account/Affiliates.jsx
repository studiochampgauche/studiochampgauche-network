'use strict';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Affiliates = () => {

	const formRef = useRef(null);
	const formDivRef = useRef(null);
	const formInputs = useRef({
		firstname: null,
		lastname: null,
		email: null,
		phone: null,
		company: null,
		package: null
	});
	const registrationBtnRef = useRef(null);
	const cancelBtn = useRef(null);

	const [totalWinnings, setTotalWinnings] = useState(0);
	const [amountDue, setAmountDue] = useState(0);
	const [formMessage, setFormMessage] = useState(null);


	useEffect(() => {

		const killEvents = [];


		let total = 0,
			due = 0;


		(USER?.affiliates?.history || []).forEach(item => {

			if(!['pending', 'rejected'].includes(item.status))
				total += parseFloat(item.assigned);

			if(item.status === 'approved')
				due += parseFloat(item.assigned);

		});

		setTotalWinnings(window.formatNumber(total));
		setAmountDue(window.formatNumber(due));

		let canClick = true,
			canSubmit = true,
			formAnim = gsap.to(formDivRef.current, .2, {
				height: (formRef.current.getBoundingClientRect().bottom - formRef.current.getBoundingClientRect().top)
			});

		formAnim.paused(true);


		const handleRegistrationOpen = () => {

			if(!canClick) return;
			canClick = false;

			formAnim.play();
			formAnim.reversed(false);

		}

		registrationBtnRef.current.addEventListener('click', handleRegistrationOpen);


		const handleRegistrationClose = () => {

			if(canClick) return;
			canClick = true;

			formAnim.play();
			formAnim.reversed(true);

		}

		cancelBtn.current.addEventListener('click', handleRegistrationClose);


		const handleRegistrationSubmit = (e) => {

			if(!canSubmit) return;

			e.preventDefault();

			/*
			* Check firstname
			*/
			if(formInputs.current.firstname.value.length < 3 || formInputs.current.firstname.value.length > 25 || window.countWords(formInputs.current.firstname.value) > 3)
				formInputs.current.firstname.classList.add('error');
			else
				formInputs.current.firstname.classList.remove('error');


			/*
			* Check lastname
			*/
			if(formInputs.current.lastname.value.length < 3 || formInputs.current.lastname.value.length > 25 || window.countWords(formInputs.current.lastname.value) > 3)
				formInputs.current.lastname.classList.add('error');
			else
				formInputs.current.lastname.classList.remove('error');



			/*
			* Check email
			*/
			if(!window.emailCheck(formInputs.current.email.value))
	            formInputs.current.email.classList.add('error');
	        else
	            formInputs.current.email.classList.remove('error');


	        /*
			* Check phone
			*/
			if(!window.phoneCheck(formInputs.current.phone.value))
	            formInputs.current.phone.classList.add('error');
	        else
	            formInputs.current.phone.classList.remove('error');


	        /*
			* Check company
			*/
			if(formInputs.current.company.value.length < 3 || formInputs.current.company.value.length > 25 || window.countWords(formInputs.current.company.value) > 3)
				formInputs.current.company.classList.add('error');
			else
				formInputs.current.company.classList.remove('error');



			/*
			* Check Package
			*/
			if(formInputs.current.package.value === 'none')
				formInputs.current.package.classList.add('error');
			else
				formInputs.current.package.classList.remove('error');


	        if(formRef.current.querySelector('.error')) return;

	        canSubmit = false;

	        formRef.current.style.opacity = .6;
	        formRef.current.style.pointerEvents = 'none';

	        const formData = new FormData();
	        formData.append('action', 'affiliates');
	        formData.append('firstname', formInputs.current.firstname.value);
	        formData.append('lastname', formInputs.current.lastname.value);
	        formData.append('email', formInputs.current.email.value);
	        formData.append('phone', formInputs.current.phone.value);
	        formData.append('company', formInputs.current.company.value);
	        formData.append('package', formInputs.current.package.value);


	        fetch(SYSTEM.ajaxPath, {
	        	method: 'POST',
	        	body: formData
	        })
	        .then(resp => resp.json())
	        .then(data => {


	        	setFormMessage(data.message);

	        	if(data.status !== 'success') {

	        		canSubmit = true;

		        	formRef.current.style.opacity = 1;
		        	formRef.current.style.pointerEvents = 'initial';

		        	return;

		        }

		        window.location.reload();

	        	formInputs.current.firstname.value = '';
	        	formInputs.current.lastname.value = '';
	        	formInputs.current.email.value = '';
	        	formInputs.current.phone.value = '';
	        	formInputs.current.company.value = '';
	        	formInputs.current.package.value = 'none';

	        });

		}

		formRef.current.addEventListener('submit', handleRegistrationSubmit);


		const mask = () => {

			if(formInputs.current.phone){

				const phoneInputHandle = (e) => {

					const x = formInputs.current.phone.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                    formInputs.current.phone.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

				}
                formInputs.current.phone.addEventListener('input', phoneInputHandle);

                killEvents.push(() => formInputs.current.phone?.removeEventListener('input', phoneInputHandle));
                
            }

		}
		mask();


		killEvents.push(() => {

			registrationBtnRef.current?.removeEventListener('click', handleRegistrationOpen);
			cancelBtn.current?.removeEventListener('click', handleRegistrationClose);
			formRef.current?.removeEventListener('submit', handleRegistrationSubmit);

		});


		return () => killEvents?.forEach(killEvent => killEvent());

	});


	return(
		<>
			<div className="affiliates">
				<div className="quick-items">
					<div className="item">
						<div className="content">
							<span>Votre code</span>
							<span>{USER.affiliates.code}</span>
						</div>
					</div>
					<div className="item">
						<div className="content">
							<span>Total des gains</span>
							<span>{totalWinnings}$</span>
						</div>
					</div>
					<div className="item">
						<div className="content">
							<span>Montant dû</span>
							<span>{amountDue}$</span>
						</div>
					</div>
				</div>
				<div className="infos">
					<ul>
						<li>
							<span><strong>Petit budget&#8239;:</strong> {USER.affiliates.prices.small_budget}$</span>
						</li>
						<li>
							<span><strong>Multi-sections&#8239;:</strong> {USER.affiliates.prices.multi_sections}$</span>
						</li>
						<li>
							<span><strong>Multi-pages&#8239;:</strong> {USER.affiliates.prices.multi_pages}$</span>
						</li>
					</ul>
				</div>
				<div className="list">
					<div className="top">
						<h2>Mon historique</h2>
						<button ref={registrationBtnRef} className="btn">
							<span>Faire une inscription</span>
						</button>
					</div>
					<div ref={formDivRef} className="form">
						<form ref={formRef} method="post" action="">
							<div className="group">
								<h3>Informations de contact</h3>
								<div className="fields">
									<div className="field split">
										<label htmlFor="firstname">Prénom*</label>
										<input ref={(el) => (formInputs.current.firstname = el)} type="text" id="firstname" autoComplete="given-name" required />
									</div>
									<div className="field split">
										<label htmlFor="lastname">Nom de famille*</label>
										<input ref={(el) => (formInputs.current.lastname = el)} type="text" id="lastname" autoComplete="family-name" required />
									</div>
									<div className="field split">
										<label htmlFor="email">Courriel*</label>
										<input ref={(el) => (formInputs.current.email = el)} type="email" id="email" autoComplete="email" required />
									</div>
									<div className="field split">
										<label htmlFor="phone">Téléphone*</label>
										<input ref={(el) => (formInputs.current.phone = el)} type="tel" id="phone" autoComplete="tel" required />
									</div>
									<div className="field split">
										<label htmlFor="company">Nom d'entreprise*</label>
										<input ref={(el) => (formInputs.current.company = el)} type="text" id="company" autoComplete="company" required />
									</div>
									<div className="field split">
										<label htmlFor="package">Forfait voulu*</label>
										<select ref={(el) => (formInputs.current.package = el)} id="package" defaultValue="none">
											<option value="none">Choisir un forfait</option>
											<option value="multi-sections">Multi-sections</option>
											<option value="multi-pages">Multi-pages</option>
											<option value="small-budget">Petit budget</option>
										</select>
									</div>
								</div>
							</div>
							{formMessage && (<p className="form-message">{formMessage}</p>)}
							<div className="buttons">
								<button type="submit" className="btn">
									<span>Ajouter</span>
								</button>
								<button ref={cancelBtn} type="reset" className="btn">
									<span>Annuler</span>
								</button>
							</div>
						</form>
					</div>
					<div className="items">
						{USER.affiliates?.history ? USER.affiliates.history.map((item, i) => {

							let statusText = 'En attente',
								packageText = 'Aucun',
								pointColor = '#EF970A';

							if(item.status === 'approved'){

								statusText = 'Approuvé';
								pointColor = '#214DF3';

							} else if(item.status === 'paid'){

								statusText = 'Payé';
								pointColor = '#39C60A';

							} else if(item.status === 'rejected'){

								statusText = 'Rejeté par client';
								pointColor = '#F23B22';

							}


							if(item.package === 'multi_sections')
								packageText = 'Multi-sections';
							else if(item.package === 'multi_pages')
								packageText = 'Multi-pages';
							else if(item.package === 'small_budget')
								packageText = 'Petit budget';

							return (
								<div className="item" key={i}>
									<h3>{item.name}</h3>
									<span>{packageText}</span>
									<span>{window.formatNumber(item.assigned)}$</span>
									<span><i style={{
										background: pointColor
									}}></i>{statusText}</span>
								</div>
							);

						}) : (
							<p>Aucun historique.</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
	
};

export default Affiliates;