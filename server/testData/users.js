const testUser = {
  first_name: 'Samuel',
  last_name: 'Egwueji',
  email: 'chiegwujii@gmail.com',
  password: 'iamasonofgod',
  phone_number: '081265906404',
  address: 'no 4 abaji street',
  type: 'user',
  is_admin: false,
};
const testAgentSignin = {
  email: 'emekaike@yahoo.com',
  password: 'userpassword',
};
const testUserSignin = {
  email: 'samegwujii@gmail.com',
  password: 'iamasonofgod',
};
const UserToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJUeXBlIjoiYWdlbnQiLCJpYXQiOjE1NjI4NDYwNjd9.LtXZJMUddDq748jI8YMxBnxpKeNjYfXooekTk2O5ppQ`;
const corectToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNTYzMTQxNTYwfQ.ZYpMuzj2fwuRnTLwoTT_hI-mKGbDqm33_Mlkz5pMeaQ`;
const noPropToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidHlwZSI6ImFnZW50IiwiaWF0IjoxNTYyMDY4Mjc5fQ.C09jTNdzxcZAH1uvLavb1CSnrJ7qTSdjBS2rfCmc`;
export default {
  testUser,
  UserToken,
  noPropToken,
  corectToken,
  testUserSignin,
  testAgentSignin
};
