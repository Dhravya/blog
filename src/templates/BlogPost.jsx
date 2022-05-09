import React from 'react';
import { Link, graphql } from 'gatsby';
import { object } from 'prop-types';

import Bio from '../components/Bio';
import Comments from '../components/Comments';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogInfo from '../components/BlogInfo';
import { rhythm } from '../utils/typography';
import ThemeProvider from '../components/ThemeProvider';
import ThemeContext from '../components/ThemeContext';
import { getTheme } from '../utils/theme';
import { MDXRenderer } from "gatsby-plugin-mdx"
import {MDXEmbedProvider} from 'mdx-embed'
import gridImg from '../../content/assets/grid.svg'
import blogImg from '../../content/assets/blog.svg'

import KofiWidget from '../components/KofiWidget';

const BlogPost = ({ data, pageContext, location }) => {
	const post = data.mdx;
	
	const siteTitle = data.site.siteMetadata.title;
	const { previous, next } = pageContext;
	return (
		<ThemeProvider>
			<section css={{ height: '100%', minHeight: '100vh' }}>
				<ThemeContext.Consumer>
					{({ theme }) => (
						<Layout location={location} title={siteTitle}>
							<Seo
								title={post.frontmatter.title}
								description={post.frontmatter.description || post.excerpt}
								ogImage={data.site.siteMetadata.siteUrl.concat(
									post.frontmatter.ogImage.childImageSharp.gatsbyImageData.images.fallback.src,
								)}
							/>
							<BlogInfo date={post.frontmatter.date} timeToRead={post.fields.readingTime.minutes} />
							<h1
								style={{
									marginTop: rhythm(1 / 4),
									marginBottom: rhythm(1),
								}}
							>
								{post.frontmatter.title}
							</h1>
							{/* <div class="hidden md:block md:opacity-100 background absolute inset-0 pointer-events-none"><img src="/grid.svg" class="absolute top-0 left-0 transform scale-x-[-1] max-w-none"><img src="/grid.svg" class="absolute top-[500px] right-0 max-w-none"><img src="/blog.svg" class="absolute top-[0px] left-[-500px]"><img src="/blog.svg" class="absolute top-[350px] right-[-450px] transform scale-x-[-1] rotate-[17deg]"></div> */}
							{/* Same but in CSS */}
							<div css={{
									display: 'hidden',
									// Responsive
									'@media (min-width: 768px)': {
										display: 'block',
									},
									position: 'absolute',
									inset: 0,
									pointerEvents: 'none',
							}}>	
								<img
									css = {{
										// absolute top-0 left-0 transform scale-x-[-1] max-w-none
											position: 'absolute',
											top: 10,
											left: 0,
											transform: 'scaleX(-1)',
											maxWidth: 'none'
									}}
									src={gridImg}
								/>
								<img
									src={gridImg}
									css={{
										// absolute top-[500px] right-0 max-w-none
											position: 'absolute',
											top: '500px',
											right: 0,
											maxWidth: 'none'
									}}
								/>
								<img
									src={blogImg}
									css={{
											position: 'absolute',
											top: '0px',
											left: '-500px'
									}}
								/>
								
								<img
									src= {blogImg}
									className="absolute top-[350px] right-[-450px] transform scale-x-[-1] rotate-[17deg]"
									css ={{
											position: 'absolute',
											top: '350px',
											right: '-450px',
											transform: 'scaleX(-1)',
											transform: 'rotate(-17deg)'
									}}
								/>
							</div>
							<div
								css={{
									a: {
										color: "#6ca2dd",
										borderBottomColor: getTheme(theme).color,
										'&:hover, &:focus': {
											// Rounded border
											borderBottomStyle: 'solid',
											borderBottomColor: getTheme(theme).color,
										},
									},
								}}
							>
							<MDXEmbedProvider><MDXRenderer>{post.body}</MDXRenderer></MDXEmbedProvider>
							</div>
							<hr
								style={{
									borderBottom: `1px solid ${getTheme(theme).borderColor}`,
									height: 0,
									marginBottom: rhythm(1),
								}}
							/>
							<Bio />
							<Comments />

							<ul
								style={{
									display: `flex`,
									flexWrap: `wrap`,
									justifyContent: `space-between`,
									listStyle: `none`,
									padding: 0,
									margin: `${rhythm(1)} 0`,
								}}
							>
								<li key="item">
									{previous && (
										<h4>
											<Link to={previous.fields.slug} rel="prev">
												← {previous.frontmatter.title}
											</Link>
										</h4>
									)}
								</li>
								<li key="item2">
									{next && (
										<h4>
											<Link to={next.fields.slug} rel="next">
												{next.frontmatter.title} →
											</Link>
										</h4>
									)}
								</li>
							</ul>
						</Layout>
					)}
				</ThemeContext.Consumer>
			</section>
			<KofiWidget/>
		</ThemeProvider>
	);
};

BlogPost.propTypes = {
	data: object.isRequired,
	pageContext: object.isRequired,
	location: object.isRequired,
};

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
				siteUrl
			}
		}
		mdx(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			body
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
				categories
				ogImage {
					childImageSharp {
						gatsbyImageData(layout: FIXED, height: 630, width: 1200)
					}
				}
			}
			fields {
        readingTime {
          minutes
        }
      }
		}
	}
`;

export default BlogPost;
