<?php

/*
* Connect user
*/
add_action('wp_ajax_nopriv_connexion', function(){


    $data = $_POST;

    $keys = [
        'action',
        'email',
        'password',
    ];

    if(count($data) !== count($keys)) return;
    
    foreach ($keys as $key) {

        if(!isset($data[$key])) return;

        $data[$key] = !is_array($data[$key]) ? wp_strip_all_tags($data[$key]) : $data[$key];

        if(is_array($data[$key]) && $data[$key]){

            foreach($data[$key] as $k => $d){

                $data[$key][$k] = wp_strip_all_tags($d);

            }

        }

    }

    
    $email = $data['email'];
    $password = $data['password'];
    
    if(

        !filter_var($email, FILTER_VALIDATE_EMAIL)

        ||

        !preg_match('/[A-Z]/', $password)

        ||

        !preg_match('/[0-9]/', $password)

        ||

        !preg_match('/[!@#$%^&*()\-\+={}[\]:;"\'<>,.?\/|\\\\]/', $password)

        ||

        strlen($password) < 8

        ||

        strlen($password) > 25
        
    ) return;


    $creds = [
        'user_login'    => $email,
        'user_password' => $password,
        'remember'      => true,
    ];

    $user = wp_signon($creds, false);


    if (is_wp_error($user)) {
        
        echo wp_json_encode([
            'status' => 'error',
            'message' => str_replace([' Vérifiez l\'orthographe ou essayez avec votre identifiant.', ' Mot de passe oublié?'], '', wp_strip_all_tags($user->get_error_message()))
        ]);

    } else {
        
        echo wp_json_encode([
            'status' => 'success',
            'message' => 'Connexion réussie. Un instant s\'il vous plait.'
        ]);

    }

    exit;

});


/*
* Disconnect user
*/
add_action('wp_ajax_disconnect', function(){


    $data = $_POST;

    $keys = [
        'action',
    ];

    if(count($data) !== count($keys)) return;

    wp_logout();

    echo wp_json_encode([
        'status' => 'success',
        'message' => 'Déconnexion réussie.'
    ]);

    exit;

});


/*
* Recover user
*/
add_action('wp_ajax_nopriv_recover', function(){


    $data = $_POST;

    $keys = [
        'action',
        'email'
    ];

    if(count($data) !== count($keys)) return;
    
    foreach ($keys as $key) {

        if(!isset($data[$key])) return;

        $data[$key] = !is_array($data[$key]) ? wp_strip_all_tags($data[$key]) : $data[$key];

        if(is_array($data[$key]) && $data[$key]){

            foreach($data[$key] as $k => $d){

                $data[$key][$k] = wp_strip_all_tags($d);

            }

        }

    }

    
    $email = $data['email'];
    
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) return;

    $user = get_user_by('email', $email);

    if(!$user){

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Ce courriel n\'existe pas.'
        ]);


        exit;

    }



    $time = time();
    $code = hash_hmac('sha256', rwp::field('customer_stripe_id', 'user_' . $user->ID) . ':' . $time, getenv('SECRET_SALT'));

    update_field('field_683433d205d3d', [
        'code' => $code,
        'time' => $time
    ], 'user_' . $user->ID);


    /*
    * Send email to user
    */
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';


    $to = $email;

    $subject = 'Récupérez votre mot de passe';

    $body = '
        <html>
            <head>
                <title>'. $subject .'</title>
            </head>
            <body>
                <p style="margin-bottom: 8px;">'. ($user->user_firstname ? 'Bonjour ' . $user->user_firstname : 'Bonjour') .',</p>
                <p style="margin-bottom: 8px;">Vous avez fait une demande de réinitialisation de mot de passe, voici le lien à suivre: '. home_url('/change-mdp/') .'</p>
                <p style="margin-bottom: 8px;">Et le code à entrer: '. $code .'</p>
                <p style="margin-bottom: 14px;">Si vous n\'avez pas fait cette demande, contactez-nous.</p>
            </body>
        </html>
    ';


    if(wp_mail($to, $subject, $body, implode("\r\n", $headers))){

        echo wp_json_encode([
            'status' => 'success',
            'message' => 'Vérifier vos courriels.'
        ]);

    } else {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Une erreur s\'est produite. S\'il vous plait, réessayez. Si cela continue, contactez-nous.'
        ]);

    }


    exit;

});


