import { BrowserRouter, } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyles from "./Styles/GlobalStyles";
import RoutesApp from './routes'




function App() {
  return (
    <BrowserRouter>
      <Header/>
      <GlobalStyles/>
      <RoutesApp/>
    </BrowserRouter>
  );
}


export default App;
