import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 15,
    margin: '20px 0',
    display: 'flex',
    padding: '10px 20px', // Adjusted padding for a consistent look with Navbar
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  countryCard: {
    padding: '16px',
    marginTop: '16px',
    borderRadius: 4,
  },
  searchButton: {
    marginLeft: '10px', // Space between button and text field
    padding: '10px 20px', // Adjusted padding for button size
    textAlign: 'center', // Center text inside the button
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
