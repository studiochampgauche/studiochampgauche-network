'use strict';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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
                alpha: 1,
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

    const targetFPS = 60;
	const frameDelay = 1000 / targetFPS;

    let lastTime = 0;
	window.addEventListener('mousemove', e => {
	    const now = Date.now();
	    if (now - lastTime > frameDelay) {
	        circles.push(new Circle(e.clientX, e.clientY));
	        lastTime = now;
	    }
	});
};

Background();


const Scene = () => {
	
	const canvas = document.getElementById('plate');
	const scene = new THREE.Scene();
	const homeCamera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.01, 100);
	homeCamera.position.z = 0.1;

	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
	renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

	const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
	const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0, transparent: true });
	const homeCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	scene.add(homeCube);

	const loader = new GLTFLoader();

	loader.load('/wp-content/themes/champgauche/assets/js/glb/icon.glb', function (gltf) {
		const tshirt = gltf.scene;

		const glassMaterial = new THREE.MeshPhysicalMaterial({
		  color: 0xffffff,
		  metalness: 0,
		  roughness: 0,
		  transmission: 1,
		  opacity: 1,
		  ior: 1.5,
		  side: THREE.DoubleSide
		});

		tshirt.traverse(child => {
		  if (child.isMesh) {
		    child.material = glassMaterial;
		    child.material.needsUpdate = true;
		  }
		});


		const box = new THREE.Box3().setFromObject(tshirt);
		const center = new THREE.Vector3();

		box.getCenter(center);
		tshirt.position.sub(center);
		homeCube.add(tshirt);
	});

	let targetRotationY = 0, currentRotationY = 0;
	window.addEventListener('mousemove', (event) => {

		targetRotationY = THREE.MathUtils.degToRad((event.clientX / window.innerWidth) * 20 - 10);

	});

	const clock = new THREE.Clock();
	function animate() {

		const delta = clock.getDelta();
		currentRotationY += (targetRotationY - currentRotationY) * 0.1;
		homeCube.rotation.y = currentRotationY;
		renderer.render(scene, homeCamera);
		requestAnimationFrame(animate);

	}
	animate();

};

Scene();