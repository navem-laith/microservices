package com.laith.monitor_app.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Value("${rabbitmq.queue.name}")
    private String qName;
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;
    @Value("${rabbitmq.routing.key}")
    private String routingKey;
    @Value("${rabbitmq.devices-queue.name}")
    private String qDevName;
    @Bean
    public Queue queue(){
        return new Queue(qName);
    }
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(exchangeName);
    }
    @Bean
    public Binding binding(){
        return BindingBuilder.bind(queue()).to(exchange()).with(routingKey);
    }
    //se conf automat beansurile: connectionFactory, rabbitTemplate si rabbitAdmin
    @Bean
    public Queue deviceQueue() {
        return new Queue(qDevName, true);
    }
}
