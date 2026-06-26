import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

function SettingsScreen() {
    const navigate = useNavigate();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // ✅ For confirm field
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const apiBase = "https://oxadmedia.online";
  const [showAuthBlock, setShowAuthBlock] = useState(false);
const [authErrorMsg, setAuthErrorMsg] = useState("");

    // 🏋️ Fetch selected gym details from localStorage
    const selectedGym = JSON.parse(localStorage.getItem("selectedGymai") || "{}");

const handleLogout = async () => {
  try {
    // 🧹 Clear all localStorage data
     const deviceId = localStorage.getItem("device_idfitox"); // ✅ get from storage

    const response = await fetch(`${apiBase}/api/logout-ai`, {
      method: "POST",
      credentials: "include", // ✅ sends refresh_token cookie
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_id: deviceId, // ✅ send to backend
      }),
    });

    const data = await response.json();

    if (!data.success) {
       setAuthErrorMsg(data.message || "You are not authorized to continue.");

      setShowAuthBlock(true);
    
      console.warn("⚠️ Logout failed:", data.message);
      // Optionally still clear localStorage and redirect
    } else {
         localStorage.clear();

    // 🧹 Clear all IndexedDB databases
  //  await clearAllIndexedDB();
localStorage.setItem("isLoggedInWeb", "false"); // optional flag
  navigate("/login", { replace: true });
    console.log("✅ Cleared localStorage and IndexedDB");
      console.log("✅ Logout success:", data.message);
    }

   
  } catch (err) {
     setAuthErrorMsg("Check your internet.");

      setShowAuthBlock(true);
    
  }finally{
      localStorage.clear();
localStorage.setItem("isLoggedInWeb", "false"); // optional flag
  navigate("/login", { replace: true });
  
  }

  
};

