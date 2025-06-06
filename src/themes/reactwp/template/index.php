<?php

get_header();
while(have_posts()) : the_post();

echo '<section id="h__intro"><div class="container"><div class="contents"><div class="inner-contents"><div class="buttons"><a class="btn" href="/docs/" data-discover="true" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0);"><span style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px); color: rgb(255, 255, 255);">Documentations</span></a></div></div></div></div></section>';

endwhile; get_footer();