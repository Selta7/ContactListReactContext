import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const NewContact = props => {
	
    const { store, actions } = useContext(Context);
	
    
    const handleSubmit = (e) => {
        e.preventDefault ();

        const createData = {
            full_name: e.target.elements.inputName.value,
            address: e.target.elements.inputAddress.value,
            phone: e.target.elements.inputPhone.value,
            email: e.target.elements.inputEmail.value
        };
        
        actions.addContact (createData);
       
    };


    
   return (
    
    
       <form onSubmit={handleSubmit} className="form ms-3">
            <div className="form-group col-4">
                <label htmlFor="inputName">Full Name</label>
                <input type="text" className="form-control" id="inputName" name="inputName" placeholder="Enter full name"  ></input>
            </div>
            <div className="form-group col-4">
                <label htmlFor="inputAddress">Address</label>
                <input type="text" className="form-control" id="inputAddress" name="inputAddress" placeholder="Enter Address"></input>
            </div>
            <div className="form-group col-4">
                <label htmlFor="inputPhone">Phone</label>
                <input type="tel" className="form-control" id="inputPhone" name="inputPhone" placeholder="Enter phone number"></input>
            </div>
            <div className="form-group col-4">
                <label htmlFor="inputEmail">Email</label>
                <input type="email" className="form-control" id="inputEmail" name="inputEmail" placeholder="Enter email"></input>
            </div>
            <button type="submit" className="btn btn-success mt-3">Submit</button>
           

       </form>
    
   )
   
}

NewContact.propTypes = {
	match: PropTypes.object
};