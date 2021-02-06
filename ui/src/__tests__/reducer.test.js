import { reducer } from '../context/index.js';
import { themeReducer } from '../context/theme.js';

const path = 'BLOOMBERG/CAX';

/* eslint-disable */
describe('Reducers', () => {
	describe('Vendor path', () => {
		it('should set a path', () => {
			const state = { path: '' };
			const newState = reducer(state, {
				type: 'PATH',
				payload: path
			});
			expect(newState).toEqual({ path });
		});
	});
	describe('Theme', () => {
		it('should set a theme', () => {
			const state = { theme_color: "dark" }; //default behavior
			const newState = themeReducer(state, {
				type: 'CHANGE_THEME',
				payload: "light"
			});
			expect(newState).toEqual({ theme_color: "light" });
		});
	});
});