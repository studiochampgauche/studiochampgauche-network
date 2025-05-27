<?php

add_action('wp_ajax_rwpforms', 'rwpforms');
add_action('wp_ajax_nopriv_rwpforms', 'rwpforms');
function rwpforms(){

    $data = [...$_POST, ...(isset($_FILES) ? $_FILES : [])];

    if(!isset($data['formSlug'])) return;

    $currentForm = rwp::cpt('form', [
        'meta_query' => [
            [
                'key' => 'slug',
                'value' => sanitize_text_field($data['formSlug']),
                'compare' => '='
            ]
        ]
    ]);

    if(!$currentForm->posts) return;
    
    $currentForm = $currentForm->posts[0];

    $fields = rwp::field('fields', $currentForm->ID);
    $notifications = rwp::field('email_notifications', $currentForm->ID);
    $successMessage = rwp::field('success_message', $currentForm->ID)[CL];
    $errorMessage = rwp::field('error_message', $currentForm->ID)[CL];

    if(!$fields){

        echo wp_json_encode([
            'status' => 'error',
            'message' => $errorMessage
        ]);

        exit;
    }


    $keys = [
        'action',
        'formSlug',
        'formType',
        ...array_column($fields, 'name')
    ];


    if(count($data) !== count($keys)){

        echo wp_json_encode([
            'status' => 'error',
            'message' => $errorMessage
        ]);

        exit;
    }

    foreach($keys as $key){

        if(!isset($data[$key]) || is_object($data[$key])){

            echo wp_json_encode([
                'status' => 'error',
                'message' => $errorMessage
            ]);

            exit;
        }

        $data[$key] = !is_array($data[$key]) ? wp_strip_all_tags($data[$key]) : $data[$key];

    }


    if(!in_array($data['formType'], ['regular', 'newsletter'])) return;


    $formType = $data['formType'];


    $toReplace = [];
    $attachments = [];

    foreach ($fields as $k => $v) {
        
        $canBeEmpty = $v['can_be_empty'] ? $v['can_be_empty'] : false;

        $fieldValue = $data[$v['name']];

        $doCondition = true;

        if($canBeEmpty && !$fieldValue)
            $doCondition = false;


        if($v['acf_fc_layout'] === 'input'){

            if($v['type'] === 'email'){

                if(
                    ($v['required'] && !$fieldValue)

                    ||

                    (!is_string($fieldValue))
                ){

                    echo wp_json_encode([
                        'status' => 'error',
                        'message' => $errorMessage
                    ]);

                    exit;
                }

                if($doCondition){
                    foreach (explode(',', $fieldValue) as $l => $w) {
                        
                        if(
                            (!$v['pattern'] && !filter_var($w, FILTER_VALIDATE_EMAIL))

                            ||

                            ($v['pattern'] && !preg_match($v['pattern'], $w))
                        ){

                            echo wp_json_encode([
                                'status' => 'error',
                                'message' => $errorMessage
                            ]);

                            exit;
                        }
                    }
                }

            } elseif($v['type'] === 'tel'){

                if(
                    ($v['required'] && !$fieldValue)

                    ||

                    (!is_string($fieldValue))
                ){

                    echo wp_json_encode([
                        'status' => 'error',
                        'message' => $errorMessage
                    ]);

                    exit;
                }

                if($doCondition){

                    if(
                        ($v['minlength'] && strlen($fieldValue) < $v['minlength'])

                        ||

                        ($v['maxlength'] && strlen($fieldValue) > $v['maxlength'])

                        ||

                        ($v['pattern'] && !preg_match($v['pattern'], $fieldValue))
                    ){

                        echo wp_json_encode([
                            'status' => 'error',
                            'message' => $errorMessage
                        ]);

                        exit;
                    }

                }

            } elseif($v['type'] === 'text'){

                if(
                    ($v['required'] && !$fieldValue)

                    ||

                    (!is_string($fieldValue))
                ){

                    echo wp_json_encode([
                        'status' => 'error',
                        'message' => $errorMessage
                    ]);

                    exit;
                }

                if($doCondition){

                    if(
                        ($v['minlength'] && strlen($fieldValue) < $v['minlength'])

                        ||

                        ($v['minword'] && str_word_count($fieldValue) < $v['minword'])

                        ||

                        ($v['maxlength'] && strlen($fieldValue) > $v['maxlength'])

                        ||

                        ($v['maxword'] && str_word_count($fieldValue) > $v['maxword'])

                        ||

                        ($v['pattern'] && !preg_match($v['pattern'], $fieldValue))
                    ){

                        echo wp_json_encode([
                            'status' => 'error',
                            'message' => $errorMessage
                        ]);

                        exit;
                    }

                }

            } elseif($v['type'] === 'file'){

                if(
                    ($v['required'] && !$fieldValue)

                    ||

                    ($fieldValue && !is_array($fieldValue))

                    ||

                    ($fieldValue && !isset($v['multiple']) && !$v['multiple'] && count($fieldValue['error']) > 1)
                ){

                    echo wp_json_encode([
                        'status' => 'error',
                        'message' => $errorMessage
                    ]);

                    exit;
                }

                if($doCondition && $fieldValue){
                    
                    /*
                    * Check if file is correctly uploaded
                    */
                    foreach ($fieldValue['error'] as $l => $w) {
                        
                        if($w !== UPLOAD_ERR_OK){

                            echo wp_json_encode([
                                'status' => 'error',
                                'message' => $errorMessage
                            ]);

                            exit;

                        }

                    }


                    /*
                    * Check mime type
                    */
                    foreach ($fieldValue['tmp_name'] as $l => $w) {
                        
                        $finfo = finfo_open(FILEINFO_MIME_TYPE);
                        $mime_type = finfo_file($finfo, $w);
                        finfo_close($finfo);

                        if(!$mime_type){

                            echo wp_json_encode([
                                'status' => 'error',
                                'message' => $errorMessage
                            ]);

                            exit;

                        }


                        if($v['accept'] && !in_array($mime_type, explode(',', str_replace(' ', '', $v['accept'])))){

                            echo wp_json_encode([
                                'status' => 'error',
                                'message' => $errorMessage
                            ]);

                            exit;
                        }

                    }

                }

            }

        } elseif($v['acf_fc_layout'] === 'select'){
            

            if(
                ($v['required'] && !$fieldValue)

                ||

                (!is_string($fieldValue))

                ||

                ($doCondition && !in_array($fieldValue, array_column($v['list'], 'value')))
            ){

                echo wp_json_encode([
                    'status' => 'error',
                    'message' => $errorMessage
                ]);

                return;
            }

        } elseif($v['acf_fc_layout'] === 'textarea'){
            

            if(
                ($v['required'] && !$fieldValue)

                ||

                (!is_string($fieldValue))
            ){

                echo wp_json_encode([
                    'status' => 'error',
                    'message' => $errorMessage
                ]);

                return;
            }


            if($doCondition){

                if(
                    ($v['minlength'] && strlen($fieldValue) < $v['minlength'])

                    ||

                    ($v['minword'] && str_word_count($fieldValue) < $v['minword'])

                    ||

                    ($v['maxlength'] && strlen($fieldValue) > $v['maxlength'])

                    ||

                    ($v['maxword'] && str_word_count($fieldValue) > $v['maxword'])
                ){

                    echo wp_json_encode([
                        'status' => 'error',
                        'message' => $errorMessage
                    ]);

                    return;
                }

            }

        }


        $toReplace[] = [
            '{rwpforms:'. $v['id'] .'}',
            ($fieldValue ? $fieldValue : (CL === 'fr' ? 'Non renseigné.' : 'Not filled in.'))
        ];



        /*
        * Save files
        */
        if($v['acf_fc_layout'] === 'input' && $v['type'] === 'file'){

            if($fieldValue){
                foreach ($fieldValue['tmp_name'] as $l => $w) {
                            
                    $code = getenv('SECRET_SALT');
                    $code = str_shuffle($code);
                    $code = substr($code, 0, 12);
                    $code = '-'.str_shuffle($code);


                    $info = pathinfo($fieldValue['name'][$l]);
                    $ext = $info['extension'];
                    $filename = sanitize_file_name($info['filename']);

                    $newFilename = $filename . $code . '.'.$ext;


                    $dir = __DIR__ . '/data/file/site/' . get_current_blog_id();


                    if(!file_exists($dir)){
                        mkdir($dir, 0777, true);
                        fopen($dir . '/index.php', 'w');
                    }
                    
                    $file_path = $dir . '/' . $newFilename;

                    move_uploaded_file($w, $file_path);


                    $attachments[] = $file_path;

                }
            }

        }

    }

    $successMessage = str_replace(array_column($toReplace, 0), array_column($toReplace, 1), $successMessage);
    $errorMessage = str_replace(array_column($toReplace, 0), array_column($toReplace, 1), $errorMessage);

    if($notifications){

        $notifPassed = true;

        foreach ($notifications as $k => $v) {
            /*
            * Send email
            */
            $headers = [];
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=utf-8';
            $headers[] = str_replace(array_column($toReplace, 0), array_column($toReplace, 1), 'From: '. ($v['sender']['name'] ? $v['sender']['name'] : get_bloginfo('name')) .($v['sender']['email'] ? '<'. $v['sender']['email'] .'>' : ' <contact@'. str_replace(['http://', 'https://', 'http://www.', 'https://www.', 'www.', '/'], '', site_url()) .'>'));


            $to = $v['to'] === 'admin' ? $v['to_email'] : $data[$v['to_field_id']];

            $subject = str_replace(array_column($toReplace, 0), array_column($toReplace, 1), $v['subject'][CL]);

            $message = str_replace(array_column($toReplace, 0), array_column($toReplace, 1), $v['message'][CL]);

            $body = '
                <html>
                    <head>
                        <title>'. $subject .'</title>
                    </head>
                    <body>
                        '. nl2br($message) .'
                    </body>
                </html>
            ';


            $userAttachments = [];

            if($v['attachments']){

                foreach($v['attachments'] as $l => $w){

                    $userAttachments[] = get_attached_file($w['file']);

                }

            }

            if(wp_mail($to, $subject, $body, implode("\r\n", $headers), ($v['to'] === 'admin' ? $attachments : $userAttachments))){



            } else {

                $notifPassed = false;

            }
        }

        if($notifPassed){

            echo wp_json_encode([
                'status' => 'success',
                'message' => $successMessage,
                'data' => $data
            ]);

        } else {

            echo wp_json_encode([
                'status' => 'error',
                'message' => $errorMessage
            ]);

        }

    } else {

        echo wp_json_encode([
            'status' => 'success',
            'message' => $successMessage
        ]);

    }

    exit;

}