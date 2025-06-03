'use strict';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Affiliates = () => {

	const registrationBtnRef = useRef(null);

	const [totalWinnings, setTotalWinnings] = useState(0);
	const [amountDue, setAmountDue] = useState(0);


	useEffect(() => {

		const killEvents = [];


		let total = 0,
			due = 0;


		USER.affiliates?.history?.forEach(item => {

			if(item.status !== 'pendding')
				total += item.assigned;

			if(item.status === 'approved')
				due += item.assigned;

		});

		setTotalWinnings(window.formatNumber(total));
		setAmountDue(window.formatNumber(due));


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
					<div className="items">
						{USER.affiliates?.history ? USER.affiliates.history.map((item, i) => {

							let statusText = 'En attente',
								packageText = 'Aucun';

							if(item.status === 'approved')
								statusText = 'Approuvé';
							else if(item.status === 'paid')
								statusText = 'Payé';


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
									<span>{statusText}</span>
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