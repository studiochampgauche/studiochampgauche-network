<?php

add_action('admin_init', function(){

    if (get_option('scg_roles_version') < 2) {

        /*
        * Remove default roles
        */
        remove_role('member');
        remove_role('subscriber');
        remove_role('contributor');
        remove_role('author');
        remove_role('editor');

        /*
        * Add role
        */
        add_role('member', 'Membre', [
            'read_private_pages' => true,
        ]);

        /*
        * Add role version
        */
        update_option('scg_roles_version', 2);

    }


});