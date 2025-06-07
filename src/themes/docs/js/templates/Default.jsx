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
						titleTag='h1'
						title='Website Under Construction'
						buttons={[
							{
								text: 'Documentation',
								url: '/docs/'
							}
						]}
					/>
				</div>
			</section>
		</>
	);
	
}

export default Default;