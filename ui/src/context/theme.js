import makeStore from '../store'

const initialThemeState = {
	theme_color: 'dark'
}

export const themeReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_THEME':
			return {
				...state,
				theme_color: action.payload
			}
		default:
			return state
	}
}

const [
	ThemeContext,
	useThemeStore,
	useThemeDispatch
] = makeStore(themeReducer, initialThemeState)

export { ThemeContext, useThemeStore, useThemeDispatch }