/*
* Recover user last step
*/
add_action('wp_ajax_nopriv_recover-last-step', function(){


    $data = $_POST;

    $keys = [
        'action',
        'email',
        'code',
        'password',
        'password_confirmation',
    ];

    if(count($data) !== count($keys)) return;
    
    foreach ($keys as $key) {

        if(!isset($data[$key])) return;

        $data[$key] = !is_array($data[$key]) ? wp_strip_all_tags($data[$key]) : $data[$key];

        if(is_array($data[$key]) && $data[$key]){

            foreach($data[$key] as $k => $d){

                $data[$key][$k] = wp_strip_all_tags($d);

            }

        }

    }

    
    $email = $data['email'];
    $code = $data['code'];
    $password = $data['password'];
    $password_confirmation = $data['password_confirmation'];
    
    if(

        !filter_var($email, FILTER_VALIDATE_EMAIL)

        ||

        $password !== $password_confirmation

        ||

        !preg_match('/[A-Z]/', $password)

        ||

        !preg_match('/[0-9]/', $password)

        ||

        !preg_match('/[!@#$%^&*()\-\+={}[\]:;"\'<>,.?\/|\\\\]/', $password)

        ||

        strlen($password) < 8

        ||

        strlen($password) > 25
        
    ) return;


    $user = get_user_by('email', $email);

    if (!$user) {
        
        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Ce courriel n\'existe pas.'
        ]);

        exit;

    }

    $recoveryInfo = rwp::field('recovery', 'user_' . $user->ID);

    if(!isset($recoveryInfo['code']) || !isset($recoveryInfo['time'])){

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'S\'il vous plait, recommencez le processus.'
        ]);

        exit;

    }

    $codeToCompare = hash_hmac('sha256', rwp::field('customer_stripe_id', 'user_' . $user->ID) . ':' . $recoveryInfo['time'], getenv('SECRET_SALT'));

    if(
        $code !== $recoveryInfo['code']

        ||

        $code !== $codeToCompare
    ){

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Mauvais code.'
        ]);

        exit;

    }


    if(time() - (int)$recoveryInfo['time'] >= (HOUR_IN_SECONDS / 2)){

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Code expiré. Vous devez faire une nouvelle demande.'
        ]);

        exit;

    }

    update_field('field_683433d205d3d', [
        'code' => '',
        'time' => ''
    ], 'user_' . $user->ID);

    wp_set_password($password, $user->ID);

    echo wp_json_encode([
        'status' => 'success',
        'message' => 'Mot de passe changé.'
    ]);


    /*
    * Send email to user
    */
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';


    $to = $user->user_email;

    $subject = 'Mot de passe mis à jour';

    $body = '
        <html>
            <head>
                <title>'. $subject .'</title>
            </head>
            <body>
                <p style="margin-bottom: 8px;">'. ($user->user_firstname ? 'Bonjour ' . $user->user_firstname : 'Bonjour') .',</p>
                <p style="margin-bottom: 8px;">Votre mot de passe a été mis à jour.</p>
            </body>
        </html>
    ';

    wp_mail($to, $subject, $body, implode("\r\n", $headers));


    exit;

});


