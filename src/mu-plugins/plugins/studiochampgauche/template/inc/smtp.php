<?php

add_action('phpmailer_init', function($phpmailer) {
    $phpmailer->isSMTP();
    $phpmailer->Host = getenv('SMTP_HOST');
    $phpmailer->Port = 465;
    $phpmailer->SMTPAuth = true;
    $phpmailer->Username = getenv('SMTP_USER');
    $phpmailer->Password = getenv('SMTP_PASS');
    $phpmailer->AuthType = 'LOGIN';
    $phpmailer->SMTPAutoTLS = false;
    $phpmailer->SMTPSecure = 'ssl';
});