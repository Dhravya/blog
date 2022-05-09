import { createContext, Context } from 'react';
import {theme as defaultTheme} from '../types/theme_types';

const default_theme: defaultTheme = "dark"

const ThemeContext = createContext(default_theme);

export default ThemeContext;
