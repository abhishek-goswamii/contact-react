import './EditContact.css'

// ---- Component for Edit Contact Popup ----

const EditContact = (props) => {
    const { editingContact, user, onClose, onUpdate } = props;

    // Returns Nothing if user is undefined.
    if(user === undefined){
        return;
    }

    // Reads Form Data on Submit and passes it on to handler function in main App.js
    function handleOnSubmit(evt){
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const values = [...formData.entries()];
        
        let updatedUser = {};

        values.map((value)=>{
           return updatedUser[value[0]] = value[1]
        })

        updatedUser.id = user.id;

        onUpdate(updatedUser);
    }

    return (
        <div className='modal' style={{display: editingContact ? 'block' : 'none' }}>
            <div className="modal-content">
                <h2>Edit Contact </h2>
                <form className='edit-contact-form' onSubmit={handleOnSubmit}>
                    <div className='form-element'>
                        <label htmlFor="name">
                            <i className='fa fa-user'></i>
                            &nbsp;&nbsp;
                        </label>
                        <input type='text' name='name' placeholder="Name" defaultValue={user.name} required/>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="phone">
                            <i className='fa fa-phone'></i>
                            &nbsp;&nbsp;
                        </label>
                        <input type='text' name='phone' placeholder="Phone No." defaultValue={user.phone} required/>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="email">
                            <i className='fa fa-envelope'></i>
                            &nbsp;&nbsp;
                        </label>
                        <input type='email' name='email' placeholder="Email" defaultValue={user.email} required/>
                    </div>
                    <div className='form-element'>
                        <button type='submit' className='form-btn update-contact-btn'>
                            Update
                        </button>
                        <button type='button' className='form-btn close-update-btn' onClick={() => onClose()}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditContact;