<?php

add_action('rest_api_init', function(){

    register_rest_route('siterapide/v1', 'stripe', [
        'methods' => 'POST',
        'callback' => function(){

            require_once 'composer/vendor/autoload.php';

            // Set your secret key. Remember to switch to your live secret key in production.
            // See your keys here: https://dashboard.stripe.com/apikeys
            \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);

            // If you are testing your webhook locally with the Stripe CLI you
            // can find the endpoint's secret by running `stripe listen`
            // Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
            $endpoint_secret = STRIPE_ENDPOINT_KEY;

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
                case 'customer.subscription.created':

                    $obj = $event->data->object;

                    $customer = $obj->customer;

                    try{

                        $stripe = new \Stripe\StripeClient(STRIPE_SECRET_KEY);
                        $customer = $stripe->customers->retrieve($customer, []);

                    } catch(\Stripe\Exception\CardException $e) {

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\RateLimitException $e) {

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\InvalidRequestException $e) {

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\AuthenticationException $e) {

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\ApiConnectionException $e) {

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\ApiErrorException $e) {

                        echo 'error';

                        exit;

                    } catch (Exception $e) {

                        echo 'error';

                        exit;

                    }

                    if(isset($customer->metadata->never_subscribed) && isset($customer->metadata->hubspot_deal) && $customer->metadata->never_subscribed === 'true'){


                        $hubspot = \HubSpot\Factory::createWithAccessToken(HUBSPOT_TOKEN_KEY);

                        $properties1 = [
                            'dealstage' => 'contractsent'
                        ];

                        $simplePublicObjectInput = new \HubSpot\Client\Crm\Deals\Model\SimplePublicObjectInput([
                            'properties' => $properties1,
                        ]);

                        try {

                            $stripe->customers->update(
                                $customer->id,
                                [
                                    'metadata' => [
                                        'never_subscribed' => 'false'
                                    ]
                                ]
                            );

                            $apiResponse = $hubspot->crm()->deals()->basicApi()->update($customer->metadata->hubspot_deal, $simplePublicObjectInput);
                            
                        } catch(\Stripe\Exception\CardException $e) {

                            echo 'error';

                            exit;

                        } catch (\Stripe\Exception\RateLimitException $e) {

                            echo 'error';

                            exit;

                        } catch (\Stripe\Exception\InvalidRequestException $e) {

                            echo 'error';

                            exit;

                        } catch (\Stripe\Exception\AuthenticationException $e) {

                            echo 'error';

                            exit;

                        } catch (\Stripe\Exception\ApiConnectionException $e) {

                            echo 'error';

                            exit;

                        } catch (\Stripe\Exception\ApiErrorException $e) {

                            echo 'error';

                            exit;

                        } catch (\HubSpot\Client\Crm\Deals\ApiException $e) {

                            echo 'error';

                            exit;

                        }

                    }


                    echo 'passed';

                    break;
                case 'invoice.payment_succeeded':


                    echo 'passed';

                    break;
                default:
                    echo 'Unknown event type :' . $event->type;
            }

            http_response_code(200);

        },
        'permission_callback' => '__return_true'
    ]);


    register_rest_route('siterapide/v1', 'hubspot-create-user', [
        'methods' => 'POST',
        'callback' => function(){

            $secret = HUBSPOT_CLIENT_KEY;
            $payload = @file_get_contents('php://input');
            $signature = $_SERVER['HTTP_X_HUBSPOT_SIGNATURE_V3'];
            $timestamp = $_SERVER['HTTP_X_HUBSPOT_REQUEST_TIMESTAMP'];

            
            $computed_signature = base64_encode(hash_hmac('sha256', 'POSThttps://moncompte.siterapide.ca/wp-json/siterapide/v1/hubspot-create-user'.$payload.$timestamp, $secret, true));

            
            if ($computed_signature !== $signature) {

                http_response_code(401);
                echo 'Signature invalide';

                exit;

            }

            
            $data = json_decode($payload, true);

            foreach ($data as $event) {
                if (
                    $event['subscriptionType'] === 'deal.propertyChange'

                    &&

                    $event['propertyName'] === 'dealstage'

                    &&

                    $event['propertyValue'] == '1483456458'
                ) {

                    require_once 'composer/vendor/autoload.php';


                    $dealId = $event['objectId'];
                    $customer = null;


                    $hubspot = \HubSpot\Factory::createWithAccessToken(HUBSPOT_TOKEN_KEY);

                    $publicFetchAssociationsBatchRequest1 = new \HubSpot\Client\Crm\Associations\V4\Model\PublicFetchAssociationsBatchRequest([
                        'id' => $dealId
                    ]);

                    $batchInputPublicFetchAssociationsBatchRequest = new \HubSpot\Client\Crm\Associations\V4\Model\BatchInputPublicFetchAssociationsBatchRequest([
                        'inputs' => [$publicFetchAssociationsBatchRequest1],
                    ]);

                    try {

                        $assoResponse = json_decode($hubspot->crm()->associations()->v4()->batchApi()->getPage('deals', 'contacts', $batchInputPublicFetchAssociationsBatchRequest), true);
                        $contactID = $assoResponse['results'][0]['to'][0]['toObjectId'];

                        $contactResponse = json_decode($hubspot->crm()->contacts()->basicApi()->getById($contactID, false, ['firstname', 'lastname', 'email', 'phone', 'company']), true);

                        $contactFirstname = $contactResponse['propertiesWithHistory']['firstname'][0]['value'];
                        $contactLastname = $contactResponse['propertiesWithHistory']['lastname'][0]['value'];
                        $contactEmail = $contactResponse['propertiesWithHistory']['email'][0]['value'];
                        $contactPhone = $contactResponse['propertiesWithHistory']['phone'][0]['value'];
                        $contactCompany = $contactResponse['propertiesWithHistory']['company'][0]['value'];

                    } catch (\HubSpot\Client\Crm\Associations\V4\ApiException $e) {

                        echo $e->getMessage();

                        exit;

                    } catch (\HubSpot\Client\Crm\Contacts\ApiException $e) {

                        echo $e->getMessage();

                        exit;

                    }



                    $userExists = get_user_by('email', $contactEmail);

                    if($userExists){

                        echo 'passed';

                        http_response_code(200);

                        exit;

                    }


                    try{

                        $stripe = new \Stripe\StripeClient(STRIPE_SECRET_KEY);

                        $customer = $stripe->customers->create([
                            'name' => $contactFirstname . ' ' . $contactLastname,
                            'email' => $contactEmail,
                            'phone' => $contactPhone,
                            'metadata' => [
                                'company' => $contactCompany,
                                'hubspot_contact' => $contactID,
                                'hubspot_deal' => $dealId,
                                'never_subscribed' => 'true'
                            ]
                        ]);


                        $fakePassword = hash_hmac('sha256', $contactEmail . ':' . time(), getenv('SECRET_SALT'));

                        $wpUserID = wp_insert_user([
                            'first_name' => $contactFirstname,
                            'last_name' => $contactLastname,
                            'user_login' => str_replace('cus_', '', $customer->id),
                            'user_email' => $contactEmail,
                            'user_pass' => $fakePassword,
                            'role' => 'member'
                        ]);

                        update_field('field_683432a005d33', $customer->id, 'user_' . $wpUserID);
                        update_field('field_683432b605d34', $phone, 'user_' . $wpUserID);
                        update_field('field_683432d705d35', $company, 'user_' . $wpUserID);

                    } catch(\Stripe\Exception\CardException $e) {

                        if($customer){
                            $stripe->customers->delete($customer->id, []);
                        }

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\RateLimitException $e) {

                        if($customer){
                            $stripe->customers->delete($customer->id, []);
                        }

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\InvalidRequestException $e) {

                        if($customer){
                            $stripe->customers->delete($customer->id, []);
                        }

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\AuthenticationException $e) {

                        if($customer){
                            $stripe->customers->delete($customer->id, []);
                        }

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\ApiConnectionException $e) {

                        if($customer){
                            $stripe->customers->delete($customer->id, []);
                        }

                        echo 'error';

                        exit;

                    } catch (\Stripe\Exception\ApiErrorException $e) {

                        if($customer){
                            $stripe->customers->delete($customer->id, []);
                        }

                        echo 'error';

                        exit;

                    } catch (Exception $e) {

                        if($customer){
                            $stripe->customers->delete($customer->id, []);
                        }

                        echo 'error';

                        exit;

                    }


                    $headers = [];
                    $headers[] = 'MIME-Version: 1.0';
                    $headers[] = 'Content-type: text/html; charset=utf-8';
                    $headers[] = 'From: siterapide.ca <nepasrepondre@siterapide.ca>';


                    $to = 'info@siterapide.ca';

                    $subject = 'Nouveau client';

                    $body = '
                        <html>
                            <head>
                                <title>'. $subject .'</title>
                            </head>
                            <body>
                                <p>Bonjour,</p>
                                <p style="margin-top: 8px;">'. $contactFirstname . ' ' . $contactLastname .' a été ajouté comme client Stripe et utilisateur WordPress.</p>
                                <p style="margin-top: 8px;">Vous pouvez maintenant créer son abonnement. Lorsque la facture de l\'abonnement sera envoyée par le système, sa position dans le pipeline de Hubspot changera automatiquement.</p>
                            </body>
                        </html>
                    ';

                    wp_mail($to, $subject, $body, implode("\r\n", $headers));
                }
            }

            http_response_code(200);
            echo 'passed';

        },
        'permission_callback' => '__return_true'
    ]);

});