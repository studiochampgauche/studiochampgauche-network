'use strict';
import { gsap } from 'gsap';

const Mouse = {
    init: () => {

        gsap.set('#mouser', {xPercent: -50, yPercent: -50});


        let xTo = gsap.quickTo('#mouser', "x", {duration: 0.6, ease: "power3"}),
            yTo = gsap.quickTo('#mouser', "y", {duration: 0.6, ease: "power3"});



        let superBulgesToKill = [];
        let bulgesToKill = [];
        let pinsToKill = [];



        let superBulgeAnimation = gsap.timeline();

        superBulgeAnimation
        .to('#mouser .point', .2, {
            scale: 1
        })
        .paused(true)


        let bulgeAnimation = gsap.timeline();

        bulgeAnimation
        .to('#mouser .point', .2, {
            scale: .4
        })
        .paused(true)


        let pinAnimation = gsap.timeline();

        pinAnimation
        .to('#mouser', .2, {
            scale: 0
        })
        .paused(true)


        const handleMouseMove = (e) => {

            xTo(e.clientX);
            yTo(e.clientY);

        }

        return {
            init: () => {

                document.querySelectorAll('header nav ul li a, footer .quick-links ul:nth-child(1) li a')?.forEach(item => {

                    const handleMouseEnter = () => {

                        bulgeAnimation.play();
                        bulgeAnimation.reversed(false);

                    }

                    item.addEventListener('mouseenter', handleMouseEnter);


                    const handleMouseLeave = () => {

                        bulgeAnimation.play();
                        bulgeAnimation.reversed(true);

                    }

                    item.addEventListener('mouseleave', handleMouseLeave);


                    bulgesToKill.push(() => {

                        item?.removeEventListener('mouseenter', handleMouseEnter);
                        item?.removeEventListener('mouseenter', handleMouseLeave);

                    })


                });



                document.querySelectorAll('.logo, .btn, #h__prices .list .item')?.forEach(item => {

                    const handleMouseEnter = () => {

                        pinAnimation.play();
                        pinAnimation.reversed(false);

                    }

                    item.addEventListener('mouseenter', handleMouseEnter);


                    const handleMouseLeave = () => {

                        pinAnimation.play();
                        pinAnimation.reversed(true);

                    }

                    item.addEventListener('mouseleave', handleMouseLeave);


                    pinsToKill.push(() => {

                        item?.removeEventListener('mouseenter', handleMouseEnter);
                        item?.removeEventListener('mouseenter', handleMouseLeave);

                    })


                });



                document.querySelectorAll('#h__sectors-activity .container .list .track')?.forEach(item => {

                    const handleMouseEnter = () => {

                        superBulgeAnimation.play();
                        superBulgeAnimation.reversed(false);

                    }

                    item.addEventListener('mouseenter', handleMouseEnter);


                    const handleMouseLeave = () => {

                        superBulgeAnimation.play();
                        superBulgeAnimation.reversed(true);

                    }

                    item.addEventListener('mouseleave', handleMouseLeave);


                    superBulgesToKill.push(() => {

                        item?.removeEventListener('mouseenter', handleMouseEnter);
                        item?.removeEventListener('mouseenter', handleMouseLeave);

                    })


                });


                window.addEventListener('mousemove', handleMouseMove);

            },
            kill: () => {

                window.removeEventListener('mousemove', handleMouseMove);

                bulgesToKill?.forEach(bulgeToKill => bulgeToKill());
                pinsToKill?.forEach(pinToKill => pinToKill());
                superBulgesToKill?.forEach(bulgeToKill => bulgeToKill());

            }
        }

    }
}

window.mouse = Mouse.init();
//window.mouse.init();