'use strict';
import React from 'react';
import { Link } from 'react-router-dom';

const Subscriptions = () => {


	return(
		<>
			<div className="subscriptions">
				<div className="stripe-call">
					<div className="title">
						<div className="icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="48" height="41.876" viewBox="0 0 48 41.876"><g><path d="M3.069,117.815v5.948H19.7a3.529,3.529,0,0,1,.457.169,1.5,1.5,0,0,1-.127,2.743c-.075.027-.451.14-.486.14H3.069v17.923H44.952V133.9c0-.246.466-.746.678-.887a1.484,1.484,0,0,1,2.3,1.044l-.01,11.026a3.023,3.023,0,0,1-2.844,2.635H2.948a3,3,0,0,1-2.834-2.41c-.229-9.082-.03-18.2-.1-27.3a3.112,3.112,0,0,1,2.625-3.167H19.7a1.486,1.486,0,0,1,.614,2.727,4.42,4.42,0,0,1-.535.247Z" transform="translate(0.001 -105.839)" /><path d="M316.377.022A1.954,1.954,0,0,1,317.49.2c3.387,1.226,6.726,3.1,10.13,4.352a1.615,1.615,0,0,1,.935,1.022c.3,8.056.6,14.73-5.817,20.453a27.925,27.925,0,0,1-5.374,3.707c-1.113.476-2.137-.388-3.076-.975-6.318-3.947-9.34-8.434-9.639-16.035a57.866,57.866,0,0,1,0-6.733,1.664,1.664,0,0,1,1-1.427c3.172-1.686,7.068-2.755,10.3-4.42a2.47,2.47,0,0,1,.427-.121m.234,3.124-8.866,3.821c.007,4.067-.487,8.355,1.225,12.16a15.93,15.93,0,0,0,5.6,6.219,13.941,13.941,0,0,0,2.092,1.268c3.028-1.7,6.069-4.1,7.576-7.3a16.785,16.785,0,0,0,1.4-6.194c.092-2.031-.044-4.122-.041-6.149Z" transform="translate(-280.681 0)" /><path d="M78.46,342.589c1.939-.3,4.531.164,6.537,0a1.5,1.5,0,0,1-.066,2.949c-1.969.268-4.521-.171-6.55-.012a1.5,1.5,0,0,1,.08-2.935" transform="translate(-71.182 -315.645)" /><path d="M383.091,118.179a2.287,2.287,0,0,1,.387-.278c1.98-.908,2.685,2.307,3.85,3.224l4.9-6.061a1.5,1.5,0,0,1,2.065,2.142c-1.594,2.5-4.244,4.878-5.908,7.4a1.578,1.578,0,0,1-2.3.19c-.864-1.555-2.5-3.261-3.243-4.819a1.538,1.538,0,0,1,.249-1.8" transform="translate(-352.672 -105.785)"/></g></svg>
						</div>
						<span>Gestion des abonnements</span>
					</div>
					<div className="text">
						<p>Nous utilisons Stripe pour gérer les paiements reliés à vos abonnements. Si vous voulez arrêter un paiement, changer votre mode de paiement, voir l'historique de vos factures ou régler un paiement en retard, cliquez sur "Gérer mes abonnements", vous serez redirigé sur leur plateforme.</p>
						<p>En arrivant sur la plateforme de Stripe, vous serez invité à inscrire un courriel. Donner le même courriel associé à votre compte, puis cliquez sur le lien que vous recevrez pour tomber automatiquement dans votre gestion des abonnements.</p>
						<Link className="btn" to="https://billing.stripe.com/p/login/14k4ir0tj2Xn5q0fYY" target="_blank">
							<span>Gérer mes abonnement</span>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
	
};

export default Subscriptions;