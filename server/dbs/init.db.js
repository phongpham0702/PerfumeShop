const mongoose = require('mongoose');

let statusConnectDB = {
  CONNECTING:'connecting',
  CONNECTED:'connected',
  DISCONNECTED: 'disconnected',
  RECONNECT: 'reconnected',
  ERROR: 'error'
}

const handleEventConnection = (DB_Connection) => {
    
  DB_Connection.on(statusConnectDB.CONNECTED,function (){
    console.log(`Connect Database: ${this.name} Connected`);
  }),
  DB_Connection.on(statusConnectDB.DISCONNECTED,() => {
      console.log(`Connect Database: Disconnected`);
  }),

  DB_Connection.on(statusConnectDB.RECONNECT,() => {
      console.log(`Connect Database: Reconnecting`);
  }),

  DB_Connection.on(statusConnectDB.ERROR,(err) => {
      console.log(`Connect Database: Error ${err}`);
  })

}

handleEventConnection(mongoose.connection)

async function connect_db() 
{  
  try 
  {
    await mongoose.connect(process.env.DB_URI,{
      //connectTimeoutMS: 10000
    })
  } catch (error) 
  {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connect_db };
