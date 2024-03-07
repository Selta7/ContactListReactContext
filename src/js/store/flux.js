const getState = ({ getStore, getActions, setStore }) => {
	

	return {
		
			store: {
			contacts: []
		},
		
		
		actions: {
			
			getAgenda: async () => {
				const response = await fetch ("https://playground.4geeks.com/apis/fake/contact/agenda/selta-agenda");
				const jsonContact = await response.json ();
				setStore({contacts: jsonContact});
			},

			deleteContact: async (id) => {
				const actions = getActions();
				
				try {
					const response = await fetch (`https://playground.4geeks.com/apis/fake/contact/${id}`,{
					method: "DELETE"
				});

				console.log(response);

				if (response.ok) {
					alert ("Bye bye contact!");
				} else {
					console.error ("Failed to delete contact:", response.statusText);
					return;
				}
				await actions.getAgenda();
				} catch (error) {
				console.error ("Error deleting contact:", error.message );
				alert ("Failed to delete contact. Please try again");
			}
			},
			
			editContact: async (id, contacts) => {
				const actions = getActions ();
				const editContact = {
					"full_name": contacts.full_name,
					"email": contacts.email,
					"agenda_slug": "selta-agenda",
					"address": contacts.address,
					"phone": contacts.phone
				};
				
				try {
					const response = await fetch (`https://playground.4geeks.com/apis/fake/contact/${id}`,{
						method: "PUT",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify (editContact),
					});
					if (response.ok) {
						alert ("Uau how dare u edit this!");
					} else {
						console.error ("Failed to edit contact:", response.statusText);
						return;
					}
					await actions.getAgenda();
					
				} catch (error) {
					console.error ("Error editing contact:", error.message);
					alert ("Try again loser")
				}
			},

			addContact: async (contacts) => {
				const newContact = {
					"full_name": contacts.full_name,
					"email": contacts.email,
					"agenda_slug": "selta-agenda",
					"address": contacts.address,
					"phone": contacts.phone
				};
				
				const store = getStore();
				
				try { const response = await fetch ("https://playground.4geeks.com/apis/fake/contact", {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify (newContact),
				});

				if (response.ok) {
					alert ("Contact added successfully!");
				} else {
					console.error("Failed to add contact",response.statusText);
					return;
				}

				const actions = getActions ();
				actions.getAgenda (); 
				setStore ({contacts:[...store.contacts, newContact] });
			} catch (error) {
				console.error ("Error adding contact:", error.message);
				alert ("Failed to add contact. Please try again")
			}
			},
		
			//deleteContact:
		},
	};
};


export default getState;
