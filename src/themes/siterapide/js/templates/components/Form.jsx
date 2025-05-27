'use strict';
import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import Contents from './Contents';

const Form = ({ id, data, method = 'POST', action = 'rwpforms', submitButtonText = (CL === 'fr' ? 'Envoyer' : 'Send'), resetButtonText = (CL === 'fr' ? 'Effacer' : 'Reset'), className = null, ...props }) => {

	const tagProps = {
		id: id,
		method: method,
		action: action,
		className: (className ? `${className}` : undefined),
		...props
	}

	const ref = useRef(null);

	useEffect(() => {


		const killEvents = [];

		let selectedFilesGroups = [];


		/*
		* Init
		*/
		FORMS[data.form]?.fields?.forEach((field, i) => {

			const fieldElement = ref.current.querySelector(`#${field.id}`);

			/*
			* file input
			*/
			if(field?.type === 'file'){


				const fileDropArea = fieldElement.parentNode;
				const fileList = fileDropArea.parentNode.querySelector('.subfiles ul');

				let selectedFiles = [];

				const fileHandleClick = () => {

					if(selectedFiles.length && !field.multiple) return;

					fieldElement.click();

				}
				fileDropArea.addEventListener('click', fileHandleClick);


				const fileHandleChange = () => {


					const files = Array.from(event.target.files);
					selectedFiles = [...selectedFiles, ...files];

					fieldElement.value = '';

					updateFileList();

				}
				fieldElement.addEventListener('change', fileHandleChange);



				function updateFileList() {


					selectedFilesGroups[i] = selectedFiles;

		            fileList.innerHTML = '';

		            if(selectedFiles.length)
		            	fileDropArea.classList.add('has-files');
		            else
		            	fileDropArea.classList.remove('has-files');

		            selectedFiles?.forEach((file, index) => {

		                const li = document.createElement('li');
		                li.innerHTML = `<span>${file.name}</span>`;
		                
		                const removeBtn = document.createElement('button');
		                removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="8.616" height="8.616" viewBox="0 0 8.616 8.616"><g transform="translate(0 0)"><g><path d="M5.846,4.308,8.3,1.857A1.088,1.088,0,0,0,6.759.318L4.308,2.77,1.856.318A1.088,1.088,0,0,0,.318,1.857L2.77,4.308.318,6.759A1.088,1.088,0,0,0,1.856,8.3L4.308,5.846,6.759,8.3A1.088,1.088,0,0,0,8.3,6.759Z" fill="#3c3c3c"/></g></g></svg>';

		                removeBtn.classList.add('remove-btn');

		                removeBtn.addEventListener('click', () => {

		                    selectedFiles.splice(index, 1);
		                    updateFileList();

		                });

		                li.appendChild(removeBtn);
		                fileList.appendChild(li);
		            });
		        }

			}

		});


		/*
		* Submit
		*/
		const email_pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);

		
		let canSubmit = true;

		const handleSubmit = (e) => {

			e.preventDefault();

			if(!canSubmit) return;

			if(ref.current.querySelector('.form-message')){
                ref.current.querySelector('.form-message').remove();
                ScrollTrigger.refresh();
            }

            const formData = new FormData();
            formData.append('action', action);
            formData.append('formSlug', data.form);
            formData.append('formType', (data.type || 'regular'));


            FORMS[data.form]?.fields?.forEach((field, i) => {

            	const selectedFiles = selectedFilesGroups[i];

            	const fieldElement = ref.current.querySelector(`#${field.id}`);

            	const canBeEmpty = field.can_be_empty || false;

            	let doCondition = true;

            	if(canBeEmpty && !fieldElement.value.length)
            		doCondition = false;


            	if(field.acf_fc_layout === 'input'){

            		if(field.type === 'email'){

            			/*
			            * Check Email
			            */
			            let pass = true;
			            fieldElement.value.replaceAll(' ', '').split(',').forEach(emailText => {

			            	if(!pass) return;

			            	if(
				            	(doCondition && !(field.pattern || email_pattern).test(emailText))

				            	||

				            	(field.required && !emailText.length)
				            )
			            		pass = false;
				                

			            });


			            if(!pass)
			            	fieldElement.classList.add('error');
			            else
			                fieldElement.classList.remove('error');


            		} else if(field.type === 'tel'){

            			/*
			            * Check Phone
			            */
			            if(
			            	(doCondition && field.minlength && fieldElement.value.length < field.minlength)

			            	||

			            	(doCondition && field.maxlength && fieldElement.value.length > field.maxlength)

			            	||

			            	(field.required && !fieldElement.value.length)

			            	||

			            	(doCondition && field.pattern && !field.pattern.test(fieldElement.value))
			            )
			                fieldElement.classList.add('error');
			            else
			                fieldElement.classList.remove('error');

            		} else if(field.type === 'text'){

            			/*
            			* Check text
            			*/
            			if(
            				(doCondition && field.minlength && fieldElement.value.length < field.minlength)

            				||

            				(doCondition && field.minword && countWords(fieldElement.value) < field.minword)

			            	||

			            	(doCondition && field.maxlength && fieldElement.value.length > field.maxlength)

			            	||

			            	(doCondition && field.maxword && countWords(fieldElement.value) > field.maxword)

			            	||

			            	(field.required && !fieldElement.value.length)

			            	||

			            	(doCondition && field.pattern && !field.pattern.test(fieldElement.value))
            			)
            				fieldElement.classList.add('error');
			            else
			                fieldElement.classList.remove('error');

            		} else if(field.type === 'file'){

            			const fileDropArea = fieldElement.parentNode;
						const fileList = fileDropArea.parentNode.querySelector('.subfiles ul');

            			/*
            			* Check file
            			*/
            			if(
			            	(field.required && !fileList.querySelector('li'))
            			){
            				fieldElement.classList.add('error');
            				fileDropArea.classList.add('error');
            			} else{
			                fieldElement.classList.remove('error');
			                fileDropArea.classList.remove('error');
            			}

            		}

            	} else if(field.acf_fc_layout === 'select'){

            		if(doCondition && fieldElement.value === '')
            			fieldElement.classList.add('error');
            		else
            			fieldElement.classList.remove('error');

            		
            	} else if(field.acf_fc_layout === 'textarea'){
            		
            		/*
        			* Check textarea
        			*/
        			if(
        				(doCondition && field.minlength && fieldElement.value.length < field.minlength)

        				||

        				(doCondition && field.minword && countWords(fieldElement.value) < field.minword)

		            	||

		            	(doCondition && field.maxlength && fieldElement.value.length > field.maxlength)

		            	||

		            	(doCondition && field.maxword && countWords(fieldElement.value) > field.maxword)

		            	||

		            	(field.required && !fieldElement.value.length)
        			)
        				fieldElement.classList.add('error');
		            else
		                fieldElement.classList.remove('error');

            	}


            	if(field?.type === 'file' && selectedFiles.length){

					for (const file of selectedFiles) {
						formData.append(`${field.name}[]`, file);
					}

            	} else
            		formData.append(field.name, fieldElement.value);

            });


           	if(ref.current.querySelector('.error')) return;

           	canSubmit = false;

           	const baseText = ref.current.querySelector('.btn[type=submit] span').innerText;

           	ref.current.style.opacity = .6;
           	ref.current.style.pointerEvents = 'none';
           	ref.current.querySelector('.btn[type=submit] span').innerText = (CL === 'fr' ? 'Un instant..' : 'One moment..');

           	fetch(SYSTEM.ajaxPath, {
           		method: method,
           		body: formData
           	})
           	.then(resp => resp.json())
           	.then(data => {

           		canSubmit = true;

           		ref.current.style.opacity = 1;
	           	ref.current.style.pointerEvents = 'initial';
	           	ref.current.querySelector('.btn[type=submit] span').innerText = baseText;


	           	const messageElement = document.createElement('p');
                messageElement.className = 'form-message';
                
                messageElement.innerText = data.message;
                
                ref.current.prepend(messageElement);
                
                ScrollTrigger.refresh();

           	});

		}

		ref.current.addEventListener('submit', handleSubmit);

		killEvents.push(() => ref.current?.removeEventListener('submit', handleSubmit));


		const countWords = (string) => {
            
            return parseInt(string.trim() ? string.trim().split(/\s+/).length : 0);
            
        }
        
        
        const mask = () => {

        	const phones = FORMS[data.form]?.fields.filter(({type}) => type === 'tel');
			if(phones){

				phones.forEach(phone => {

					if(!phone.mask) return;

					const phoneElement = ref.current.querySelector(`#${phone.id}`);

					if(!phoneElement) return;


					const handlePhoneSubmit = (e) => {

						const x = phoneElement.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
	                    phoneElement.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

					}

					phoneElement.addEventListener('input', handlePhoneSubmit);

					killEvents.push(() => phoneElement?.removeEventListener('input', handlePhoneSubmit));

				});
                
            }
		}
		mask();


		killEvents.push(() => {

			if(ref.current?.querySelector('.form-message')){
                ref.current?.querySelector('.form-message').remove();
                ScrollTrigger.refresh();
            }


            ref.current?.querySelectorAll('input, select, textarea')?.forEach(field => {

            	field.value = '';

            	if(field.classList.contains('error'))
            		field.classList.remove('error')

            });

		});


		return () => killEvents?.forEach(killEvent => killEvent());

	});

	return(
		<form ref={ref} {...tagProps}>
			<div className="fields">
				{FORMS[data.form]?.fields.map((field, i) => (
					<div className={field.split ? `field split ${field.type || field.acf_fc_layout}` : `field ${field.type || field.acf_fc_layout}`} key={i}>
						<>
							{field.label[CL] && (
								<label htmlFor={!field.label.do_not_link && field.id ? field.id : undefined} className={field.label.do_not_link ? 'default' : undefined} dangerouslySetInnerHTML={{ __html: field.label[CL] }} style={{color: data.styles_label_color}} />
							)}
							<div className="the-field">
								{field.acf_fc_layout === 'input' && (
									<>
										{!['checkbox', 'radio', 'file'].includes(field.type) && (
											<>
												<input
													type={field.type}
													id={field.id || undefined}
													name={field.name || undefined}
													defaultValue={field?.value.nolang || field.value[CL] || undefined}
													placeholder={field.placeholder[CL] || undefined}
													autoComplete={field.autocomplete || undefined}
													min={field.min || undefined}
													max={field.max || undefined}
													minLength={field.minlength || undefined}
													maxLength={field.maxlength || undefined}
													pattern={field.pattern || undefined}
													step={field.step || undefined}
													multiple={field.multiple || undefined}
													readOnly={field.readonly || undefined}
													required={field.required || undefined}
													style={{
														background: data.styles_background_field_color,
														borderColor: data.styles_border_field_color,
														color: data.styles_text_field_color
													}}
												/>
											</>
										)}
										{field.type === 'file' && (
											<>
												<div className="file" style={{
													background: data.styles_background_field_color,
													borderColor: data.styles_border_field_color,
													color: data.styles_text_field_color
												}}>
					                                <span>{field.placeholder[CL] || (CL === 'fr' ? 'Téléverser' : 'Upload')}</span>

					                                <svg xmlns="http://www.w3.org/2000/svg" width="19.53" height="19.48" viewBox="0 0 19.53 19.48"><g><path d="M109.587,3.454v9.965a1.326,1.326,0,0,1-.444.676,1.112,1.112,0,0,1-1.729-.812V3.42L104,6.272a1.086,1.086,0,0,1-1.376-1.681c1.757-1.343,3.389-2.965,5.146-4.293.929-.7,1.43-.012,2.105.541,1.435,1.176,2.965,2.371,4.345,3.6.08.071.212.169.274.236A1.093,1.093,0,0,1,112.932,6.2c-1.016-.77-1.987-1.709-2.99-2.511a1.207,1.207,0,0,0-.356-.238" transform="translate(-98.762 0)" /><path d="M.922,388.163c-1.382-1.249-.766-3.233-.887-4.884a1.084,1.084,0,0,1,2.132.058c.078.875-.114,1.962.007,2.81a.713.713,0,0,0,.72.6H16.547a.72.72,0,0,0,.76-.53c.056-.882-.068-1.841,0-2.713a1.089,1.089,0,0,1,2.174-.1,23.225,23.225,0,0,1,0,2.888,2.849,2.849,0,0,1-2.6,2.6H2.589a2.934,2.934,0,0,1-1.667-.727" transform="translate(0.001 -369.411)" /></g></svg>

					                                <input
					                                	type="file"
					                                	id={field.id || undefined}
					                                	name={field.name || undefined}
					                                	accept={field.accept || undefined}
					                                	multiple={field.multiple || undefined}
					                                />
												</div>
												<div className="subfiles">
													<ul></ul>
												</div>
											</>
										)}
										{field.type === 'checkbox' && field.checkbox && (
											<div id={field.id} className="checkbox">
												<div className="els">
													{field.checkbox.map((checkbox, j) => (
														<div className="el" key={j}>
															<input
																type="checkbox"
																id={field.id + '-' + j || undefined}
																name={field.name || field.id || undefined}
																defaultValue={checkbox.value || undefined}
																defaultChecked={checkbox.checked || undefined}
															/>
															<label htmlFor={field.id + '-' + j || undefined} dangerouslySetInnerHTML={{ __html: checkbox[`text_${CL}`] }} />
														</div>
													))}
												</div>
											</div>
										)}
										{field.type === 'radio' && field.radio && (
											<div id={field.id} className="radio">
												<div className="els">
													{field.radio.map((radio, j) => (
														<div className="el" key={j}>
															<input
																type="radio"
																id={field.id + '-' + j || undefined}
																name={field.name || field.id || undefined}
																defaultValue={radio.value || undefined}
																defaultChecked={radio.checked || undefined}
															/>
															<label htmlFor={field.id + '-' + j || undefined} dangerouslySetInnerHTML={{ __html: radio[`text_${CL}`] }} />
														</div>
													))}
												</div>
											</div>
										)}
									</>
								)}
								{field.acf_fc_layout === 'select' && (
									<>
										<select
											id={field.id || undefined}
											name={field.name || undefined}
											required={field.required || undefined}
											defaultValue=""
											style={{
												background: data.styles_background_field_color,
												borderColor: data.styles_border_field_color,
												color: data.styles_text_field_color
											}}
										>
											<option value="" disabled>{field.placeholder[CL]}</option>
											{field.list.map((item, j) => (
												<option value={item.value} key={j}>{item[`text_${CL}`]}</option>
											))}
										</select>
										<div className="select-icon">
											<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 62.1 33.9" enableBackground="new 0 0 62.1 33.9"><path d="M57.3,0.8L31,27L4.8,0.8c-1.1-1.1-2.9-1.1-4,0l0,0c-1.1,1.1-1.1,2.9,0,4L29,33c1.1,1.1,2.9,1.1,4,0L61.3,4.8 c1.1-1.1,1.1-2.9,0-4l0,0C60.2-0.3,58.4-0.3,57.3,0.8z"></path></svg>
										</div>
									</>
								)}
								{field.acf_fc_layout === 'textarea' && (
									<>
										<textarea
											id={field.id || undefined}
											name={field.name || undefined}
											required={field.required || undefined}
											readOnly={field.readonly || undefined}
											placeholder={field.placeholder[CL] || undefined}
											style={{
												background: data.styles_background_field_color,
												borderColor: data.styles_border_field_color,
												color: data.styles_text_field_color
											}}
										/>
									</>
								)}
							</div>
						</>
					</div>
				))}
			</div>
			<div className="buttons">
				<Button
					text={submitButtonText}
					type='submit'
					className='blue has-arrow'
				/>
				{FORMS[data.form]?.reset_button && (
					<Button
						text={resetButtonText}
						type='reset'
						className='blue has-arrow'
					/>
				)}
			</div>
		</form>
	);

}

export default Form;