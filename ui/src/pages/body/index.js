import React from 'react';
import { useGlobalStore } from '../../context';
import { useStyles } from './style';
import loadable from '@loadable/component';
import Path from '../../utils/path';
import { NoDataForCurrentPath } from '../messages.js';

const Grid = loadable(() => import('./grid.js'));

const Body = () => {
	const classes = useStyles();
	const { path } = useGlobalStore();

	const content = Path.isEmpty(path)
		? <div className={classes.emptyPathMessage}>{ NoDataForCurrentPath() }</div>
		: <Grid />

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			{
				content
			}
		</main>
	)
}
export default Body;
