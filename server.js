const mongoose = require('mongoose')

const app = require('./app');

const DB_HOST = 'mongodb+srv://Valik:sEqsMTVjoSOwKBXK@cluster0.t6e8zmf.mongodb.net/my_contacts?retryWrites=true&w=majority';
mongoose.connect(DB_HOST)
  .then(()=> {
    app.listen(3000)
  })
  .catch(error=>{
    console.log(error.message);
    process.exit(1);
  })


