import React, { useContext, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ThemeContext from './ThemeContext';

const commentNodeId = 'comments';

const Comments = () => {
	const data = useStaticQuery(graphql`
		query RepoQuery {
			site {
				siteMetadata {
					repo
				}
			}
		}
	`);
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://giscus.app/client.js';
		script.async = true;
		script.setAttribute('data-repo', data.site.siteMetadata.repo);
		script.setAttribute('data-repo-id', "R_kgDOG2jp7w");
		script.setAttribute('data-category-id', "DIC_kwDOG2jp784CBMAt");
		script.setAttribute('data-mapping', 'pathname');
		script.setAttribute('data-reactions-enabled', '1');
		script.setAttribute('data-emit-metadata', '0');
		script.setAttribute('data-input-position', 'top');
		script.setAttribute('label', 'comment :speech_balloon:');
		script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
		script.setAttribute('crossorigin', 'anonymous');

		const scriptParentNode = document.getElementById(commentNodeId);
		scriptParentNode.appendChild(script);

		return () => {
			scriptParentNode.removeChild(scriptParentNode.firstChild);
		};
	}, [data, theme]);

	return <div id={commentNodeId} />;
};

export default Comments;
