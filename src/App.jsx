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
import AsyncAlarmClock from "./pages/9Aysncsyncbasicexplain";

import AsyncSyncVisualizer from "./pages/10asyncsyncconcept";
import OOPClassObject from "./pages/11objectandclass";
import FunctionMachine from "./pages/12function";
import OOPCarRace from "./pages/13funcinclass";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OOPCarRace />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;