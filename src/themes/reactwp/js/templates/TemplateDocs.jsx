'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import Contents from './components/Contents';

const Docs = () => {
	
	return(
		<>
			<section id="docs__intro">
				<div className="container">
					<Contents
						titleTag='h1'
						title='Coming soon..'
					/>
				</div>
			</section>
		</>
	);
	
}

export default Docs;