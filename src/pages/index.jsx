import React, { useState, useEffect, useContext } from 'react';
import { Link, graphql } from 'gatsby';
import { object } from 'prop-types';
import { mediaMax } from '@divyanshu013/media';
import { FiExternalLink } from 'react-icons/fi';

import ThemeProvider from '../components/ThemeProvider';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogInfo from '../components/BlogInfo';
import { rhythm } from '../utils/typography';

const BlogIndex = ({ data, location }) => {
	const posts = data.allMdx.edges; 

	const [filteredPosts, setFilteredPosts] = useState(posts);
	
	const initialState = decodeURI(location.href?.split('/').pop().split("=").pop());
  const [search, setSearch] = useState(initialState);

	useEffect(() => {
		if (search) {
			if (window.history.pushState) {
        window.history.pushState(null, null, `/?q=${search}`);
      }
			const filteredPosts = posts.filter(({ node }) => {
				const tags = node.frontmatter.categories;
				
				if (search.startsWith("#")) {
					return tags.includes(search.replace("#", ""));
				}
				else if (search.startsWith("date:")){
					// Take Date in DD/MM/YYYY format
					const date = search.replace("date:", "");
					const date_post = node.frontmatter.date;
					return date_post === date;
				}
				else {
					const title = node.frontmatter.title.toLowerCase();
					const description = node.frontmatter.description.toLowerCase();
					return title.match(search.toLowerCase()) || description.match(search.toLowerCase());
			}
			});
			setFilteredPosts(filteredPosts);
		} else {
			setFilteredPosts(posts);
		}
	}, [search, posts]);

	return (
		<ThemeProvider>
			<section
				css={{
					display: 'grid',
					gridTemplateColumns: 'auto 1fr',
					alignContent: 'start',
					height: '100%',
					minHeight: '100vh',
					maxWidth: 1200,
					margin: '0 auto',
					[mediaMax.large]: {
						gridTemplateColumns: 'auto',
						justifyItems: 'center',
					},
				}}
			>
				<Sidebar />
				<Layout location={location}>
					<Seo />
					

					<div className="search-bar">
						<input
							type="text"
							placeholder="Search"
							onChange={(e) => {e.preventDefault();setSearch(e.target.value)}}
							css={{
								width: '100%',
								borderRadius: '4px',
								border: '1px solid',
								borderColor: '#ccc',
								paddingLeft: '1rem',
								[mediaMax.small]: {
									width: 'auto',
								},
								backgroundColor: '#292a2d',
								color: "#fff",
								focus: {
									borderColor: '#000',
									backgroundColor: '#fff',
									color: '#000',
								},
							}}
						/>
					</div>
					<br /><br />

					{filteredPosts.map(({ node }) => {
						if (node.fields.slug) {
							// Count number of occurence of / in the slug
							const count = (node.fields.slug.match(/\//g) || []).length;
							if (count > 2){
								return 
							}
						}

						const ogImage = data.site.siteMetadata.siteUrl.concat(
									node.frontmatter.ogImage.childImageSharp.gatsbyImageData.images.fallback.src,
								)

						const title = node.frontmatter.title || node.fields.slug;
						const link = node.frontmatter.external ? (
							<a key={title} style={{ boxShadow: `none` }} href={node.frontmatter.external} target="_blank" rel="noreferrer noopener">
								{title}
								<FiExternalLink css={{ marginLeft: 4 }} size={16} />
							</a>
						) : (
							<Link key={title} style={{ boxShadow: `none` }} to={node.fields.slug}>
								{title}
							</Link>
						)
						return (
							<div key={node.fields.slug} css={{
											borderColor: "#6a6a6a",
											borderWidth: 1,
											borderStyle: 'solid',
											borderRadius: 20,
											padding: '1rem',
											margin: '1rem 0',
										}}>
								<BlogInfo timeToRead={node.frontmatter.time || node.fields.readingTime.minutes} date={node.frontmatter.date} tags={node.frontmatter.categories} img={ogImage}/>
								<h3
									css={{
										marginTop: rhythm(1 / 4),
										marginBottom: rhythm(0.5),
									}}
								>
									{link}
								</h3>
								<p
									css={{ marginBottom: rhythm(1.5) }}
									dangerouslySetInnerHTML={{
										__html: node.frontmatter.description || node.excerpt,
									}}
								/>
							</div>
						);
					})}
				</Layout>
			</section>
		</ThemeProvider>
	);
};

BlogIndex.propTypes = {
	data: object.isRequired,
	location: object.isRequired,
};

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				author
				siteUrl
			}
		}
		allMdx(
			filter: { frontmatter: { title: { ne: "About" } } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description	
						external
						time
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
		}
	}
`;

export default BlogIndex;
