import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
	// necessary for content to be below header
	toolbar: theme.mixins.toolbar,
	content: {
		display: 'flex',
		top: '51px',
		width: 'calc(100vw - 400px)',
		height: 'calc(100vh - 51px)',
		position: 'relative',
		flexGrow: 1,
		transition: 'margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
	},
	emptyPathMessage: {
		position: 'relative',
		width: '225px',
		height: '25px',
		margin: 'auto'
	}
}));