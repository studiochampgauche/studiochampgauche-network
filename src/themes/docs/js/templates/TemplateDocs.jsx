'use strict';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import hljs from 'highlight.js';
import Contents from './components/Contents';

const Docs = ({ pageName, acf, extraDatas }) => {


	const asideRef = useRef(null);
	const asideUlRef = useRef(null);

	useEffect(() => {

		const killEvents = [];


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

			asideUlRef.current.innerHTML = '';

		});


		function untab(str) {
			const lines = str.split('\n');

			
			const indentLengths = lines
			.filter(line => line.trim().length > 0)
			.map(line => line.match(/^(\s*)/)[0].length);

			const minIndent = Math.min(...indentLengths);

			
			return lines.map(line => line.slice(minIndent)).join('\n');
		}


		return () => killEvents?.forEach(killEvent => killEvent());

	});

	return(
		<>
			<div className="docs">
				<div className="container">
					<div className="sidebar">
						<div className="inner">
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