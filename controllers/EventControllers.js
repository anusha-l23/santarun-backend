const {Event} = require("../models");
const {CreateEvent} = require("../models");
const multer = require('multer');

// const selectEvent = async (req, res) => {
//   try {
//     const { eventName } = req.body;


//     const existingEvent = await Event.findOne({ where: { eventName } });

//     if (!existingEvent) {
      
//       const event = await Event.create(req.body);
//       res.status(200).json(event);
//     } else {
  
//       res.status(200).json(existingEvent);
//     }
//   } catch (error) {
//     console.error(error, "error");
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const EventCreate = async(req, res) => {

  try {
    upload.single("eventPicture")(req, res, async (err)=> {
if(err) {
  console.error(err)
  return res.status(500).json({error: "File upload error"})
}

    const {eventName, location, year} = req.body;
    const eventPicture = req.file ? req.file.path : null;
    const eventCreate = await CreateEvent.create({
      eventName,
      location,
      year,
      eventPicture
    });
    res.status(200).json({message: "Event created successfully", eventCreate});
  });
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({error: "Internal, server error"});
  }
}

 const getResults = async (req, res)=> {
    try {
      const events = await CreateEvent.findAll();
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
    EventCreate,
    getResults,
  };
  