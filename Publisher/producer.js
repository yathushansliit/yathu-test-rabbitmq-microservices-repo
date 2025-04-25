const amqp = require('amqplib')
const config = require('./config')

// step 1 : connect to the rabbitMQ server
// step 2 : create a new channel on that connection
// step 3 : create the exchange 
// step 4 : Publich the message to the exchange with a routing key

class Producer {
    channel

    async createChannel(){
        const connection = await amqp.connect({
            protocol: 'amqps',
            hostname: 'b-9f5a8bef-c0ab-44c4-a9e7-3f3480e57428.mq.ap-northeast-3.on.aws',
            port: 5671,
            username: 'admin',
            password: 'Bcstech@123#',
            vhost: '/'
          });

        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey, message){
        if(!this.channel){
            await this.createChannel()
        }
        const exchangeName = config.rabbitMQ.exchangeName
        await this.channel.assertExchange(exchangeName, "direct")

        const logDetails = {
            logType : routingKey,
            message : message,
            dateTime : new Date()
        }
        await this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(logDetails))
        );

        console.log(`The message ${message} is sent to exchange ${exchangeName}`);



    }


}

module.exports = Producer