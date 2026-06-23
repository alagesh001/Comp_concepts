import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
  Cpu,
  Database,
  Layers,
  Play,
  RotateCcw,
  Code2,
  MemoryStick,
  Sparkles
} from "lucide-react";



const CONCEPTS = {


"O(1)":{

title:"Constant Space",

desc:
"Uses fixed memory. Extra memory does not grow with input size.",

example:
"Swap two numbers",

code:
`
int temp;

temp = a;
a = b;
b = temp;

Only one extra variable
`

},




"O(n)":{

title:"Linear Space",

desc:
"Memory grows as input grows.",

example:
"Store all user records",

code:
`
array[n]

Each item needs memory

`

},





"O(n²)":{

title:"Quadratic Space",

desc:
"Memory grows with square of input size.",

example:
"2D Matrix",

code:
`
matrix[n][n]

Rows × Columns

`

}



};







export default function SpaceComplexityVisualizer(){


const [type,setType]=useState("O(1)");

const [size,setSize]=useState(5);

const [memory,setMemory]=useState([]);

const [running,setRunning]=useState(false);

const [logs,setLogs]=useState([]);






function reset(){

setMemory([]);

setLogs([]);

setRunning(false);

}







function run(){


reset();

setRunning(true);


let count=0;


let total;


if(type==="O(1)")
total=1;


if(type==="O(n)")
total=size;


if(type==="O(n²)")
total=size*size;



const timer=setInterval(()=>{


setMemory(prev=>[
...prev,
count
]);



setLogs(prev=>[
`Allocated memory block ${count+1}`,
...prev
]);



count++;



if(count>=Math.min(total,50)){


clearInterval(timer);

setRunning(false);


}


},200);



}






return (


<div className="
min-h-screen
bg-gradient-to-br
from-green-50
to-blue-100
p-8
">


<div className="
max-w-7xl
mx-auto
">






<h1 className="
text-5xl
font-black
text-center
">

Space Complexity Lab

</h1>


<p className="
text-center
text-gray-500
mt-3
">

Understand how much memory algorithms use

</p>








<div className="
flex
justify-center
gap-4
mt-10
">


{
Object.keys(CONCEPTS).map(x=>(


<button

key={x}

onClick={()=>setType(x)}

className={`

px-7
py-3
rounded-xl
font-bold


${type===x
?
"bg-black text-white"
:
"bg-white"}

`}

>


{x}


</button>


))

}



</div>









<div className="
grid
lg:grid-cols-2
gap-8
mt-10
">







{/* LEFT */}





<motion.div

whileHover={{
y:-5
}}

className="
bg-white
rounded-3xl
shadow-xl
p-8
"

>




<div className="
flex
gap-3
items-center
">


<MemoryStick/>


<h2 className="
text-3xl
font-black
">

{type}

</h2>


</div>






<h3 className="
text-xl
font-bold
mt-5
">

{CONCEPTS[type].title}

</h3>






<p className="
mt-4
text-gray-600
text-lg
">

{CONCEPTS[type].desc}

</p>








<div className="
mt-6
bg-blue-50
rounded-xl
p-5
">

<b>
Example:
</b>

<br/>

{CONCEPTS[type].example}


</div>









<label className="
block
mt-8
font-bold
">

Input Size:
{size}

</label>




<input

type="range"

min="1"

max="10"

value={size}

onChange={
e=>setSize(Number(e.target.value))
}

className="
w-full
mt-3
"

/>









<div className="
mt-8
flex
gap-4
">


<button

onClick={run}

disabled={running}

className="
flex-1
bg-green-600
text-white
py-4
rounded-xl
flex
justify-center
gap-2
"

>

<Play/>

Allocate Memory

</button>





<button

onClick={reset}

className="
bg-gray-200
p-4
rounded-xl
"

>

<RotateCcw/>

</button>


</div>








</motion.div>













{/* MEMORY */}





<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-2xl
font-bold
flex
gap-3
">

<Cpu/>

Memory Visualization

</h2>







<div className="
mt-8
grid
grid-cols-5
gap-3
">


<AnimatePresence>


{
memory.map((_,i)=>(


<motion.div


key={i}


initial={{
scale:0
}}

animate={{
scale:1
}}



className="
h-14
bg-green-500
rounded-xl
flex
items-center
justify-center
text-white
font-bold
"

>

{i+1}


</motion.div>


))


}



</AnimatePresence>


</div>









<div className="
mt-8
bg-gray-900
text-green-300
rounded-xl
p-5
">


<pre>

{CONCEPTS[type].code}

</pre>


</div>








<div className="
mt-6
space-y-2
">


{
logs.slice(0,8).map((l,i)=>(


<motion.p

key={i}

initial={{
opacity:0
}}

animate={{
opacity:1
}}

>

🧠 {l}

</motion.p>


))

}



</div>







</div>









</div>









{/* MEMORY TYPES */}





<div className="
mt-10
grid
md:grid-cols-2
gap-6
">






<div className="
bg-white
rounded-3xl
shadow-xl
p-7
">


<h2 className="
text-2xl
font-bold
flex
gap-3
">

<Layers/>

Stack Memory

</h2>


<p className="
mt-4
text-gray-600
">

Stores local variables and function calls.

Example:

</p>


<code>

int x = 10;

</code>


</div>








<div className="
bg-white
rounded-3xl
shadow-xl
p-7
">


<h2 className="
text-2xl
font-bold
flex
gap-3
">

<Database/>

Heap Memory

</h2>


<p className="
mt-4
text-gray-600
">

Stores dynamically created objects and large data.

Example:

</p>


<code>

new Array()

</code>


</div>





</div>







<div className="
mt-10
bg-purple-600
text-white
rounded-3xl
p-8
flex
gap-4
items-center
">


<Sparkles/>

<b>

Good algorithms reduce both time and memory usage.

</b>


</div>





</div>

</div>


)

}