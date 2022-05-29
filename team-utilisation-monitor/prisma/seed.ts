import {PrismaClient}  from '@prisma/client'


const prisma=new PrismaClient()

async function main()
{

  const person_1=await prisma.company.create({

    data:{
      company_name:'iCreateSoftware',
      employees:
      {
        create:[{
          name:'Theo',
          surname:'Faresa',
          email:'theo@gmail.com',
          password:'code',
          

          position:{
              create:{
              title:'senior software developer'
            }
          }
        },
        
        {
          name:'Gift',
          surname:'Monwa',
          email:'gift@gmail.com',
          password:'food',
          role:'ADMIN',

        position:{
          create:{
            title:'junior software developer'
          }
        }},
        {
          name:'Max',
          surname:'Verstappen',
          email:'max@gmail.com',
          password:'p1',
          role:'USER',

          position:{
          create:{
            title:'junior software developer'
          }
        }
      }]
    },

    admins:{
     create:{
       person:{
        create:[
          {
              name:'Checo',
              surname:'Perez',
              email:'checo@gmail.com',
              password:'mexico',
              role:'ADMIN',
              company_id:1,
    
              position:{
              create:{
                title:'Administrator'
              } 
            }
          },
          {
            name:'Christian',
            surname:'Horner',
            email:'RB@gmail.com',
            password:'theworldchampion',
            role:'ADMIN',
            company_id:1,
    
            position:{
            create:{
              title:'Administrator'
            } 
          }
        }]
       }
     }
    }

  }
})
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });