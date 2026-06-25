import React, { useEffect, useRef, useState } from "react";
import {motion} from "framer-motion";
import {
Play,
Pause,
RotateCcw,
Shuffle,
Code2,
Lightbulb,
Brain,
Layers,
ArrowRight,
RefreshCcw
} from "lucide-react";


export default function DynamicProgrammingComparison(){


const [n,setN]=useState(6);

const [steps,setSteps]=useState([]);

const [step,setStep]=useState(0);

const [running,setRunning]=useState(false);

const [paused,setPaused]=useState(false);

const [speed,setSpeed]=useState(900);

const [tab,setTab]=useState("visual");
const containerRef = useRef(null);

useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollLeft =
      containerRef.current.scrollWidth;
  }
}, [steps]);


function buildTree(value){


let nodes=[];


function create(x,xPos,yPos){


let id=nodes.length;


nodes.push({

id,
value:x,
x:xPos,
y:yPos

});


if(x<=1)return;


create(
x-1,
xPos-80,
yPos+90
);


create(
x-2,
xPos+80,
yPos+90
);


}


create(value,330,30);


return nodes;

}







function generateSteps(value){


let logs=[];


let tree=buildTree(value);



logs.push({

mode:"normal",

type:"start",

tree,

memo:[],

active:null,


text:

`
NORMAL RECURSION START


Finding Fibonacci(${value})


Problem:

Same values can be calculated
multiple times.

`

});








tree.forEach(node=>{


logs.push({

mode:"normal",

type:"calculate",

tree,

memo:[],

active:node.id,


text:

`
NORMAL RECURSION


Calculating:

F(${node.value})


No memory is used.

`

});


});







let memo=[];



memo[0]=0;


logs.push({

mode:"dp",

type:"store",

memo:[...memo],

tree:[],

active:0,


text:

`
DYNAMIC PROGRAMMING


Store:

F(0)=0


Save answer for reuse.

`

});







memo[1]=1;


logs.push({

mode:"dp",

type:"store",

memo:[...memo],

tree:[],

active:1,


text:

`
Store:

F(1)=1

`

});






for(let i=2;i<=value;i++){



memo[i]=
memo[i-1]+memo[i-2];



logs.push({

mode:"dp",

type:"calculate",

memo:[...memo],

tree:[],

active:i,


text:

`
DP CALCULATION


F(${i})

=

F(${i-1})
+
F(${i-2})


=

${memo[i]}


Store result.

`

});



}





logs.push({

mode:"dp",

type:"done",

memo:[...memo],

tree:[],

active:null,


text:

`
COMPLETED


Normal recursion:
Repeats calculations ❌


Dynamic Programming:
Stores answers ✅

`

});



return logs;


}









function start(){


setSteps(
generateSteps(n)
);


setStep(0);

setRunning(true);

setPaused(false);


}










useEffect(()=>{


if(
!running ||
paused ||
steps.length===0
)
return;



if(step>=steps.length-1){

setRunning(false);

return;

}


let timer=setTimeout(()=>{

setStep(v=>v+1)

},speed);


return()=>clearTimeout(timer);



},[
step,
running,
paused,
speed,
steps
]);







function reset(){

setSteps([]);

setStep(0);

setRunning(false);

}








function randomize(){


setN(
Math.floor(Math.random()*5)+5
);

reset();


}







const current=steps[step];










