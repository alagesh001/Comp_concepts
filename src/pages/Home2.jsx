import React,{useState} from "react";
import {motion} from "framer-motion";
import {
Search,
ArrowRight,
BookOpen,
ChevronDown,
Sparkles
} from "lucide-react";

import {Link} from "react-router-dom";
import {visualizers} from "../data/visualizers";



const icons={

"Programming Basics":"💻",
"Memory Management":"🧠",
"Object Oriented Programming":"🏗️",
"Data Structures":"🌳",
"Algorithms":"🚀",

};






export default function Home2(){


const [search,setSearch]=useState("");

const [open,setOpen]=useState(null);





const filtered =
visualizers.map(category=>{


return {

...category,


items:
category.items.filter(item=>

item[0]
.toLowerCase()
.includes(
search.toLowerCase()
)

)

}


})
.filter(
cat=>cat.items.length>0
);







const total =
visualizers.reduce(
(sum,cat)=>
sum+cat.items.length,
0
);






return (

<div className="
min-h-screen
bg-slate-100
p-8
">






<div className="
max-w-7xl
mx-auto
">








{/* Header */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-10
mb-10
">


<div className="
flex
items-center
gap-3
mb-4
">


<div className="
bg-blue-600
text-white
p-4
rounded-2xl
">


<Sparkles size={32}/>


</div>



<h1 className="
text-5xl
font-bold
">


Algorithm Explorer


</h1>


</div>





<p className="
text-slate-600
text-lg
">


Interactive visual learning platform for
Programming, DSA and Algorithms


</p>





<div className="
mt-8
flex
gap-6
flex-wrap
">



<div className="
bg-blue-50
rounded-2xl
p-5
">


<h2 className="
text-3xl
font-bold
text-blue-600
">


{total}


</h2>


<p>

Visualizers

</p>


</div>





<div className="
bg-green-50
rounded-2xl
p-5
">


<h2 className="
text-3xl
font-bold
text-green-600
">


{visualizers.length}


</h2>


<p>

Categories

</p>


</div>




</div>



</div>









{/* Search */}



<div className="
relative
mb-10
">


<Search

className="
absolute
left-4
top-4
text-slate-400
"

/>



<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="
Search visualizer...
"

className="
w-full
bg-white
rounded-2xl
shadow
p-4
pl-12
text-lg
outline-none
"

/>



</div>









{/* Categories */}



<div className="
space-y-8
">





{
filtered.map(
(category,index)=>

<motion.div


key={category.category}


initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*0.08
}}



className="
bg-white
rounded-3xl
shadow-lg
overflow-hidden
"


>







<button


onClick={()=>


setOpen(
open===index
?
null
:
index
)


}


className="
w-full
p-6
flex
justify-between
items-center
"


>



<div className="
flex
items-center
gap-4
">


<div className="
text-5xl
">


{
icons[category.category]
||
"📚"
}


</div>



<div>


<h2 className="
text-2xl
font-bold
text-left
">


{category.category}


</h2>


<p className="
text-slate-500
">


{
category.items.length
}

Topics


</p>


</div>


</div>




<ChevronDown

className={`
transition-transform

${
open===index
?
"rotate-180"
:
""
}

`}

/>



</button>









<motion.div


initial={false}

animate={{

height:
open===index
?
"auto"
:
0,

opacity:
open===index
?
1
:
0


}}


className="
overflow-hidden
"


>


<div className="
p-6
pt-0
grid
md:grid-cols-3
gap-4
">





{
category.items.map(
(item)=>

<Link

key={item[1]}

to={item[1]}

className="
group
bg-slate-100
rounded-2xl
p-5
flex
justify-between
items-center

hover:bg-blue-100
transition
"


>


<span className="
font-semibold
">


{item[0]}


</span>




<ArrowRight

size={18}

className="
group-hover:translate-x-2
transition
"

/>



</Link>


)

}



</div>


</motion.div>








</motion.div>


)

}




</div>








<div className="
mt-12
bg-white
rounded-3xl
p-8
shadow
flex
gap-3
items-center
">


<BookOpen/>


<p className="
text-slate-600
">


Select a topic to start learning interactively.

</p>


</div>







</div>


</div>


)

}