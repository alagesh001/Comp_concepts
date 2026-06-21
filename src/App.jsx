import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home2 from "./pages/Home2";
import VariablesMemoryDemo from "./pages/Variableandmemory";
import StackHeapExplain from "./pages/stackheap";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StackHeapExplain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;