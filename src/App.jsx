import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home2 from "./pages/Home2";
import VariablesMemoryDemo from "./pages/1Variableandmemory";
import StackHeapExplain from "./pages/2stackheap";

import MemoryConceptVisualizer from "./pages/3othervariables";
import StringImmutabilityVisualizer from "./pages/4stringimmutable";
import PrimitiveTypesVisualizer from "./pages/5primitivedatatypes";
import MemorySpaceVisualizer from "./pages/6memoryspacelay";
import DetailedMemorySpaceVisualizer from "./pages/7DetailedMemoryspace";


import OperationMemoryVisualizer from "./pages/8operationsworking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OperationMemoryVisualizer />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;