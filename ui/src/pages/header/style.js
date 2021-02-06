import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 400;
export const useStyles = makeStyles((theme) => ({
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		background: 'transparent'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	lightBulb: {
		position: 'absolute',
		right: '15px',
		cursor: 'pointer'
	}
}));