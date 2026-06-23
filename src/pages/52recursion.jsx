import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
 Play,
 RotateCcw,
 Layers,
 Code2,
 GitBranch,
 Sparkles
} from "lucide-react";


export default function RecursionVisualizer(){


const [number,setNumber]=useState(5);

const [running,setRunning]=useState(false);

const [stack,setStack]=useState([]);

const [logs,setLogs]=useState([]);

const [returned,setReturned]=useState([]);





function reset(){

setStack([]);
setLogs([]);
setReturned([]);
setRunning(false);

}




function start(){


reset();

setRunning(true);


let n=number;


let frames=[];



// create recursive calls

while(n>0){

frames.push(n);
n--;

}



let index=0;



const timer=setInterval(()=>{


if(index < frames.length){



let value=frames[index];



setStack(prev=>[
...prev,
{
id:index,
name:`factorial(${value})`,
value:value
}
]);



setLogs(prev=>[
`Calling factorial(${value})`,
...prev
]);



index++;


}

else{


clearInterval(timer);


// start returning


let r=1;

let i=frames.length-1;



const back=setInterval(()=>{


if(i>=0){


r*=frames[i];


setReturned(prev=>[
...prev,
`${frames[i]} returns → ${r}`
]);


setLogs(prev=>[
`Returning from factorial(${frames[i]})`,
...prev
]);


setStack(prev=>
prev.slice(0,-1)
);



i--;


}

else{

clearInterval(back);
setRunning(false);

}



},700);



}



},700);



}







return (

<div className="
min-h-screen
bg-gradient-to-br
from-purple-50
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

Recursion Visualizer

</h1>


<p className="
text-center
text-gray-500
mt-3
">

Function calling itself and growing the stack

</p>








<div className="
grid
lg:grid-cols-2
gap-8
mt-10
">






{/* INPUT */}



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

<GitBranch/>

Recursive Function

</h2>





<label className="
block
mt-6
font-bold
">

Find factorial of:

</label>


<input

type="number"

value={number}

min="1"

max="8"

onChange={
e=>setNumber(Number(e.target.value))
}

className="
mt-3
p-4
border
rounded-xl
w-full
text-xl
"


/>





<button

disabled={running}

onClick={start}

className="
mt-6
w-full
bg-purple-600
text-white
py-4
rounded-xl
flex
justify-center
gap-3
"

>


<Play/>

Run Recursion


</button>



<button

onClick={reset}

className="
mt-3
w-full
bg-gray-200
py-3
rounded-xl
"

>

<RotateCcw className="inline"/>

Reset

</button>






<div className="
mt-8
bg-purple-50
p-5
rounded-xl
">


<h3 className="font-bold">

Base Condition

</h3>


<p className="mt-2">

if(n == 0) stop calling

</p>


</div>





</div>









{/* STACK */}




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


<Layers/>

Call Stack


</h2>





<div className="
mt-8
flex
flex-col-reverse
gap-3
items-center
">


<AnimatePresence>


{
stack.map(frame=>(


<motion.div


key={frame.id}


initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-50
}}



className="
w-72
bg-blue-600
text-white
rounded-xl
p-4
text-center
font-bold
shadow
"

>


{frame.name}


</motion.div>


))

}


</AnimatePresence>


</div>








{
stack.length>0 &&

<div className="
mt-5
text-center
font-bold
text-blue-600
">

⬆ New calls are pushed here

</div>


}






</div>




</div>









{/* LOGS */}




<div className="
mt-10
grid
lg:grid-cols-2
gap-8
">





<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
font-bold
text-2xl
">

Execution

</h2>


<div className="
mt-5
space-y-3
">


{
logs.map((x,i)=>(


<motion.div

key={i}

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
bg-green-100
p-3
rounded-xl
"

>

{x}


</motion.div>


))

}


</div>



</div>










<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
font-bold
text-2xl
">

Return Flow

</h2>



<div className="
mt-5
space-y-3
">


{
returned.map((x,i)=>(


<motion.div

key={i}

initial={{
scale:0
}}

animate={{
scale:1
}}

className="
bg-yellow-100
p-3
rounded-xl
"

>

{x}

</motion.div>


))

}



</div>




</div>



</div>









{/* CODE */}




<div className="
mt-10
bg-gray-950
text-green-300
rounded-3xl
p-8
">


<h2 className="
text-white
text-2xl
font-bold
flex
gap-3
">

<Code2/>

Code


</h2>



<pre className="
mt-5
leading-8
">


{`

function factorial(n){

 if(n==0)
    return 1;


 return n * factorial(n-1);

}


factorial(${number});

`}



</pre>



</div>








<div className="
mt-10
bg-purple-600
text-white
rounded-3xl
p-8
flex
gap-3
items-center
">


<Sparkles/>


<div>

<b>Important idea:</b>

<br/>

Every recursive call waits in memory until the smaller problem finishes.

</div>


</div>







</div>

</div>


)

}