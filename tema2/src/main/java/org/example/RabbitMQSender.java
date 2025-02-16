package org.example;


import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;

public class RabbitMQSender {
    private static final String QUEUE_NAME = "test_queue";
    private Connection connection;
    private Channel channel;

    public void connect() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        System.out.println("Created connection factory");
        factory.setHost("host.docker.internal"); // localhost if rabbitmq is local
        factory.setPort(5672);        // Default RabbitMQ port
        factory.setUsername("guest"); // Default credentials
        factory.setPassword("guest");
        factory.setVirtualHost("/");
        System.out.println("everything set");
        this.connection = factory.newConnection();
        this.channel = connection.createChannel();
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
    }

    public void sendMessage(String message) throws Exception {
        channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
        System.out.println("Message sent: " + message);
    }

    public void close() throws Exception {
        if (channel != null) channel.close();
        if (connection != null) connection.close();
    }
}
