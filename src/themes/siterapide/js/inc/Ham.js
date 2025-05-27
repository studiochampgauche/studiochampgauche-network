'use strict';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

const Ham = {
    init: () => {

        gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable, InertiaPlugin);

        const headerElement = document.querySelector('header');

        const logoElement = headerElement.querySelector('.logo');

        const hamButton = headerElement.querySelector('header .plywood .container .ham-button');
        const hamPanel = document.getElementById('ham-panel');


        const btn = headerElement.querySelector('.btn');
        const btnSpans = btn.querySelectorAll('span');


        const headerAnimation = gsap.timeline();

        let lastDirection = -1,
            canDrag = true;


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



        const hamPanelAnim = gsap.timeline();

        hamPanelAnim
        .to(hamPanel, .2, {
            background: 'rgba(0,0,0,.5)',
            pointerEvents: 'initial'
        })
        .to(hamButton.querySelector('.bars .bar:nth-child(1)'), .1, {
            top: '50%',
            y: '-50%',
        }, 0)
        .to(hamButton.querySelector('.bars .bar:nth-child(2)'), .1, {
            bottom: '50%',
            y: '50%',
        }, 0)
        .to(hamButton.querySelector('.bars .bar:nth-child(1)'), .1, {
            rotate: -45
        }, .1)
        .to(hamButton.querySelector('.bars .bar:nth-child(2)'), .1, {
            rotate: 45
        }, .1)
        .to(hamPanel.querySelector('.bg'), .2, {
            scaleY: 1
        }, .15)
        .to(hamPanel.querySelector('.inner .end .gbar'), .2, {
            opacity: 1,
        }, .35)
        .to(hamPanel.querySelectorAll('.inner > ul li'), .2, {
            y: 0,
            opacity: 1,
            stagger: .05
        }, '-=.2')
        .to(hamPanel.querySelectorAll('.inner > ul li'), .2, {
            y: 0,
            opacity: 1,
            stagger: .05
        })
        .to(hamPanel.querySelectorAll('.inner .end ul li'), .2, {
            opacity: 1,
            stagger: .05
        }, .65)
        .to(hamPanel.querySelectorAll('.inner .end .get, .inner .end .account'), .2, {
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            stagger: .05
        }, .75)
        .paused(true);

        hamButton.addEventListener('click', () => {

            hamButton.classList.toggle('active');


            if(hamButton.classList.contains('active')){

                window.gscroll.paused(true);

                hamPanelAnim.play();
                hamPanelAnim.reversed(false);

            } else {

                window.gscroll.paused(false);

                hamPanelAnim.play();
                hamPanelAnim.reversed(true);

            }

        })


        Draggable.create(hamPanel.querySelectorAll('.inner, .bg'), {
            type: 'y',
            bounds: {
                minY: 0,
                maxY: -(hamPanel.querySelector('.bg').clientHeight)
            },
            trigger: hamPanel.querySelector('.inner .end .gbar'),
            zIndexBoost: false,
            inertia: true,
            snap: [0],
            onDragStart: () => {

                if(!canDrag) return;
                canDrag = false;
                
                hamButton.dispatchEvent(new Event('click'));

            },
            onRelease: () => {

                if(canDrag) return;
                
                canDrag = true;

            }
        });


        hamPanel.querySelectorAll('a:not([target=_blank])')?.forEach(item => {

            item.addEventListener('click', () => {

                hamButton.dispatchEvent(new Event('click'));

            });

        });

    }
}

Ham.init();