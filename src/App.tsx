import { ThemeProvider } from "styled-components";

import theme from "./utils/theme";
import GlobalStyle from "./utils/globalStyles";
import ImageProducer from "./components/ImageProducer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        <ImageProducer />
      </div>
    </ThemeProvider>
  );
}

export default App;
