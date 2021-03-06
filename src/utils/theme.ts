import { useState, useEffect } from 'react';
import {theme as themeType}	from '../types/theme_types';

export const COLOR_PRIMARY = 'salmon';

export const CUBIC_BEZIER_TRANSITION = '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
export const EASE_IN_OUT_TRANSITION = '0.3s ease-in-out';
export const BACKGROUND_TRANSITION_TIME = '0.75s';

/**
 * A hook to get and update the current theme for dark mode
 * @returns [theme, toggleTheme] - [current theme, function to toggle theme]
 */
export const useTheme = () => {
	// Get system theme
	const systemTheme =
		typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	const storedTheme = typeof window !== 'undefined' && window.localStorage.getItem('theme');
	const [theme, setTheme] = useState(storedTheme || systemTheme);
	const toggleTheme = () =>
		setTheme((prevTheme) => {
			return prevTheme === 'light' ? 'dark' : 'light';
		});
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('theme', theme);
		}
	}, [theme]);
	return [theme, toggleTheme];
};

export const getTheme = (theme : themeType) =>
	theme === 'light'
		? {
				background: '#f6f6f6',
				color: 'hsla(0, 0%, 0%, 0.8)',
				secondary: 'hsla(0, 0%, 0%, 0.7)',
				muted: 'hsla(0, 0%, 0%, 0.6)',
				borderColor: '#eee',
				borderHoverColor: 'transparent',
		  }
		: {
				background: '#171717',
				color: 'hsla(0, 0%, 100%, 0.87)',
				secondary: 'hsla(0, 0%, 100%, 0.75)',
				muted: 'hsla(0, 0%, 100%, 0.60)',
				borderColor: 'hsla(0, 0%, 100%, 0.60)',
				borderHoverColor: COLOR_PRIMARY,
		  };
