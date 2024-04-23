const mongoose = require('mongoose');

const statusConnectDB = {
  CONNECTED:'connected',
  DISCONNECTED: 'disconnected',
  RECONNECT: 'reconnected',
  ERROR: 'error'
}

const handleEventConnection = (DB_Connection) => {
    
  DB_Connection.on(statusConnectDB.CONNECTED,function (){
    console.log(`Connect Database: ${this.name} connected`);
  }),
  DB_Connection.on(statusConnectDB.DISCONNECTED,function () {
      console.log(`Connect Database: ${this.name} disconnected`);
  }),

  DB_Connection.on(statusConnectDB.RECONNECT,() => {
      console.log(`Connect Database: Reconnecting`);
  }),

  DB_Connection.on(statusConnectDB.ERROR,(err) => {
      console.log(`Connect Database: Error ${err}`);
  })

}

class Database{
  constructor() {
    handleEventConnection(mongoose.connection)
  }

  static getInstance = () => {
    if(!Database.instance)
    {
      Database.instance = new Database()
    }
    return Database.instance
  }

  connectDB = async ()=>{
    try 
    {
      await mongoose.connect(process.env.DB_URI,{
        //connectTimeoutMS: 10000
      })
    } catch (error) 
    {
      console.error(error);
    }
  }
}

module.exports = Database.getInstance();
