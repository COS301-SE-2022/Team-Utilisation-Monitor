import {PrismaClient}  from '@prisma/client'


const prisma=new PrismaClient()

async function main()
{
  const addHistoric=await prisma.userDetails.createMany(
    {
      data:[
        {name:"Gift",surname:"Monwa",username:"gift@gmail.com",password:"",role:"ADMIN",token:""},
        /*{name:"Gift",surname:"Monwa",username:"gift@gmail.com",password:"",role:"ADMIN",token:""},
        {name:"Gift",surname:"Monwa",username:"gift@gmail.com",password:"",role:"ADMIN",token:""},
        {name:"Gift",surname:"Monwa",username:"gift@gmail.com",password:"",role:"ADMIN",token:""},
        {name:"Gift",surname:"Monwa",username:"gift@gmail.com",password:"",role:"ADMIN",token:""}*/
        ]
      }
  )
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
