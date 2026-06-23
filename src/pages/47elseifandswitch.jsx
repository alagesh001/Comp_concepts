import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
 Play,
 RotateCcw,
 CheckCircle,
 XCircle,
 GitBranch,
 Code2,
 Zap,
 ArrowRight,
 Sparkles
} from "lucide-react";


const COUNTRIES=[
 "indian",
 "american",
 "african",
 "european",
 "asian"
];
const MESSAGES = {
  indian: "Namaste! Welcome from India 🇮🇳",
  american: "Hello! Welcome from America 🇺🇸",
  african: "Welcome! Greetings from Africa 🌍",
  european: "Welcome! Greetings from Europe 🇪🇺",
  asian: "Hello! Welcome from Asia 🌏"
};


export default function ConditionalVisualizer(){


const [name,setName]=useState("indian");
const [type,setType]=useState("elseif");

const [steps,setSteps]=useState([]);
const [result,setResult]=useState("");
const [running,setRunning]=useState(false);




function reset(){

setSteps([]);
setResult("");
setRunning(false);

}





function execute(){


reset();

setRunning(true);



if(type==="elseif"){


let flow=[];


for(let country of COUNTRIES){


flow.push({

text:`Checking name === "${country}"`,

ok:country===name

});


if(country===name)
break;


}



let i=0;



const timer=setInterval(()=>{


setSteps(prev=>[
...prev,
flow[i]
]);



if(flow[i].ok){


setResult(
MESSAGES[name]
);


clearInterval(timer);
setRunning(false);

return;

}



if(i===flow.length-1){


setResult("else executed");


clearInterval(timer);
setRunning(false);

return;


}



i++;


},700);



}

else{


setSteps([


{
text:`Evaluate switch(name) → "${name}"`,
info:true
},


{
text:"Compiler resolves matching case",
info:true
},


{
text:`Jump directly → case "${name}"`,
ok:COUNTRIES.includes(name)
}


]);


setResult(

COUNTRIES.includes(name)

?
MESSAGES[name]

:
"default executed"

);


setRunning(false);



}


}







return (

<div className="
min-h-screen
relative
overflow-hidden
bg-gradient-to-br
from-indigo-100
via-white
to-purple-100
p-8
">


<motion.div

animate={{
x:[0,40,0],
y:[0,-20,0]
}}

transition={{
duration:8,
repeat:Infinity
}}

className="
absolute
w-80
h-80
rounded-full
bg-purple-300
blur-3xl
opacity-30
"

/>



<motion.div

animate={{
x:[0,-40,0],
y:[0,30,0]
}}

transition={{
duration:10,
repeat:Infinity
}}

className="
absolute
w-96
h-96
rounded-full
bg-blue-300
blur-3xl
opacity-30
right-0
bottom-0
"/>






<div className="
relative
max-w-7xl
mx-auto
">






<motion.h1

initial={{
opacity:0,
y:-40
}}

animate={{
opacity:1,
y:0
}}

className="
text-5xl
font-black
text-center
"

>


Conditional Logic Lab

</motion.h1>



<p className="
text-center
text-gray-500
mt-3
text-lg
">

Visual debugger for if-else-if and switch

</p>








<div className="
grid
lg:grid-cols-2
gap-8
mt-10
">







{/* INPUT */}




<Card>



<div className="
flex
items-center
gap-3
">


<Zap className="text-yellow-500"/>


<h2 className="text-2xl font-bold">
Input
</h2>


</div>





<div className="mt-6">


<select

value={name}

onChange={(e)=>setName(e.target.value)}

className="
w-full
p-4
rounded-2xl
border-2
bg-white
text-lg
font-bold
shadow
outline-none
"

>


{
COUNTRIES.map(c=>(


<option
key={c}
value={c}
>

{c.toUpperCase()}

</option>


))

}


</select>



</div>








<div className="
flex
gap-4
mt-8
">


<Toggle

active={type==="elseif"}

onClick={()=>setType("elseif")}

text="else-if"

/>



<Toggle

active={type==="switch"}

onClick={()=>setType("switch")}

text="switch"

/>



</div>








<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:.95
}}

disabled={running}

onClick={execute}

className="
mt-8
w-full
bg-black
text-white
py-4
rounded-2xl
font-bold
flex
justify-center
gap-3
"

>



<motion.div

animate={{
rotate:running?360:0
}}

