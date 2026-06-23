import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
  Layers,
  Play,
  RotateCcw,
  ArrowDown,
  ArrowUp,
  Code2,
  AlertTriangle
} from "lucide-react";



export default function CallStackVisualizer(){

const timerRef = React.useRef(null);
const [stack,setStack]=useState([]);
const [completed,setCompleted]=useState([]);
const [logs,setLogs]=useState([]);
const popTimerRef = React.useRef(null);
const [running,setRunning]=useState(false);
const isPopping = React.useRef(false);
const [functions,setFunctions]=useState([
  "main()",
  "calculate()",
  "process()",
  "display()"
]);




function reset(){


setStack([]);

setCompleted([]);

setLogs([]);

isPopping.current=false;

setRunning(false);


}





function pushFrame(name){


setStack(prev=>[
...prev,
{
id:Date.now(),
name
}
]);


setLogs(prev=>[
`PUSH → ${name} added to stack`,
...prev
]);


}




function popFrame(){


  console.log("POP CALLED");

  if (isPopping.current) {
    console.log("BLOCKED");
    return;
  }


const currentFrame = stack[stack.length - 1];


if(!currentFrame){
  return;
}



isPopping.current = true;



setCompleted(prev=>[
 ...prev,
 currentFrame.name
]);



setLogs(prev=>[
 `COMPLETE → ${currentFrame.name} finished execution`,
 ...prev
]);





setTimeout(() => {
  const frame = stack[stack.length - 1];

  if (!frame) {
    isPopping.current = false;
    return;
  }

  setLogs(logs => [
    `POP → ${frame.name} removed from stack`,
    ...logs,
  ]);

  setStack(prev => prev.slice(0, -1));

  isPopping.current = false;
}, 700);



}




function run() {


if(timerRef.current){
  clearInterval(timerRef.current);
}


reset();

setRunning(true);



const callFrames = [
  "main()",
  "calculate()",
  "process()",
  "display()"
];



let index = 0;


// PUSH PHASE

timerRef.current = setInterval(()=>{


if(index < callFrames.length){


const frameName = callFrames[index];



setStack(prev=>[
 ...prev,
 {
  id:Date.now(),
  name:frameName
 }
]);



setLogs(prev=>[
 `PUSH → ${frameName}`,
 ...prev
]);



index++;


}

else{


clearInterval(timerRef.current);



// POP PHASE

timerRef.current = setInterval(()=>{



setStack(prev=>{


if(prev.length === 0){


clearInterval(timerRef.current);

setRunning(false);

return [];


}



const removedFrame =
prev[prev.length-1];



setLogs(logs=>[

 `POP → ${removedFrame.name}`,

 ...logs

]);



return prev.slice(0,-1);



});



},900);



}



},900);


}







return (

<div className="
min-h-screen
bg-gradient-to-br
from-orange-50
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

Call Stack Visualizer

</h1>


<p className="
text-center
text-gray-500
mt-3
text-lg
">

See how functions enter and leave memory

</p>




<div className="
mt-8
bg-white
rounded-3xl
shadow-xl
p-7
max-w-4xl
mx-auto
">


<h2 className="
text-2xl
font-bold
flex
gap-3
items-center
">

🧠 What is a Call Stack?

</h2>


<p className="
mt-4
text-gray-600
leading-8
text-lg
">


A <b>call stack</b> is a memory area used by the program to keep
track of currently running functions.


<br/><br/>


Whenever a function is called, a new
<b> stack frame </b>
is created and pushed into the stack.


When the function finishes, its frame is removed
(pop operation) and execution returns to the previous function.


<br/><br/>


The stack follows
<b> LIFO (Last In First Out)</b> —
the last function added is the first one to complete.


</p>





<div className="
mt-6
grid
md:grid-cols-3
gap-4
">



<div className="
bg-blue-50
rounded-xl
p-4
">

<b>
PUSH
</b>

<p className="mt-2 text-gray-600">

Function starts → new frame added

</p>

</div>





<div className="
bg-purple-50
rounded-xl
p-4
">

<b>
STACK FRAME
</b>

<p className="mt-2 text-gray-600">

Stores variables and execution state

</p>

</div>






<div className="
bg-green-50
rounded-xl
p-4
">

<b>
POP
</b>

<p className="mt-2 text-gray-600">

Function completes → frame removed

</p>

</div>




</div>




</div>








<div className="
grid
lg:grid-cols-2
gap-8
mt-10
">








{/* STACK */}




<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-3xl
font-bold
flex
gap-3
">

<Layers/>

Call Stack

</h2>





<p className="
mt-3
text-gray-500
">

Last function called executes first.

</p>







<div className="
mt-10
min-h-[400px]
flex
flex-col-reverse
items-center
gap-4
border-4
border-dashed
rounded-2xl
p-5
">



<AnimatePresence>


{
stack.map((frame,i)=>(



<motion.div


key={frame.id}


initial={{
y:-80,
opacity:0,
scale:.5
}}

animate={{
y:0,
opacity:1,
scale:1
}}


exit={{
y:-80,
opacity:0
}}



className="
w-72
bg-purple-600
text-white
rounded-xl
p-5
font-bold
text-center
shadow-xl
"


>


{frame.name}



</motion.div>


))

}



</AnimatePresence>





{
stack.length>0 &&

<div className="
text-purple-600
font-bold
flex
gap-2
">


<ArrowDown/>

TOP OF STACK


</div>


}





</div>








<div className="
grid
grid-cols-2
gap-4
mt-6
">



<button

onClick={pushFrame.bind(null,"manualFunction()")}

className="
bg-blue-600
text-white
p-3
rounded-xl
"

>

Push Frame

</button>




<button

onClick={popFrame}

className="
bg-red-500
text-white
p-3
rounded-xl
"

>

Pop Frame

</button>


</div>









<motion.button

onClick={run}

whileTap={{
  scale:0.92,
  y:3
}}

whileHover={{
  scale:1.03
}}

className="
mt-5
w-full
bg-black
text-white
py-4
rounded-xl
flex
justify-center
gap-3
items-center
cursor-pointer
"

>

<Play
size={22}
/>


Run Program


</motion.button>







</div>












{/* LOGS */}





<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">



<h2 className="
text-3xl
font-bold
flex
gap-3
">

<Code2/>

Execution Flow

</h2>






<div className="
mt-8
space-y-3
">


{
logs.map((log,i)=>(


<motion.div


key={i}

initial={{
opacity:0,
x:30
}}

animate={{
opacity:1,
x:0
}}

className="
bg-gray-100
p-4
rounded-xl
"

>

{log}


</motion.div>


))

}



</div>








<div className="
mt-10
bg-blue-50
rounded-xl
p-5
">


<h3 className="font-bold">

How it works

</h3>


<p className="mt-3">

1. main() starts

<br/>

2. function call happens

<br/>

3. New frame is pushed

<br/>

4. Function finishes

<br/>

5. Frame is popped


</p>



</div>









<div className="
mt-6
bg-red-50
p-5
rounded-xl
flex
gap-3
">


<AlertTriangle/>


<div>


<b>

Stack Overflow

</b>


<p>

Too many function calls fill the stack memory.

</p>


</div>


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
">

Example Code

</h2>





<pre className="
mt-5
leading-8
">


{`

function main(){

 calculate();

}


function calculate(){

 process();

}


function process(){

 display();

}


`}


</pre>




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
">

Real World Usage

</h2>


<div className="
grid
md:grid-cols-3
gap-5
mt-5
">


<Card>
Browser navigation
</Card>

<Card>
Function execution
</Card>

<Card>
Recursion
</Card>


</div>


</div>








</div>

</div>


)

}





function Card({children}){

return (

<div className="
bg-purple-100
p-5
rounded-xl
font-bold
">

{children}

</div>

)

}