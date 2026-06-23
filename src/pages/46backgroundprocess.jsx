import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Cpu,
  Server,
  Upload,
  Mail,
  Brain,
  Database,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Plus,
  Activity,
} from "lucide-react";


const TASKS = [
  {
    id: "upload",
    name: "Upload File",
    icon: Upload,
    time: 3000,
  },
  {
    id: "email",
    name: "Send Email",
    icon: Mail,
    time: 2500,
  },
  {
    id: "ai",
    name: "AI Processing",
    icon: Brain,
    time: 4000,
  },
  {
    id: "db",
    name: "Database Sync",
    icon: Database,
    time: 3500,
  },
];


export default function BackgroundProcessing(){


const [queue,setQueue]=useState([]);
const [current,setCurrent]=useState(null);
const [running,setRunning]=useState(true);
const [progress,setProgress]=useState(0);
const [completed,setCompleted]=useState([]);
const [logs,setLogs]=useState([]);



function addTask(task){

 const item={
   ...task,
   uid:Date.now()
 };

 setQueue(q=>[...q,item]);

 setLogs(l=>[
   `Added ${task.name} to background queue`,
   ...l
 ]);

}


useEffect(()=>{

  if(
    running &&
    !current &&
    queue.length > 0
  ){

    const next = queue[0];

    setQueue(q => q.slice(1));

    setCurrent(next);

  }


},[queue,current,running]);
useEffect(() => {

  if (!running || !current) return;


  setProgress(0);


  let value = 0;


  const timer = setInterval(() => {


    value += 10;


    setProgress(value);



    if(value >= 100){


      clearInterval(timer);


      setCompleted(prev => [
        current,
        ...prev
      ]);


      setLogs(prev => [
        `${current.name} completed`,
        ...prev
      ]);


      setCurrent(null);

    }


  }, 300);



  return () => clearInterval(timer);


}, [current, running]);





return (

<div className="
min-h-screen
bg-slate-950
text-white
p-8
">


<div className="
max-w-6xl
mx-auto
">


<h1 className="
text-4xl
font-bold
text-center
">

Background Processing Simulator

</h1>


<p className="
text-center
text-slate-400
mt-3
">

Add heavy tasks. Watch them run without blocking UI.

</p>




{/* Architecture */}


<div className="
grid
md:grid-cols-3
gap-6
mt-10
">


<Card>

<User size={40}/>

<h2>Main Thread</h2>

<p>
Handles buttons and UI.
Never freezes.
</p>


<motion.div
animate={{
y:[0,-10,0]
}}
transition={{
repeat:Infinity
}}
className="
mt-4
bg-blue-500
p-3
rounded
"
>

Responsive

</motion.div>


</Card>





<Card green>


<Server size={40}/>

<h2>Background Worker</h2>

<p>
Processes tasks separately.
</p>



<AnimatePresence>


{
current &&

<motion.div

initial={{
scale:0
}}

animate={{
scale:1
}}

className="
mt-4
bg-green-500
text-black
p-3
rounded
"

>

Processing {current.name}

</motion.div>

}


</AnimatePresence>


</Card>





<Card purple>


<CheckCircle size={40}/>

<h2>Finished</h2>

<p>
Results return later.
</p>


<h3 className="
text-3xl
mt-4
">

{completed.length}

</h3>


</Card>



</div>







{/* Add Tasks */}



<div className="
mt-10
bg-slate-900
rounded-2xl
p-6
">


<h2 className="
text-2xl
font-bold
">

Create Background Jobs

</h2>


<div className="
flex
flex-wrap
gap-4
mt-5
">


{
TASKS.map(Task=>{


const Icon=Task.icon;


return (

<button

key={Task.id}

onClick={()=>addTask(Task)}

className="
bg-slate-800
hover:bg-slate-700
px-5
py-3
rounded-xl
flex
gap-2
items-center
"


>

<Icon size={20}/>

{Task.name}

<Plus size={15}/>

</button>


)


})

}



</div>





{/* Queue */}


<div className="
mt-8
">


<h3 className="flex gap-2">

<Clock/>
 Queue

</h3>


<div className="
flex
gap-3
mt-3
flex-wrap
">


<AnimatePresence>


{
queue.map(task=>(

<motion.div

key={task.uid}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0
}}

className="
bg-yellow-500
text-black
px-4
py-2
rounded
"


>

{task.name}

</motion.div>


))

}


</AnimatePresence>



</div>

</div>






{/* Progress */}


{
current &&

<div className="mt-8">


<div className="
h-4
bg-slate-700
rounded-full
overflow-hidden
">


<motion.div

animate={{
width:`${progress}%`
}}

className="
h-full
bg-green-500
"

/>


</div>


<p className="mt-2">

{progress}% processing

</p>


</div>

}



<button

onClick={()=>setRunning(!running)}

className="
mt-8
bg-white
text-black
px-6
py-3
rounded-xl
flex
gap-2
"


>


{
running
?
<Pause/>
:
<Play/>
}


{
running
?
"Pause Worker"
:
"Start Worker"
}


</button>



</div>







{/* Logs */}


<div className="
mt-8
bg-slate-900
p-6
rounded-xl
">


<h2 className="
flex
gap-2
text-xl
">

<Activity/>

Live System Logs

</h2>


<div className="mt-4 space-y-2">


{
logs.slice(0,8).map((l,i)=>(

<motion.div
key={i}
initial={{
opacity:0
}}
animate={{
opacity:1
}}

className="
text-slate-300
"

>

→ {l}

</motion.div>

))

}



</div>


</div>





</div>

</div>

);

}





function Card({children,green,purple}){

return (

<motion.div

whileHover={{
scale:1.05
}}

className={`
bg-slate-900
p-6
rounded-2xl
border
${green?"border-green-500":
purple?"border-purple-500":
"border-blue-500"}
`}

>


{children}

</motion.div>

)

}