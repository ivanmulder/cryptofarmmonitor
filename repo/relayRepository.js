'use strict';

var Gpio = require('onoff').Gpio;

class RelayRepository {
    constructor() {
    }

    getStatusById(id) {
        //return "TEST ID: " + id;
        try {
            var relay = new Gpio(id, 'out');
            relay.read(function (err, value) { // Asynchronous read
                if (err) {
                  throw err;
                }
                return value;
              });    
        } catch (error) {
            return error;
        }
        return "OK";
    }

    setStatus(id, status) {
        //return "TEST ID: " + id;
        var relay = new Gpio(id, 'out');
        relay.write(status, function (err) { // Asynchronous write
            if (err) {
                throw err;
            }
        });
        return true;
    }

    getAll() {
        //TODO
    }
}

const relayRepository = new RelayRepository();

module.exports = relayRepository;