/*
* Edit contact
*/
add_action('wp_ajax_edit-contact', function(){


    $data = $_POST;

    $keys = [
        'action',
        'firstname',
        'lastname',
        'company',
        'email',
        'phone',
    ];

    if(count($data) !== count($keys)) return;
    
    foreach ($keys as $key) {

        if(!isset($data[$key]) || !is_string($data[$key])) return;

        $data[$key] = wp_strip_all_tags($data[$key]);

    }

    
    $firstname = $data['firstname'];
    $lastname = $data['lastname'];
    $company = $data['company'];
    $email = $data['email'];
    $phone = $data['phone'];

    
    if(
        strlen($firstname) < 3

        ||

        strlen($firstname) > 25

        ||

        str_word_count($firstname) > 3

        ||

        strlen($lastname) < 3

        ||

        strlen($lastname) > 25

        ||

        str_word_count($lastname) > 3

        ||

        strlen($company) < 3

        ||

        strlen($company) > 25

        ||

        str_word_count($company) > 3

        ||

        !filter_var($email, FILTER_VALIDATE_EMAIL)

        ||

        !preg_match('/^\(\d{3}\) \d{3}-\d{4}$/', $phone)
        
    ) return;

    require_once 'composer/vendor/autoload.php';

    $userID = get_current_user_id();
    $customer_stripe_id = rwp::field('customer_stripe_id', 'user_' . $userID);

    try{

        $stripe = new \Stripe\StripeClient(STRIPE_SECRET_KEY);

        $customer = $stripe->customers->update(
            $customer_stripe_id,
            [
                'name' => $firstname . ' ' . $lastname,
                'email' => $email,
                'phone' => $phone,
                'metadata' => ['company' => $company]
            ]
        );

    } catch(\Stripe\Exception\CardException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\RateLimitException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\InvalidRequestException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\AuthenticationException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\ApiConnectionException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\ApiErrorException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (Exception $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    }

    $args = [
        'ID' => $userID,
        'first_name' => $firstname,
        'last_name' => $lastname,
        'user_email' => $email,
    ];

    $user = wp_update_user($args);

    $args['company'] = $company;
    $args['phone'] = $phone;
        
    update_field('field_683432d705d35', $company, 'user_' . $userID);
    update_field('field_683432b605d34', $phone, 'user_' . $userID);

    echo wp_json_encode([
        'status' => 'success',
        'message' => 'Informations de contact sauvegardées.',
        'args' => $args
    ]);


    $user = wp_get_current_user();

    /*
    * Send email to user
    */
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';


    $to = $email;

    $subject = 'Informations de contact mis à jour';

    $body = '
        <html>
            <head>
                <title>'. $subject .'</title>
            </head>
            <body>
                <p style="margin-bottom: 8px;">Bonjour '. $firstname .',</p>
                <p style="margin-bottom: 8px;">Vos informations de contact ont été mis à jour.</p>
            </body>
        </html>
    ';

    wp_mail($to, $subject, $body, implode("\r\n", $headers));


    exit;

});


/*
* Edit password
*/
add_action('wp_ajax_edit-password', function(){


    $data = $_POST;

    $keys = [
        'action',
        'password',
        'password_confirmation',
    ];

    if(count($data) !== count($keys)) return;
    
    foreach ($keys as $key) {

        if(!isset($data[$key]) || !is_string($data[$key])) return;

        $data[$key] = wp_strip_all_tags($data[$key]);

    }

    
    $password = $data['password'];
    $password_confirmation = $data['password_confirmation'];

    
    if(
        $password !== $password_confirmation

        ||

        !preg_match('/[A-Z]/', $password)

        ||

        !preg_match('/[0-9]/', $password)

        ||

        !preg_match('/[!@#$%^&*()\-\+={}[\]:;"\'<>,.?\/|\\\\]/', $password)

        ||

        strlen($password) < 8

        ||

        strlen($password) > 25
        
    ) return;


    $user = wp_get_current_user();

    wp_set_password($password, $user->ID);


    echo wp_json_encode([
        'status' => 'success',
        'message' => 'Mot de passe changé.'
    ]);


    /*
    * Send email to user
    */
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';


    $to = $user->user_email;

    $subject = 'Mot de passe mis à jour';

    $body = '
        <html>
            <head>
                <title>'. $subject .'</title>
            </head>
            <body>
                <p style="margin-bottom: 8px;">'. ($user->user_firstname ? 'Bonjour ' . $user->user_firstname : 'Bonjour') .',</p>
                <p style="margin-bottom: 8px;">Votre mot de passe a été mis à jour.</p>
            </body>
        </html>
    ';

    wp_mail($to, $subject, $body, implode("\r\n", $headers));

    exit;

});


/*
* Edit billing addr
*/
add_action('wp_ajax_edit-billing-addr', function(){


    $data = $_POST;

    $keys = [
        'action',
        'line1',
        'line2',
        'city',
        'province',
        'postal_code',
    ];

    if(count($data) !== count($keys)) return;
    
    foreach ($keys as $key) {

        if(!isset($data[$key]) || !is_string($data[$key])) return;

        $data[$key] = wp_strip_all_tags($data[$key]);

    }

    
    $line1 = $data['line1'];
    $line2 = $data['line2'];
    $city = $data['city'];
    $province = $data['province'];
    $postal_code = $data['postal_code'];


    $countLine1 = preg_match_all('/\b\w+\b/', $line1, $words);
    $countLine1 = count($words[0]);

    
    if(
        strlen($line1) < 3

        ||

        strlen($line1) > 60

        ||

        $countLine1 < 2

        ||

        (
            $line2

            &&

            (
                strlen($line2) < 2

                ||

                strlen($line2) > 60

                ||

                str_word_count($line2) > 5
            )
        )

        ||

        strlen($city) < 3

        ||

        str_word_count($city) > 7

        ||

        !in_array($province, ['AB', 'BC', 'PE', 'MB', 'NB', 'NS', 'ON', 'QC', 'SK', 'NL', 'NU', 'NT', 'YT'])

        ||

        !preg_match('/^[A-Z]\d[A-Z] \d[A-Z]\d$/', $postal_code)
        
    ) return;


    require_once 'composer/vendor/autoload.php';

    $user = wp_get_current_user();
    $customer_stripe_id = rwp::field('customer_stripe_id', 'user_' . $user->ID);

    try{

        $stripe = new \Stripe\StripeClient(STRIPE_SECRET_KEY);

        $customer = $stripe->customers->update(
            $customer_stripe_id,
            [
                'address' => [
                    'line1' => $line1,
                    'line2' => $line2,
                    'city' => $city,
                    'state' => $province,
                    'country' => 'CA',
                    'postal_code' => $postal_code
                ]
            ]
        );

    } catch(\Stripe\Exception\CardException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\RateLimitException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\InvalidRequestException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\AuthenticationException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\ApiConnectionException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (\Stripe\Exception\ApiErrorException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    } catch (Exception $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

        exit;

    }

    $args = [
        'line1' => $line1,
        'line2' => $line2,
        'city' => $city,
        'province' => $province,
        'postal_code' => $postal_code,
        'country' => 'CA'
    ];

    update_field('field_6834330405d36', $args, 'user_' . $user->ID);


    echo wp_json_encode([
        'status' => 'success',
        'message' => 'Adresse sauvegardée.',
        'addr' => $args
    ]);


    /*
    * Send email to user
    */
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';


    $to = $user->user_email;

    $subject = 'Adresse de facturation mise à jour';

    $body = '
        <html>
            <head>
                <title>'. $subject .'</title>
            </head>
            <body>
                <p style="margin-bottom: 8px;">'. ($user->user_firstname ? 'Bonjour ' . $user->user_firstname : 'Bonjour') .',</p>
                <p style="margin-bottom: 8px;">Votre adresse de facturation a été mise à jour.</p>
            </body>
        </html>
    ';

    wp_mail($to, $subject, $body, implode("\r\n", $headers));


    exit;

});


/*
* Support request
*/
add_action('wp_ajax_support', function(){


    $data = $_POST;

    $keys = [
        'action',
        'subject',
        'message'
    ];

    if(count($data) !== count($keys)) return;
    
    foreach ($keys as $key) {

        if(!isset($data[$key]) || !is_string($data[$key])) return;

        $data[$key] = wp_strip_all_tags($data[$key]);

    }

    
    $s = $data['subject'];
    $m = $data['message'];

    
    if(

        str_word_count($s) < 3

        ||

        str_word_count($m) < 5
        
    ) return;

    $user = wp_get_current_user();

    /*
    * Send email to admin
    */
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';


    $to = 'support@siterapide.ca';

    $code = time() . 'ABCDEFGHIJKLMNOPQRSTUVQXYZ1234567890';
    $code = str_shuffle($code);
    $code = substr($code, 0, 12);
    $code = str_shuffle($code);

    $subject = 'Demande de support ['. $code .']';

    $body = '
        <html>
            <head>
                <title>'. $subject .'</title>
            </head>
            <body>
                <p style="margin-bottom: 8px;"><strong>Sujet&#8293;:</strong> '. $s .'</p>
                <p><strong>Message&#8293;:</strong></p>
                '. nl2br($m) .'
                <p style="margin-top: 8px;"><strong>Nom&#8293;:</strong> '. $user->user_firstname . ' ' . $user->user_lastname .'</p>
                <p style="margin-top: 8px;"><strong>Courriel du contact&#8293;:</strong> '. $user->user_email .'</p>
                <p style="margin-top: 8px;"><strong>Stripe customer&#8293;:</strong> '. rwp::field('customer_stripe_id', 'user_' . $user->ID) .'</p>
                <p style="margin-top: 8px;"><strong>ID&#8293;:</strong> '. $user->ID .'</p>
            </body>
        </html>
    ';

    if(wp_mail($to, $subject, $body, implode("\r\n", $headers))){

        echo wp_json_encode([
            'status' => 'success',
            'message' => 'Message envoyé.'
        ]);


        /*
        * Send email to user
        */
        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';


        $to = $user->user_email;

        $subject = 'Demande de support ['. $code .']';

        $body = '
            <html>
                <head>
                    <title>'. $subject .'</title>
                </head>
                <body>
                    <p style="margin-bottom: 8px;">'. ($user->user_firstname ? 'Bonjour ' . $user->user_firstname : 'Bonjour') .',</p>
                    <p style="margin-bottom: 8px;">Votre demande de support a bien été reçu. Voici un récapitulatif:</p>
                    <p style="margin-bottom: 14px;"><strong>Sujet&#8293;:</strong> '. $s .'</p>
                    <p><strong>Message&#8293;:</strong></p>
                    '. nl2br($m) .'
                </body>
            </html>
        ';

        wp_mail($to, $subject, $body, implode("\r\n", $headers));

    } else {

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Erreur. S\'il vous plait, réessayez.'
        ]);

    }

    exit;

});


