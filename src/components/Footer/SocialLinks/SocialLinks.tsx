import React from 'react';
import styles from './SocialLinks.module.css';
import SocialLink from './SocialLink/SocialLink';

const SocialLinks = () => {
	return (
			<section className={styles.socialLinks}>
				<SocialLink link={'https://www.linkedin.com/in/katesheleh/'} title="Linkedin"/>
				<SocialLink link={'https://github.com/katesheleh'} title="Github"/>
			</section>
	)
}

export default SocialLinks;