import Home2 from "../pages/Home2";

// 1-10 Basics + Runtime
import VariablesMemoryDemo from "../pages/1Variableandmemory";
import StackHeapExplain from "../pages/2stackheap";
import MemoryConceptVisualizer from "../pages/3othervariables";
import StringImmutabilityVisualizer from "../pages/4stringimmutable";
import PrimitiveTypesVisualizer from "../pages/5primitivedatatypes";
import MemorySpaceVisualizer from "../pages/6memoryspacelay";
import DetailedMemorySpaceVisualizer from "../pages/7DetailedMemoryspace";
import OperationMemoryVisualizer from "../pages/8operationsworking";
import AsyncAlarmClock from "../pages/9Aysncsyncbasicexplain";
import AsyncSyncVisualizer from "../pages/10asyncsyncconcept";

// OOP 11-32
import OOPClassObject from "../pages/11objectandclass";
import FunctionMachine from "../pages/12function";
import OOPCarRace from "../pages/13funcinclass";
import EncapsulationVisualizer from "../pages/14encapsulation";
import InheritanceDemo from "../pages/15inheritance";
import ConstructorAndAttributes from "../pages/16constructor&attribute";
import AbstractionDemo from "../pages/17abstraction";
import InterfaceDemo from "../pages/18interface1";
import PaymentInterfaceDemo from "../pages/19interfaceforcommunication2";
import InterfaceVsInheritance from "../pages/20diff_inherit_interface";
import RuntimePolymorphism from "../pages/21runtimepolymorph";
import CompileTimePolymorphism from "../pages/22compiletimepolymorph";
import PolymorphismExecution from "../pages/23howpolymorphworks";
import CompositionAggregation from "../pages/24compositionaggregation";
import CompositionAggregationMemory from "../pages/25compaggregate2";
import AssociationDemo from "../pages/26association";
import AssociationVsAggregation from "../pages/27AssociationVsAggregation";
import GarbageCollectorSimulator from "../pages/28garbagecollection";
import DeepVsShallowVisualizer from "../pages/29deepshallowcopy";
import AccessModifierSimulator from "../pages/30staticpublic";
import ProtectedSimulator from "../pages/31protected";
import ThisAndSuperSimulator from "../pages/32thisandsuper";

// SOLID 33-38
import SOLIDPrinciplesLab from "../pages/33solidprinciples";
import SRPLab from "../pages/34srplab";
import OCPLab from "../pages/35ocblab";
import LSPLab from "../pages/36lsplab";
import ISPLab from "../pages/37isplab";
import DIPLab from "../pages/38diplab";

// Design Patterns 39-44
import SingletonLab from "../pages/39singleton";
import FactoryMethodLab from "../pages/40factory";
import BuilderLab from "../pages/41builder";
import AdapterPaymentLab from "../pages/42adapter";
import ObserverLab from "../pages/43observer";
import DecoratorLab from "../pages/44decorator";

// Threads
import ThreadLab from "../pages/45thread";
import BackgroundProcessing from "../pages/46backgroundprocess";

// Programming Logic
import ConditionalLogic from "../pages/47elseifandswitch";
import LoopVisualizer from "../pages/48loops";

// DSA
import DSAConceptExplorer from "../pages/49dsa";
import TimeComplexityVisualizer from "../pages/50timecomplexity";
import SpaceComplexityVisualizer from "../pages/51spacecomplexity";
import RecursionVisualizer from "../pages/52recursion";
import RecursionVsIteration from "../pages/53recursionvsiteration";
import CallStackVisualizer from "../pages/54callstack";
import PassByConcept from "../pages/55passbyrefvsvalue";
import BindingVisualizer from "../pages/56staticvsdynamicbind";
import LambdaVisualizer from "../pages/57lamda";
import ClosureVisualizer from "../pages/58closures";
import ScopeLifetimeVisualizer from "../pages/59scopeandlifetime";
import VariableShadowingVisualizer from "../pages/60variableshadowing";
import HoistingVisualizer from "../pages/61hoisting";
import ExecutionContextVisualizer from "../pages/62executioncontext";

// Async
import EventLoopVisualizer from "../pages/63eventloop";
import CallbackVisualizer from "../pages/64callbackfunctions";
import PromiseVisualizer from "../pages/65promises";
import AsyncAwaitInternals from "../pages/66asyncawait";
import AsyncClosureVisualizer from "../pages/67asyncclosures";
import DebouncingVisualizer from "../pages/68debouncing";
import ThrottlingVisualizer from "../pages/69throttling";
import DebounceVsThrottle from "../pages/70debouncevsthrottle";

