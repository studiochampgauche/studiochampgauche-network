'use strict';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import hljs from 'highlight.js';
import Contents from './components/Contents';

const Docs = () => {
	
	useEffect(() => {

		const killEvents = [];


		document.querySelectorAll('code')?.forEach((code, i) => {

			code.innerHTML = untab(code.innerHTML.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')).trim();

			gsap.delayedCall(.4, () => hljs.highlightElement(code));

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
							<div className="item">
								<div className="title">
									<span>Lorem ipsum</span>
								</div>
								<ul>
									<li>
										<Link href="">Lorem ipsum dolor</Link>
									</li>
									<li>
										<Link href="">Lorem ipsum dolor</Link>
									</li>
									<li>
										<Link href="">Lorem ipsum dolor</Link>
									</li>
								</ul>
							</div>
							<div className="item">
								<div className="title">
									<span>Lorem ipsum</span>
								</div>
								<ul>
									<li>
										<Link href="">Lorem ipsum dolor</Link>
									</li>
									<li>
										<Link href="">Lorem ipsum dolor</Link>
									</li>
									<li>
										<Link href="">Lorem ipsum dolor</Link>
									</li>
								</ul>
							</div>
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
									title='Hello World'
									subtitle='Last updated May 06, 2025'
									text='<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum ullamcorper sapien a finibus. Sed ultrices arcu eget porta bibendum. Cras elit tortor, vehicula eu consequat scelerisque, laoreet vel metus.</p>'
									buttons={[
										{
											url: '#',
											text: 'Lorem ipsum'
										},
										{
											url: '#',
											text: 'Lorem ipsum'
										}
									]}
								/>
								<Contents
									text={`
										<h2>Lorem ipsum dolor sit amet</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum ullamcorper sapien a finibus.</p>
										<h2>Lorem ipsum dolor sit amet</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum ullamcorper sapien a finibus.</p>
										<ul>
											<li>Lorem ipsum</li>
											<li>Lorem ipsum</li>
											<li>Lorem ipsum</li>
										</ul>
										<ol>
											<li>Lorem ipsum</li>
											<li>Lorem ipsum</li>
											<li>Lorem ipsum</li>
										</ol>
										<code data-language="html">
											<div class="super-saiyan">
												<p>bonjour</p>
											</div>
										</code>
										<div class="notice">
											<h3>Lorem ipsum</h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum ullamcorper sapien a finibus.</p>
											<ul>
												<li>Lorem ipsum</li>
												<li>Lorem ipsum</li>
												<li>Lorem ipsum</li>
											</ul>
										</div>
										<h2>Lorem ipsum dolor sit amet</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum ullamcorper sapien a finibus.</p>
										<h2>Lorem ipsum dolor sit amet</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum ullamcorper sapien a finibus.</p>
									`}
								/>
							</div>
						</article>
						<aside>
							<div className="inner">
								<div className="item">
									<ul>
										<li>
											<Link href="">Lorem ipsum dolor</Link>
										</li>
										<li>
											<Link href="">Lorem ipsum dolor</Link>
										</li>
										<li>
											<Link href="">Lorem ipsum dolor</Link>
										</li>
									</ul>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</>
	);
	
}

export default Docs;