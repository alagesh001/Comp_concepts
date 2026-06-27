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

//AI
import SpamFilterDemo from "../pages/103aiintro";
import AStarVisualizer from "../pages/104searchalgo";
import InterviewMCQ from "../pages/question1";


export const visualizers = [

  {
    category: "1 Programming Basics",
    items: [
      ["1 Variables & Memory",    "/variables",   VariablesMemoryDemo],
      ["2 Primitive Types",       "/primitives",  PrimitiveTypesVisualizer],
      ["3 Conditions",            "/conditions",  ConditionalLogic],
      ["4 Loops",                 "/loops",       LoopVisualizer],
      ["5 Functions",             "/functions",   FunctionMachine],
      ["6 Pass by Ref vs Value",  "/passbyref",   PassByConcept],
      ["7 Lambda",                "/lambda",      LambdaVisualizer],
      ["8 Closures",              "/closures",    ClosureVisualizer],
      ["9 Scope & Lifetime",      "/scope",       ScopeLifetimeVisualizer],
      ["10 Variable Shadowing",    "/shadowing",   VariableShadowingVisualizer],
      ["11 Hoisting",              "/hoisting",    HoistingVisualizer],
      ["12 Execution Context",     "/execution",   ExecutionContextVisualizer],
    ],
  },

  {
    category: "2 Memory Management",
    items: [
      ["1 Stack & Heap",          "/stackheap",   StackHeapExplain],
      ["2 Memory Concept",        "/memory",      MemoryConceptVisualizer],
      ["3 Memory Space Layout",   "/memspace",    MemorySpaceVisualizer],
      ["4 Detailed Memory Space", "/memdetail",   DetailedMemorySpaceVisualizer],
      ["5 Operations in Memory",  "/memops",      OperationMemoryVisualizer],
      ["6 String Immutability",   "/string",      StringImmutabilityVisualizer],
      ["7 Garbage Collector",     "/gc",          GarbageCollectorSimulator],
      ["8 Deep vs Shallow Copy",  "/copy",        DeepVsShallowVisualizer],
    ],
  },

  {
    category: "3 Object Oriented Programming",
    items: [
      ["1 Class & Object",            "/class",         OOPClassObject],
      ["2 Function in Class",         "/funcinclass",   OOPCarRace],
      ["3 Constructor & Attributes",  "/constructor",   ConstructorAndAttributes],
      ["4 Encapsulation",             "/encapsulation", EncapsulationVisualizer],
      ["5 Inheritance",               "/inheritance",   InheritanceDemo],
      ["6 Abstraction",               "/abstraction",   AbstractionDemo],
      ["7 Interface",                 "/interface",     InterfaceDemo],
      ["8 Interface (Communication)", "/interface2",    PaymentInterfaceDemo],
      ["9 Interface vs Inheritance",  "/intvsinheri",   InterfaceVsInheritance],
      ["10 Runtime Polymorphism",      "/polymorphism",  RuntimePolymorphism],
      ["11 Compile-time Polymorphism", "/ctpolymorph",   CompileTimePolymorphism],
      ["12 How Polymorphism Works",    "/polymorphhow",  PolymorphismExecution],
      ["13 Composition & Aggregation", "/composition",   CompositionAggregation],
      ["14 Composition Memory",        "/compmem",       CompositionAggregationMemory],
      ["15 Association",               "/association",   AssociationDemo],
      ["16 Association vs Aggregation","/assocvsagg",    AssociationVsAggregation],
      ["17 Static & Public",           "/staticpublic",  AccessModifierSimulator],
      ["18 Protected",                 "/protected",     ProtectedSimulator],
      ["19 this & super",              "/thissuper",     ThisAndSuperSimulator],
    ],
  },

  {
    category: "4 SOLID Principles",
    items: [
      ["1 SOLID Overview",                    "/solid",   SOLIDPrinciplesLab],
      ["2 Single Responsibility (SRP)",       "/srp",     SRPLab],
      ["3 Open / Closed (OCP)",               "/ocp",     OCPLab],
      ["4 Liskov Substitution (LSP)",         "/lsp",     LSPLab],
      ["5 Interface Segregation (ISP)",       "/isp",     ISPLab],
      ["6 Dependency Inversion (DIP)",        "/dip",     DIPLab],
    ],
  },

  {
    category: "5 Design Patterns",
    items: [
      ["1 Singleton",   "/singleton",   SingletonLab],
      ["2 Factory",     "/factory",     FactoryMethodLab],
      ["3 Builder",     "/builder",     BuilderLab],
      ["4 Adapter",     "/adapter",     AdapterPaymentLab],
      ["5 Observer",    "/observer",    ObserverLab],
      ["6 Decorator",   "/decorator",   DecoratorLab],
    ],
  },

  {
    category: "6 Concurrency & Async",
    items: [
      ["1 Sync vs Async (Basic)",   "/asyncbasic",    AsyncAlarmClock],
      ["2 Async vs Sync Concept",   "/asyncconcept",  AsyncSyncVisualizer],
      ["3 Threads",                 "/thread",        ThreadLab],
      ["4 Background Processing",   "/bgprocess",     BackgroundProcessing],
      ["5 Event Loop",              "/eventloop",     EventLoopVisualizer],
      ["6 Callbacks",               "/callbacks",     CallbackVisualizer],
      ["7 Promises",                "/promises",      PromiseVisualizer],
      ["8 Async / Await",           "/asyncawait",    AsyncAwaitInternals],
      ["9 Async Closures",          "/asyncclosure",  AsyncClosureVisualizer],
      ["10 Debouncing",              "/debounce",      DebouncingVisualizer],
      ["11 Throttling",              "/throttle",      ThrottlingVisualizer],
      ["12 Debounce vs Throttle",    "/debouncevthro", DebounceVsThrottle],
    ],
  },

  {
    category: "7 DSA Fundamentals",
    items: [
      ["1 DSA Overview",            "/dsa",           DSAConceptExplorer],
      ["2 Time Complexity",         "/timecomplexity",TimeComplexityVisualizer],
      ["3 Space Complexity",        "/spacecomplx",   SpaceComplexityVisualizer],
      ["4 Recursion",               "/recursion",     RecursionVisualizer],
      ["5 Recursion vs Iteration",  "/recvsiter",     RecursionVsIteration],
      ["6 Call Stack",              "/callstack",     CallStackVisualizer],
      ["7 Static vs Dynamic Bind",  "/binding",       BindingVisualizer],
    ],
  },

  {
    category: "8 Data Structures",
    items: [
      ["1 Array",                   "/array",         ArrayMemoryVisualizer],
      ["2 Dynamic Array",           "/dynarray",      DynamicArrayVisualizer],
      ["3 Array vs Linked List",    "/arrayvll",      ArrayVsLinkedList],
      ["4 Linked List",             "/linkedlist",    LinkedListVisualizer],
      ["5 Doubly Linked List",      "/doublylist",    DoublyLinkedListVisualizer],
      ["6 Stack",                   "/stack",         StackVisualizer],
      ["7 Queue",                   "/queue",         QueueVisualizer],
      ["8 Circular Queue",          "/circqueue",     QueueVsCircularQueue],
      ["9 Priority Queue",          "/prioqueue",     PriorityQueueVisualizer],
      ["10 HashMap",                 "/hashmap",       HashMapTeaching],
      ["11 Hash Collision",          "/hashcollision", HashCollisionVisualizer],
      ["12 Set",                     "/set",           SetVisualizer],
      ["13 Tree",                    "/tree",          TreeVisualizer],
      ["14 Binary Tree",             "/binarytree",    BinaryTreeVisualizer],
      ["15 Binary Search Tree",      "/bst",           BSTVisualizer],
      ["16 Heap",                    "/heap",          HeapVisualizer],
      ["17 Trie",                    "/trie",          TrieVisualizer],
      ["18 Graph",                   "/graph",         GraphVisualizer],
      ["19 Directed vs Undirected",  "/graphdir",      DirectedVsUndirected],
    ],
  },

  {
    category: "9 Algorithms",
    items: [
      ["1 DFS",                     "/dfs",           DFSMazeVisualizer],
      ["2 BFS",                     "/bfs",           BFSMazeVisualizer],
      ["3 Linear Search",           "/linear",        LinearSearchVisualizer],
      ["4 Binary Search",           "/binary",        BinarySearchVisualizer],
      ["5 Bubble Sort",             "/bubble",        BubbleSortVisualizer],
      ["6 Selection Sort",          "/selection",     SelectionSortVisualizer],
      ["7 Insertion Sort",          "/insertion",     InsertionSortVisualizer],
      ["8 Bubble vs Insertion",     "/bubvsinser",    BubbleVsInsertionSort],
      ["9 Merge Sort",              "/merge",         MergeSortVisualizer],
      ["10 Quick Sort",              "/quick",         QuickSort],
      ["11 Greedy",                  "/greedy",        GreedyAlgorithm],
      ["12 Dynamic Programming",     "/dp",            DynamicProgrammingComparison],
      ["13 Backtracking",            "/backtracking",  Backtracking],
    ],
  },
  
  // {
  //   category: "10 AI",
  //   items: [
  //     ["1 AI Intro",                     "/aiintro",           SpamFilterDemo],
  //           ["2 Search Algorithms",                     "/aisearch",           AStarVisualizer],

     
  //   ],
  // },
  {
    category: "10 Test Series",
    items: [
      ["1 Test A",                     "/test1",           InterviewMCQ],

     
    ],
  },

];