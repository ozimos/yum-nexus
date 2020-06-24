import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    button: Palette['primary']
  }
  interface PaletteOptions {
    button: PaletteOptions['primary']
  }
}
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
    button: {
      main: '#fafdfdbb',
      dark: '#faffff',
    },
  },
})

export default theme
