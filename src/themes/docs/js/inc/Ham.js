'use strict';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';


const Ham = () => {

	const header = document.querySelector('header');
	const hamElement = header.querySelector('.ham-menu');
	const ulElement = header.querySelector('nav ul');
	const barsElement = hamElement.querySelector('.bars');
	const bars = barsElement.querySelectorAll('.bar');

	const tl = gsap.timeline();

	tl
	.to(bars[0], .1, {
		y: '-50%',
		top: '50%'
	})
	.to(bars[1], .1, {
		y: '50%',
		bottom: '50%'
	}, 0)
	.to(bars[0], .1, {
		rotate: -45
	}, .1)
	.to(bars[1], .1, {
		rotate: 45
	}, .1)
	.to(ulElement, .2, {
		opacity: 1,
		pointerEvents: 'initial'
	}, 0)
	.paused(true);


	hamElement.addEventListener('click', () => {

		hamElement.classList.toggle('active');


		if(hamElement.classList.contains('active')){

			tl.play();
			tl.reversed(false);

		} else {

			tl.play();
			tl.reversed(true);

		}

	})

}

Ham();