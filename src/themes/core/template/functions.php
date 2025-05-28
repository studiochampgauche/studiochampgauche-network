<?php

/*
* Enqueue styles & scripts
*/
add_action('wp_enqueue_scripts', function(){
	
	/*
	* CSS
	*/
	//wp_enqueue_style('core', get_template_directory_uri() . '/assets/css/core.min.css', null, null, null);


	/*
	* JS
	*/
	wp_enqueue_script('core', get_template_directory_uri() . '/assets/js/core.min.js', null, null, false);



	/*
    * Remove core script type attribute
    */
    add_filter('script_loader_tag', function($tag, $handle, $src){
        if($handle !== 'core')
            return $tag;

        $tag = '<script src="' . esc_url( $src ) . '" defer></script>';

        return $tag;

    } , 10, 3);

}, 9);

function force_HTTPS($content){

	return str_replace('http://', 'https://', $content);

}

function displayContent($uptitle = null, $title = null, $subtitle = null, $text = null, $buttons = [], $titleTag = 'h2', $className = null){

	if(!($uptitle || $title || $subtitle || $text || $buttons)) return;

	$html = '<div class="contents'. ($className ? ' ' . $className : null) .'">';
		$html .= '<div class="inner-contents">';
			if($uptitle)
				$html .= '<span class="uptitle">'. $uptitle .'</span>';

			elseif($title)
				$html .= '<'. $titleTag .'>'. $title .'</'. $titleTag .'>';

			elseif($subtitle)
				$html .= '<span class="subtitle">'. $subtitle .'</span>';

			elseif($text){

				$html .= '<rwp-wrap>';
					$html .= $text;
				$html .= '</rwp-wrap>';

			}

			elseif($buttons){

				$html .= '<div class="buttons">';

					$count = count($buttons);

					foreach($buttons as $k => $v){
						$html .= rwp::button($v['text'], [
							'href' => $v['href'],
							'target' => ($v['new_tab'] ? '_blank' : null),
							'class' =>( $k === 0 && $count > 1 ? 'full' : 'outline')
						]);
					}

				$html .= '</div>';

			}

		$html .= '</div>';
	$html .= '</div>';

	return $html;

}