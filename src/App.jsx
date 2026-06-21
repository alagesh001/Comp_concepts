import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home2 from "./pages/Home2";
import VariablesMemoryDemo from "./pages/1Variableandmemory";
import StackHeapExplain from "./pages/2stackheap";

import MemoryConceptVisualizer from "./pages/3othervariables";
import StringImmutabilityVisualizer from "./pages/4stringimmutable";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StringImmutabilityVisualizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;