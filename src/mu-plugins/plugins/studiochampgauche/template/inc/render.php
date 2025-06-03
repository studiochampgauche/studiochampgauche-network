<?php
    
namespace Siterapide\Render;

class Render{
    
    public static $wp_heads = [];
    
    function __construct(){

		
		/*
		* Display ACF Admin Elements
		*/
		add_action('init', [$this, 'acf']);
        
    }
    
	
	public function acf(){

		$langs = \rwp::field('langs', 'option');

		$agencyCopyrightFields = [];

		if($langs){

			foreach ($langs as $k => $v) {
				
				$agencyCopyrightFields[] = [
					array(
	                    'key' => 'field_67shjh28023hnbdo376' . $v['code'],
	                    'label' => $v['name'],
	                    'name' => '',
	                    'aria-label' => '',
	                    'type' => 'tab',
	                    'instructions' => '',
	                    'required' => 0,
	                    'conditional_logic' => 0,
	                    'wrapper' => array(
	                        'width' => '',
	                        'class' => '',
	                        'id' => '',
	                    ),
	                    'placement' => 'top',
	                    'endpoint' => 0,
	                    'selected' => 0
	                ),
	                array(
	                    'key' => 'field_678bcjk2kjnbg98032657cb3280' . $v['code'],
	                    'label' => (CL === 'fr' ? 'Texte (' . $v['code'] . ')' : 'Text (' . $v['code'] . ')'),
	                    'name' => 'text_' . $v['code'],
	                    'aria-label' => '',
	                    'type' => 'text',
	                    'instructions' => '',
	                    'required' => 0,
	                    'conditional_logic' => 0,
	                    'wrapper' => array(
	                        'width' => '50',
	                        'class' => '',
	                        'id' => '',
	                    ),
	                    'default_value' => '',
	                    'maxlength' => '',
	                    'allow_in_bindings' => 0,
	                    'placeholder' => '',
	                    'prepend' => '',
	                    'append' => ''
	                ),
	                array(
	                    'key' => 'field_678bcjk2kjnbgs923ybd0230' . $v['code'],
	                    'label' => 'URL (' . $v['code'] . ')',
	                    'name' => 'url_' . $v['code'],
	                    'aria-label' => '',
	                    'type' => 'text',
	                    'instructions' => '',
	                    'required' => 0,
	                    'conditional_logic' => 0,
	                    'wrapper' => array(
	                        'width' => '50',
	                        'class' => '',
	                        'id' => '',
	                    ),
	                    'default_value' => '',
	                    'maxlength' => '',
	                    'allow_in_bindings' => 0,
	                    'placeholder' => '',
	                    'prepend' => '',
	                    'append' => ''
	                )
				];

			}

			$agencyCopyrightFields = call_user_func_array('array_merge', $agencyCopyrightFields);

		}

		/*
		* Add Status field in Site settings (not theme settings)
		*/
		acf_add_local_field_group( array(
			'key' => 'group_67a32c6630e4a',
			'title' => 'Statut',
			'fields' => array(
				array(
					'key' => 'field_67a32c666fe1f',
					'label' => 'Statut',
					'name' => 'status',
					'aria-label' => '',
					'type' => 'select',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '33.3333333333',
						'class' => '',
						'id' => '',
					),
					'choices' => array(
						'active' => 'Actif',
						'past_due' => 'Paiement en retard',
						'unpaid' => 'Impayé',
					),
					'default_value' => false,
					'return_format' => 'value',
					'multiple' => 0,
					'allow_null' => 0,
					'allow_in_bindings' => 0,
					'ui' => 0,
					'ajax' => 0,
					'placeholder' => '',
				),
				array(
					'key' => 'field_67sj30h3n32991ghjmds9923h',
					'label' => 'Package',
					'name' => 'package',
					'aria-label' => '',
					'type' => 'select',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '33.3333333333',
						'class' => '',
						'id' => '',
					),
					'choices' => array(
						'none' => 'Aucun',
						'multi_pages' => 'Multi-pages',
						'multi_sections' => 'Multi-sections',
						'small_budget' => 'Petit budget'
					),
					'default_value' => 'none',
					'return_format' => 'value',
					'multiple' => 0,
					'allow_null' => 0,
					'allow_in_bindings' => 0,
					'ui' => 0,
					'ajax' => 0,
					'placeholder' => '',
				),
				array(
                    'key' => 'field_67s9983271gy90h4378hbrf',
                    'label' => 'Google Analytics Code',
                    'name' => 'ga_code',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '33.3333333333',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'allow_in_bindings' => 0,
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => ''
                ),
			),
			'location' => array(
				array(
					array(
						'param' => 'options_page',
						'operator' => '==',
						'value' => 'site-settings',
					),
				),
			),
			'menu_order' => -2,
			'position' => 'acf_after_title',
			'style' => 'seamless',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen' => '',
			'active' => true,
			'description' => '',
			'show_in_rest' => 0,
		) );


		/*
		* Add agency copyright
		*/
		acf_add_local_field_group( array(
			'key' => 'group_67a32c66asdj23781f234ba',
			'title' => 'Agency Copyright',
			'fields' => [
				array(
					'key' => 'field_6sdgh390fhn32f0d',
					'label' => 'Agency Copyright',
					'name' => 'agency_copyright',
					'aria-label' => '',
					'type' => 'group',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'layout' => 'block',
					'sub_fields' => [...$agencyCopyrightFields],
				)
			],
			'location' => array(
				array(
					array(
						'param' => 'options_page',
						'operator' => '==',
						'value' => 'site-settings',
					),
				),
			),
			'menu_order' => -1,
			'position' => 'acf_after_title',
			'style' => 'seamless',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen' => '',
			'active' => true,
			'description' => '',
			'show_in_rest' => 0,
		) );
		

	}
    
}

new Render();