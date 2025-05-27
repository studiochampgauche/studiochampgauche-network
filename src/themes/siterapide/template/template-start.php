<?php

/*
* Template Name: Start
*/

get_header();
while(have_posts()) : the_post();
?>

<section id="start__intro" className="intro">
	<div className="container">
		<?= displayContent(null, 'Prêt à <span>débuter</span> votre site ?', null, '<p>Vous avez un projet en tête ? Il est temps de passer à l’action ! En seulement 3 étapes simples, nous vous accompagnons dans la conception d’un site web professionnel, adapté à vos besoins.</p>', [], 'h1'); ?>
	</div>
</section>
<section id="start__steps">
	<div className="container">
		<div className="list">
			<div className="item">
				<div className="number">
					<span>1</span>
				</div>
				<?= displayContent(null, 'Prise de contact', null, '<p>Faites votre demande de contact via le formulaire ci-dessous.</p>'); ?>
			</div>
			<div className="item">
				<div className="number">
					<span>2</span>
				</div>
				<?= displayContent(null, 'Analyse des besoins', null, '<p>Un représentant vous contactera dans les 48h ouvrables.</p>'); ?>
			</div>
			<div className="item">
				<div className="number">
					<span>3</span>
				</div>
				<?= displayContent(null, 'Prêt en 30 jours*', null, '<p>*Déploiement rapide du site web avec la collaboration du client.</p>'); ?>
			</div>
		</div>
	</div>
</section>
<section id="start__form">
	<div className="container">
		<?= displayContent(null, 'Contactez-nous', null, '<p>Remplissez le formulaire et un représentant vous contactera dans les 48 heures ouvrables suivantes. Pour tout autres questions <a href="mailto:info@siterapide.ca">info@siterapide.ca</a></p>', [
			[
				'text' => 'Des questions ?',
				'href' => '/contact/'
			]
		]); ?>
	</div>
</section>

<?php endwhile; get_footer(); ?>