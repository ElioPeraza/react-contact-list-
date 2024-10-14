const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      username: 'elio', // Cambiar acá con el nombre de usuario que quieran utilizar
      contactList: [],
      apiUrlContactList: 'https://playground.4geeks.com/contact'
    },
    actions: {
      createAgenda: async () => {
        const { username, apiUrlContactList } = getStore();
        try {
          const response = await fetch(`${apiUrlContactList}/agendas/${username}`, {
            method: 'POST'
          });
          if (response.status === 201 || response.status === 400) {
            console.log('Agenda creada con éxito o ya existe la agenda!!!');
            return true;
          } else {
            console.log('Error: ', response.status, response.statusText);
            return false;
          }
        } catch (error) {
          console.log(error);
        }
      },
      getContactList: async () => {
        const { username, apiUrlContactList } = getStore();
        try {
          const response = await fetch(`${apiUrlContactList}/agendas/${username}/contacts`);
          const data = await response.json(response);
          if (response.status == 404) {
            getActions().createAgenda();
          } else {
            if (response.ok) {
              setStore({
                contactList: data.contacts
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      createContact: async (contact) => {
        const { username, apiUrlContactList } = getStore();
        try {
          const response = await fetch(`${apiUrlContactList}/agendas/${username}/contacts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
          });
          if (response.ok) {
            console.log('Contacto guardado con éxito!');
            await getActions().getContactList();
            return true;
          } else {
            console.log('Error: ', response.status, response.statusText);
            return false;
          }
        } catch (error) {
          console.log(error);
        }
      },
      deleteContact: async (id) => {
        const { username, apiUrlContactList } = getStore();
        try {
          const response = await fetch(`${apiUrlContactList}/agendas/${username}/contacts/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            console.log('Contacto eliminado con éxito!');
            getActions().getContactList();
            return true;
          } else {
            console.log('Error: ', response.status, response.statusText);
            return false;
          }
        } catch (error) {
          console.log(error);
        }
      },
      updateContact: async (contact, id) => {
        const { username, apiUrlContactList } = getStore();
        try {
          const response = await fetch(`${apiUrlContactList}/agendas/${username}/contacts/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
          });
          if (response.ok) {
            console.log('Datos de contacto actualizados con éxito!');
            getActions().getContactList();
            return true; 
          } else {
            console.log('Error: ', response.status, response.statusText);
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
    }
  };
};

export default getState;