// Data Structures 71-89
import ArrayMemoryVisualizer from "../pages/71arrays";
import DynamicArrayVisualizer from "../pages/72dynamicarray";
import LinkedListVisualizer from "../pages/73linkedlist";
import ArrayVsLinkedList from "../pages/74arrayvslinkedlist";
import DoublyLinkedListVisualizer from "../pages/75doublylinkedlist";
import StackVisualizer from "../pages/76stackdatastructure";
import QueueVisualizer from "../pages/77queue";
import QueueVsCircularQueue from "../pages/78circularqueue";
import PriorityQueueVisualizer from "../pages/79priorityqueue";
import HashMapTeaching from "../pages/80hashmap";
import HashCollisionVisualizer from "../pages/81hashcollision";
import SetVisualizer from "../pages/82set";
import TreeVisualizer from "../pages/83tree";
import BinaryTreeVisualizer from "../pages/84binarytree";
import BSTVisualizer from "../pages/85binarysearchtree";
import HeapVisualizer from "../pages/86heap";
import TrieVisualizer from "../pages/87trie";
import GraphVisualizer from "../pages/88graph";
import DirectedVsUndirected from "../pages/89directedandundirectedgraph";

// Graph Algorithms
import DFSMazeVisualizer from "../pages/90dfs";
import BFSMazeVisualizer from "../pages/91bfs";

// Searching
import LinearSearchVisualizer from "../pages/92linearsearch";
import BinarySearchVisualizer from "../pages/93binarysearch";

// Sorting
import BubbleSortVisualizer from "../pages/94bubblesort";
import SelectionSortVisualizer from "../pages/95selectionsort";
import InsertionSortVisualizer from "../pages/96insertionsort";
import BubbleVsInsertionSort from "../pages/97bubblevsinsertion";
import MergeSortVisualizer from "../pages/98mergesort";
import QuickSort from "../pages/99quicksort";

// Advanced
import GreedyAlgorithm from "../pages/100greedy";
import DynamicProgrammingComparison from "../pages/101dynamicprogram";
import Backtracking from "../pages/102backtracking";


