import React, { useEffect } from 'react';
import { useGlobalStore, useGlobalDispatch } from '../../context';
import { useQuery, gql } from '@apollo/client';
import loadable from '@loadable/component';
import Path from '../../utils/path';

const NavigationTree = loadable(() => import('./tree.js'));

export const VENDORS = gql`
  query GetVendors {
	  vendors {
		source,
		subsource,
		year,
		month,
		day,
		path
	  }
  }
`;
const Nav = () => {

	const { path } = useGlobalStore();
	const dispatch = useGlobalDispatch();

	useEffect(() => {
		// on init page load if path is provided in URL; assign it to the global state
		if(Path.isEmpty(path)) {
			if(!Path.isEmpty(window.location.pathname)) {
				const path = Path.standardizedPath(window.location.pathname);
				dispatch({
					type: 'PATH',
					payload: path
				});
			}
		}
	});

	const { loading, error, data } = useQuery(VENDORS);
	if (loading) return <div>Loading...</div>
	else if (error) return <div>Error...</div>

	return <NavigationTree data={ data } />
}
export default Nav;

