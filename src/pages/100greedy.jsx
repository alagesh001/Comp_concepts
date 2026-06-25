import React,{useEffect,useState} from "react";
import {motion} from "framer-motion";
import {
Play,
Pause,
RotateCcw,
Shuffle,
Code2,
Lightbulb,
Target,
Layers,
ArrowRight
} from "lucide-react";



const COINS=[50,20,10,5,2,1];




export default function GreedyAlgorithm(){



const [amount,setAmount]=useState(63);

const [steps,setSteps]=useState([]);

const [step,setStep]=useState(0);

const [running,setRunning]=useState(false);

const [paused,setPaused]=useState(false);

const [speed,setSpeed]=useState(900);

const [tab,setTab]=useState("visual");








function createSteps(value){


let logs=[];


let remaining=value;


let selected=[];



logs.push({

type:"start",

remaining,

selected:[],

coin:null,

text:

`
Start Amount:

₹${value}

Greedy Strategy:

Always pick the biggest possible coin.

`

});







COINS.forEach(coin=>{


while(
remaining>=coin
){



logs.push({

type:"check",

coin,

remaining,

selected:[...selected],

text:

`
Checking coin:

₹${coin}

Remaining amount:

₹${remaining}

Can we use it?

`

});







remaining-=coin;


selected.push(coin);





logs.push({

type:"take",

coin,

remaining,

selected:[...selected],

text:

`
✅ Take ₹${coin}

Because it is the largest
available choice.

Remaining:

₹${remaining}

`

});



}



});







logs.push({

type:"done",

selected,

remaining,

text:

`
🎉 Completed

Coins used:

${selected.join(", ")}

`

});



return logs;


}








function start(){


setSteps(
createSteps(amount)
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

setStep(v=>v+1);

},speed);



return ()=>clearTimeout(timer);



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


let value =
Math.floor(
Math.random()*90
)+10;


setAmount(value);

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
max-w-6xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-8
">





<h1 className="
text-4xl
font-bold
flex
gap-3
items-center
mb-6
">


<Target/>

Greedy Algorithm Visualizer


</h1>








<div className="
bg-green-50
border
border-green-200
rounded-xl
p-6
mb-8
">


<h2 className="
font-bold
text-xl
mb-3
">

What is Greedy Algorithm?

</h2>


<p className="text-gray-700">


A greedy algorithm makes the best choice
at the current moment.

It does not explore every possibility.

It chooses what looks best now.

</p>


</div>









<div className="
bg-blue-50
rounded-xl
p-5
mb-8
">


<h2 className="
font-bold
text-lg
">

Example: Coin Change

</h2>


<p>

Goal:

Make ₹{amount}

using minimum coins.

</p>


<p className="mt-2">

Greedy:

Pick the biggest coin first.

</p>


</div>








<div className="
flex
gap-3
mb-8
">


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
justify-between
mb-6
">


<div>

<h2 className="font-bold">

Amount ₹{amount}

</h2>

</div>





<div className="w-64">
  
  <div className="flex justify-between mb-2">
    <span className="font-medium">Speed</span>
    <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">
      {speed} ms
    </span>
  </div>

  <div className="relative">
    {/* Colored track */}
    <div className="h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-purple-600 rounded-full"
        style={{
          width: `${((speed - 300) / 1200) * 100}%`,
        }}
      />
    </div>

    {/* Slider */}
    <input
      type="range"
      min="300"
      max="1500"
      step="100"
      value={speed}
      onChange={(e) =>
        setSpeed(Number(e.target.value))
      }
      className="
        absolute top-0 left-0
        w-full h-2
        cursor-pointer
        opacity-0
      "
    />
  </div>

  <div className="flex justify-between text-sm text-gray-500 mt-2">
    <span>🐢 Slow</span>
    <span>🚀 Fast</span>
  </div>

</div>


</div>









<div className="
flex
gap-4
flex-wrap
mb-8
">


{
COINS.map(c=>

<motion.div

key={c}

animate={{

scale:
current?.coin===c
?
1.25
:
1

}}


className={`

w-24
h-24
rounded-xl
flex
items-center
justify-center
font-bold
text-xl


${
current?.coin===c

?

"bg-orange-400"

:

"bg-blue-500 text-white"

}

`}

>


₹{c}

</motion.div>

)

}


</div>








<div className="
bg-purple-50
rounded-xl
p-6
mb-6
whitespace-pre-line
">


{current?.text}


</div>









<div className="
flex
gap-4
mb-6
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
paused?
<Play/>
:
<Pause/>
}


</button>





<button
  onClick={randomize}
  className="
    flex items-center gap-2
    px-5 py-3
    bg-purple-600 hover:bg-purple-700
    text-white font-medium
    rounded-xl
    transition-colors duration-200
  "
>
  <Shuffle size={20} />
  Random Amount
</button>




<button

onClick={reset}

className="
bg-gray-700
text-white
px-5
rounded-xl
"

>

<RotateCcw/>

</button>


</div>







<div className="
bg-slate-100
rounded-xl
p-5
">


<h3 className="font-bold">

Selected Coins

</h3>


<div className="flex gap-2 mt-3 flex-wrap">


{
current?.selected?.map((c,i)=>

<div

key={i}

className="
bg-green-500
text-white
px-4
py-2
rounded-lg
"

>

₹{c}

</div>

)

}


</div>


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

for every choice:

pick the best option

remove it

repeat


`}


</pre>


}









{
tab==="use" &&


<div className="
bg-slate-100
rounded-xl
p-6
">


<h2 className="
font-bold
text-xl
flex gap-2
">

<Layers/>

Applications

</h2>



<ul className="space-y-3 mt-4">


<li>
<ArrowRight/>
Dijkstra Algorithm
</li>


<li>
<ArrowRight/>
Activity Selection
</li>


<li>
<ArrowRight/>
Huffman Coding
</li>


<li>
<ArrowRight/>
Scheduling Problems
</li>


</ul>


</div>


}





</div>

</div>

)

}