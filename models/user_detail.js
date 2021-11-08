const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");

const brokerUser = new ServiceBroker({
  nodeID: "node-user_details-db",

  transporter: "NATS"
});

// Create the "products" service
brokerUser.createService({
  // Define service name
  name: "user_detail",

  mixins: [DbService],

  adapter : new SqlAdapter('node-user', 'root', '', {
            host: 'localhost',
            dialect:'mysql',
          }),
  
  model: {
    name: "user_details",
    define: {
        birth_date: Sequelize.DATE,
    },
    options:{
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  
  }
});

// Start both brokers
Promise.all([brokerUser.start()]);