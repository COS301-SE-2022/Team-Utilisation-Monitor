export const getOnePerson='query{getOnePerson(email:"gift@gmail.com"){id,name,surname,email,company_name,role,approved}}';

export const login='query{loginGateway(username:"gift@gmail.com",password:"Gift123456"){id,username,token,role,name,surname}}';

export const createUser='mutation{createUser(name:"Joe",surname:"Rogan",email:"Rogan@gmail.com",inviteCode:"ORA239"){name,surname,email,company_name,company_id,role,utilisation}}';