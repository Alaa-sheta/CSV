import fs from "fs"
import csv from "csv-parser";
import { Md5 } from 'ts-md5/dist/md5';

const inputFile = 'src/assets/annual-enterprise-survey-2020-financial-year-provisional-csv.csv';

let results: any[] = [];
let array: string = "";

const ConvertCSV = fs.createReadStream(inputFile).pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results = results.filter((v, i) => {
            return i % 2 != 0;
        });
        for (let key in results) {
            let test: string = JSON.stringify(results[key]).split(',')[2].replace('"', '');
            test = test.substring(test.indexOf(":") + 1).replace('}', '');
            test = test.substring(test.indexOf('"') + 1, test.lastIndexOf('"'));
            array = array + test;
        }
        // console.log(array);
        console.log("The Hashed MD5:" + Md5.hashStr(array));
    });

