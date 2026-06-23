import React,{useState} from "react";
import {motion} from "framer-motion";
import {
Zap,
Clock,
Code2,
TrendingUp,
Layers,
Play
} from "lucide-react";



const COMPLEXITIES={


"O(1)":{

name:"Constant Time",

color:"bg-green-500",

desc:
"Execution time stays same no matter how big the input becomes.",

example:
"Access array index",

code:
`
arr[5]

Only one operation
`

},



"O(log n)":{

name:"Logarithmic",

color:"bg-blue-500",

desc:
"Problem size reduces every step. Very efficient.",

example:
"Binary Search",

code:
`
while(left <= right){

middle=(left+right)/2

}

`

},





"O(n)":{

name:"Linear",

color:"bg-yellow-500",

desc:
"Work grows directly with input size.",

example:
"Loop through array",

code:
`
for(i=0;i<n;i++){

 print(i)

}

`

},





"O(n log n)":{

name:"Linearithmic",

color:"bg-purple-500",

desc:
"Common in efficient sorting algorithms.",

example:
"Merge Sort",

code:
`
divide()
+
merge()

`

},





"O(n²)":{

name:"Quadratic",

color:"bg-red-500",

desc:
"Nested loops. Becomes slow with large data.",

example:
"Bubble Sort",

code:
`
for(i=0;i<n;i++)
 for(j=0;j<n;j++)

`

}

};






export default function TimeComplexityVisualizer(){


const [selected,setSelected]=useState("O(n)");

const [size,setSize]=useState(10);

const [running,setRunning]=useState(false);

const [steps,setSteps]=useState([]);





function simulate(){


setSteps([]);

setRunning(true);


let count=0;


const timer=setInterval(()=>{


setSteps(prev=>[
...prev,
`Operation ${count+1}`
]);


count++;


if(count>=5){

clearInterval(timer);
setRunning(false);

}


},500);


}







function growth(c){


switch(c){

case "O(1)":
return 1;

case "O(log n)":
return Math.log2(size)+1;

case "O(n)":
return size;

case "O(n log n)":
return size*Math.log2(size);

case "O(n²)":
return size*size;


default:
return 0;

}

}






return (

<div className="
min-h-screen
bg-gradient-to-br
from-indigo-100
to-purple-100
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

Time Complexity Lab

</h1>



<p className="
text-center
text-gray-500
mt-3
">

Understand algorithm speed visually

</p>








<div className="
grid
lg:grid-cols-5
gap-4
mt-10
">


{
Object.keys(COMPLEXITIES).map(c=>(


<motion.button

whileHover={{
scale:1.05
}}

onClick={()=>setSelected(c)}

className={`

p-5
rounded-2xl
font-bold
shadow


${selected===c
?
"bg-black text-white"
:
"bg-white"}

`}

>


{c}


</motion.button>


))

}



</div>








<div className="w-full mt-8">

  <div className="flex items-center justify-between mb-2">
    <label className="text-sm font-semibold text-gray-800">
      Input Size
    </label>

    <span className="px-3 py-1 text-xs font-bold bg-gray-900 text-white rounded-full">
      {size}
    </span>
  </div>

  <input
    type="range"
    min="1"
    max="50"
    value={size}
    onChange={(e) => setSize(Number(e.target.value))}
    style={{
      background: `linear-gradient(to right, #111827 ${(size - 1) * 2}%, #d1d5db ${(size - 1) * 2}%)`,
    }}
    className="
      w-full
      h-2
      rounded-full
      appearance-none
      cursor-pointer
      accent-gray-900
      transition-all
    "
  />

  <div className="flex justify-between text-xs text-gray-500 mt-2">
    <span>1</span>
    <span>25</span>
    <span>50</span>
  </div>

</div>

<div className="
grid
lg:grid-cols-2
gap-8
mt-10
">








{/* DETAILS */}




<motion.div

key={selected}

initial={{
opacity:0,
x:-30
}}

animate={{
opacity:1,
x:0
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


<TrendingUp/>

<h2 className="
text-3xl
font-black
">

{selected}

</h2>


</div>





<h3 className="
mt-4
text-xl
font-bold
">

{COMPLEXITIES[selected].name}

</h3>





<p className="
mt-4
text-gray-600
text-lg
">

{COMPLEXITIES[selected].desc}

</p>





<div className="
mt-6
bg-gray-100
rounded-xl
p-4
font-bold
">

Example:

{COMPLEXITIES[selected].example}

</div>











<div className="
mt-6
bg-gray-950
text-green-300
rounded-xl
p-5
">


<pre>

{COMPLEXITIES[selected].code}

</pre>


</div>







<button

onClick={simulate}

className="
mt-6
w-full
bg-black
text-white
py-4
rounded-xl
flex
justify-center
gap-2
"

>

<Play/>

Run Operations


</button>







</motion.div>













{/* GRAPH */}





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

<Clock/>

Growth Visualization

</h2>







<div className="
mt-8
space-y-5
">



{
Object.keys(COMPLEXITIES).map(c=>(


<div key={c}>


<div className="
flex
justify-between
font-bold
">

{c}

<span>

{Math.round(growth(c))}

steps

</span>

</div>




<div className="
h-5
bg-gray-200
rounded-full
overflow-hidden
mt-2
">


<motion.div

animate={{

width:
`${Math.min(growth(c),100)}%`

}}

className={`
h-full
${COMPLEXITIES[c].color}
`}

/>


</div>


</div>


))

}




</div>









<div className="
mt-10
bg-blue-50
p-5
rounded-xl
">


<h3 className="font-bold">

Execution

</h3>


{
steps.map((s,i)=>(


<motion.p

key={i}

initial={{
opacity:0
}}

animate={{
opacity:1
}}

>

{s}

</motion.p>


))

}


</div>





</div>








</div>






<div className="
mt-10
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

<Code2/>

How to think about Big-O

</h2>


<ul className="
mt-5
space-y-3
text-gray-600
text-lg
">


<li>⚡ O(1) → Instant lookup</li>

<li>🚀 O(log n) → Divide and conquer</li>

<li>📦 O(n) → Check every item</li>

<li>⚙️ O(n log n) → Efficient sorting</li>

<li>🐢 O(n²) → Compare everything with everything</li>


</ul>


</div>







</div>

</div>


)

}