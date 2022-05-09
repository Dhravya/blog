import React, { useContext, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {theme as themeType} from "../types/theme_types";

import ThemeContext from './ThemeContext';
import { kill } from 'process';

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
	
	// TODO: Fix this type issue
	const {theme}: {theme: string} = useContext(ThemeContext);

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
		scriptParentNode?.appendChild(script);

		return () => {
			scriptParentNode?.firstChild? scriptParentNode.removeChild(scriptParentNode.firstChild): null;
		};
	}, [data, theme]);

	return <div id={commentNodeId} />;
};

export default Comments;
