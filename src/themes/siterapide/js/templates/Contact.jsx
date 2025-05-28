'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import Contents from './components/Contents';
import Form from './components/Form';

const Contact = () => {
	
	return(
		<>
			<section id="contact__intro" className="intro">
				<div className="container">
					<Contents
						titleTag='h1'
						title='Vous désirez <span>nous joindre</span> ?'
						text='<p>Contactez-nous dès maintenant pour découvrir nos forfaits, poser vos questions ou échanger avec un de nos représentants pour débuter une analyse de vos besoins.</p>'
					/>
				</div>
			</section>
			<section id="contact__form">
				<div className="container">
					<Contents
						title='Contactez-nous'
						text='<p>Remplissez notre formulaire et nous serons ravis de répondre à vos questions et de discuter de vos besoins.</p><ul><li><span>Questions&#8239;:</span><a href="mailto:info@siterapide.ca">info@siterapide.ca</a></li><li><span>Support&#8239;:</span><a href="mailto:support@siterapide.ca">support@siterapide.ca</a></li><li><span>Carrière&#8239;:</span><a href="mailto:cv@siterapide.ca">cv@siterapide.ca</a></li></ul>'
					/>
					<Form
						data={{
							form: 'contact'
						}}
					/>
				</div>
			</section>
		</>
	);
	
}

export default Contact;