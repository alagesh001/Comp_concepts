import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const navigate = useNavigate();
    const version_n = "4.6";
    const apiBase = "https://oxadmedia.online";

    let accessToken = null;
    let mobileSaved = null;

const [uniqueId, setDeviceId] = useState(null);
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedInWeb");
        const roleType = localStorage.getItem("type");

        if (isLoggedIn === "true") {
            mobileSaved = localStorage.getItem("mobileIs");
            accessToken = localStorage.getItem("accessToken");
            navigate("/home");
            return;
        }

          const did = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
                                            setDeviceId(did);
  localStorage.setItem("device_idfitox", did);

         // console.log("✅uidaaa",did);
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setDeferredPrompt(null);
            setShowInstallButton(false);
        }
    };

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
        return () => {
            window.onpopstate = null;
        };
    }, []);

    const handleReLogin = async () => {
        setError("");
        setSuccessMessage("");

        if (!mobileSaved?.trim()) {
            setError("User ID and Password are required.");
            return;
        }

        setLoading(true);
        const payload = { mobile: mobileSaved };

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${apiBase}/getgymwlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const data = await response.json();

            if (data.success) {
                setSuccessMessage(data.message);
              //  console.log("Login successful:", data);
                localStorage.setItem("isLoggedInWeb", "true");
                localStorage.setItem("gyms", JSON.stringify(data.result));
                localStorage.setItem("accessToken", data.access_token);
                navigate("/home");
            } else {
                if (data.error === 1) {
                    console.log("Access token expired, refreshing...");
                    await refreshAccessToken();
                } else {
                    setError(data.message || "Login failed.");
                }
            }
        } catch (err) {
            setError("Something went wrong. Check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const res = await axios.post(`${apiBase}/api/refresh-token`, { mob: mobileSaved }, {
                withCredentials: true,
            });
            if (res.data.success && res.data.access_token) {
                localStorage.setItem("accessToken", res.data.access_token);
                accessToken = res.data.access_token;
                console.log("✅ Access token refreshed");
                await handleReLogin();
            } else {
                console.log("❌ Refresh token invalid or expired.");
            }
        } catch (err) {
            console.error("🔥 Failed to refresh token:", err);
        }
    };

    const handleLogin = async () => {
        setError("");
        setSuccessMessage("");

        if (!userId.trim() || !password.trim()) {
            setError("User ID and Password are required.");
            return;
        }

        setLoading(true);
        const payload = {
            mobile: userId,
            password: password,
            device_id: uniqueId,
        };

                        //console.log("✅uid",uniqueId);

         //   const response = await fetch(`${apiBase}/getgymwlist`, {

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${apiBase}/api/login-cs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const data = await response.json();

            if (data.success) {
                setSuccessMessage(data.message);
                localStorage.setItem("isLoggedInWeb", "true");
                localStorage.setItem("mobileIs", userId);
                localStorage.setItem("gyms", JSON.stringify(data.result));
                localStorage.setItem("accessToken", data.access_token);
                navigate("/home");
            } else {
                setError(data.message || "Login failed.");
            }
        } catch (err) {
            setError("Something went wrong. Check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

return (
<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-slate-950
via-indigo-950
to-purple-950
p-6
">


<div className="
w-full
max-w-6xl
grid
md:grid-cols-2
gap-10
bg-white/10
backdrop-blur-2xl
rounded-3xl
shadow-2xl
p-8
border
border-white/20
">





{/* LEFT PANEL */}

<div className="
hidden
md:flex
flex-col
justify-center
text-white
p-10
">


<div className="
w-24
h-24
rounded-3xl
bg-gradient-to-br
from-cyan-400
to-blue-600
flex
items-center
justify-center
text-5xl
shadow-xl
mb-8
">

🚀

</div>




<h1 className="
text-5xl
font-extrabold
leading-tight
">

Build Skills.
<br/>

<span className="
text-transparent
bg-clip-text
bg-gradient-to-r
from-cyan-400
to-purple-400
">

Crack Interviews.

</span>

</h1>




<p className="
mt-5
text-slate-300
text-lg
max-w-md
">

Interactive programming labs,
DSA visualizers and interview preparation
for future developers.

</p>





<div className="space-y-4 mt-8">


<div className="
bg-white/10
rounded-2xl
p-4
border
border-white/10
">

🧩 Master Programming Fundamentals

</div>



<div className="
bg-white/10
rounded-2xl
p-4
border
border-white/10
">

⚡ Visual DSA & Algorithm Animations

</div>



<div className="
bg-white/10
rounded-2xl
p-4
border
border-white/10
">

🎯 Placement Focused Practice

</div>



<div className="
bg-white/10
rounded-2xl
p-4
border
border-white/10
">

💻 Real Coding Thinking Skills

</div>



</div>




</div>








{/* LOGIN */}

<div className="
bg-white
rounded-3xl
p-8
shadow-2xl
">



<div className="text-center">


<div className="
mx-auto
w-20
h-20
rounded-3xl
bg-gradient-to-br
from-blue-500
to-violet-600
flex
items-center
justify-center
text-4xl
shadow-lg
">

💻

</div>



<h2 className="
mt-5
text-3xl
font-extrabold
text-gray-800
">

Developer Lab

</h2>



<p className="
text-gray-500
mt-2
">

Interactive Coding & Interview Platform

</p>



</div>






{showInstallButton && (

<button

onClick={handleInstallClick}

className="
w-full
mt-6
py-3
rounded-xl
bg-gradient-to-r
from-cyan-500
to-blue-600
text-white
font-bold
shadow-lg
hover:scale-[1.02]
transition
"

>

📲 Install Learning App

<div className="text-xs opacity-80">

Version {version_n}

</div>


</button>

)}






<div className="mt-7 space-y-5">



<div>

<label className="
text-sm
font-semibold
text-gray-700
">

Student ID

</label>


<input

type="text"

placeholder="Enter your ID"

value={userId}

onChange={(e)=>setUserId(e.target.value)}

className="
mt-2
w-full
p-3.5
rounded-xl
border
border-gray-200
outline-none
focus:ring-2
focus:ring-blue-500
"

/>

</div>






<div>


<label className="
text-sm
font-semibold
text-gray-700
">

Password

</label>


<input

type="password"

placeholder="Enter password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
mt-2
w-full
p-3.5
rounded-xl
border
border-gray-200
outline-none
focus:ring-2
focus:ring-purple-500
"

/>


</div>







{error && (

<div className="
bg-red-50
text-red-600
p-3
rounded-xl
text-sm
">

⚠️ {error}

</div>

)}







<button

onClick={handleLogin}

className="
w-full
py-3.5
rounded-xl
bg-gradient-to-r
from-indigo-600
to-purple-700
text-white
font-bold
shadow-xl
hover:scale-[1.03]
transition
"

>


{
loading
?
"Preparing Lab..."
:
"Start Learning →"
}


</button>




</div>









<div className="
mt-8
text-center
text-xs
text-gray-400
">


<p>

Version {version_n}

</p>


<p>

Support : +91 81486 02102

</p>


</div>




</div>






</div>


</div>
);
}

export default Login;
