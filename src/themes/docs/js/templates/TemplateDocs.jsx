'use strict';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import hljs from 'highlight.js';
import Contents from './components/Contents';

const Docs = ({ pageName, acf, extraDatas }) => {


	const menuBtnRef = useRef(null);
	const menuIconRef = useRef(null);
	const sidebarRef = useRef(null);
	const sidebarInnerRef = useRef(null);
	const asideRef = useRef(null);
	const asideUlRef = useRef(null);

	useEffect(() => {

		const killEvents = [];
		const matchMediaKillEvents = [];


		document.querySelectorAll('code')?.forEach((code, i) => {

			code.innerHTML = untab(code.innerHTML.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')).trim();

			gsap.delayedCall(.4, () => hljs.highlightElement(code));

		});


		const h2Elements = document.querySelectorAll('h2');

		h2Elements?.forEach((h2, i) => {

			const li = document.createElement('li');
			li.innerHTML = `<span>${h2.innerText}</span>`;

			const handleClick = () => {

				h2.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});

			}

			li.addEventListener('click', handleClick);
			killEvents.push(() => li.removeEventListener('click', handleClick));

			asideUlRef.current.appendChild(li);

		});


		killEvents.push(() => {

			if(asideUlRef.current){

				asideUlRef.current.innerHTML = '';
				
			}

		});

		function untab(str) {
			const lines = str.split('\n');

			
			const indentLengths = lines
			.filter(line => line.trim().length > 0)
			.map(line => line.match(/^(\s*)/)[0].length);

			const minIndent = Math.min(...indentLengths);

			
			return lines.map(line => line.slice(minIndent)).join('\n');
		}



		const mm = gsap.matchMedia();


		mm.add({
			isMobile: '(max-width: 768px)',
			isNotMobile: '(min-width: 769px)'
		}, (context) => {

			let { isMobile, isNotMobile } = context.conditions;


			if(isMobile){

				let animMenu = gsap.timeline();


				animMenu
				.to(sidebarRef.current, .2, {
					height: (sidebarInnerRef.current.getBoundingClientRect().bottom - sidebarInnerRef.current.getBoundingClientRect().top)
				})
				.to(menuIconRef.current, .2, {
					rotate: 90
				}, 0)
				.paused(true);

				const handleMenuClick = () => {

					menuBtnRef.current.classList.toggle('active');


					if(menuBtnRef.current.classList.contains('active')){

						animMenu.play();
						animMenu.reversed(false);

					} else {

						animMenu.play();
						animMenu.reversed(true);

					}

				}

				menuBtnRef.current.addEventListener('click', handleMenuClick);


				matchMediaKillEvents.push(() => {


					if(sidebarRef.current){

						gsap.set(sidebarRef.current, {
							height: 0
						});
						
					}

					if(menuIconRef.current){

						gsap.set(menuIconRef.current, {
							rotate: 0
						});

					}


					if(animMenu){

						animMenu.kill();
						animMenu = null;

					}

					menuBtnRef.current?.classList.remove('active');
					menuBtnRef.current?.removeEventListener('click', handleMenuClick);

				});


			} else if(isNotMobile){

				gsap.set(sidebarRef.current, {
					height: '100%'
				});

			}

			return () => matchMediaKillEvents?.forEach(killEvent => killEvent());

		});


		return () => killEvents?.forEach(killEvent => killEvent());

	});

	return(
		<>
			<div className="docs">
				<div className="container">
					<div ref={menuBtnRef} className="menu-btn">
						<span>Menu</span>
						<div ref={menuIconRef} className="icon">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M579-480 285-774q-15-15-14.5-35.5T286-845q15-15 35.5-15t35.5 15l307 308q12 12 18 27t6 30q0 15-6 30t-18 27L356-115q-15 15-35 14.5T286-116q-15-15-15-35.5t15-35.5l293-293Z"/></svg>
						</div>
					</div>
					<div ref={sidebarRef} className="sidebar">
						<div ref={sidebarInnerRef} className="inner">
							{SIDEBAR && SIDEBAR.map((sidebarElement, i) => (

								<div className="item" key={i}>

									{sidebarElement.group_name && (
										<div className="title">
											<span>{sidebarElement.group_name}</span>
										</div>
									)}

									{sidebarElement.items && (
										<ul>
											{sidebarElement.items.map((item, j) => (
												<li key={j}>
													<Link to={item.page}>{item.name}</Link>
												</li>
											))}
										</ul>
									)}

								</div>

							))}
						</div>
					</div>
					<div className="main-contents">
						<article>
							<div className="inner">
								<nav>
									<ul>
										<li>
											<Link to="/docs/">Home</Link>
										</li>
									</ul>
								</nav>
								<Contents
									titleTag='h1'
									title={acf?.intro?.title || pageName}
									subtitle={`Last updated ${extraDatas.modified}`}
									text={acf?.intro?.text}
									buttons={acf?.intro?.buttons}
								/>
								<Contents
									text={acf?.contents}
								/>
								<footer>
									<span>&copy; {new Date().getFullYear()} <Link to={COPYRIGHT.url} target="_blank">{COPYRIGHT.text}</Link></span>
								</footer>
							</div>
						</article>
						<aside ref={asideRef}>
							<div className="inner">
								<ul ref={asideUlRef}></ul>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</>
	);
	
}

export default Docs;