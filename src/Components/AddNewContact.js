import './AddNewContact.css'

// ---- Component for Add New Contact Form ----

const AddNewContact = (props) => {
    const { onAddContact } = props;

    // Generate a Random Id for a New Conatact
    function getRandomId(minRange, maxRange){
        return Math.floor(Math.random() * (maxRange - minRange) + minRange);
    }

    // Reads Form Data on Submit and passes it on to handler function in main App.js
    function handleOnSubmit(evt){
        evt.preventDefault();

        const formData = new FormData(evt.target);
        const values = [...formData.entries()];
        
        let newUser = {};

        values.map((value)=>{
           return newUser[value[0]] = value[1]
        })

        newUser.id = getRandomId(100, 9999);

        onAddContact(newUser);
    }

    return (
        <div className="new-contact-container">
            <h3>Add New Contact</h3>
            <form className='new-contact-form' method="POST" onSubmit={handleOnSubmit}>
                <div className='form-element'>
                    <label htmlFor="name">
                        <i className='fa fa-user'></i>
                        &nbsp;&nbsp;
                    </label>
                    <input type='text' name='name' placeholder="Name" required/>
                </div>
                <div className='form-element'>
                    <label htmlFor="phone">
                        <i className='fa fa-phone'></i>
                        &nbsp;&nbsp;
                    </label>
                    <input type='text' name='phone' placeholder="Phone No." required/>
                </div>
                <div className='form-element'>
                    <label htmlFor="email">
                        <i className='fa fa-envelope'></i>
                        &nbsp;&nbsp;
                    </label>
                    <input type='email' name='email' placeholder="Email" required/>
                </div>
                <div className='form-element'>
                    <button type='submit' className='form-btn add-contact-btn'>
                        Add Contact
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddNewContact;