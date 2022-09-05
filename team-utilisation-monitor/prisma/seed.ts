import {PrismaClient}  from '@prisma/client'


const prisma=new PrismaClient()

async function main()
{
  const addHistoric=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:1 //change the id here to add the id of the target person
    }
  })

  const addHistoric2=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:2 //change the id here to add the id of the target person
    }
  })

  const addHistoric3=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:3 //change the id here to add the id of the target person
    }
  })

  const addHistoric4=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:4 //change the id here to add the id of the target person
    }
  })

  const addHistoric5=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:5 //change the id here to add the id of the target person
    }
  })

  const addHistoric6=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:6 //change the id here to add the id of the target person
    }
  })

  const addHistoric7=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:7 //change the id here to add the id of the target person
    }
  })

  const addHistoric8=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:8 //change the id here to add the id of the target person
    }
  })

  const addHistoric9=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:9 //change the id here to add the id of the target person
    }
  })

  const addHistoric10=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:10 //change the id here to add the id of the target person
    }
  })

  const addHistoric11=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:11 //change the id here to add the id of the target person
    }
  })

  const addHistoric12=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:12 //change the id here to add the id of the target person
    }
  })

  const addHistoric13=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:13 //change the id here to add the id of the target person
    }
  })

  const addHistoric14=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:14 //change the id here to add the id of the target person
    }
  })

  const addHistoric15=await prisma.person.update({
    data:{
      utilisations:{
        createMany:{
          data:[
            {week1:58, week2:56, week3:70.8,week4:60,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:40, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:27.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:78, week2:60, week3:40.8,week4:80,month:"JUL"},
            {week1:40, week2:60, week3:45,week4:76,month:"AUG"},
            {week1:54, week2:77.2, week3:56,week4:87,month:"SEP"},
          ]
        }
      }
    },where:{
      id:15 //change the id here to add the id of the target person
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
