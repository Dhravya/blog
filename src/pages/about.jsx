import React from 'react';
import { graphql } from 'gatsby';
import { node, object } from 'prop-types';

import ThemeProvider from '../components/ThemeProvider';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { MDXRenderer } from "gatsby-plugin-mdx"
import {MDXEmbedProvider} from 'mdx-embed'
import { getTheme } from '../utils/theme';

const AboutPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;
	const theme = "dark"
	const post = data.mdx;
	return (
		<ThemeProvider>
			<section css={{ height: '100%', minHeight: '100vh' }}>
				<Layout location={location} title={siteTitle}>
							<Seo
								title={post.frontmatter.title}
								description={post.frontmatter.description || post.excerpt}
								ogImage={data.site.siteMetadata.siteUrl.concat(
									post.frontmatter.ogImage.childImageSharp.gatsbyImageData.images.fallback.src,
								)}
							/>
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
				siteUrl
			}
		}
		mdx(fileAbsolutePath: { regex: "/about/" }) {
			frontmatter {
				title
				description
				ogImage {
							childImageSharp {
								gatsbyImageData(layout: FIXED, height: 630, width: 1200)
							}
						}
			}
			body
		}
	}
`;

export default AboutPage;
