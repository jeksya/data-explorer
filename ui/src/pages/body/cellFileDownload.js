import React from 'react';

const FileDownloadCell = (props) => {
	return (
		<>
			<div onClick={props.handleClickOpen.bind(this, props.value)}>
				{ props.value }
			</div>
		</>
	)
}
export default FileDownloadCell;