transition={{
duration:1,
repeat:running?Infinity:0
}}

>

<Play/>

</motion.div>


{
running
?
"Running..."
:
"Execute Code"
}



</motion.button>







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


<RotateCcw className="inline mr-2"/>

Reset


</button>



</Card>












{/* EXECUTION */}




<Card>



<div className="
flex
gap-3
items-center
">


<GitBranch/>


<h2 className="text-2xl font-bold">
Execution
</h2>


</div>





{
running &&

<motion.div

animate={{
opacity:[0.3,1,0.3]
}}

transition={{
repeat:Infinity
}}

className="
text-blue-600
font-bold
mt-5
"

>

Analyzing conditions...

</motion.div>


}





<div className="
mt-6
space-y-4
">



<AnimatePresence>



{
steps.map((s,i)=>(


<motion.div

key={i}

initial={{
opacity:0,
scale:.8,
x:-40
}}

animate={{
opacity:1,
scale:1,
x:0
}}

transition={{
type:"spring"
}}

className={`

relative
overflow-hidden
p-5
rounded-2xl
flex
items-center
gap-3
shadow-lg


${s.info
?
"bg-blue-100"
:
s.ok
?
"bg-green-100"
:
"bg-red-100"}

`}


>


{
s.ok &&

<motion.div

animate={{
scale:[1,1.5,1]
}}

transition={{
repeat:Infinity
}}

className="
absolute
inset-0
bg-green-300
opacity-20
"

/>

}



<div className="relative flex gap-3">


{

s.info

?

<ArrowRight/>

:

s.ok

?

<CheckCircle className="text-green-600"/>

:

<XCircle className="text-red-600"/>


}



{s.text}


</div>


</motion.div>


))


}



</AnimatePresence>


</div>






{
result &&


<motion.div

initial={{
scale:.7,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

className="
mt-8
bg-gradient-to-r
from-green-500
to-blue-500
text-white
p-5
rounded-2xl
font-bold
text-xl
flex
gap-3
"

>


<Sparkles/>

{result}


</motion.div>


}



</Card>



</div>









{/* CODE */}




<div className="
grid
lg:grid-cols-2
gap-8
mt-10
">




<CodeBlock

title="else-if"

>

{`

if(name=="indian")
    print("${MESSAGES.indian}");

else if(name=="american")
    print("${MESSAGES.american}");

else if(name=="african")
    print("${MESSAGES.african}");

else if(name=="european")
    print("${MESSAGES.european}");

else if(name=="asian")
    print("${MESSAGES.asian}");

else
    print("Unknown");

`}


</CodeBlock>






<CodeBlock

title="switch"

>

{`

switch(name){

case "indian":
    print("${MESSAGES.indian}");
    break;


case "american":
    print("${MESSAGES.american}");
    break;


case "african":
    print("${MESSAGES.african}");
    break;


case "european":
    print("${MESSAGES.european}");
    break;


case "asian":
    print("${MESSAGES.asian}");
    break;



default:
    print("Unknown");

}

`}


</CodeBlock>



</div>






<div className="
mt-10
bg-white/70
backdrop-blur
rounded-3xl
shadow
p-7
">


<h2 className="
text-2xl
font-bold
flex
gap-2
">

<Code2/>

How it works

</h2>


<p className="
mt-4
text-gray-600
text-lg
">


<b>else-if</b> evaluates each condition from top to bottom.


<br/>


<b>switch</b> evaluates the value once and jumps to the matching case.


</p>



</div>






</div>

</div>

)

}








function Card({children}){


return (

<motion.div

whileHover={{
y:-5
}}

className="
bg-white/80
backdrop-blur
rounded-3xl
shadow-xl
p-7
"

>


{children}


</motion.div>


)

}





function Toggle({active,text,onClick}){


return (

<button

onClick={onClick}

className={`

px-7
py-3
rounded-xl
font-bold

${active
?
"bg-purple-600 text-white shadow"
:
"bg-gray-200"}

`}

>


{text}


</button>

)

}





function CodeBlock({title,children}){


return (

<div className="
bg-gray-950
text-green-300
rounded-3xl
p-7
shadow-xl
">


<h2 className="
text-white
font-bold
text-xl
mb-5
flex
gap-2
">


<Code2/>

{title}


</h2>



<pre className="
leading-8
">

{children}

</pre>



</div>

)

}