const testUser = {
  first_name: 'User',
  last_name: 'Tester',
  email: 'useregwujii@gmail.com',
  password: 'iamasonofgod',
  phone_number: '081265906404',
  address: 'no 4 abaji street',
  type: 'user',
  is_admin: false,
};

const testAgent = {
  first_name: 'Agent',
  last_name: 'Tester',
  email: 'agentegwujii@gmail.com',
  password: 'iamasonofgod',
  phone_number: '089265906404',
  address: 'no 4 abaji street',
  type: 'agent',
  is_admin: false,
};
const testAgentSignin = {
  email: 'agentegwujii@gmail.com',
  password: 'iamasonofgod',
};
const testUserSignin = {
  email: 'useregwujii@gmail.com',
  password: 'iamasonofgod',
};
const UserToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJUeXBlIjoiYWdlbnQiLCJpYXQiOjE1NjI4NDYwNjd9.LtXZJMUddDq748jI8YMxBnxpKeNjYfXooekTk2O5ppQ`;
const corectToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNTYzMTQxNTYwfQ.ZYpMuzj2fwuRnTLwoTT_hI-mKGbDqm33_Mlkz5pMeaQ`;
const noPropToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidHlwZSI6ImFnZW50IiwiaWF0IjoxNTYyMDY4Mjc5fQ.C09jTNdzxcZAH1uvLavb1CSnrJ7qTSdjBS2rfCmc`;
export default {
  testUser,
  testAgent,
  UserToken,
  noPropToken,
  corectToken,
  testUserSignin,
  testAgentSignin
};
