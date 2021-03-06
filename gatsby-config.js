module.exports = {
	siteMetadata: {
		bio: `A blog where I write about my coding journey, and stuff like that.`,
		title: `Dhravya Shah`,
		author: `Dhravya Shah`,
		description: `Personal blog of Dhravya Shah`,
		domain: 'blog.dhravya.dev',
		siteUrl: `https://blog.dhravya.dev`,
		repo: 'dhravya/blog',
		social: {
			twitter: `https://twitter.com/dhravyashah`,
			github: 'https://github.com/dhravya',
			instagram: 'https://instagram.com/dhravyashah',
			email: 'mailto:dhravyashah@gmail.com',
		},
	},
	plugins: [
		{
			resolve: `gatsby-plugin-umami`,
			options: {
				websiteId: '1da68afb-9706-45f7-9c63-60539ec94a05',
				srcUrl: 'https://umami.dhravya.dev/umami.js',
				includeInDevelopment: false ,
				autoTrack: true,
				respectDoNotTrack: true,
			},
		},
		`gatsby-plugin-scroll-indicator`,
		`gatsby-plugin-emotion`,
		`gatsby-remark-images`,
		`gatsby-remark-reading-time`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/pages`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				// Setting a color is optional.
				color: `tomato`,
				// Disable the loading spinner.
				showSpinner: true,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: ['.mdx', '.md'],
				gatsbyRemarkPlugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					`gatsby-remark-external-links`,
				],
			},
		},
		`gatsby-plugin-image`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-feed-mdx`,
			options: {
				query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						serialize: ({ query: { site, allMdx } }) => {
							return allMdx.nodes.map((node) => {
								return Object.assign({}, node.frontmatter, {
									description: node.excerpt,
									date: node.frontmatter.date,
									url: site.siteMetadata.siteUrl + node.fields.slug,
									guid: site.siteMetadata.siteUrl + node.fields.slug,
									custom_elements: [{ 'content:encoded': node.html }],
								});
							});
						},
						query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    body
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
											categories
                    }
                  }
                }
              }
            `,
						output: '/rss.xml',
						title: 'Dhravya Shah | Blog',
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Dhravya's Blog`,
				short_name: `Dhravya`,
				start_url: `/`,
				background_color: `#212f3f`,
				theme_color: `#1d1d1d`,
				display: `minimal-ui`,
				icon: `static/favicon.png`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				color: `salmon`,
			},
		},
		{
			resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
			options: {
				devMode: false,
			},
		},
		'gatsby-plugin-catch-links',
	],
};
