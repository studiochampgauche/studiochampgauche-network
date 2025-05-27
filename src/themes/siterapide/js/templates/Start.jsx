'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import Contents from './components/Contents';
import Form from './components/Form';

const Start = () => {
	
	return(
		<>
			<section id="start__intro" className="intro">
				<div className="container">
					<Contents
						titleTag='h1'
						title='Obtenir mon <span>site web</span>'
						text={'<p>Obtenez un site web professionnel, rapide et clé en main en moins de 30 jours, avec un design moderne et responsive, le tout sans contrat, et payez à votre rythme, soit par mois ou par année, selon vos besoins.</p>'}
					/>
				</div>
			</section>
			<section id="start__steps">
				<div className="container">
					<div className="list">
						<div className="item">
							<div className="number">
								<span>1</span>
							</div>
							<Contents
								title='Prise de contact'
								text='<p>Prenez contact avec nous via le formulaire ci-dessous.</p>'
							/>
						</div>
						<div className="item">
							<div className="number">
								<span>2</span>
							</div>
							<Contents
								title='Analyse des besoins'
								text='<p>Un représentant vous contactera dans les 48h ouvrables.</p>'
							/>
						</div>
						<div className="item">
							<div className="number">
								<span>3</span>
							</div>
							<Contents
								title='Prêt avant 30 jours'
								text='<p>Votre site prêt avant 30 jours suivant votre paiement initial.</p>'
							/>
						</div>
					</div>
				</div>
			</section>
			<section id="start__form">
				<div className="container">
					<Contents
						title='Contactez-nous'
						text='<p>Remplissez le formulaire ci-droit pour recevoir l’appel d’un de nos représentants.</p>'
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