/*
* Affiliates form
*/
add_action('wp_ajax_affiliates', function(){


    $data = $_POST;

    $keys = [
        'action',
        'firstname',
        'lastname',
        'email',
        'phone',
        'company',
        'package'
    ];

    if(count($data) !== count($keys)) return;
    
    foreach ($keys as $key) {

        if(!isset($data[$key]) || !is_string($data[$key])) return;

        $data[$key] = wp_strip_all_tags($data[$key]);

    }

    
    $user = wp_get_current_user();

    $firstname = $data['firstname'];
    $lastname = $data['lastname'];
    $email = $data['email'];
    $phone = $data['phone'];
    $company = $data['company'];
    $package = $data['package'];

    
    if(
        strlen($firstname) < 3

        ||

        strlen($firstname) > 25

        ||

        str_word_count($firstname) > 3

        ||

        strlen($lastname) < 3

        ||

        strlen($lastname) > 25

        ||

        str_word_count($lastname) > 3

        ||

        strlen($company) < 3

        ||

        strlen($company) > 25

        ||

        str_word_count($company) > 3

        ||

        !filter_var($email, FILTER_VALIDATE_EMAIL)

        ||

        !preg_match('/^\(\d{3}\) \d{3}-\d{4}$/', $phone)

        ||

        !in_array($package, ['multi-sections', 'multi-pages', 'small-budget'])

        ||

        !rwp::field('affiliates_active', 'user_' . $user->ID)
        
    ) return;


    /*
    * Check if new user exist
    */
    $newUser = get_user_by('email', $email);

    if($newUser){

        echo wp_json_encode([
            'status' => 'error',
            'message' => 'Cette utilisateur est déjà inscrit dans notre base de données. Vous devez nous contacter si vous voulez le référer.'
        ]);


        exit;

    }


    require_once 'composer/vendor/autoload.php';


    $hubspot = \HubSpot\Factory::createWithAccessToken(getenv('HUBSPOT_TOKEN'));

    $contactInput = new \HubSpot\Client\Crm\Contacts\Model\SimplePublicObjectInput();
    $contactInput->setProperties([
        'email' => $email,
        'firstname' => $firstname,
        'lastname' => $lastname,
        'phone' => $phone,
        'company' => $company
    ]);

    try{

        $contact = $hubspot->crm()->contacts()->basicApi()->create($contactInput);
        $contactId = $contact->getId();

    } catch (\HubSpot\Client\Crm\Contacts\ApiException $e) {

        echo wp_json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);

        exit;

    }


    $dealPrice = null;
    if($package === 'small-budget')
        $dealPrice = '499';
    elseif($package === 'multi-sections')
        $dealPrice = '499';
    elseif($package === 'multi-sections')
        $dealPrice = '799';


    $dealInput = new \HubSpot\Client\Crm\Deals\Model\SimplePublicObjectInput();
    $dealInput->setProperties([
        'dealname' => 'Deal pour ' . $firstname . ' ' . $lastname,
        'pipeline' => 'default',
        'dealstage' => 'qualifiedtobuy',
        'amount' => $dealPrice,
        'package' => $package
    ]);

    try {

        $deal = $hubspot->crm()->deals()->basicApi()->create($dealInput);
        $dealId = $deal->getId();

    } catch (\HubSpot\Client\Crm\Deals\ApiException $e) {

        echo wp_json_encode([
            'status'  => 'error',
            'message' => $e->getMessage()
        ]);

        exit;

    }


    $associationSpec1 = new \HubSpot\Client\Crm\Associations\V4\Model\AssociationSpec([
        'association_category' => 'HUBSPOT_DEFINED',
        'association_type_id' => 3
    ]);

    $from1 = new \HubSpot\Client\Crm\Associations\V4\Model\PublicObjectId([
        'id' => $dealId
    ]);

    $to1 = new \HubSpot\Client\Crm\Associations\V4\Model\PublicObjectId([
        'id' => $contactId
    ]);

    $publicAssociationMultiPost1 = new \HubSpot\Client\Crm\Associations\V4\Model\PublicAssociationMultiPost([
        'types' => [$associationSpec1],
        'from' => $from1,
        'to' => $to1
    ]);

    $batchInputPublicAssociationMultiPost = new \HubSpot\Client\Crm\Associations\V4\Model\BatchInputPublicAssociationMultiPost([
        'inputs' => [$publicAssociationMultiPost1],
    ]);

    try {

        $association = $hubspot->crm()->associations()->v4()->batchApi()->create('deals', 'contacts', $batchInputPublicAssociationMultiPost);

    } catch (\HubSpot\Client\Crm\Associations\V4\ApiException $e) {

        echo wp_json_encode([
            'status'  => 'error',
            'message' => $e->getMessage()
        ]);

        exit;

    }


    $affiliates = rwp::field('affiliates', 'user_' . $user->ID);

    $histories = $affiliates['history'] ? $affiliates['history'] : [];

    $package_slug = str_replace('-', '_', $package);

    $histories = array_merge([[
        'name' => $company,
        'package' => $package_slug,
        'assigned' => $affiliates['prices'][$package_slug],
        'status' => 'pending'
    ]], $histories);

    update_field('field_683e089579085', [
        'history' => $histories
    ], 'user_' . $user->ID);



    echo wp_json_encode([
        'status' => 'success',
        'message' => 'Ajouté avec succès.'
    ]);
    

    /*
    * Send emails
    */
    $mails = [
        [
            'subject' => 'Programme affilié',
            'body' => '
                <p style="margin-bottom: 8px;">Bonjour '. $user->user_firstname .',</p>
                <p style="margin-bottom: 8px;">'. $firstname . ' ' . $lastname .' a bien été ajouté à votre programme.</p>
            ',
            'to' => $user->user_email
        ],
        [
            'subject' => 'Vous avez un nouveau lead',
            'body' => '
                <p style="margin-bottom: 8px;">Bonjour,</p>
                <p style="margin-bottom: 8px;">Un nouveau lead est entré sur HubSpot.</p>
            ',
            'to' => 'info@siterapide.ca'
        ]
    ];

    foreach($mails as $mail){
        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';

        $body = '
            <html>
                <head>
                    <title>'. $mail['subject'] .'</title>
                </head>
                <body>'. $mail['body'] .'</body>
            </html>
        ';

        wp_mail($mail['to'], $mail['subject'], $body, implode("\r\n", $headers));
    }


    exit;

});