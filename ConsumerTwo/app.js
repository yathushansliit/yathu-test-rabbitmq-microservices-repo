const amqp = require("amqplib");
const config = require('./config')

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel
//step 3 : Create the exchange
//step 4 : Create the queue
//step 5 : Bind the queue to the exchange
//step 6 : Consume messages from the queue

async function consumeMessages() {
 const connection = await amqp.connect({
  protocol: 'amqps',
  hostname: 'b-9f5a8bef-c0ab-44c4-a9e7-3f3480e57428.mq.ap-northeast-3.on.aws',
  port: 5671,
  username: 'admin',
  password: 'Bcstech@123#',
  vhost: '/'
});

        this.channel = await connection.createChannel();
        
        const exchangeName = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName, "direct");

        const q = await channel.assertQueue("WarningsAndErrors");

        await channel.bindQueue(q.queue, "logExchange", "Warning");
        await channel.bindQueue(q.queue, "logExchange", "Error");

        channel.consume(q.queue, (msg) => {
            const data = JSON.parse(msg.content);
            console.log(data);
            channel.ack(msg);
          });
}

consumeMessages()