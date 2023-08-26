import './ContactCard.css'

// ---- Card Component for a Contact ----

const ContactCard = (props) => {
    const { user, onUpdate, onDelete } = props;

    return (
        <div className="contact-card">
            <div className="contact-info">
                <p>
                    <i className='fa fa-user'></i>
                    &nbsp; {user.name}
                </p>
                <div>
                    <i className='fa fa-envelope'></i>
                    &nbsp; {user.email}
                </div>
                <div>
                    <i className='fa fa-phone'></i>
                    &nbsp; {user.phone}
                </div>
            </div>
            <div className="contact-opt">
                <button className="opt-edit" onClick={() => onUpdate(user.id)}>
                    <i className='fa fa-pen-alt'></i>
                    &nbsp; Edit
                </button>
                <button className="opt-delete" onClick={() => onDelete(user.id)}>
                    <i className='fa fa-trash'></i>
                    &nbsp; Delete
                </button>
            </div>
        </div>
    );
}

export default ContactCard;