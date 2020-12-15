import { createSelector } from 'reselect';

const getUsers = (state) => state.chat.users;
const getReciever = state => state.chat.reciever;

const makeUsers = () => {
  return createSelector(
    getUsers,
    users => users
  );
};
const makeCount = () => {
  return createSelector(
    getUsers,
    users => Object.keys(users)
      .filter((user) => !users[user].readed)
      .reduce((acc, user) => acc + 1, 0)
  );
};
const makeReciever = () => {
  return createSelector(
    getReciever,
    reciever => reciever
  );
};

const chat = {
  makeUsers,
  makeCount,
  makeReciever,
};

export default chat;
