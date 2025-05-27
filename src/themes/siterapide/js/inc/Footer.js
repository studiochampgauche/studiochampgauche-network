'use strict';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

const Footer = {
    init: () => {

        const btnElement = document.querySelector('footer .btn');
        const socialElements = document.querySelectorAll('footer .container .top .quick-links ul:nth-child(2) li a:not(.btn)');

        const arrowElement = btnElement.querySelector('.arrow');

        let anim1 = gsap.timeline();

        if(btnElement.classList.contains('turn')){

            anim1
            .to(arrowElement, .2, {
                width: ((btnElement?.getBoundingClientRect().right - btnElement?.getBoundingClientRect().left) - ((btnElement?.getBoundingClientRect().right - btnElement.querySelector('.arrow')?.getBoundingClientRect().right) * 2)),
            })
            .to(arrowElement.querySelector('svg'), .2, {
                rotate: 90,
                scale: .85
            }, 0)
            .paused(true);

        } else {

            anim1
            .to(arrowElement, .2, {
                width: ((btnElement?.getBoundingClientRect().right - btnElement?.getBoundingClientRect().left) - ((btnElement?.getBoundingClientRect().right - btnElement.querySelector('.arrow')?.getBoundingClientRect().right) * 2)),
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


        btnElement?.addEventListener('mouseenter', handleMouseEnter);
        btnElement?.addEventListener('mouseleave', handleMouseLeave);


        socialElements?.forEach(btn => {

            let anim2 = gsap.timeline();
            const btnSvgs = btn.querySelectorAll('svg');

            anim2
            .to(btnSvgs[1], .2, {
                y: '+=20px',
                opacity: 0
            })
            .to(btnSvgs[0], .2, {
                y: '+=20px',
                opacity: 1
            }, 0)
            .paused(true);


            btn.addEventListener('mouseenter', () => {

                anim2.play();
                anim2.reversed(false);

            });


            btn.addEventListener('mouseleave', () => {

                anim2.play();
                anim2.reversed(true);
                
            });
        });

    }
}

Footer.init();