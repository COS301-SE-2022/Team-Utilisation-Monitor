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
            {week1:8, week2:66, week3:47.8,week4:70,month:"FEB"},
            {week1:88, week2:60, week3:40.8,week4:80,month:"MAR"},
            {week1:80, week2:36.2, week3:25.8,week4:36,month:"APR"},
            {week1:57.2, week2:101, week3:89,week4:56,month:"MAY"},
            {week1:64, week2:77.2, week3:56,week4:87,month:"JUN"},
            {week1:28, week2:60, week3:40.8,week4:80,month:"JUL"},
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
            {week1:56, week2:66, week3:70.8,week4:80,month:"JAN"},
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
            {week1:67, week2:46, week3:23.8,week4:120,month:"JAN"},
            {week1:64, week2:26, week3:45.8,week4:60,month:"FEB"},
            {week1:44, week2:30, week3:45.8,week4:30,month:"MAR"},
            {week1:90, week2:23, week3:43.8,week4:16,month:"APR"},
            {week1:45.2, week2:23, week3:56,week4:26,month:"MAY"},
            {week1:68, week2:97.2, week3:67,week4:37,month:"JUN"},
            {week1:98, week2:60, week3:70.8,week4:80,month:"JUL"},
            {week1:67, week2:80, week3:45,week4:76,month:"AUG"},
            {week1:65, week2:87.2, week3:56,week4:87,month:"SEP"},
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
            {week1:45, week2:46, week3:54.8,week4:44,month:"JAN"},
            {week1:38, week2:36, week3:23.8,week4:60,month:"FEB"},
            {week1:68, week2:30, week3:43.8,week4:70,month:"MAR"},
            {week1:40, week2:26.2, week3:43.8,week4:76,month:"APR"},
            {week1:57.2, week2:71, week3:39,week4:76,month:"MAY"},
            {week1:64, week2:77.2, week3:66,week4:67,month:"JUN"},
            {week1:78, week2:80, week3:60.8,week4:50,month:"JUL"},
            {week1:80, week2:80, week3:75,week4:56,month:"AUG"},
            {week1:64, week2:77.2, week3:76,week4:97,month:"SEP"},
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
            {week1:12, week2:86, week3:50.8,week4:60,month:"JAN"},
            {week1:34, week2:86, week3:77.8,week4:70,month:"FEB"},
            {week1:75, week2:70, week3:70.8,week4:50,month:"MAR"},
            {week1:67, week2:56.2, week3:55.8,week4:66,month:"APR"},
            {week1:56.2, week2:81, week3:49,week4:56,month:"MAY"},
            {week1:56, week2:87.2, week3:76,week4:67,month:"JUN"},
            {week1:76, week2:70, week3:60.8,week4:40,month:"JUL"},
            {week1:80, week2:70, week3:35,week4:76,month:"AUG"},
            {week1:74, week2:57.2, week3:76,week4:67,month:"SEP"},
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
            {week1:68, week2:56, week3:40.8,week4:60,month:"JAN"},
            {week1:48, week2:96, week3:77.8,week4:70,month:"FEB"},
            {week1:68, week2:80, week3:40.8,week4:80,month:"MAR"},
            {week1:70, week2:66.2, week3:56.8,week4:36,month:"APR"},
            {week1:87.2, week2:91, week3:79,week4:56,month:"MAY"},
            {week1:74, week2:97.2, week3:76,week4:87,month:"JUN"},
            {week1:58, week2:80, week3:60.8,week4:80,month:"JUL"},
            {week1:60, week2:80, week3:75,week4:76,month:"AUG"},
            {week1:44, week2:77.2, week3:86,week4:87,month:"SEP"},
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
            {week1:54, week2:56, week3:80.8,week4:60,month:"JAN"},
            {week1:76, week2:46, week3:87.8,week4:80,month:"FEB"},
            {week1:76, week2:50, week3:80.8,week4:90,month:"MAR"},
            {week1:22, week2:86.2, week3:65.8,week4:86,month:"APR"},
            {week1:12, week2:80, week3:69,week4:86,month:"MAY"},
            {week1:45, week2:77.2, week3:66,week4:87,month:"JUN"},
            {week1:55, week2:80, week3:60.8,week4:80,month:"JUL"},
            {week1:55, week2:80, week3:65,week4:76,month:"AUG"},
            {week1:66, week2:57.2, week3:66,week4:27,month:"SEP"},
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
            {week1:54, week2:55, week3:55,week4:70,month:"JAN"},
            {week1:63, week2:45, week3:45,week4:50,month:"FEB"},
            {week1:72, week2:65, week3:48,week4:70,month:"MAR"},
            {week1:45, week2:66.2, week3:15.8,week4:66,month:"APR"},
            {week1:28.2, week2:51, week3:24,week4:76,month:"MAY"},
            {week1:58, week2:57.2, week3:36,week4:27,month:"JUN"},
            {week1:75, week2:80, week3:87,week4:30,month:"JUL"},
            {week1:46, week2:80, week3:88,week4:76,month:"AUG"},
            {week1:77, week2:77.2, week3:98,week4:100,month:"SEP"},
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
            {week1:28, week2:36, week3:30.8,week4:60,month:"JAN"},
            {week1:38, week2:76, week3:47.8,week4:50,month:"FEB"},
            {week1:68, week2:60, week3:50.8,week4:40,month:"MAR"},
            {week1:30, week2:76.2, week3:65.8,week4:36,month:"APR"},
            {week1:77.2, week2:13, week3:59,week4:76,month:"MAY"},
            {week1:64, week2:65.2, week3:36,week4:77,month:"JUN"},
            {week1:28, week2:30, week3:48,week4:60,month:"JUL"},
            {week1:60, week2:30, week3:65,week4:66,month:"AUG"},
            {week1:24, week2:37.2, week3:46,week4:37,month:"SEP"},
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
            {week1:68, week2:56, week3:30.8,week4:40,month:"JAN"},
            {week1:88, week2:86, week3:77.8,week4:50,month:"FEB"},
            {week1:38, week2:70, week3:80.8,week4:40,month:"MAR"},
            {week1:20, week2:66.2, week3:85.8,week4:76,month:"APR"},
            {week1:47.2, week2:23, week3:59,week4:76,month:"MAY"},
            {week1:54, week2:37.2, week3:36,week4:67,month:"JUN"},
            {week1:78, week2:20, week3:20.8,week4:50,month:"JUL"},
            {week1:80, week2:50, week3:65,week4:36,month:"AUG"},
            {week1:94, week2:47.2, week3:76,week4:77,month:"SEP"},
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
            {week1:76, week2:51, week3:50.8,week4:40,month:"JAN"},
            {week1:68, week2:66, week3:47.8,week4:50,month:"FEB"},
            {week1:78, week2:60, week3:60.8,week4:60,month:"MAR"},
            {week1:48, week2:36, week3:75.8,week4:66,month:"APR"},
            {week1:67.2, week2:56,week3:89,week4:66,month:"MAY"},
            {week1:74, week2:77, week3:66,week4:67,month:"JUN"},
            {week1:88, week2:70, week3:90.8,week4:60,month:"JUL"},
            {week1:50, week2:60, week3:35,week4:66,month:"AUG"},
            {week1:84, week2:57.2, week3:46,week4:67,month:"SEP"},
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
