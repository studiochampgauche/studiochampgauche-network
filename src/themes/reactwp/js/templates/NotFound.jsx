'use strict';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	
	return(
		<>
			<Link to="/">Home-</Link>
			<Link to="/test">404-</Link>
			<Link to="/accueil/test">Test</Link>
		</>
	);
	
}

export default NotFound;