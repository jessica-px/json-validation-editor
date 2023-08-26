import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux'
import { ProjectPage } from './pages/project/project';
import { setupStore } from './redux/store'

const theme = {
  dark100: '#1a1625', // For body background color
  dark200: '#25222e', // For cards background color
  dark300: '#46424f', // For chips, buttons, dropdowns background color
  dark400: '##5e5a66', // For sidebars, navbar background color
  dark500: '#a5a2af', // For modal, dialogs background color
  dark600: '#d5d1dd', // For on-background text color
  primary: '#9171f8',
  primaryLight: '#ba9ffb',
  fontSizeSmall: '12px',
  fontSizeMed: '16px',
  titleBarHeight: '32px'
};

const App = () => (
  <Provider store={setupStore()}>
    <ThemeProvider theme={theme}>
      <ProjectPage />
    </ThemeProvider>
  </Provider>
)

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
