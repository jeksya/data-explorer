import React from 'react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AgGridReact } from "@ag-grid-community/react";
import { useGlobalStore } from '../../context';
import { useThemeStore } from '../../context/theme.js';
import { useGridStore } from '../../context/grid';
import { useQuery, gql } from '@apollo/client';
import { useWindowEvent } from '../../utils/hooks';
import FileDownloadCell from './cellFileDownload';
import CustomizedDialogs from './modal'
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';

const preventDoubleClick = (f, delay=300) => {
	let t;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => { f.apply(this, args); }, delay);
	};
}

export const FILES = gql`
	query GetFiles($path: ID!) {
		vendor(path: $path){
			get_files{
				name,
				version,
				path,
				created_on
			}
		}
	}
`;
const Grid = () => {
	const { path } = useGlobalStore();
	const { columnDefs } = useGridStore();
	const { theme_color } = useThemeStore();
	const [openModal, setOpenModal] = React.useState(false);
	const [gridParams, setGridParams] = React.useState(false);
	const [selectedFileName, setSelectedFileName] = React.useState('');
	const resizeColumns = () => {
		gridParams.api.sizeColumnsToFit();
	}
	useWindowEvent("resize", resizeColumns);

	/* eslint-disable no-unused-vars */
	const { loading, error, data } = useQuery(FILES, {
		variables: { path },
	});
	const rowData = data ? data.vendor.get_files: [];

	const onGridReady = (params) => {
		setGridParams(params);
		params.api.sizeColumnsToFit();
	}
	const processClick = preventDoubleClick((value) => handleOpenModal(value));
	const handleOpenModal = (value) => {
		setOpenModal(true);
		setSelectedFileName(value);
	};
	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const WrappedFileDownloadCellRenderer = (props) =>
		<FileDownloadCell
			value={props.value}
			handleClickOpen={processClick} />;

	const frameworkComponents = {
		'fileDownload': WrappedFileDownloadCellRenderer
	}
	return (
		<div style={{ display: 'flow-root', width: '100%', top: '12px', position: 'relative'}}
			className={`ag-theme-alpine${theme_color === 'dark' ? '-dark' : ''}`}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={rowData}
				modules={AllCommunityModules}
				suppressCellSelection={true}
				rowHeight={30}
				frameworkComponents={frameworkComponents}
				onGridReady={onGridReady}>
			</AgGridReact>
			<CustomizedDialogs selectedFileName={selectedFileName}
				handleClickOpen={handleOpenModal}
				handleClose={handleCloseModal}
				open={openModal} />
		</div>
	)
}
export default Grid;
