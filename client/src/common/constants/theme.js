import { createMuiTheme } from '@material-ui/core/styles';
import { mainColor, secondColor } from './colors';

const getTheme = (userAgent) => {
  const darkTheme =
    createMuiTheme({
      palette: {
        primary: { main: mainColor },
        secondary: { main: secondColor },
      },
      typography: {
        useNextVariants: true,
      },
    });
  return darkTheme;
};

export default getTheme;
