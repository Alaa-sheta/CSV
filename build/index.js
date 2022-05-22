"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var csv_parser_1 = __importDefault(require("csv-parser"));
var md5_1 = require("ts-md5/dist/md5");
var inputFile = 'src/assets/annual-enterprise-survey-2020-financial-year-provisional-csv.csv';
var results = [];
var array = "";
var ConvertCSV = fs_1.default.createReadStream(inputFile).pipe((0, csv_parser_1.default)())
    .on('data', function (data) { return results.push(data); })
    .on('end', function () {
    results = results.filter(function (v, i) {
        return i % 2 != 0;
    });
    for (var key in results) {
        var test = JSON.stringify(results[key]).split(',')[2].replace('"', '');
        test = test.substring(test.indexOf(":") + 1).replace('}', '');
        test = test.substring(test.indexOf('"') + 1, test.lastIndexOf('"'));
        array = array + test;
    }
    // console.log(array);
    console.log("The Hashed MD5:" + md5_1.Md5.hashStr(array));
});
