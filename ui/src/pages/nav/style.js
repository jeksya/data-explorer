
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 400;
export const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
		textTransform: 'lowercase',
		'& div::first-letter': {
			textTransform: 'uppercase'
		},
		'& .MuiTreeItem-content': {
			paddingBottom: '2px',
			paddingTop: '2px',
			fontFamily: "Roboto"
		}
	},
	// necessary for content to be below header
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
}));