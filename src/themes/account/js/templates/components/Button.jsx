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

	after = `<div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="35.275" height="23.504" viewBox="0 0 35.275 23.504"><path d="M23.274,0l-.837.82L33.008,11.173H0v1.159H33.008L22.437,22.684l.837.82L34.438,12.572l.837-.82-.837-.82Z" transform="translate(0 0)" fill="#214cf3"/></svg></div>`;


	const ref = useRef(null);


	useEffect(() => {

		const killEvents = [];

		const arrowElement = ref.current.querySelector('.arrow');

		let anim1 = gsap.timeline();

		if(ref.current.classList.contains('turn')){

			anim1
			.to(arrowElement, .2, {
				width: (ref.current?.getBoundingClientRect().right - ref?.current.getBoundingClientRect().left - 18),
			})
			.to(arrowElement.querySelector('svg'), .2, {
				rotate: 90,
				scale: .85
			}, 0)
			.paused(true);

		} else {

			anim1
			.to(arrowElement, .2, {
				width: (ref.current?.getBoundingClientRect().right - ref?.current.getBoundingClientRect().left - 18),
			})
			.paused(true);

		}

		const handleMouseEnter = () => {

			anim1.play();
			anim1.reversed(false)

		}

		const handleMouseLeave = () => {

			anim1.play();
			anim1.reversed(true)

		}


		ref.current?.addEventListener('mouseenter', handleMouseEnter);
		ref.current?.addEventListener('mouseleave', handleMouseLeave);


		killEvents.push(() => {

			if(anim1){
				anim1.kill();
				anim1 = null;
			}

			ref.current?.removeEventListener('mouseenter', handleMouseEnter);
			ref.current?.removeEventListener('mouseleave', handleMouseLeave);

		});

		return () => killEvents?.forEach(killEvent => killEvent());

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