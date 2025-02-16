package org.example;


import com.opencsv.CSVReader;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public class ReaderCSV {
        public static List<String> readDataLineByLine(String file) {
            List<String> records = new ArrayList<>();

            try (FileReader fileReader = new FileReader(file);
                 CSVReader csvReader = new CSVReader(fileReader)) {

                String[] nextRecord;

                // Read data line by line
                while ((nextRecord = csvReader.readNext()) != null) {
                    // Since each line contains only one value, take the first element
                    String record = nextRecord[0];
                    records.add(record);
                    //System.out.println(record); // Print the record to the console
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return records;
        }
}
//fb6c3849-08f2-4f51-ad1f-b24954b4fc13
