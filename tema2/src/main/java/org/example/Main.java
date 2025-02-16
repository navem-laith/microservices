package org.example;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String csvFilePath = "sensor.csv"; // Ensure this file is in the appropriate location
        String deviceIdFilePath = "deviceId.txt"; // Ensure this file is in the appropriate location

        try {
            // Read data from txt
            File myObj = new File(deviceIdFilePath);
            Scanner myReader = new Scanner(myObj);
            String deviceId = myReader.nextLine().trim();;
            System.out.println(deviceId);

            // Read data from CSV
            List<String> records = ReaderCSV.readDataLineByLine(csvFilePath);
            System.out.println("successfully read data from csv.");

            // Connect to RabbitMQ
            RabbitMQSender rabbitMQSender = new RabbitMQSender();
            rabbitMQSender.connect();
            System.out.println("successfully connected to rabbitmq.");

            // Send each record to RabbitMQ
            for (String record : records) {
                // Parse the measurement_value from the CSV
                double measurementValue;
                try {
                    measurementValue = Double.parseDouble(record.trim());
                } catch (NumberFormatException e) {
                    System.err.println(STR."Invalid measurement value: \{record}");
                    continue; // Skip invalid records
                }

                // Generate a real-time timestamp
                long timestamp = Instant.now().toEpochMilli();

                // Construct the JSON format message
                String message = String.format(
                        "{ \"timestamp\": %d, \"device_id\": \"%s\", \"measurement_value\": %.2f }",
                        timestamp, deviceId, measurementValue
                );

                // Send the message
                rabbitMQSender.sendMessage(message);
                System.out.println(STR."Sent: \{message}");

                try {
                    Thread.sleep(5000); // 5 secs
                } catch (InterruptedException e) {
                    System.err.println(STR."Thread was interrupted during sleep: \{e.getMessage()}");
                    Thread.currentThread().interrupt(); // Restore the interrupted status
                }
            }

            rabbitMQSender.close();
            System.out.println("All messages sent to RabbitMQ!");
        } catch (IOException e) {
            System.err.println(STR."Error: \{e.getMessage()}");
        } catch (Exception e) {
            System.err.println(STR."Error in RabbitMQ processing: \{e.getMessage()}");
        }
    }
}