export const visualizers = [

  {
    category: "Programming Basics",
    items: [
      ["Variables & Memory",    "/variables",   VariablesMemoryDemo],
      ["Primitive Types",       "/primitives",  PrimitiveTypesVisualizer],
      ["Conditions",            "/conditions",  ConditionalLogic],
      ["Loops",                 "/loops",       LoopVisualizer],
      ["Functions",             "/functions",   FunctionMachine],
      ["Pass by Ref vs Value",  "/passbyref",   PassByConcept],
      ["Lambda",                "/lambda",      LambdaVisualizer],
      ["Closures",              "/closures",    ClosureVisualizer],
      ["Scope & Lifetime",      "/scope",       ScopeLifetimeVisualizer],
      ["Variable Shadowing",    "/shadowing",   VariableShadowingVisualizer],
      ["Hoisting",              "/hoisting",    HoistingVisualizer],
      ["Execution Context",     "/execution",   ExecutionContextVisualizer],
    ],
  },

  {
    category: "Memory Management",
    items: [
      ["Stack & Heap",          "/stackheap",   StackHeapExplain],
      ["Memory Concept",        "/memory",      MemoryConceptVisualizer],
      ["Memory Space Layout",   "/memspace",    MemorySpaceVisualizer],
      ["Detailed Memory Space", "/memdetail",   DetailedMemorySpaceVisualizer],
      ["Operations in Memory",  "/memops",      OperationMemoryVisualizer],
      ["String Immutability",   "/string",      StringImmutabilityVisualizer],
      ["Garbage Collector",     "/gc",          GarbageCollectorSimulator],
      ["Deep vs Shallow Copy",  "/copy",        DeepVsShallowVisualizer],
    ],
  },

  {
    category: "Object Oriented Programming",
    items: [
      ["Class & Object",            "/class",         OOPClassObject],
      ["Function in Class",         "/funcinclass",   OOPCarRace],
      ["Constructor & Attributes",  "/constructor",   ConstructorAndAttributes],
      ["Encapsulation",             "/encapsulation", EncapsulationVisualizer],
      ["Inheritance",               "/inheritance",   InheritanceDemo],
      ["Abstraction",               "/abstraction",   AbstractionDemo],
      ["Interface",                 "/interface",     InterfaceDemo],
      ["Interface (Communication)", "/interface2",    PaymentInterfaceDemo],
      ["Interface vs Inheritance",  "/intvsinheri",   InterfaceVsInheritance],
      ["Runtime Polymorphism",      "/polymorphism",  RuntimePolymorphism],
      ["Compile-time Polymorphism", "/ctpolymorph",   CompileTimePolymorphism],
      ["How Polymorphism Works",    "/polymorphhow",  PolymorphismExecution],
      ["Composition & Aggregation", "/composition",   CompositionAggregation],
      ["Composition Memory",        "/compmem",       CompositionAggregationMemory],
      ["Association",               "/association",   AssociationDemo],
      ["Association vs Aggregation","/assocvsagg",    AssociationVsAggregation],
      ["Static & Public",           "/staticpublic",  AccessModifierSimulator],
      ["Protected",                 "/protected",     ProtectedSimulator],
      ["this & super",              "/thissuper",     ThisAndSuperSimulator],
    ],
  },

  {
    category: "SOLID Principles",
    items: [
      ["SOLID Overview",                    "/solid",   SOLIDPrinciplesLab],
      ["Single Responsibility (SRP)",       "/srp",     SRPLab],
      ["Open / Closed (OCP)",               "/ocp",     OCPLab],
      ["Liskov Substitution (LSP)",         "/lsp",     LSPLab],
      ["Interface Segregation (ISP)",       "/isp",     ISPLab],
      ["Dependency Inversion (DIP)",        "/dip",     DIPLab],
    ],
  },

  {
    category: "Design Patterns",
    items: [
      ["Singleton",   "/singleton",   SingletonLab],
      ["Factory",     "/factory",     FactoryMethodLab],
      ["Builder",     "/builder",     BuilderLab],
      ["Adapter",     "/adapter",     AdapterPaymentLab],
      ["Observer",    "/observer",    ObserverLab],
      ["Decorator",   "/decorator",   DecoratorLab],
    ],
  },

  {
    category: "Concurrency & Async",
    items: [
      ["Sync vs Async (Basic)",   "/asyncbasic",    AsyncAlarmClock],
      ["Async vs Sync Concept",   "/asyncconcept",  AsyncSyncVisualizer],
      ["Threads",                 "/thread",        ThreadLab],
      ["Background Processing",   "/bgprocess",     BackgroundProcessing],
      ["Event Loop",              "/eventloop",     EventLoopVisualizer],
      ["Callbacks",               "/callbacks",     CallbackVisualizer],
      ["Promises",                "/promises",      PromiseVisualizer],
      ["Async / Await",           "/asyncawait",    AsyncAwaitInternals],
      ["Async Closures",          "/asyncclosure",  AsyncClosureVisualizer],
      ["Debouncing",              "/debounce",      DebouncingVisualizer],
      ["Throttling",              "/throttle",      ThrottlingVisualizer],
      ["Debounce vs Throttle",    "/debouncevthro", DebounceVsThrottle],
    ],
  },

  {
    category: "DSA Fundamentals",
    items: [
      ["DSA Overview",            "/dsa",           DSAConceptExplorer],
      ["Time Complexity",         "/timecomplexity",TimeComplexityVisualizer],
      ["Space Complexity",        "/spacecomplx",   SpaceComplexityVisualizer],
      ["Recursion",               "/recursion",     RecursionVisualizer],
      ["Recursion vs Iteration",  "/recvsiter",     RecursionVsIteration],
      ["Call Stack",              "/callstack",     CallStackVisualizer],
      ["Static vs Dynamic Bind",  "/binding",       BindingVisualizer],
    ],
  },

  {
    category: "Data Structures",
    items: [
      ["Array",                   "/array",         ArrayMemoryVisualizer],
      ["Dynamic Array",           "/dynarray",      DynamicArrayVisualizer],
      ["Array vs Linked List",    "/arrayvll",      ArrayVsLinkedList],
      ["Linked List",             "/linkedlist",    LinkedListVisualizer],
      ["Doubly Linked List",      "/doublylist",    DoublyLinkedListVisualizer],
      ["Stack",                   "/stack",         StackVisualizer],
      ["Queue",                   "/queue",         QueueVisualizer],
      ["Circular Queue",          "/circqueue",     QueueVsCircularQueue],
      ["Priority Queue",          "/prioqueue",     PriorityQueueVisualizer],
      ["HashMap",                 "/hashmap",       HashMapTeaching],
      ["Hash Collision",          "/hashcollision", HashCollisionVisualizer],
      ["Set",                     "/set",           SetVisualizer],
      ["Tree",                    "/tree",          TreeVisualizer],
      ["Binary Tree",             "/binarytree",    BinaryTreeVisualizer],
      ["Binary Search Tree",      "/bst",           BSTVisualizer],
      ["Heap",                    "/heap",          HeapVisualizer],
      ["Trie",                    "/trie",          TrieVisualizer],
      ["Graph",                   "/graph",         GraphVisualizer],
      ["Directed vs Undirected",  "/graphdir",      DirectedVsUndirected],
    ],
  },

  {
    category: "Algorithms",
    items: [
      ["DFS",                     "/dfs",           DFSMazeVisualizer],
      ["BFS",                     "/bfs",           BFSMazeVisualizer],
      ["Linear Search",           "/linear",        LinearSearchVisualizer],
      ["Binary Search",           "/binary",        BinarySearchVisualizer],
      ["Bubble Sort",             "/bubble",        BubbleSortVisualizer],
      ["Selection Sort",          "/selection",     SelectionSortVisualizer],
      ["Insertion Sort",          "/insertion",     InsertionSortVisualizer],
      ["Bubble vs Insertion",     "/bubvsinser",    BubbleVsInsertionSort],
      ["Merge Sort",              "/merge",         MergeSortVisualizer],
      ["Quick Sort",              "/quick",         QuickSort],
      ["Greedy",                  "/greedy",        GreedyAlgorithm],
      ["Dynamic Programming",     "/dp",            DynamicProgrammingComparison],
      ["Backtracking",            "/backtracking",  Backtracking],
    ],
  },

];