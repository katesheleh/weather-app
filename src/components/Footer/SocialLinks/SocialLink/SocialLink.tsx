import React from 'react';
import styles from './SocialLink.module.css';

type SocialLinkType = {
	link: string
	title: string
}

const SocialLink = (props: SocialLinkType) => {
	return (
			<div className={styles.socialLink}>
				<a className={styles.link} href={props.link} target="_blank" rel="noopener noreferrer">{props.title}</a>
			</div>
	)
}

export default SocialLink;