const actions = [
  {
    type: 'home/fetchUsersRequest', // type of the action/saga/generator
    routes: ['/'],
    delay: 5, // delay in seconds at the moment
  },
];

export default actions;
