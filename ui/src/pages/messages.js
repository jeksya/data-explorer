
import React from 'react';

export const NotAuthorized = () => {
	return (
		<div>
			You can not see this page.
		</div>
	)
}

// used in <Body /> and component test section
export const NoDataForCurrentPath = () => "No data found for the current path.";
