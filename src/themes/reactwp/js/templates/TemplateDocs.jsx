'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import Contents from './components/Contents';

const Docs = () => {
	
	return(
		<>
			<div class="docs">
				<div className="sidebar"></div>
				<div className="main-contents">
					<article></article>
					<aside></aside>
				</div>
			</div>
		</>
	);
	
}

export default Docs;