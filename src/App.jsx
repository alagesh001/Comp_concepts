import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home2 from "./pages/Home2";
import {visualizers} from "./data/visualizers";
import ProtectedRoute from "./pages/protectedroute";

import Login from "./pages/login";
import SettingsScreen from "./pages/settingScreen";

export default function App(){

return (

<BrowserRouter basename="/csmodule">

<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/login" element={<Login/>}/>

<Route path="/home" element={<Home2/>}/>
<Route path="/settings" element={<SettingsScreen/>}/>


{
visualizers.flatMap(cat=>

cat.items.map(
([name,path,Component])=>

<Route

key={path}

path={path}

element={  <ProtectedRoute>
          <Component />
        </ProtectedRoute>}

/>

)

)

}


</Routes>

</BrowserRouter>

)

}