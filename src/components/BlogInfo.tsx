import React, { useContext } from 'react';
import { number, string } from 'prop-types';

import { getTheme } from '../utils/theme';
import { theme as themeType } from '../types/theme_types';
import ThemeContext from './ThemeContext';
import Coffee from './Coffee';

interface Props {
	timeToRead: number;
	date: string;
}

const BlogInfo = ({ timeToRead, date }: Props) => {
	const theme : themeType = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	return (
		<div className="muted" css={{ display: 'flex', alignItems: 'center', color: muted }}>
			<small css={{ marginRight: 4 }}>
				{date} • {timeToRead} min read
			</small>
			{Array.from({ length: timeToRead / 7 + 1 }).map((item, index) => (
				<Coffee key={index} />
			))}
		</div>
	);
};

BlogInfo.propTypes = {
	timeToRead: number.isRequired,
	date: string.isRequired,
};

export default BlogInfo;
