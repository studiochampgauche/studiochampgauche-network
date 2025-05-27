<?php

/*
* Template Name: Contact
*/

get_header();
while(have_posts()) : the_post();
?>

<section id="contact__intro" className="intro">
	<div className="container">
		<?= displayContent(null, 'Vous désirez <span>nous joindre</span> ?', null, '<p>Contactez-nous dès maintenant pour découvrir nos forfaits, poser vos questions ou échanger avec un de nos représentants pour débuter une analyse de vos besoins.</p>', [], 'h1'); ?>
	</div>
</section>
<section id="contact__form">
	<div className="container">
		<?= displayContent(null, 'Contactez-nous', null, '<p>Remplissez le formulaire et un représentant vous contactera dans les 48 heures ouvrables suivantes.</p><ul><li><span>Questions&#8239;:</span><a href="mailto:info@siterapide.ca">info@siterapide.ca</a></li><li><span>Support&#8239;:</span><a href="mailto:support@siterapide.ca">support@siterapide.ca</a></li><li><span>Carrière&#8239;:</span><a href="mailto:cv@siterapide.ca">cv@siterapide.ca</a></li></ul>'); ?>
	</div>
</section>

<?php endwhile; get_footer(); ?>