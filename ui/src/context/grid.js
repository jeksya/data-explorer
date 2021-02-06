import makeStore from '../store';

const initialGridState = {
	columnDefs: [
		{
			field: 'name',
			headerName: 'File Name',
			editable: false,
			sortable: true,
			filter: 'agTextColumnFilter',
			floatingFilter: true,
			cellRenderer: 'fileDownload',
			resizable: true
		},
		{
			headerName: 'File Version',
			editable: false,
			sortable: true,
			filter: 'agTextColumnFilter',
			floatingFilter: true,
			cellRenderer: 'fileDownload',
			field: 'version'
		},
		{
			headerName: 'Created On',
			editable: false,
			sortable: true,
			filter: 'agDateColumnFilter',
			floatingFilter: true,
			cellRenderer: 'fileDownload',
			field: 'created_on'
		}
	]
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_COLDEFS':
			return {
				...state,
				columnDefs: action.payload
			}
		default:
			return state
	}
}

const [
	GridContext,
	useGridStore,
	useGridDispatch
] = makeStore(reducer, initialGridState)

export { GridContext, useGridStore, useGridDispatch }