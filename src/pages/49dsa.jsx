import React,{useState} from "react";
import {motion} from "framer-motion";
import {
Boxes,
Layers,
GitBranch,
Network,
Search,
ArrowDownUp,
Brain,
Zap,
Code2,
Hash,
List,
Sparkles
} from "lucide-react";



const CONCEPTS=[


{
name:"Array",
type:"Data Structure",
icon:Boxes,
desc:
"Stores multiple values in continuous memory locations. Access elements using index.",
example:
"[10,20,30,40]",
usage:
"Used in lists, tables, images",
complexity:
"Access O(1)"
},



{
name:"Linked List",
type:"Data Structure",
icon:List,
desc:
"Elements are connected using pointers. Each node stores data and next address.",
example:
"10 → 20 → 30",
usage:
"Music playlist, browser history",
complexity:
"Insert/Delete O(1)"
},




{
name:"Stack",
type:"Data Structure",
icon:Layers,
desc:
"Follows LIFO. Last added item comes out first.",
example:
"Push → Push → Pop",
usage:
"Undo, browser back",
complexity:
"Push O(1)"
},




{
name:"Queue",
type:"Data Structure",
icon:Layers,
desc:
"Follows FIFO. First added item leaves first.",
example:
"Person → Person → Person",
usage:
"Printer jobs, scheduling",
complexity:
"Enqueue O(1)"
},




{
name:"Hash Table",
type:"Data Structure",
icon:Hash,
desc:
"Stores data as key-value pairs for fast lookup.",
example:
"name : John",
usage:
"Databases, caching",
complexity:
"Search O(1)"
},




{
name:"Tree",
type:"Data Structure",
icon:GitBranch,
desc:
"Hierarchical structure with parent and child nodes.",
example:
"Root → Child → Leaf",
usage:
"File systems, HTML DOM",
complexity:
"Search O(log n)"
},





{
name:"Graph",
type:"Data Structure",
icon:Network,
desc:
"Collection of nodes connected by edges.",
example:
"A ↔ B ↔ C",
usage:
"Maps, social networks",
complexity:
"Traversal O(V+E)"
},







{
name:"Searching",
type:"Algorithm",
icon:Search,
desc:
"Finding a specific value from a collection.",
example:
"Find user by ID",
usage:
"Google search",
complexity:
"Linear O(n)"
},






{
name:"Sorting",
type:"Algorithm",
icon:ArrowDownUp,
desc:
"Arranging data in ascending or descending order.",
example:
"1,2,3,4",
usage:
"Ranking systems",
complexity:
"O(n log n)"
},





{
name:"Recursion",
type:"Algorithm",
icon:Code2,
desc:
"A function calling itself until a base condition.",
example:
"Function → Function",
usage:
"Tree traversal",
complexity:
"Depends"
},




{
name:"Dynamic Programming",
type:"Algorithm",
icon:Brain,
desc:
"Breaks problems into smaller reusable solutions.",
example:
"Save previous results",
usage:
"Optimization problems",
complexity:
"Often O(n)"
},




{
name:"Greedy Algorithm",
type:"Algorithm",
icon:Zap,
desc:
"Chooses the best option at every step.",
example:
"Pick largest benefit",
usage:
"Scheduling, routing",
complexity:
"Problem dependent"
}


];








export default function DSAConceptExplorer(){


const [selected,setSelected]=useState(CONCEPTS[0]);




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

DSA Concept Explorer

</h1>


<p className="
text-center
mt-3
text-gray-500
">

Understand the building blocks of programming

</p>







<div className="
grid
lg:grid-cols-4
gap-6
mt-10
">





<div className="
lg:col-span-1
bg-white
rounded-3xl
p-5
shadow-xl
space-y-3
">


{
CONCEPTS.map(item=>{


const Icon=item.icon;


return (

<motion.button

whileHover={{
x:5
}}

onClick={()=>setSelected(item)}

key={item.name}

className={`

w-full
p-4
rounded-xl
flex
gap-3
items-center
font-bold


${selected.name===item.name
?
"bg-black text-white"
:
"bg-gray-100"}

`}

>


<Icon size={20}/>

{item.name}


</motion.button>

)


})

}



</div>









<div className="
lg:col-span-3
bg-white
rounded-3xl
shadow-xl
p-8
">





<motion.div

key={selected.name}

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

>



<div className="
flex
gap-4
items-center
">


<selected.icon size={50}/>


<h2 className="
text-4xl
font-black
">

{selected.name}

</h2>


</div>




<div className="
mt-3
inline-block
bg-purple-100
px-5
py-2
rounded-xl
font-bold
">

{selected.type}

</div>





<p className="
mt-6
text-xl
text-gray-600
">

{selected.desc}

</p>







<div className="
grid
md:grid-cols-3
gap-5
mt-8
">


<Box title="Example">

{selected.example}

</Box>


<Box title="Used In">

{selected.usage}

</Box>


<Box title="Complexity">

{selected.complexity}

</Box>



</div>







<motion.div

animate={{
scale:[1,1.05,1]
}}

transition={{
repeat:Infinity,
duration:2
}}

className="
mt-10
bg-gradient-to-r
from-blue-500
to-purple-500
text-white
rounded-2xl
p-6
flex
gap-3
items-center
"

>


<Sparkles/>

Think of it as a tool to organize and solve problems efficiently.


</motion.div>



</motion.div>





</div>







</div>





</div>

</div>


)

}






function Box({title,children}){


return (

<div className="
bg-gray-100
rounded-2xl
p-5
">


<h3 className="
font-bold
text-gray-500
">

{title}

</h3>


<p className="
mt-3
text-xl
font-bold
">

{children}

</p>


</div>

)

}