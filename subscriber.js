const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err,channel) => {
        if(err){
            throw err;
        }
        let queueName = "chat";
        channel.assertQueue(queueName, {
            durable: false
        });
        channel.consume(queueName,(msg) => {
            console.log(`Received : ${msg.content.toString()}`);
            channel.ack(msg);
        })

    })
})