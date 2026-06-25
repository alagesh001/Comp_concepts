import React,{useEffect,useState} from "react";
import {motion} from "framer-motion";
import {
Play,
Pause,
RotateCcw,
Shuffle,
Code2,
Lightbulb,
Layers,
ArrowRight,
Undo2,
XCircle,
CheckCircle
} from "lucide-react";


const SIZE=5;



const emptyMaze=()=>{

let maze=
Array.from(
{length:SIZE},
()=>Array(SIZE).fill(0)
);


// random walls

for(let i=0;i<5;i++){

let r=
Math.floor(Math.random()*SIZE);

let c=
Math.floor(Math.random()*SIZE);


if(
(r===0&&c===0) ||
(r===SIZE-1&&c===SIZE-1)
)
continue;


maze[r][c]=1;

}


return maze;

};







export default function Backtracking(){


const [maze,setMaze]=useState(emptyMaze());

const [steps,setSteps]=useState([]);

const [step,setStep]=useState(0);

const [running,setRunning]=useState(false);

const [paused,setPaused]=useState(false);

const [speed,setSpeed]=useState(700);

const [tab,setTab]=useState("visual");









function createSteps(){


let logs=[];

let visited=new Set();

let path=[];

let failed=[];





function solve(r,c){



if(
r<0||
c<0||
r>=SIZE||
c>=SIZE
)
return false;



if(
maze[r][c]===1
)
return false;



let key=`${r}-${c}`;


if(visited.has(key))
return false;




visited.add(key);

path.push([r,c]);





logs.push({

type:"try",

current:[r,c],

path:[...path],

failed:[...failed],


text:

`
TRY PATH


Move to:

(${r},${c})


Checking this choice...

`

});







if(
r===SIZE-1 &&
c===SIZE-1
){


logs.push({

type:"success",

current:[r,c],

path:[...path],

failed:[...failed],


text:

`
SUCCESS 🎉


Destination reached.

Keep this path.

`

});


return true;

}







let directions=[

[1,0],
[0,1],
[-1,0],
[0,-1]

];






for(let [dr,dc] of directions){


let nr=r+dr;

let nc=c+dc;



if(
solve(nr,nc)
)
return true;



}







// failed

path.pop();


failed.push([r,c]);



logs.push({

type:"backtrack",

current:[r,c],

path:[...path],

failed:[...failed],


text:

`
FAILED ❌


(${r},${c})
is not useful.


BACKTRACK ↩️


Remove this choice.

Try another path.

`

});




return false;


}






solve(0,0);



return logs;


}









function start(){


setSteps(createSteps());

setStep(0);

setRunning(true);

setPaused(false);


}








useEffect(()=>{


if(
!running||
paused||
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

setMaze(emptyMaze());

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


<Undo2/>

Backtracking Visualizer


</h1>









<div className="
grid
md:grid-cols-4
gap-4
mb-8
">



<div className="
bg-blue-50
p-4
rounded-xl
">

Try Choice

</div>


<div className="
bg-red-50
p-4
rounded-xl
">

Failed ❌

</div>


<div className="
bg-yellow-50
p-4
rounded-xl
">

Backtrack ↩️

</div>


<div className="
bg-green-50
p-4
rounded-xl
">

Success ✅

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
mb-6
items-center
">



<input

type="range"

min="300"

max="1200"

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

New Maze

</button>



</div>









<div className="
grid
grid-cols-5
gap-3
w-fit
mx-auto
mb-8
">


{
maze.map((row,r)=>

row.map((cell,c)=>{


let active =
current?.current?.[0]===r &&
current?.current?.[1]===c;



let visited =
current?.path?.some(
p=>p[0]===r&&p[1]===c
);



let fail =
current?.failed?.some(
p=>p[0]===r&&p[1]===c
);



return (

<motion.div

key={`${r}-${c}`}

animate={{

scale:
active?
1.2:
1

}}

className={`

w-16
h-16

rounded-xl

flex
items-center
justify-center

font-bold
text-white


${
cell
?
"bg-slate-800"
:
fail
?
"bg-red-500"
:
visited
?
"bg-green-500"
:
"bg-slate-300"

}

`}

>


{
active?
"●"
:
r===0&&c===0?
"START"
:
r===SIZE-1&&c===SIZE-1?
"END"
:
cell?
"🧱"
:
""

}



</motion.div>


)

})


)


}



</div>









{
current &&


<div className="
bg-blue-50
rounded-xl
p-6
mb-6
whitespace-pre-line
">


<h2 className="
font-bold
text-xl
mb-3
flex
gap-2
">


{
current.type==="try"
?
<>
<Play/>
Trying Path
</>

:

current.type==="backtrack"
?
<>
<XCircle/>
Backtracking
</>

:
<>
<CheckCircle/>
Success
</>

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
paused?<Play/>:<Pause/>
}


</button>





<button

onClick={reset}

className="
bg-gray-800
text-white
px-6
py-3
rounded-xl
flex gap-2
"

>


<RotateCcw/>

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

solve(cell){

 try choice

 if fail:

    remove choice

    go back

}


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
<ArrowRight/> Sudoku
</li>

<li>
<ArrowRight/> N Queens
</li>

<li>
<ArrowRight/> Maze Solver
</li>

<li>
<ArrowRight/> Game AI
</li>


</ul>


</div>

}



</div>

</div>

)

}