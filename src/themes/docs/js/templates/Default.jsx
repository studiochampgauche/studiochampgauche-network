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
					/>
				</div>
			</section>
		</>
	);
	
}

export default Default;