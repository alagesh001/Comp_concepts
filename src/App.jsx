import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home2 from "./pages/Home2";
import {visualizers} from "./data/visualizers";


export default function App(){

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Home2/>}/>


{
visualizers.flatMap(cat=>

cat.items.map(
([name,path,Component])=>

<Route

key={path}

path={path}

element={<Component/>}

/>

)

)

}


</Routes>

</BrowserRouter>

)

}