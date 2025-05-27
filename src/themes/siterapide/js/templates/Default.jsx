'use strict';
import React, {useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

const Default = () => {
	

	useEffect(() => {
		
		const killEvents = [];




		return () => killEvents?.forEach(killEvent => killEvent());
	});

	return(
		<>
			
		</>
	);
	
}

export default Default;