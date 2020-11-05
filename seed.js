const mongoose = require('mongoose');

const Box = require('./models/box.js');
const Tool = require('./models/tool.js');

// const mongoURI = 'mongodb://localhost:27017/project2DB';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'project2DB';
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established');
  }
);

async function seed() {
//   await mongoose.connection.dropCollection('movies');
//   await mongoose.connection.dropCollection('actors');
  // CREATE THREE NEW TOOLS
  const hammer = await Tool.create({
    name: 'Hammer',
    picture: 'https://images-na.ssl-images-amazon.com/images/I/41f9-UyWBGL._AC_SL1000_.jpg',
    whereToBuy: 'https://www.amazon.com/Tools-1954889-Fiberglass-General-Purpose/dp/B01HD6N80W/ref=sr_1_3?dchild=1&keywords=hammer&qid=1604076365&sr=8-3',
    recommended: false,
  });

  const flashLight = await Tool.create({
    name: 'Flashlight',
    picture: 'https://images-na.ssl-images-amazon.com/images/I/71WkWdy0AbL._AC_SL1240_.jpg',
    whereToBuy: 'https://www.amazon.com/GearLight-Tactical-Flashlight-S1000-PACK/dp/B072WHQFJ7/ref=sr_1_2_sspa?dchild=1&keywords=flashlight&qid=1604076412&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExUFQzU1NQVTdGM1JMJmVuY3J5cHRlZElkPUEwOTA5MDgwVUQzRkVNTEpRSlhGJmVuY3J5cHRlZEFkSWQ9QTAwMzU2NTkxNFo1UTlSTllOTkc5JndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==',
    recommended: false,
  });

  const screwDriver = await Tool.create({
    name: 'Screwdriver',
    picture: 'https://images-na.ssl-images-amazon.com/images/I/51xsxMZ2eaL._AC_SL1000_.jpg',
    whereToBuy: 'https://www.amazon.com/Screwdriver-Industrial-Strength-Klein-Tools/dp/B0015SBILG/ref=sxin_9?ascsubtag=amzn1.osa.2d3ea9f3-af50-40f1-9527-00bf04a06119.ATVPDKIKX0DER.en_US&creativeASIN=B0015SBILG&cv_ct_cx=screwdriver&cv_ct_id=amzn1.osa.2d3ea9f3-af50-40f1-9527-00bf04a06119.ATVPDKIKX0DER.en_US&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-gl-ranking&dchild=1&keywords=screwdriver&linkCode=oas&pd_rd_i=B0015SBILG&pd_rd_r=c124911a-b50e-4433-a1b1-b020c536aab0&pd_rd_w=MESPz&pd_rd_wg=ZlW6a&pf_rd_p=389811d5-67a7-485d-97db-920577235c94&pf_rd_r=XPH2WTAAECE713SDGZX7&qid=1604076558&sr=1-1-d9dc7690-f7e1-44eb-ad06-aebbef559a37&tag=geekcontent-20',
    recommended: false,
  });

 
  // CREATE A NEW TOOLBOX
  const box1 = new Box({
    name: 'The James Bond Box',
    useType: 'Homeowner',
    tools: [],
  });

  // // PUSH THE ACTORS ONTO THE MOVIE1
  // // ACTORS ARRAY
  box1.tools.push(hammer);
  box1.tools.push(flashLight);
  box1.tools.push(screwDriver);
  box1.save(function (err, savedBox1) {
    if (err) {
      console.log(err);
    } else {
      console.log('Toolbox1 is ', savedBox1);
    }
  });
};

seed();
