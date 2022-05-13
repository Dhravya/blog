const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const node_fetch = require('node-fetch');
const crypto = require('crypto');

const fetch = node_fetch.default || node_fetch;

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
require('dotenv').config({
	path: `.env.${activeEnv}`,
});

exports.createPages = async ({ graphql, actions }) => {
	const { createPage, createNode } = actions;

	function createNodes(result) {
		console.log('Creating nodes...');
		for (const [path, totalCount] of result) {
			createNode({
				path: path,
				count: totalCount,
				id: path,
				internal: {
					type: `TotalPageViews`,
					contentDigest: crypto
						.createHash(`md5`)
						.update(JSON.stringify({ path, totalCount }))
						.digest(`hex`),
					mediaType: `text/plain`,
					description: `Page views per path`,
				},
			});
		}
	}

	function parseResults(result) {
		let new_result = [];

		for (i of result) {
			const path = i['x'];
			if (!path.includes('?')) {
				new_result.push([path, Number(i['y'])]);
			}
		}
		return new_result;
	}

	const timestamp_now = new Date().getTime() + 10000000000000;
	await fetch(
		`https://umami.dhravya.dev/api/website/1/metrics?start_at=0&end_at=${timestamp_now}&type=url`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.GATSBY_UMAMI_TOKEN}`,
			},
		},
	)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			let results = parseResults(result);
			createNodes(results);
		});

	const blogPost = path.resolve(`./src/templates/BlogPost.jsx`);
	return graphql(
		`
			{
				allMdx(
					filter: { frontmatter: { title: { ne: "About" } } }
					sort: { fields: [frontmatter___date], order: DESC }
					limit: 1000
				) {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title
							}
						}
					}
				}
			}
		`,
	).then((result) => {
		if (result.errors) {
			throw result.errors;
		}

		// Create blog posts pages.
		const posts = result.data.allMdx.edges;

		posts.forEach((post, index) => {
			const previous = index === posts.length - 1 ? null : posts[index + 1].node;
			const next = index === 0 ? null : posts[index - 1].node;

			createPage({
				path: post.node.fields.slug,
				component: blogPost,
				context: {
					slug: post.node.fields.slug,
					previous,
					next,
				},
			});
		});
		return null;
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `Mdx`) {
		const relativePath = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value: `${relativePath}`,
		});
	}
};
