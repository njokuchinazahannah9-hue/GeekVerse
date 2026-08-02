import { FiX, FiMonitor } from "react-icons/fi";

function LoginSessionModal({

  open,

  manager,

  onClose,

}) {

  if (!open) return null;

  return (

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

Active Login Session

</h2>

<button onClick={onClose}>

<FiX/>

</button>

</div>

<div className="modal-body">

<div className="session-card">

<FiMonitor size={40}/>

<h3>

Current Device

</h3>

<p>

Email:
{manager?.email}

</p>

<p>

Role:
{manager?.role}

</p>

<p>

Status:
Online

</p>

<p>

Device:
Windows PC

</p>

<p>

Browser:
Google Chrome

</p>

</div>

</div>

<div className="modal-footer">

<button
className="save-btn"
onClick={onClose}
>

Close

</button>

</div>

</div>

</div>

  );

}

export default LoginSessionModal;