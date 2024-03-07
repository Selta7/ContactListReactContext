import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const currentContact = store.contacts.find (contact => contact.id.toString() === params.contactId )

   const [fullName, setFullName]  = useState('');
   const [address, setAddress]  = useState('');
   const [phone, setPhone]  = useState('');
   const [email, setEmail]  = useState('');

   useEffect (() => {  
        if  (currentContact ) {
            setFullName(currentContact.full_name),
            setAddress (currentContact.address),
            setPhone (currentContact.phone),
            setEmail (currentContact.email)    
        } 
    }, [currentContact]  );

    const handleChangeFullName = (e) => {
        setFullName (e.target.value) 
    };
    const handleChangeAddress = (e) => {
        setAddress (e.target.value) 
    };
    const handleChangePhone  = (e) => {
        setPhone (e.target.value) 
    };
    const handleChangeEmail  = (e) => {
        setEmail (e.target.value) 
    };


//do i need to create a editContact on flux? with update method?
	const handleEdit = (e) => {
		e.preventDefault ();
		const editData = {
            full_name: e.target.elements.inputName.value,
            address: e.target.elements.inputAddress.value,
            phone: e.target.elements.inputPhone.value,
            email: e.target.elements.inputEmail.value
        };
        
        actions.editContact (params.contactId, editData);
       
    };



	return (
		<div className="jumbotron">
			<form onSubmit={handleEdit} className="form ms-3">
            <div className="form-group col-4">
                <label htmlFor="inputName">Full Name</label>
                <input type="text" className="form-control" id="inputName" name="inputName" placeholder="Edit your name" onChange={handleChangeFullName} value={fullName} ></input>
            </div>
            <div className="form-group col-4">
                <label htmlFor="inputAddress">Address</label>
                <input type="text" className="form-control" id="inputAddress" name="inputAddress" placeholder="Edit your Address"  onChange={handleChangeAddress} value={address} ></input>
            </div>
            <div className="form-group col-4">
                <label htmlFor="inputPhone">Phone</label>
                <input type="tel" className="form-control" id="inputPhone" name="inputPhone" placeholder="Edit your phone number"  onChange={handleChangePhone} value={phone} ></input>
            </div>
            <div className="form-group col-4">
                <label htmlFor="inputEmail">Email</label>
                <input type="email" className="form-control" id="inputEmail" name="inputEmail" placeholder="Edit your email"  onChange={handleChangeEmail} value={email} ></input>
            </div>
            <button type="submit" className="btn btn-success mt-3">Submit</button>
           

       </form>

			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
