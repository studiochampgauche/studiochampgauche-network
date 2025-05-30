'use strict';
import { gsap } from 'gsap';


const Background = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();


    const gradientAnimation = gsap.timeline({
    	repeat: -1,
    	ease: 'none'
    });

    gradientAnimation
    .to('#bg .top', 4, {
    	background: '#00B4B6',
    })
    .to('#bg .top', 4, {
    	background: '#B6A700',
    });


    let circles = [];

    class Circle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = (window.innerWidth > window.innerHeight ? (window.innerHeight / 4) : (window.innerWidth / 4)); // Taille fixe
            this.alpha = 0;
            this.alive = true;


            gsap.to(this, .4, {
                alpha: .1,
                ease: 'power4',
                onComplete: () => {
                    gsap.to(this, .4,{
                        alpha: 0,
                        ease: 'power4',
                        onComplete: () => {
                            this.alive = false;
                        }
                    });
                }
            });
        }

        draw(ctx) {
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
          gradient.addColorStop(0, `rgba(255,255,255,${this.alpha})`);
          gradient.addColorStop(1, `rgba(255,255,255,0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        circles = circles.filter(c => c.alive);
        circles.forEach(c => c.draw(ctx));

        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', e => {
        circles.push(new Circle(e.clientX, e.clientY));
    });
};

Background();