'use strict';

const Sensor = require('../json/sensor');
const OwfsClient = require('owfs').Client;
var owfs = new OwfsClient('127.0.0.1', 4304);

class SensorRepository {
    constructor() {
        var sensors = new Map([]);
        // this.sensors = new Map([
        //     [1, new Sensor(1, 24)],
        //     [2, new Sensor(2, 25)],
        //     [3, new Sensor(3, 26)],
        //     [4, new Sensor(4, 27)]
        // ]);
    }

    getById(id) {
        return this.sensors.get(id);
    }

    getAll() {
        this.sensors = new Map([]);
        try{
            found=0;
            keylist="";
            try{
                    owfs.dir('/', function(directories){
                            directories.forEach(refreshDevice);
                    });
            }
            catch(err) {
                    console.log("owfs error", err);
    }


            owfs.dirallslash("/", function(err, directories){ 
                directories.forEach(function(element) {
                console.log('Element: ' + element + ', ID: ' + element.id);
                this.sensors.set(element.id, new Sensor(element.id, "500"))
                })
            })
            return Array.from(this.sensors.values());
        }
        catch(err) {
            console.log("owfs error", err);
        }
        return Array.from(this.sensors.values());
        //return Array.from(this.sensors.values());
    }

    refreshDevice(path) {
        owfs.read(path + "/temperature", function(result){
                if(typeof(cache[path])==='undefined'){
                        cache[path]={};
                }
                cache[path].temperature=parseFloat(result);
                cache[path].update = new Date();
//              keylist += path + "=" + result + "\n ";
                found++;
        });
}

    // remove() {
    //     const keys = Array.from(this.sensors.keys());
    //     this.sensors.delete(keys[keys.length - 1]);
    // }

    // save(sensor) {
    //     if (this.getById(sensor.id) !== undefined) {
    //         this.sensors[sensor.id] = sensor;
    //         return 'Updated Sensor with id=' + sensor.id;
    //     }
    //     else {
    //         this.sensors.set(sensor.id, sensor);
    //         return 'Added Sensor with id=' + sensor.id;
    //     }
    // }
}

const sensorRepository = new SensorRepository();

module.exports = sensorRepository;