'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import Contents from './components/Contents';

const Default = () => {
	
	return(
		<>
			<section id="h__intro">
				<div className="container">
					<Contents
						buttons={[
							{
								url: '/docs/',
								text: 'Documentations'
							},
							{
								url: 'https://github.com/studiochampgauche/ReactWP',
								text: 'GitHub',
								new_tab: true
							}
						]}
					/>
				</div>
			</section>
		</>
	);
	
}

export default Default;