return (

<div className="
min-h-screen
bg-slate-100
p-8
">


<div className="
max-w-7xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-8
">





<div className="
flex
justify-between
items-center
mb-8
">


<h1 className="
text-4xl
font-bold
flex gap-3
items-center
">


<Brain/>

Dynamic Programming

</h1>




{
current &&

<div className={`
px-5 py-3
rounded-full
font-bold
flex gap-2 items-center

${
current.mode==="normal"
?
"bg-red-100 text-red-700"
:
"bg-green-100 text-green-700"
}

`}>

{
current.mode==="normal"
?
<RefreshCcw/>
:
<Layers/>
}


{
current.mode==="normal"
?
"Normal Recursion Running"
:
"Dynamic Programming Running"
}


</div>

}


</div>









<div className="
grid
md:grid-cols-2
gap-6
mb-8
">


<div className="
bg-red-50
border
rounded-2xl
p-6
">


<h2 className="
font-bold
text-2xl
text-red-700
">

❌ Normal Recursion

</h2>


<p className="mt-3">

Calculates the same problem
again and again.

</p>


</div>






<div className="
bg-green-50
border
rounded-2xl
p-6
">


<h2 className="
font-bold
text-2xl
text-green-700
">

✅ Dynamic Programming

</h2>


<p className="mt-3">

Stores previous answers and reuses them.

</p>


</div>


</div>








<div className="flex gap-3 mb-8">


{
[
["visual","Visual"],
["code","Code"],
["use","Use Cases"]
]
.map(t=>

<button

key={t[0]}

onClick={()=>setTab(t[0])}

className={`
px-5 py-3 rounded-xl flex gap-2

${
tab===t[0]
?
"bg-blue-600 text-white"
:
"bg-slate-200"
}

`}

>


{
t[0]==="code"
?
<Code2/>
:
t[0]==="use"
?
<Lightbulb/>
:
<Play/>
}


{t[1]}


</button>

)

}


</div>









{
tab==="visual" &&


<>







<div className="
flex
gap-5
items-center
mb-6
">


<input

type="number"

value={n}

min="3"

max="9"

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





<input

type="range"

min="300"

max="1600"

value={speed}

onChange={
e=>setSpeed(Number(e.target.value))
}

className="w-48"

/>





<button

onClick={randomize}

className="
bg-purple-600
text-white
px-5
py-3
rounded-xl
flex gap-2
"

>


<Shuffle/>

Random

</button>


</div>








<div
  ref={containerRef}
  className="
    relative
    bg-slate-50
    rounded-2xl
    overflow-auto
    mb-6
  "
  style={{
    height: `${Math.max(420, n * 90)}px`
  }}
>

<div
className="
relative
mx-auto
"
style={{
  width:`${Math.max(900,n*180)}px`,
  height:`${Math.max(420,n*90)}px`
}}
>


{
current?.tree?.map(node=>

<motion.div

key={node.id}

animate={{
scale:
current.active===node.id
?
1.25
:
1
}}

transition={{
duration:0.3
}}

className={`
absolute
w-14
h-14
rounded-full

flex
items-center
justify-center

font-bold
text-white
shadow-lg

${
current.active===node.id
?
"bg-orange-500"
:
"bg-blue-500"
}
`}


style={{

left:
`calc(50% + ${node.x}px)`,

top:
node.y

}}


>

F{node.value}

</motion.div>


)

}


</div>

</div>









<div className="
grid
md:grid-cols-2
gap-6
">






<div className="
bg-slate-100
rounded-2xl
p-6
">


<h2 className="font-bold text-xl mb-4">

Memo Table

</h2>


<div className="flex flex-wrap gap-3">


{
current?.memo?.map((v,i)=>

<motion.div

key={i}

animate={{

scale:
current.active===i
?
1.2
:
1

}}


className={`
px-4
py-3
rounded-xl
text-white
font-bold

${
current.active===i
?
"bg-orange-500"
:
"bg-green-500"
}

`}

>

F{i}: {v}

</motion.div>


)

}


</div>


</div>







<div className="
bg-blue-50
rounded-2xl
p-6
whitespace-pre-line
">


{current?.text}


</div>



</div>








<div className="
flex
gap-4
mt-8
">


<button

onClick={start}

className="
bg-green-600
text-white
px-6
py-3
rounded-xl
flex gap-2
"


>

<Play/>

Start

</button>





<button

onClick={()=>setPaused(!paused)}

className="
bg-yellow-400
px-6
rounded-xl
"

>

{
paused?<Play/>:<Pause/>
}

</button>





<button
  onClick={reset}
  className="
    flex items-center gap-2
    bg-gray-800 hover:bg-gray-900
    text-white
    px-6 py-3
    rounded-xl
    transition
  "
>
  <RotateCcw size={20} />
  Reset
</button>


</div>



</>

}








{
tab==="code" &&

<pre className="
bg-slate-900
text-green-300
p-6
rounded-xl
">


{`

// Recursion

fib(n-1)+fib(n-2)



// Dynamic Programming

dp[i]=
dp[i-1]+dp[i-2]


`}


</pre>

}








{
tab==="use" &&


<div className="
bg-slate-100
p-6
rounded-xl
">


<h2 className="
font-bold
text-xl
flex gap-2
">

<Layers/>

Applications

</h2>


<ul className="
mt-4
space-y-3
">


<li>
<ArrowRight/> Knapsack
</li>

<li>
<ArrowRight/> LCS
</li>

<li>
<ArrowRight/> Path Finding
</li>

<li>
<ArrowRight/> Optimization
</li>


</ul>


</div>


}



</div>

</div>

)

}