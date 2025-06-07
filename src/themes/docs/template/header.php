<?php ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php wp_head(); ?>
</head>
<body>
	<noscript>You need to enable JavaScript to run this app.</noscript>
	<div id="viewport">

		<div id="loader"></div>

		<header>
			<div class="container">
				<div class="left">
					<a href="/">
						<?= file_get_contents(rwp::field('logo')); ?>
					</a>
					<div class="search">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path></svg>
					</div>
				</div>
				<div class="right">
					<nav>
						<?= rwp::menu('main_menu'); ?>
						<div class="ham-menu">
							<div class="bars">
								<div class="bar"></div>
								<div class="bar"></div>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
		
		<div id="pageWrapper">
			<div id="pageContent">
				<main id="app">