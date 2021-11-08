const { ServiceBroker } = require("moleculer");

const brokerUsers = new ServiceBroker({
  nodeID: "node-users",

  transporter: "NATS"
});

// Create the "products" service
brokerUsers.createService({
  // Define service name
  name: "users",

  
  actions:{
    list(ctx){
      return brokerUsers.call('user.list',{populate:['birth_date']});
    }
  }
});

// Start both brokers
Promise.all([brokerUsers.start()]);