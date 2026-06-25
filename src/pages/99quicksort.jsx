import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Shuffle,
  Code2,
  Lightbulb,
  Zap,
  Layers,
  ArrowRight,
  Target
} from "lucide-react";


const DEFAULT=[7,2,9,4,3,8,5];



export default function QuickSort(){


const [numbers,setNumbers]=useState(DEFAULT);

const [input,setInput]=useState(DEFAULT.join(","));

const [steps,setSteps]=useState([]);

const [step,setStep]=useState(0);

const [running,setRunning]=useState(false);

const [paused,setPaused]=useState(false);

const [speed,setSpeed]=useState(900);

const [tab,setTab]=useState("visual");








function createSteps(arr){


let logs=[];






function swap(a,b,array){

[
array[a],
array[b]
]=
[
array[b],
array[a]
];

}







function partition(array,start,end){


let pivotIndex=end;

let pivot=array[pivotIndex];


logs.push({

type:"pivot",

array:[...array],

pivotIndex,

active:[pivot],


text:

`
🎯 Pivot Selected

Pivot = ${pivot}

Pivot is a value used as a reference.

Numbers smaller than pivot
move to the LEFT.

Numbers larger than pivot
move to the RIGHT.

`

});




let i=start-1;




for(
let j=start;
j<end;
j++
){



logs.push({

type:"compare",

array:[...array],

pivotIndex,

active:[
j,
pivotIndex
],

text:

`
Compare:

Index ${j}
(${array[j]})

with pivot

${pivot}

`

});







if(array[j] < pivot){


i++;




swap(
i,
j,
array
);



logs.push({

type:"swap",

array:[...array],

pivotIndex,

active:[
i,
j
],

text:

`
${array[i]}
is smaller than pivot.

Swap it to the LEFT side.

`

});


}



}







swap(
i+1,
end,
array
);





logs.push({

type:"place",

array:[...array],

pivotIndex:i+1,

active:[
i+1
],

text:

`
Pivot ${pivot}

is now in its final position.

Left side:
smaller values

Right side:
larger values

`

});




return i+1;


}









function quickSort(array,start,end){


if(start<end){


let pivot =
partition(
array,
start,
end
);



logs.push({

type:"divide",

array:[...array],

pivotIndex:pivot,

text:

`
Partition completed.

Now Quick Sort repeats
on the left and right parts.

`

});





quickSort(
array,
start,
pivot-1
);


quickSort(
array,
pivot+1,
end
);



}



}







let copy=[...arr];


quickSort(
copy,
0,
copy.length-1
);



return logs;


}









function start(){


let generated=createSteps(numbers);


setSteps(generated);

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


let arr =
Array.from(
{length:8},
()=>Math.floor(Math.random()*50)+1
);


setNumbers(arr);

setInput(arr.join(","));

reset();

}







function apply(){


let arr =
input
.split(",")
.map(Number)
.filter(Boolean);


setNumbers(arr);

reset();

}






const current=steps[step];



const display =
current?.array || numbers;









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


<Zap/>

Quick Sort Visualizer

</h1>








<div className="
bg-purple-50
border
border-purple-200
rounded-2xl
p-5
mb-8
">


<h2 className="
font-bold
text-xl
flex
gap-2
items-center
">

<Target/>

What is Pivot?

</h2>



<p className="mt-3 text-gray-700">


A pivot is a selected value used
as a divider.

During partition:

<br/>

⬅️ Smaller numbers move left

<br/>

➡️ Bigger numbers move right

<br/>

The pivot reaches its correct sorted position.

</p>


</div>








<div className="
flex gap-3 mb-8
">


{
[
["visual","Visual"],
["code","Flow"],
["use","Use Cases"]
]
.map(t=>

<button

key={t[0]}

onClick={()=>setTab(t[0])}

className={`
px-5
py-3
rounded-xl
flex
gap-2

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
gap-4
mb-6
text-sm
">


<div>
<span className="inline-block w-4 h-4 bg-purple-500 rounded"></span>
Pivot
</div>


<div>
<span className="inline-block w-4 h-4 bg-orange-400 rounded"></span>
Comparing
</div>


<div>
<span className="inline-block w-4 h-4 bg-blue-500 rounded"></span>
Normal
</div>


</div>










<div className="
grid
md:grid-cols-3
gap-5
mb-8
">



<input

value={input}

onChange={
e=>setInput(e.target.value)
}

className="
border
p-3
rounded-xl
"

/>




<div className="
flex
flex-col
gap-2
">


<div className="
flex
justify-between
items-center
">

<label className="
font-semibold
text-gray-700
">

Sorting Speed

</label>


<span className="
text-sm
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
">

{speed} ms

</span>


</div>



<input

type="range"

min="300"

max="1600"

value={speed}

onChange={
e=>setSpeed(Number(e.target.value))
}

className="
w-full
accent-blue-600
cursor-pointer
"

/>


<div className="
flex
justify-between
text-xs
text-gray-400
">

<span>Fast</span>

<span>Slow</span>

</div>


</div>



<div className="
flex
gap-4
items-center
justify-center
">


<button

onClick={randomize}

className="
flex
items-center
gap-2
px-5
py-3

rounded-xl

bg-purple-600
text-white

font-semibold

shadow-md

hover:bg-purple-700

transition

"

>


<Shuffle size={20}/>

Generate Random

</button>





<button

onClick={reset}

className="
flex
items-center
gap-2

px-5
py-3

rounded-xl

bg-slate-700
text-white

font-semibold

shadow-md

hover:bg-slate-800

transition

"

>


<RotateCcw size={20}/>

Reset

</button>


</div>


</div>








<div className="
flex
justify-center
gap-4
mb-8
">


{
display.map((n,i)=>

<motion.div


layout


key={i}



animate={{

y:
current?.active?.includes(i)
?
-20
:
0,

scale:
current?.active?.includes(i)
?
1.15
:
1

}}



className={`

w-20
h-20
rounded-xl

flex
items-center
justify-center

font-bold
text-xl


${
current?.pivotIndex===i

?

"bg-purple-500 text-white"

:

current?.active?.includes(i)

?

"bg-orange-400"

:

"bg-blue-500 text-white"

}


`}


>


{n}


</motion.div>

)

}


</div>







{
current &&


<div className="
bg-blue-50
rounded-2xl
p-6
mb-6
min-h-[220px]
flex
flex-col
justify-center
border
border-blue-100
">


<h2 className="font-bold text-xl mb-3">

{
current.type==="pivot"
?
"🎯 Selecting Pivot"

:
current.type==="compare"
?
"⚖️ Comparing"

:
current.type==="swap"
?
"🔄 Swapping"

:
"📌 Pivot Fixed"

}

</h2>


{current.text}


</div>


}










<div className="flex gap-4">


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
overflow-auto
">

{`

quickSort(arr)

choose pivot

partition()

smaller -> left

larger -> right

repeat

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


<h2 className="font-bold text-xl flex gap-2">

<Layers/>

Applications

</h2>


<ul className="mt-4 space-y-3">

<li>
<ArrowRight/>
Fast in-memory sorting
</li>

<li>
<ArrowRight/>
Searching systems
</li>

<li>
<ArrowRight/>
Database operations
</li>

<li>
<ArrowRight/>
Programming language libraries
</li>


</ul>


</div>


}



</div>

</div>


)

}