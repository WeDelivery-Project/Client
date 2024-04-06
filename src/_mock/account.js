// ----------------------------------------------------------------------
const client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : null;

const account = {
  displayName: client ? `${client.firstname} ${client.lastname}` : '',
  email: client ? client.email : '',
  photoURL: '/assets/images/avatars/avatar_24.jpg',
};

export default account;
