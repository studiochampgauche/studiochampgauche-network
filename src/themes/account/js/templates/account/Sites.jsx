'use strict';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Sites = () => {


	const buttonsRef = useRef([]);

	/*useEffect(() => {

		const killEvents = [];

		let canFetch = true;

		buttonsRef.current?.forEach((btn, i) => {

			const handleClick = () => {

				if(!canFetch) return;
				canFetch = false;


				const formData = new FormData();
				formData.append('action', 'sso-login');
				formData.append('id', USER.sites[i].id);

				fetch(SYSTEM.ajaxPath, {
					method: 'POST',
					body: formData
				})
				.then(resp => resp.json())
				.then(data => {

					canFetch = true;

					console.log(data);
					if(data.status === 'error') return;

					console.log(data);

					window.open(USER.sites[i].admin_url, '_blank');

				});

			}

			btn.addEventListener('click', handleClick);

			killEvents.push(() => btn.removeEventListener('click', handleClick));

		});

		return () => killEvents?.forEach(killEvent => killEvent());

	});

	/*

	const fieldsRef = useRef([]);
	const buttonsRef = useRef([]);
	const typesRef = useRef([]);


	const prices = [
		{month: window.formatNumber(119), year: window.formatNumber(1428)},
		{month: window.formatNumber(159), year: window.formatNumber(1908)},
	];

	const [isPrices, setPrices] = useState([prices[0].month, prices[1].month]);
	const [typeText, setTypeText] = useState('mois');

	useEffect(() => {

		const killEvents = [];


		typesRef.current?.forEach((type, i) => {


			const handleClick = (e) => {

				type.parentNode.querySelector('.active').classList.remove('active');
				type.classList.add('active');

				const realType = (i === 0 ? 'month' : 'year');

				setTypeText((i === 0 ? 'mois' : 'an'));


				setPrices([prices[0][realType], prices[1][realType]]);

			}

			typesRef.current[i].addEventListener('click', handleClick);
			killEvents.push(() => typesRef.current[i]?.removeEventListener('click', handleClick));


		});


		let formCanSubmit = true;

		fieldsRef.current?.forEach((field, i) => {

			const handleSubmit = (e) => {

				e.preventDefault();

				if(!formCanSubmit) return;

				if(/^[a-zA-Z]+$/.test(field.value) && field.value.length >= 3 && field.value.length <= 25){
					field.classList.remove('error');

					formCanSubmit = false;

					buttonsRef.current[i].style.opacity = .6;
	        		buttonsRef.current[i].style.pointerEvents = 'none';

	        		const formData = new FormData();

			        formData.append('action', 'create-domain');
			        formData.append('domain', field.value);
			        formData.append('package', `${i}`);
			        formData.append('type', typeText);

			        fetch(SYSTEM.ajaxPath, {
			        	method: 'POST',
			        	body: formData
			        })
			        .then(resp => resp.json())
			        .then(data => {

			        	if(data.status === 'success')
			        		window.location.reload();
			        	else{

			        		formCanSubmit = true;

			        		buttonsRef.current[i].style.opacity = 1;
	        				buttonsRef.current[i].style.pointerEvents = 'initial';

			        	}

			        });

				} else {
					field.classList.add('error');
				}

			}


			buttonsRef.current[i].addEventListener('click', handleSubmit);

			killEvents.push(() => buttonsRef.current[i]?.removeEventListener('click', handleSubmit));

		});

		return () => killEvents?.forEach(killEvent => killEvent());

	});*/

	return(
		<>
			<div className="sites">
				<div className={USER.sites.length ? 'list' : 'no-site'}>
					{USER.sites.length ? USER.sites.map((site, i) => {

						let className = undefined;

						if(site.status === 'active')
							className = 'good';
						else if(site.status === 'past_due')
							className = 'pending';
						else if(site.status === 'unpaid')
							className = 'error';



						return (
							<div className="site" key={i}>
								<div className="content">
									<h2>{site.domain}</h2>
									<span>Statut&#8293;: <i className={className}>{site.status_text}</i></span>
									<Link ref={(el) => (buttonsRef.current[i] = el)} to={`${site.url + '?sso-login=' + site.token + '&domain=' + site.domain + '&username=' + USER.username}`} className="btn" target="_blank">
										<span>Gestion du contenu</span>
									</Link>
								</div>
							</div>
						)

					}) : (
						<>
							
						</>
					)}
				</div>
			</div>
		</>
	);
	
};

export default Sites;