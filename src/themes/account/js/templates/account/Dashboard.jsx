'use strict';
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {


	return(
		<>
			<div className="dashboard">
				<div className="quick-links">
					<Link to="/profil/">
						<div className="content">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20.368" viewBox="0 0 20 20.368"><g><path d="M19.994,19.447a10.041,10.041,0,0,0-5.861-8.538c-.266-.122-.546-.21-.808-.339-.014-.061.369-.314.441-.377a5.793,5.793,0,1,0-7.518.018c.108.093.306.211.392.3.027.027.046.03.034.08A10.033,10.033,0,0,0,.094,18.47,9.442,9.442,0,0,0,0,19.57H0c0,.008,0,.017,0,.025a.774.774,0,1,0,1.548,0c0-.015,0-.031,0-.046a8.552,8.552,0,0,1,4.985-7.221A8.459,8.459,0,0,1,18.424,19.57h0a.774.774,0,0,0,.774.774h.028A.774.774,0,0,0,20,19.57v-.028a.78.78,0,0,0-.006-.095M6.111,7.465a4.226,4.226,0,1,1,7.194.958,4.242,4.242,0,0,1-7.194-.958" transform="translate(0 -0.001)" /></g></svg>
							</div>
							<span>Mon profil</span>
						</div>
					</Link>
					<Link to="/mes-sites/">
						<div className="content">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22.173" viewBox="0 0 24 22.173"><g><path d="M12.855,8.325v3.186l.135.061c1.6.078,3.3-.111,4.89,0a3.812,3.812,0,0,1,3.5,3.308,11.129,11.129,0,0,1,.044,1.344h.919a1.954,1.954,0,0,1,1.624,1.738,19.23,19.23,0,0,1,0,2.427,1.878,1.878,0,0,1-1.44,1.688,20.3,20.3,0,0,1-3.537.041A1.9,1.9,0,0,1,17.391,20.5a19.229,19.229,0,0,1,0-2.62,1.945,1.945,0,0,1,1.624-1.66h1V15.147a2.515,2.515,0,0,0-2.131-2.17H12.855v3.245h.958A1.985,1.985,0,0,1,15.427,17.7a13.686,13.686,0,0,1,0,2.953,1.934,1.934,0,0,1-1.585,1.465c-1.545-.156-4.447.7-4.926-1.428a14.209,14.209,0,0,1,0-3.028,1.992,1.992,0,0,1,1.573-1.438h.958V12.977h-5.3a2.549,2.549,0,0,0-2.092,2.013v1.231h.958A1.958,1.958,0,0,1,6.639,17.96a19.121,19.121,0,0,1,0,2.427A1.89,1.89,0,0,1,5.2,22.075a20.563,20.563,0,0,1-3.537.041A1.9,1.9,0,0,1,.086,20.6a10.813,10.813,0,0,1,.042-3.012,1.931,1.931,0,0,1,1.564-1.369h.958v-1.31a4.3,4.3,0,0,1,.9-2.032A4.059,4.059,0,0,1,6.071,11.57h5.377V8.325H9.277A1.93,1.93,0,0,1,7.5,6.391a40.229,40.229,0,0,1,0-4.421A1.92,1.92,0,0,1,9.549.035c1.9-.1,3.847.046,5.747.044A1.907,1.907,0,0,1,16.8,1.7c.155,1.6-.107,3.449-.01,5.072a1.936,1.936,0,0,1-1.73,1.554Zm-3.49-6.87a.493.493,0,0,0-.46.478c.1,1.438-.127,3.04,0,4.458a.5.5,0,0,0,.528.528c1.759-.1,3.657.129,5.4,0,.443-.033.557-.161.606-.606-.08-1.376.1-2.863,0-4.225-.033-.447-.147-.605-.606-.645-1.74-.15-3.7.107-5.466.012M1.817,17.638a.541.541,0,0,0-.38.519,14.051,14.051,0,0,0,0,2.032.522.522,0,0,0,.448.529c.931-.068,1.98.087,2.9,0a.461.461,0,0,0,.449-.411,15.587,15.587,0,0,0,0-2.231.454.454,0,0,0-.287-.417ZM10.4,20.587a.491.491,0,0,0,.317.132c.933-.068,1.978.084,2.9,0a.5.5,0,0,0,.448-.49,14.517,14.517,0,0,0,0-2.111.49.49,0,0,0-.487-.49,20.584,20.584,0,0,0-2.818,0,.483.483,0,0,0-.489.489,15.227,15.227,0,0,0,0,2.152.605.605,0,0,0,.131.319m8.735-2.949A.466.466,0,0,0,18.8,18c-.1.7.077,1.621,0,2.349a.461.461,0,0,0,.411.371c.889.107,1.985-.083,2.9,0a.464.464,0,0,0,.449-.411,15.576,15.576,0,0,0,0-2.231.446.446,0,0,0-.412-.449Z" transform="translate(0 0)" /></g></svg>
							</div>
							<span>Mes sites</span>
						</div>
					</Link>
					<Link to="/support/">
						<div className="content">
							<div className="icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="21.953" viewBox="0 0 22 21.953"><g><path d="M2.438.012,15.365,0A2.788,2.788,0,0,1,17.9,2.892c.138,2.761-.074,5.668-.042,8.438a2.784,2.784,0,0,1-2.494,2.393l-10.269.008L1.186,16.971A.716.716,0,0,1,0,16.364V2.855A2.8,2.8,0,0,1,2.438.012M1.4,14.98l3.065-2.522.232-.092c3.573-.05,7.159.058,10.725-.054a1.38,1.38,0,0,0,1.07-1.194l0-8.443a1.382,1.382,0,0,0-1.312-1.311l-12.505,0A1.446,1.446,0,0,0,1.4,2.534Z" transform="translate(-0.001)" fill="#fff"/><path d="M167.573,167.1V155.334a1.525,1.525,0,0,0-.862-1.113c-.431-.171-1.113.014-1.186-.682-.1-.968,1.039-.844,1.652-.61a2.814,2.814,0,0,1,1.716,2.021c.107,4.54.014,9.1.047,13.642a.7.7,0,0,1-1.092.514l-3.283-2.609-9.516-.006a2.9,2.9,0,0,1-2.6-3.4.7.7,0,1,1,1.4-.038c.025.274-.028.584,0,.86a1.375,1.375,0,0,0,1.009,1.146c3.345.143,6.715.017,10.069.064l.305.126Z" transform="translate(-146.946 -147.269)" fill="#fff"/><path d="M115.717,113.912l8.291-.009a.7.7,0,0,1,0,1.4H115.78a.7.7,0,0,1-.063-1.391" transform="translate(-110.945 -109.806)" fill="#fff"/><path d="M115.622,190.886l5.737-.006a.69.69,0,0,1-.033,1.362l-5.674,0a.685.685,0,0,1-.03-1.353" transform="translate(-110.921 -184.015)" fill="#fff"/></g></svg>
							</div>
							<span>Support</span>
						</div>
					</Link>
				</div>
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

export default Dashboard;