import React, { useContext } from 'react';
import { number, string } from 'prop-types';

import { getTheme } from '../utils/theme';
import { theme as themeType } from '../types/theme_types';
import ThemeContext from './ThemeContext';
import Coffee from './Coffee';

interface Props {
	timeToRead: number;
	date: string;
	tags: string[];
	img: string;
}

const BlogInfo = ({ timeToRead, date, tags, img }: Props) => {
	// TODO: fix this
	const {theme} = useContext(ThemeContext);

	const muted = getTheme(theme).muted;
	return (
		<div>
			<img src={img} alt="og-image" css={{
				borderRadius: '5px',
			}} />
			<div className="muted" css={{ display: 'flex', alignItems: 'center', color: muted }}>
				<small css={{ marginRight: 4 }}>
					{date} • {timeToRead} min read
				</small>
				{Array.from({ length: timeToRead / 7 + 1 }).map((item, index) => (
					<Coffee key={index} />
				))}
				{tags?.map(tag => (
					<small key={tag} css={{ marginRight: 10, background:'#292f33', borderRadius:"10px", padding:"5px", color:'#a2a2a2' }}>
						#{tag}
					</small>
				))}
			</div>
			</div>
	);
};


export default BlogInfo;
