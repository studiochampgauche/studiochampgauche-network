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