const refreshAccessToken = async () => {
    try {
        const res = await axios.post(
            `${apiBase}/api/refresh-token-ai`,
            { mob: selectedGym.mob },
            { withCredentials: true }
        );

        if (res.data.success && res.data.access_token) {
            // ✅ Save and return new token
            localStorage.setItem("accessToken", res.data.access_token);
            console.log("✅ Access token refreshed");
            return res.data.access_token;
        } else {
            // ❌ Only handle logout if error is NOT 111
      if (data.error !== 111) {
        console.log("❌ Refresh token invalid or expired. Logging out...");
        handleLogout();
      } else {
        console.log("⚠️ Server returned error 111. Not logging out.");
      }
      return null;
        }
    } catch (err) {
        console.error("🔥 Failed to refresh token:", err);
       // handleLogout();
        return null;
    }
};
  

    const handlePasswordChange = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setMessage("⚠️ Please fill all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("❌ New passwords do not match.");
            return;
        }

        setLoading(true);
        setMessage("");

        const changePasswordApi = async (token) => {
            try {
                const memberData = {
                    gymid: selectedGym?.GymId,
                    oldpass: oldPassword,
                    newpass: newPassword,
                };

                const res = await axios.post(
                    `${apiBase}/api/update-gympass`,
                    memberData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );

                const data = res.data;
            //    console.log(data);

                if (data.success) {
                toast.success("✅ Password updated successfully!");
                    
                    setMessage("✅ Password updated successfully!");
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setShowChangePassword(false);
                } else if (data.error === 1) {
                    // Access token expired
                    console.log("Access token expired, refreshing...");
                            const newToken = await refreshAccessToken();
                              if (!newToken) {
                        console.log("❌ Unable to refresh token. Logging out...");
                        handleLogout();
                        return;
                    }else{
                       return await retryApi(newToken, memberData,"api/update-gympass"); // 🔁 Retry with new token

                    }

                } else {
                    setMessage("❌ " + (data.message || "Failed to update password."));
                }
            } catch (error) {
                console.error("❌ Error connecting to server:", error);
                setMessage("❌ Error connecting to server.");
            } finally {
                setLoading(false);
            }
        };
  const currentToken = localStorage.getItem("accessToken");
        await changePasswordApi(currentToken);

    };
 const retryApi = async (newToken, memberData,apiurl) => {
    try {
        const res = await axios.post(
            `${apiBase}/${apiurl}`,
            memberData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${newToken}`,
                },
            }
        );

        if (res.data.success) {
          //   goBack();
    setMessage("✅ Password updated successfully!");
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setShowChangePassword(false);
//alert(`✅ ${res.data.message}`);
        } else {
            alert("❌ Failed even after retry: " + res.data.message);
        }
    } catch (err) {
        console.error("🔥 Retry API Error:", err);
        alert("Something went wrong while retrying.");
    }
};
    const handleContactSupport = () => {
        const phoneNumber = "918148602102"; // Support number
        const gymName = selectedGym?.GymName || "Unknown Gym";
        const gymId = selectedGym?.GymId || "N/A";

        const prefilledMessage = `Hi, I need help with my account (CS).`;
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefilledMessage)}`;
        window.open(whatsappURL, "_blank"); // Open WhatsApp in new tab
    };

    return (
<div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-blue-100 p-5 md:p-10">
<button

onClick={()=>navigate("/home")}

className="
flex
items-center
gap-2
px-5
py-3
mb-5
rounded-xl
bg-white
border
shadow-sm
text-gray-700
font-semibold
hover:bg-purple-50
hover:text-purple-700
transition
"

>

<span className="text-xl">
←
</span>

Back

</button>
{showAuthBlock && (
<div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] px-5">

    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full animate-pulse">

        <div className="text-center">

            <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-4xl">
                ⚠️
            </div>

            <h2 className="text-2xl font-bold text-red-600 mt-4">
                Access Denied
            </h2>

            <p className="text-gray-600 mt-3">
                {authErrorMsg}
            </p>


            <button
            onClick={()=>setShowAuthBlock(false)}
            className="
            mt-6 w-full py-3 rounded-xl
            bg-red-600 text-white
            hover:bg-red-700 transition
            font-semibold
            "
            >
            Close
            </button>

        </div>

    </div>

</div>
)}



<div className="
max-w-3xl mx-auto
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6 md:p-10
">


{/* HEADER */}

<div className="flex items-center gap-4 mb-8">

<div className="
w-16 h-16
rounded-2xl
bg-gradient-to-br
from-purple-600
to-blue-600
flex items-center justify-center
text-white text-3xl
shadow-lg
">
⚙️
</div>


<div>

<h1 className="text-3xl font-bold text-gray-800">
Settings
</h1>

<p className="text-gray-500">
Manage your account preferences
</p>

</div>


</div>

<div className="space-y-5">



{/* PASSWORD CARD */}

<div className="
rounded-2xl
border
bg-white
shadow-sm
overflow-hidden
">


<button

onClick={()=>setShowChangePassword(!showChangePassword)}

className="
w-full
p-5
flex
justify-between
items-center
hover:bg-purple-50
transition
"

>


<div className="flex gap-4 items-center">


<div className="
w-12 h-12
rounded-xl
bg-purple-100
flex items-center justify-center
text-2xl
">
🔑
</div>


<div className="text-left">

<h3 className="font-bold text-gray-800">
Change Password
</h3>

<p className="text-sm text-gray-500">
Update your login password
</p>


</div>


</div>


<span className="text-purple-600 text-xl">
{showChangePassword ? "▲":"▼"}
</span>


</button>





{showChangePassword && (

<div className="
p-5
border-t
space-y-4
bg-gray-50
">


<div>

<label className="text-sm font-semibold">
Old Password
</label>

<input

type="password"

value={oldPassword}

onChange={(e)=>setOldPassword(e.target.value)}

placeholder="Enter old password"

className="
mt-1
w-full
p-3
rounded-xl
border
outline-none
focus:ring-2
focus:ring-purple-400
"

/>

</div>




<div>

<label className="text-sm font-semibold">
New Password
</label>

<input

type="password"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

placeholder="Enter new password"

className="
mt-1
w-full
p-3
rounded-xl
border
outline-none
focus:ring-2
focus:ring-purple-400
"

/>

</div>





<div>

<label className="text-sm font-semibold">
Confirm Password
</label>

<input

type="password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

placeholder="Confirm password"

className="
mt-1
w-full
p-3
rounded-xl
border
outline-none
focus:ring-2
focus:ring-purple-400
"

/>

</div>




{
message &&
<div className="
p-3
rounded-xl
bg-purple-100
text-purple-700
text-sm
">
{message}
</div>
}





<button

onClick={handlePasswordChange}

disabled={loading}

className="
w-full
py-3
rounded-xl
bg-gradient-to-r
from-purple-600
to-indigo-600
text-white
font-bold
shadow-lg
hover:scale-[1.02]
transition
"

>

{
loading 
?
"Updating..."
:
"Update Password"
}


</button>



</div>

)}


</div>







{/* SUPPORT */}

<button

onClick={handleContactSupport}

className="
w-full
p-5
rounded-2xl
bg-white
border
shadow-sm
flex
items-center
gap-4
hover:shadow-lg
transition
"


>


<div className="
w-12 h-12
rounded-xl
bg-green-100
flex items-center justify-center
text-2xl
">
💬
</div>


<div className="text-left">

<h3 className="font-bold">
Contact Support
</h3>

<p className="text-sm text-gray-500">
Chat with our support team
</p>

</div>


</button>





{/* LOGOUT */}

<button

onClick={()=>{
Swal.fire({
title:"Logout",
text:"Are you sure you want to logout?",
icon:"warning",
showCancelButton:true,
confirmButtonText:"Yes, Logout",
cancelButtonText:"Cancel",
confirmButtonColor:"#dc2626"
})
.then(r=>{
if(r.isConfirmed)
handleLogout()
})
}}

className="
w-full
p-5
rounded-2xl
bg-red-500
text-white
flex
items-center
gap-4
shadow-lg
hover:bg-red-600
transition
"


>


<div className="
w-12 h-12
rounded-xl
bg-white/20
flex items-center justify-center
text-2xl
">
🚪
</div>


<div>

<h3 className="font-bold text-left">
Logout
</h3>

<p className="text-sm opacity-80">
Sign out from this device
</p>


</div>


</button>



</div>



</div>


</div>
);
}

export default SettingsScreen;
