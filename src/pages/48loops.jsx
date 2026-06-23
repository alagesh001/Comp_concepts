import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
 Play,
 RotateCcw,
 Repeat,
 CheckCircle,
 Code2,
 Users,
 Download,
 Menu
} from "lucide-react";


const SCENARIOS = {

for:{
 title:"for loop",
 icon:Users,
 description:"When you know how many times something should repeat",
 example:"Process 5 students",

code:
`
for(int i=1;i<=5;i++){

  processStudent(i);

}
`,
total:5
},


while:{
 title:"while loop",
 icon:Download,
 description:"When repetition depends on a changing condition",
 example:"Download until 100%",

code:
`
while(progress < 100){

 downloadChunk();

 progress += 20;

}
`,
total:5
},



do:{
 title:"do-while",
 icon:Menu,
 description:"When code must execute at least once",
 example:"Show menu before checking exit",

code:
`
do{

 showMenu();

 choice=input();

}
while(choice!="exit");

`,
total:1

}

};






export default function LoopScenarioVisualizer(){


const [type,setType]=useState("for");

const [running,setRunning]=useState(false);
const [step,setStep]=useState(0);
const [logs,setLogs]=useState([]);




function reset(){

setStep(0);
setLogs([]);
setRunning(false);

}





function start(){


reset();

setRunning(true);


let i=0;



const timer=setInterval(()=>{


if(i>=SCENARIOS[type].total){

clearInterval(timer);
setRunning(false);

return;

}



setStep(i+1);



setLogs(prev=>[
...prev,
`Executing step ${i+1}`
]);



i++;



},800);



}







const scenario=SCENARIOS[type];

const Icon=scenario.icon;






return (

<div className="
min-h-screen
bg-gradient-to-br
from-indigo-100
to-purple-100
p-8
">


<div className="
max-w-6xl
mx-auto
">



<h1 className="
text-5xl
font-black
text-center
">

Loop Usage Simulator

</h1>



<p className="
text-center
mt-3
text-gray-500
">

Choose a real programming situation

</p>








<div className="
flex
justify-center
gap-4
mt-10
">


{
Object.keys(SCENARIOS).map(key=>(


<button

key={key}

onClick={()=>setType(key)}

className={`

px-7
py-3
rounded-xl
font-bold


${type===key

?
"bg-black text-white"

:
"bg-white"}

`}

>

{SCENARIOS[key].title}

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







{/* SCENARIO */}



<motion.div

whileHover={{
y:-5
}}

className="
bg-white
rounded-3xl
shadow-xl
p-7
"

>



<div className="
flex
gap-3
items-center
">


<Icon/>


<h2 className="
text-3xl
font-bold
">

{scenario.title}

</h2>


</div>





<p className="
mt-5
text-gray-600
text-lg
">

{scenario.description}

</p>





<div className="
mt-6
bg-blue-50
p-5
rounded-2xl
font-bold
">


Scenario:

<br/>

{scenario.example}


</div>







<button

onClick={start}

disabled={running}

className="
mt-8
w-full
bg-blue-600
text-white
py-4
rounded-xl
flex
justify-center
gap-3
"

>


<Play/>

Run Scenario


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


<RotateCcw
className="inline"
/>

Reset


</button>




</motion.div>











{/* EXECUTION */}





<motion.div

className="
bg-white
rounded-3xl
shadow-xl
p-7
"

>



<h2 className="
text-2xl
font-bold
flex
gap-3
">


<Repeat/>

Live Execution


</h2>





<div className="
mt-8
flex
justify-center
">


<motion.div

key={step}

initial={{
scale:0
}}

animate={{
scale:1
}}

className="
w-40
h-40
rounded-full
bg-black
text-white
flex
items-center
justify-center
text-5xl
font-black
"

>

{step}

</motion.div>



</div>







<div className="
mt-8
space-y-3
">


<AnimatePresence>


{
logs.map((x,i)=>(


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
bg-green-100
p-4
rounded-xl
flex
gap-2
"

>


<CheckCircle
className="text-green-600"
/>

{x}


</motion.div>


))

}


</AnimatePresence>


</div>






</motion.div>



</div>









{/* CODE */}




<div className="
mt-10
bg-gray-950
rounded-3xl
p-7
text-green-300
shadow-xl
">


<h2 className="
text-white
text-2xl
font-bold
flex
gap-3
">


<Code2/>

Actual Code


</h2>



<pre className="
mt-5
leading-8
">

{scenario.code}

</pre>



</div>





</div>


</div>

)

}