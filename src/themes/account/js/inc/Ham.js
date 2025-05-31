'use strict';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

const Ham = {
    init: () => {

        gsap.registerPlugin(ScrollTrigger, CustomEase);

        const headerElement = document.querySelector('header');

        const logoElement = headerElement.querySelector('.logo');


        const btn = headerElement.querySelector('.btn');
        const btnSpans = btn.querySelectorAll('span');


        const headerAnimation = gsap.timeline();

        let lastDirection = -1;


        headerAnimation
        .to(headerElement.querySelector('.plywood'), .4, {
            y: '-100%',
            ease: 'none'
        });

        headerAnimation.paused(true);

        
        ScrollTrigger.create({
            id: 'header',
            trigger: '#pageContent',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {


                if(lastDirection === self.direction) return;

                lastDirection = self.direction;

                if(lastDirection === 1){

                    headerAnimation.play();
                    headerAnimation.reversed(false);

                } else {

                    headerAnimation.play();
                    headerAnimation.reversed(true);

                }

            }
        });


        let canEnter = true;
        const logoAnim = gsap.timeline();

        logoAnim
        .to(logoElement, .2, {
            scale: .9
        })
        .paused(true);


        logoElement.addEventListener('mouseenter', () => {

            logoAnim.play();
            logoAnim.reversed(false);

        });


        logoElement.addEventListener('mouseleave', () => {

            logoAnim.play();
            logoAnim.reversed(true);

        });




        const tl = gsap.timeline();

        tl
        .to(btnSpans[1], .2, {
            y: '+=20px',
            opacity: 0
        })
        .to(btnSpans[0], .2, {
            y: '+=20px',
            opacity: 1
        }, 0)
        .paused(true);


        btn.addEventListener('mouseenter', () => {

            tl.play();
            tl.reversed(false);

        });


        btn.addEventListener('mouseleave', () => {

            tl.play();
            tl.reversed(true);
            
        });

    }
}

Ham.init();