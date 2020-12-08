const { Types } = require('mongoose');
const ticket = require('../models/ticket');
const Ticket = require('../models/ticket');

module.exports.createTicket = (req, res, next) => {
  if(req.session.isAuth){
    let data = req.body;
    let ticket = new Ticket({...data, status: 0, importance: 0});

    ticket.save()
    .then(result => {
      res.json({success: true});
    })
    .catch(err => {
      console.log(err);
      res.json({success: false, err_message: "اطلاعات نا معتبر"});  
    });
  }
  else{
    res.json({success: false, err_message: "باید وارد شده باشید"});
  }
};

module.exports.replyToTicket = (req, res, next) => {
  let id = req.body.id;
  let reply = req.body.reply;
  reply.sender = req.username;
  
  ticket.findOne({_id: Types.ObjectId(id)})
  .then(t => {
    if(t){
      t.contents.push(reply);
      t.save()
      .then(result => {
        res.json({success: true});
      })
      .catch(err => {
        console.log(err);
        res.json({success: false, err_message: "err"});  
      });
    }
    else{
      res.json({success: false, err_message: "تیکت مورد نظر وجود ندارد"});
    }
  })
  .catch(err => {
    console.log(err);
    res.json({success: false, err_message: "تیکت مورد نظر وجود ندارد"});
  });
}