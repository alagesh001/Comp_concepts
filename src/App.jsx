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
import EncapsulationVisualizer from "./pages/14encapsulation";
import InheritanceDemo from "./pages/15inheritance";
import ConstructorAndAttributes from "./pages/16constructor&attribute";
import AbstractionDemo from "./pages/17abstraction";
import InterfaceDemo from "./pages/18interface1";
import PaymentInterfaceDemo from "./pages/19interfaceforcommunication2";
import InterfaceVsInheritance from "./pages/20diff_inherit_interface";

import RuntimePolymorphism from "./pages/21runtimepolymorph";
import CompileTimePolymorphism from "./pages/22compiletimepolymorph";
import PolymorphismExecution from "./pages/23howpolymorphworks";
import CompositionAggregation from "./pages/24compositionaggregation";

import CompositionAggregationMemory from "./pages/25compaggregate2";
import AssociationDemo from "./pages/26association";

import AssociationVsAggregation from "./pages/27AssociationVsAggregation";
import GarbageCollectorSimulator from "./pages/28garbagecollection";

import DeepVsShallowVisualizer from "./pages/29deepshallowcopy";
import AccessModifierSimulator from "./pages/30staticpublic";

import ProtectedSimulator from "./pages/31protected";

import ThisAndSuperSimulator from "./pages/32thisandsuper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ThisAndSuperSimulator />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;