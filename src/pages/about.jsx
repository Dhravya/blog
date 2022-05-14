import React from 'react';
import { graphql } from 'gatsby';
import { object } from 'prop-types';

import ThemeProvider from '../components/ThemeProvider';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { MDXRenderer } from "gatsby-plugin-mdx"
import {MDXEmbedProvider} from 'mdx-embed'
import { getTheme } from '../utils/theme';

const AboutPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;
	const theme = "dark"
	return (
		<ThemeProvider>
			<section css={{ height: '100%', minHeight: '100vh' }}>
				<Layout location={location} title={siteTitle}>
					<Seo title="About" />
					<div  css={{
					a: {
										color: "#6ca2dd",
										borderBottomColor: getTheme(theme).color,
										'&:hover, &:focus': {
											// Rounded border
											borderBottomStyle: 'solid',
											borderBottomColor: getTheme(theme).color,
										},
									},
				}}>
						<MDXEmbedProvider><MDXRenderer>{data.mdx.body}</MDXRenderer></MDXEmbedProvider>
					</div>
				</Layout>
			</section>
		</ThemeProvider>
	);
};

AboutPage.propTypes = {
	data: object.isRequired,
	location: object.isRequired,
};

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		mdx(fileAbsolutePath: { regex: "/about/" }) {
			frontmatter {
				title
			}
			body
		}
	}
`;

export default AboutPage;
