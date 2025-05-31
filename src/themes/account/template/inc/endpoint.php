<?php

add_action('rest_api_init', function(){

    register_rest_route('siterapide/v1', 'subscription-update', [
        'methods' => 'POST',
        'callback' => function(){

            require_once 'composer/vendor/autoload.php';

            // Set your secret key. Remember to switch to your live secret key in production.
            // See your keys here: https://dashboard.stripe.com/apikeys
            \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);

            // If you are testing your webhook locally with the Stripe CLI you
            // can find the endpoint's secret by running `stripe listen`
            // Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
            $endpoint_secret = STRIPE_ENDPOINT_SUBUPDATE_KEY;

            $payload = @file_get_contents('php://input');
            $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
            $event = null;

            try {
                $event = \Stripe\Webhook::constructEvent(
                    $payload, $sig_header, $endpoint_secret
                );
            } catch(\UnexpectedValueException $e) {

                // Invalid payload
                http_response_code(400);
                echo json_encode(['Error parsing payload: ' => $e->getMessage()]);

                exit;

            } catch(\Stripe\Exception\SignatureVerificationException $e) {

                // Invalid signature
                http_response_code(400);
                echo json_encode(['Error verifying webhook signature: ' => $e->getMessage()]);

                exit;

            }

            // Handle the event
            switch ($event->type) {
                case 'customer.subscription.updated':

                    $obj = $event->data->object;

                    if(isset($obj->metadata->domain) || isset($obj->metadata->sub_domain)){

                        $main_site = get_blog_details(['domain' => $obj->metadata->domain]);
                        $site = $main_site ? $main_site : get_blog_details(['domain' => $obj->metadata->sub_domain]);

                        if($site){
                            
                            switch_to_blog($site->blog_id);

                            if(in_array($obj->status, ['active', 'past_due', 'unpaid'])){

                                update_field('field_67a32c666fe1f', $obj->status, 'option');

                            }

                            restore_current_blog();
                        }

                    }

                    echo 'Passed';

                    break;
                default:
                    echo 'Unknown event type :' . $event->type;
            }

            http_response_code(200);

        },
        'permission_callback' => '__return_true'
    ]);

    /*register_rest_route('siterapide/v1', 'invoice-upcoming', [
        'methods' => 'POST',
        'callback' => function(){



        },
        'permission_callback' => '__return_true'
    ]);*/

});