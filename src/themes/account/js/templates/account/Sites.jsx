'use strict';
import React from 'react';
import { Link } from 'react-router-dom';

const Sites = () => {

	return(
		<>
			<div className="sites">
				<div className={USER.sites.length ? 'list' : 'no-site'}>
					{USER.sites.length ? USER.sites.map((site, i) => {

						let className = undefined;

						if(site.status === 'active')
							className = 'good';
						else if(site.status === 'past_due')
							className = 'pending';
						else if(site.status === 'unpaid')
							className = 'error';



						return (
							<div className="site" key={i}>
								<div className="content">
									<h2>{site.domain_excerpt}</h2>
									<span>Statut&#8293;: <i className={className}>{site.status_text}</i></span>
									<Link to={`${site.url + '?sso-login=' + site.token + '&domain=' + site.domain + '&username=' + USER.username}`} className="btn" target="_blank">
										<span>Gestion du contenu</span>
									</Link>
								</div>
							</div>
						)

					}) : (
						<>
							
						</>
					)}
				</div>
			</div>
		</>
	);
	
};

export default Sites;