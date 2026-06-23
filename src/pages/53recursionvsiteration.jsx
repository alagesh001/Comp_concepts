import React, {useState} from "react";
import {motion} from "framer-motion";
import {
  Repeat,
  Layers,
  Code2,
  Play,
  RotateCcw,
  CheckCircle
} from "lucide-react";


export default function RecursionVsIteration(){


const [n,setN]=useState(5);

const [running,setRunning]=useState(false);

const [loop,setLoop]=useState([]);

const [stack,setStack]=useState([]);

const [result,setResult]=useState(null);





function reset(){

setLoop([]);
setStack([]);
setResult(null);
setRunning(false);

}





function run(){


reset();

setRunning(true);



let factorial=1;


let i=1;



const loopTimer=setInterval(()=>{


if(i<=n){


factorial*=i;


setLoop(prev=>[
...prev,
`i=${i} → result=${factorial}`
]);


i++;


}

else{


clearInterval(loopTimer);



/* recursion visualization */


let calls=[];

for(let x=n;x>=1;x--){

calls.push(x);

}


let index=0;


const recTimer=setInterval(()=>{


if(index<calls.length){


setStack(prev=>[
...prev,
`factorial(${calls[index]})`
]);


index++;

}

else{


clearInterval(recTimer);



let r=1;


for(let x=n;x>=1;x--){

r*=x;

}


setResult(r);

setRunning(false);



}



},500);



}



},500);


}








return (

<div className="
min-h-screen
bg-gradient-to-br
from-blue-50
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

Recursion vs Iteration

</h1>


<p className="
text-center
text-gray-500
mt-3
">

Same problem, different approach

</p>






<div className="
mt-10
bg-white
rounded-3xl
shadow-xl
p-7
flex
gap-5
items-center
">


<label className="font-bold">

Factorial:

</label>


<input

type="number"

min="1"

max="8"

value={n}

onChange={
e=>setN(Number(e.target.value))
}

className="
border
p-3
rounded-xl
w-24
"

/>



<button

onClick={run}

disabled={running}

className="
bg-black
text-white
px-6
py-3
rounded-xl
flex
gap-2
"

>


<Play/>

Run


</button>



<button

onClick={reset}

className="
bg-gray-200
p-3
rounded-xl
"

>


<RotateCcw/>


</button>



</div>








<div className="
grid
lg:grid-cols-2
gap-8
mt-10
">








{/* ITERATION */}





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

<Repeat/>

Iteration

</h2>


<p className="
mt-3
text-gray-600
">

Uses loops. Same memory is reused.

</p>





<div className="
mt-6
space-y-3
">


{
loop.map((x,i)=>(


<motion.div

key={i}

initial={{
opacity:0,
x:-30
}}

animate={{
opacity:1,
x:0
}}

className="
bg-blue-100
p-3
rounded-xl
"

>

{x}

</motion.div>


))

}


</div>






<div className="
mt-8
bg-blue-600
text-white
rounded-xl
p-5
">


Memory:

<br/>

<b>

Single loop variable

</b>


</div>





</div>












{/* RECURSION */}





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

Recursion

</h2>



<p className="
mt-3
text-gray-600
">

Function calls itself. Uses call stack.

</p>







<div className="
mt-6
flex
flex-col-reverse
gap-3
items-center
">


{
stack.map((x,i)=>(


<motion.div

key={i}

initial={{
scale:0
}}

animate={{
scale:1
}}

className="
bg-purple-600
text-white
w-64
p-4
rounded-xl
text-center
font-bold
"

>

{x}

</motion.div>


))

}



</div>







<div className="
mt-8
bg-purple-600
text-white
rounded-xl
p-5
">


Memory:

<br/>

<b>

Multiple stack frames

</b>


</div>





</div>






</div>









{/* RESULT */}




{
result &&


<motion.div

initial={{
scale:0
}}

animate={{
scale:1
}}

className="
mt-10
bg-green-100
rounded-3xl
p-8
text-center
"


>


<h2 className="
text-3xl
font-bold
">

Result

</h2>


<p className="
text-5xl
mt-4
font-black
">

{n}! = {result}

</p>


</motion.div>


}









{/* COMPARISON */}





<div className="
mt-10
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-3xl
font-bold
">

When to use?

</h2>






<div className="
grid
md:grid-cols-2
gap-6
mt-6
">





<div className="
bg-blue-50
p-6
rounded-2xl
">


<h3 className="text-xl font-bold">

Use Iteration

</h3>


<ul className="
mt-4
space-y-2
">


<li>
✅ Simple repeated tasks
</li>

<li>
✅ Need less memory
</li>

<li>
✅ Large input sizes
</li>

<li>
✅ Performance is important
</li>


</ul>


<p className="mt-5 font-bold">

Examples:

</p>


<p>

• Printing numbers

<br/>

• Searching array

<br/>

• Processing files

</p>


</div>









<div className="
bg-purple-50
p-6
rounded-2xl
">


<h3 className="text-xl font-bold">

Use Recursion

</h3>


<ul className="
mt-4
space-y-2
">


<li>
✅ Problem naturally divides
</li>

<li>
✅ Tree structures
</li>

<li>
✅ Cleaner logic
</li>

<li>
✅ Divide and conquer
</li>


</ul>



<p className="mt-5 font-bold">

Examples:

</p>


<p>

• Tree traversal

<br/>

• Folder navigation

<br/>

• Merge sort

</p>


</div>




</div>



</div>







{/* CODE */}





<div className="
mt-10
grid
lg:grid-cols-2
gap-6
">



<CodeBox title="Iteration">

{`
for(i=1;i<=n;i++){

 result*=i;

}
`}

</CodeBox>




<CodeBox title="Recursion">

{`
factorial(n){

 if(n==1)
 return 1;

 return n*
 factorial(n-1);

}
`}

</CodeBox>



</div>







</div>

</div>


)

}





function CodeBox({title,children}){

return (

<div className="
bg-gray-950
text-green-300
rounded-3xl
p-6
">


<h3 className="
text-white
font-bold
flex
gap-2
">

<Code2/>

{title}

</h3>


<pre className="mt-4">

{children}

</pre>


</div>

)

}