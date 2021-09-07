import Sidenav from "../Sidenav/Sidenav";
import { BrowserRouter as Router} from "react-router-dom";

const Layout = () => {
  return (
    <div className="Layout">
      <Router>
        <Sidenav />
      </Router>
    </div>
  );
}
 
export default Layout;