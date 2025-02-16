package com.laith.monitor_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MonitorAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(MonitorAppApplication.class, args);
		System.out.println("Monitor App is running...");
	}
}
