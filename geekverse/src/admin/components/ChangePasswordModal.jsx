import { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  updatePassword,
} from "firebase/auth";

import { auth } from "../../firebase/firebase";

function ChangePasswordModal({

  open,

  onClose,

}) {

  const [password,setPassword]=useState("");

  if(!open) return null;

  async function save(e){

    e.preventDefault();

    try{

      await updatePassword(
        auth.currentUser,
        password
      );

      alert("Password updated.");

      onClose();

    }catch(error){

  if(error.code === "auth/requires-recent-login"){

    alert(
      "For security reasons, please log out and log in again before changing your password."
    );

    return;

  }

  alert(error.message);

}

  }

  return(

<div
className="modal-overlay"
onClick={onClose}
>

<div
className="modal"
onClick={(e)=>e.stopPropagation()}
>

<div className="modal-header">

<h2>

Change Password

</h2>

<button onClick={onClose}>

<FiX/>

</button>

</div>

<form
className="modal-body"
onSubmit={save}
>

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)
}
/>

<div className="modal-footer">

<button
type="button"
className="cancel-btn"
onClick={onClose}
>

Cancel

</button>

<button
className="save-btn"
>

Update

</button>

</div>

</form>

</div>

</div>

);

}

export default ChangePasswordModal;