'use strict';

if(typeof CL !== 'undefined'){

	CL = CL.value;

} else {

	window.CL = 'fr';

}

window.cookie = {
	get: function(name){

		const cookies = document.cookie.split(';');

		for (let cookie of cookies) {

			const [key, value] = cookie.trim().split('=');

			if (key === name) {

				return decodeURIComponent(value);

			}

		}

		return null;

	},
	set: function(key, value, time = (24 * 60 * 60 * 1000)) {

		const date = new Date();
		date.setTime(date.getTime() + time);
		const expires = "expires=" + date.toUTCString();

		document.cookie = `${key}=${value}; ${expires}; path=/; SameSite=Strict; Secure`;

	},
	remove: function(key){
		
		document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;

	}
};


window.formatNumber = function(value) {

    return new Intl.NumberFormat('fr-CA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
    
}


window.countWords = function(value){

	return value.trim().split(/\s+/).length;

}


window.emailCheck = function(value){


	const email_pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
	
	return email_pattern.test(value);
	
}


window.phoneCheck = function(value){

	return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
	
}


window.passwordCheck = function(value){

	const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/.test(value);
    const hasMinLength = value.length >= 8;
    const hasMaxLength = value.length <= 25;

    return hasUpperCase && hasNumber && hasSpecialChar && hasMinLength && hasMaxLength;

}

window.postalCodeCheck = function(value){
	
	return /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(value);
	
}

window.setSectionClassName = function(data){

	return (data.styles_border_radius.top ? ' border-radius-top' : '') + (data.styles_border_radius.bottom ? ' border-radius-bottom' : '') + (!data.styles_padding.top ? ' no-top-padding' : '') + (!data.styles_padding.side ? ' no-side-padding' : '') + (!data.styles_padding.bottom ? ' no-bottom-padding' : '');

}