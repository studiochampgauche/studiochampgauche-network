<?php

/*
* Template Name: Documentation
*/

get_header();
while(have_posts()) : the_post();

$intro = rwp::field('intro');
$sidebarElements = rwp::field('docs_sidebar');

?>
<div class="docs">

	<div class="container">
		<div class="menu-btn">
			<span>Menu</span>
			<div class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M579-480 285-774q-15-15-14.5-35.5T286-845q15-15 35.5-15t35.5 15l307 308q12 12 18 27t6 30q0 15-6 30t-18 27L356-115q-15 15-35 14.5T286-116q-15-15-15-35.5t15-35.5l293-293Z"/></svg>
			</div>
		</div>
		<div class="sidebar">
			<div class="inner">
				<?php if($sidebarElements){ ?>
					<?php foreach($sidebarElements as $sidebarElement){ ?>

						<div class="item">
							<?php if($sidebarElement['group_name']){ ?>
								<div class="title">
									<span><?= $sidebarElement['group_name']; ?></span>
								</div>
							<?php } ?>
							<?php if($sidebarElement['items']){ ?>
								<ul>
									<?php foreach($sidebarElement['items'] as $item){ ?>
										<li>
											<a href="<?= $item['page']; ?>"><?= $item['name']; ?></a>
										</li>	
									<?php } ?>
								</ul>
							<?php } ?>
						</div>

					<?php } ?>
				<?php } ?>
			</div>
		</div>

		<div class="main-contents">
			<article>
				<div class="inner">
					<nav>
						<ul>
							<li>
								<a href="/docs/" data-discover="true">Home</a>
							</li>
						</ul>
					</nav>

					<?= displayContent(null, ($intro['title'] ? $intro['title'] : get_the_title()), ('Last updated ' . get_the_modified_date('l j F Y')), $intro['text'], $intro['buttons'], $titleTag = 'h1'); ?>
					<?= displayContent(null, null, null, rwp::field('contents')); ?>

				</div>
			</article>
		</div>
	</div>
</div>
<?php endwhile; get_footer();