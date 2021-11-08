const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");

const brokerUser = new ServiceBroker({
  nodeID: "node-users-db",

  transporter: "NATS"
});

// Create the "products" service
brokerUser.createService({
  // Define service name
  name: "user",

  mixins: [DbService],

  adapter : new SqlAdapter('node-user', 'root', '', {
            host: 'localhost',
            dialect:'mysql',
          }),
  
  model: {
    name: "users",
    define: {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
    },
    options:{
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  
  },
  settings: {
    populates:{
      'birth_date':'user_detail.get'
    }
  }
});

// Start both brokers
Promise.all([brokerUser.start()]);