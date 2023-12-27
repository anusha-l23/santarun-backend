const {Event} = require("../models");
const {EventCreate} = require("../models");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const CreateEvent = async(req, res) => {

  try {
    upload.single("eventPicture")(req, res, async (err)=> {
if(err) {
  console.error(err)
  return res.status(500).json({error: "File upload error"})
}
try{
    const {eventName, location, year,aboutEvent,
      orgEmail,
      contactNum,
      regOpenDate,
      regCloseDate,tag} = req.body;
    const categoryDetails = [];
    Object.keys(req.body).forEach((key) => {
      if (key.startsWith('categoryDetails[')) {
        const matches = key.match(/categoryDetails\[(\d+)\]\[(\w+)\]/);
        if (matches && matches.length === 3) {
          const index = matches[1];
          const property = matches[2];
          if (!categoryDetails[index]) {
            categoryDetails[index] = {};
          }
          categoryDetails[index][property] = req.body[key];
        }
      }
    });

    console.log(categoryDetails, "categorydatails");
    console.log(req.body, "req.body")
    const eventPicture = req.file ? req.file.path : null;
    
    const existingEvent = await EventCreate.findOne({ where:{
      eventName: req.body.eventName
    } });
    if (existingEvent) {
      return res.status(400).json({ error: "Event with this name already exists" });
    }
    const eventCreate = await EventCreate.create({
      eventName,
      location,
      year,
      eventPicture,
      categoryDetails:req.body.categoryDetails,
      aboutEvent,
      orgEmail,
      contactNum,
      regOpenDate,
      regCloseDate,
      tag
    });
    res.status(200).json({message: "Event created successfully", eventCreate});
  }
  catch(error){
    console.error(error, "error");
    res.status(500).json({error: "Internal, server error"});
  }
  });
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({error: "Internal, server error"});
  }
}


 const getResults = async (req, res)=> {
    try {
      const events = await EventCreate.findAll();
      res.status(200).json(events);
      console.log("Event Fetched...")
      
    } catch (error) {
      console.error(error, "error");
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // const getAllEvents = async (req, res)=> {
  //   try {
  //     const events = await Event.findAll();
  //     res.status(200).json(events);
  //     console.log("Event Fetched...")
      
  //   } catch (error) {
  //     console.error(error, "error");
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }


  module.exports = {
    // selectEvent,
    // getAllEvents,
    CreateEvent,
    getResults,
  };
  