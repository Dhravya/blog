import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FiTwitter, FiGithub, FiInstagram, FiMail } from 'react-icons/fi';
import { mediaMax } from '@divyanshu013/media';

import Button from './Button';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

const SIDEBAR_QUERY = graphql`
	{
		avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
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
						gridTemplateColumns: 'auto auto',
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
			<p className="muted" css={{ color: muted }}>
				{bio}
			</p>
			<div
				css={{
					display: 'grid',
					gridGap: 16,
					gridTemplateColumns: 'repeat(4, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
					marginBottom: rhythm(2),
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
			Subscribe to this blog 
			<form
				css={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					marginTop: rhythm(1),
					alignItems: 'center',
					justifyContent: 'center',
				}}
				action="https://tinyletter.com/dhravya"
				method="post"
				target="popupwindow"
				onSubmit={() => {
					window.open(
						'https://tinyletter.com/dhravya',
						'popupwindow',
						'scrollbars=yes,width=800,height=600'
					);
					return true;
				}}
			>
				<input
					type="email"
					name="email"
					placeholder="your@gmail.com"
					css={{
						width: '100%',
						borderRadius: '4px',
						border: '1px solid',
						borderColor: muted,
						[mediaMax.small]: {
							width: 'auto',

						},
						backgroundColor: theme == "dark"? '#1a1a1a': '#fff',
						color: theme == "dark"? '#fff' : '#000',
						focus: {
							borderColor: theme == "dark"? '#fff' : '#000',
							backgroundColor: theme == "dark"? '#fff' : '#000',
							color: theme == "dark"? '#000' : '#fff',
						},
					}}
					required
				/>
				<input
					type="hidden"
					name="embed"
					value="1"
				/>
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
		</nav>
	);
}

export default Sidebar;
