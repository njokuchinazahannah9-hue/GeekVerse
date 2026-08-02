import { useEffect, useState } from "react";

import { FiX } from "react-icons/fi";


function EditStaffModal({

  open,

  staff,

  onClose,

  onSave,

}) {

  const [form,setForm]=useState({

    name:"",

    phone:"",

    department:"",

    role:"",

    status:"",

  });

  useEffect(()=>{

    if(staff){

      setForm({

        name:staff.name||"",

        phone:staff.phone||"",

        department:staff.department||"",

        role:staff.role||"",

        status:staff.status||"Active",

      });

    }

  },[staff]);

  if(!open) return null;

  function change(e){

    setForm({

      ...form,

      [e.target.name]:e.target.value,

    });

  }

  function submit(e){

    e.preventDefault();

    onSave(form);

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

<h2>Edit Staff</h2>

<button onClick={onClose}>

<FiX/>

</button>

</div>

<form
className="modal-body"
onSubmit={submit}
>

<input
name="name"
value={form.name}
onChange={change}
/>

<input
name="phone"
value={form.phone}
onChange={change}
/>

<input
name="department"
value={form.department}
onChange={change}
/>

<select
name="role"
value={form.role}
onChange={change}
>

<option>
Customer Support
</option>

<option>
Inventory Manager
</option>

<option>
Moderator
</option>

<option>
Content Manager
</option>

</select>

<select
name="status"
value={form.status}
onChange={change}
>

<option>
Active
</option>

<option>
Suspended
</option>

</select>

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
type="submit"
>

Save

</button>

</div>

</form>

</div>

</div>

);

}

export default EditStaffModal;