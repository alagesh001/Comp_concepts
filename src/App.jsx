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
import SOLIDPrinciplesLab from "./pages/33solidprinciples";
import SRPLab from "./pages/34srplab";
import OCPLab from "./pages/35ocblab";
import LSPLab from "./pages/36lsplab";
import ISPLab from "./pages/37isplab";
import DIPLab from "./pages/38diplab";

import SingletonLab from "./pages/39singleton";
import FactoryMethodLab from "./pages/40factory";
import BuilderLab from "./pages/41builder";
import AdapterPaymentLab from "./pages/42adapter";
import ObserverLab from "./pages/43observer";
import DecoratorLab from "./pages/44decorator";
import ThreadLab from "./pages/45thread";
import BackgroundProcessing from "./pages/46backgroundprocess";
import ConditionalLogic from "./pages/47elseifandswitch";
import LoopVisualizer from "./pages/48loops";

import DSAConceptExplorer from "./pages/49dsa";
import TimeComplexityVisualizer from "./pages/50timecomplexity";
import SpaceComplexityVisualizer from "./pages/51spacecomplexity";
import RecursionVisualizer from "./pages/52recursion";
import RecursionVsIteration from "./pages/53recursionvsiteration";
import CallStackVisualizer from "./pages/54callstack";
import PassByConcept from "./pages/55passbyrefvsvalue";
import BindingVisualizer from "./pages/56staticvsdynamicbind";
import LambdaVisualizer from "./pages/57lamda";
import ClosureVisualizer from "./pages/58closures";
import ScopeLifetimeVisualizer from "./pages/59scopeandlifetime";
import VariableShadowingVisualizer from "./pages/60variableshadowing";
import HoistingVisualizer from "./pages/61hoisting";
import ExecutionContextVisualizer from "./pages/62executioncontext";
import EventLoopVisualizer from "./pages/63eventloop";
import CallbackVisualizer from "./pages/64callbackfunctions";
import PromiseVisualizer from "./pages/65promises";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PromiseVisualizer />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;