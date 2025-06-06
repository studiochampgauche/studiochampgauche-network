'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import Contents from './components/Contents';

const Docs = () => {
	
	return(
		<>
			<div className="docs">
				<div className="container">
					<div className="sidebar"></div>
					<div className="main-contents">
						<article></article>
						<aside></aside>
					</div>
				</div>
			</div>
		</>
	);
	
}

export default Docs;