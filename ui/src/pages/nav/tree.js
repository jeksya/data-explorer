import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Navigation from './nodes.js'
import { useGlobalDispatch } from '../../context';
import { useStyles } from './style';
import Path from '../../utils/path';
import { useWindowEvent } from '../../utils/hooks';
import history from '../../utils/history'


const renderTree = (nodes, clickMeTreeview) => {
	const textContainer = nodes.leaf
		? <div onClick={() => clickMeTreeview(nodes.id)}>{nodes.name}</div>
		: <div>{nodes.name}</div>
	return (
		<TreeItem
			key={nodes.id}
			nodeId={nodes.id}
			className={nodes.name}
			label={
				<div key={`${nodes.id}_label`}>
					{ textContainer }
				</div>
			}
		>
			{ Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node, clickMeTreeview)) : null }
		</TreeItem>
	)
}

const NavigationTree = (props) => {
	const classes = useStyles();
	const dispatch = useGlobalDispatch();
	const defaultPath = !Path.isEmpty(window.location.pathname)
		? Path.asArray(window.location.pathname)
		: ["root", "BLOOMBERG", "BLOOMBERG/CAX"];
	const [treePathLocal, setTreePath] = useState(defaultPath);

	const setPathFromHistory = (e) => {
		const path = Path.standardizedPath(e.path[0].location.pathname);
		dispatch({
			type: 'PATH',
			payload: path
		});
	}

	// register event (on browser back in this case)
	useWindowEvent("popstate", setPathFromHistory)

	const clickMeTreeview = nodeId => {
		history.push('/' + nodeId); // update url without reloading the router
		dispatch({
			type: 'PATH',
			payload: nodeId
		});
	}
	const vendorTreeData = Navigation.nodes(props.data);

	const onNodeToggle = (event, nodeId) => setTreePath(nodeId)

	const drawer = (
		<div>
			<TreeView
				defaultCollapseIcon={<ExpandMoreIcon />}
				expanded={treePathLocal}
				onNodeToggle={onNodeToggle}
				defaultExpandIcon={<ChevronRightIcon />}
			>
				{renderTree(vendorTreeData, clickMeTreeview)}
			</TreeView>
		</div>
	);
	return (
		<nav className={classes.drawer} aria-label="mailbox folders">
			<Drawer
				classes={{
					paper: classes.drawerPaper,
				}}
				variant="permanent"
				open
			>
				{drawer}
			</Drawer>
		</nav>
	)
}
export default NavigationTree;

