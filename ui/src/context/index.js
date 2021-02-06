import makeStore from '../store'

const initialState = {
	path: ''
}

export const reducer = (state, action) => {
	switch (action.type) {
		case 'PATH':
			return {
				...state,
				path: action.payload
			}
		default:
			return state
	}
}

const [
	GlobalContext,
	useGlobalStore,
	useGlobalDispatch
] = makeStore(reducer, initialState)

export { GlobalContext, useGlobalStore, useGlobalDispatch }