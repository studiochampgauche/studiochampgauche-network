'use strict';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

const Ham = {
    init: () => {

        const headerElement = document.querySelector('.side');
        const hamElement = headerElement?.querySelector('.ham-menu');

        if(!hamElement) return;

        let openAnim = gsap.timeline();

        openAnim
        .to(headerElement, .4, {
            height: '100vh'
        })
        .paused(true);

        const handleClick = () => {

            hamElement.classList.toggle('active');

            if(hamElement.classList.contains('active')){

                window.gscroll.paused(true);

                openAnim.play();
                openAnim.reversed(false);

            } else {

                window.gscroll.paused(false);

                openAnim.play();
                openAnim.reversed(true);

            }

        }

        hamElement.addEventListener('click', handleClick);

        return {

            kill: () => {

                hamElement.removeEventListener('click', handleClick);

                if(openAnim){

                    openAnim.kill();
                    openAnim = null;

                }

            }

        }
    }
}


export default Ham;