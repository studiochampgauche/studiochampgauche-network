<?php

add_action('wp_enqueue_scripts', function(){


    /*
    * Forms
    */
    $formElements = rwp::cpt('form');

    $forms = [];
    if($formElements->posts){
        foreach($formElements->posts as $k => $v){

            $slug = rwp::field('slug', $v->ID);

            $forms[$slug]['fields'] = rwp::field('fields', $v->ID);
            $forms[$slug]['reset_button'] = rwp::field('reset_button', $v->ID);

            unset($forms[$slug]['slug']);

        }
    }
    wp_localize_script('core', 'FORMS', $forms);

    
});