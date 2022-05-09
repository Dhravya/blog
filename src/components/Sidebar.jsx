import React, { useContext, useState } from 'react';
import { graphql, useStaticQuery,Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FiTwitter, FiGithub, FiInstagram, FiMail } from 'react-icons/fi';
import { mediaMax } from '@divyanshu013/media';
import {TwitterTimelineEmbed, TwitterDMButton} from "react-twitter-embed";

import Button from './Button';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';
import ReactTooltip from 'react-tooltip';

const SIDEBAR_QUERY = graphql`
	{
		avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
			childImageSharp {
				gatsbyImageData(layout: FIXED, width: 128, height: 128)
			}
		}
		site {
			siteMetadata {
				author
				bio
				social {
					twitter
					github
					email
					instagram
				}
			}
		}
	}
`;

const Sidebar = () => {
	const data = useStaticQuery(SIDEBAR_QUERY);
	const { avatar } = data;
	const { author, bio, social } = data.site.siteMetadata;
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	const borderStartingColor = theme === 'light' ? 'hsla(0, 0%, 0%, 0.1)' : 'hsla(0, 0%, 100%, 0.1)';

	return (
		<div>
					<nav
			css={{
				borderRight: '1px solid',
				margin: '24px 0',
				padding: '16px 64px',
				alignSelf: 'start',
				borderImage: `linear-gradient(to bottom, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
				marginBottom: rhythm(2),
				[mediaMax.large]: {
					borderBottom: '1px solid',
					borderImage: `linear-gradient(to right, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
					borderImageSlice: 1,
					padding: `16px 0 ${rhythm(2)} 0`,
					margin: '24px 32px',
				},
			}}
		>
			<div
				css={{
					[mediaMax.small]: {
						display: 'grid',
						gridGap: 16,
						alignItems: 'center',
						justifyContent: 'start',
					},
				}}
			>
				<GatsbyImage
					alt={author}
					image={avatar.childImageSharp.gatsbyImageData}
					imgStyle={{ borderRadius: '50%' }}
					css={{
						marginBottom: rhythm(0.8),
						opacity: 0.87,
						[mediaMax.small]: {
							width: '64px !important',
							height: '64px !important',
							order: 1,
						},
					}}
				/>
				<h3>{author}</h3>
			</div>
			<p css={{color: muted}}>
				A blog where I write about my coding journey <br /> and stuff like that
			</p>
			Btw, follow me on twitter and Github
			<div
				css={{
					display: 'grid',
					gridGap: 16,
					gridTemplateColumns: 'repeat(4, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
					marginBottom: rhythm(1),
					marginTop: rhythm(0.5),
				}}
			>
				<Button
					title="Twitter"
					aria-label="Link to my Twitter"
					as="a"
					circular
					href={social.twitter}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiTwitter />
				</Button>
				<Button
					title="GitHub"
					aria-label="Link to my GitHub"
					as="a"
					circular
					href={social.github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiGithub />
				</Button>
				<Button
					title="Instagram"
					aria-label="Link to my Instagram"
					as="a"
					circular
					href={social.instagram}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiInstagram />
				</Button>
				<Button
					title="Good old email"
					aria-label="Email me"
					as="a"
					circular
					href={social.email}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiMail />
				</Button>
			</div>

			<ul
				css={{
					listStyle: 'none',
					margin: 0,
					padding: 0,
					display: 'grid',
					gridGap: 16,
					gridTemplateColumns: 'repeat(4, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
					marginBottom: rhythm(1),
					marginTop: rhythm(0.5),
				}}
			>
				<li>
					<Link
					data-tip="Now page is where I basically give an update about my life, my coding journey and stuff like that"
					css={{
						color : "#6ca2dd"
					}} to="/now">Now Page</Link>
				</li>
				<li>
					<Link css={{
						color : "#6ca2dd"
					}}  to="/about">About me</Link>
				</li>
			</ul>


			<div 
				css={{
					display: 'flex',
					// Space between the links
					gap: '16px',
					marginBottom: rhythm(1),
					}}>
			Let's talk! {' '}
			<TwitterDMButton 
			id={1136175005060878337}
			placeholder="     Loading..."/>

			</div>
	    <h2>Subscribe to <a href="https://newsletter.dhravya.dev">Wow, Tech!</a> </h2>
			<p>A newsletter where I write about <br /> interesting websites, apps, tools, and a lot more! </p>
			<small className="revue-form-footer">
				By subscribing, you agree with Revue’s <br />
				<a target="_blank" href="https://www.getrevue.co/terms">
					Terms of Service
				</a>{' '}
				and
				<a target="_blank" href="https://www.getrevue.co/privacy">
					{' '}
					Privacy Policy
				</a>
				.
			</small>
			<form
				css={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					marginTop: rhythm(1),
					alignItems: 'center',
					justifyContent: 'center',
				}}
				action="https://newsletter.dhravya.dev/add_subscriber"
				method="post"
				id="revue-form"
				name="revue-form"
				target="_blank"
			>
				<input
					type="email"
					name="member[email]"
					placeholder="your@email.com"
					css={{
						width: '100%',
						borderRadius: '4px',
						border: '1px solid',
						borderColor: muted,
						paddingLeft: '1rem',
						[mediaMax.small]: {
							width: 'auto',
						},
						backgroundColor: theme == 'dark' ? '#1a1a1a' : '#fff',
						color: theme == 'dark' ? '#fff' : '#000',
						focus: {
							borderColor: theme == 'dark' ? '#fff' : '#000',
							backgroundColor: theme == 'dark' ? '#fff' : '#000',
							color: theme == 'dark' ? '#000' : '#fff',
						},
					}}
				/>
				<input type="hidden" name="embed" value="1" />
				<Button
					title="Subscribe"
					aria-label="Subscribe to this blog"
					as="input"
					type="submit"
					value="Subscribe"
					css={{
						marginTop: rhythm(1),
						marginLeft: rhythm(1),
						borderRadius: '4px',
						border: '1px solid',
						borderColor: muted,
						[mediaMax.small]: {
							width: 'auto',
						},
					}}
				/>
			</form>
			{/* Twitter embed */}
		 <TwitterTimelineEmbed
		    id = "twitter-embed"
				sourceType="profile"
				screenName="dhravyashah"
				options={{height: 400}}
				theme = {theme}
				placeholder= "Tweets are loading..."
			/>
		</nav>
		<ReactTooltip />
		</div>
	);
};

export default Sidebar;
