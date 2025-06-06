'use strict';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Button = ({ to = null, text, className = null, before, after, ...props }) => {

	const Tag = to ? Link : 'button';

	const tagProps = {
		to: (to || undefined),
		className: (className ? `btn ${className}` : 'btn'),
		...props
	}


	const ref = useRef(null);


	useEffect(() => {

		let anim1 = gsap.timeline();

		anim1
		.to(ref.current.querySelector('span'), .1, {
			y: 10,
			opacity: 0
		})
		.set(ref.current.querySelector('span'), {
			y: -10,
			color: '#000'
		})
		.to(ref.current.querySelector('span'), .1, {
			y: 0,
			opacity: 1
		})
		.to(ref.current, .2, {
			background: '#fff'
		}, 0)
		.paused(true);



		const handleMouseEnter = () => {

			anim1?.play();
			anim1?.reversed(false);

		}

		ref.current.addEventListener('mouseenter', handleMouseEnter);


		const handleMouseLeave = () => {

			anim1?.play();
			anim1?.reversed(true);

		}

		ref.current.addEventListener('mouseleave', handleMouseLeave);


		return () => {

			ref.current?.removeEventListener('mouseenter', handleMouseEnter);
			ref.current?.removeEventListener('mouseleave', handleMouseLeave);

			if(anim1){
				anim1.kill();
				anim1 = null;
			}

		}

	}, []);

	return(
		<Tag ref={ref} {...tagProps}>
			{before && (<div className="btn-before" dangerouslySetInnerHTML={{ __html: before }} />)}
			{text && (<span dangerouslySetInnerHTML={{ __html: text }}  />)}
			{after && (<div className="btn-after" dangerouslySetInnerHTML={{ __html: after }} />)}
		</Tag>
	);

}

export default Button;