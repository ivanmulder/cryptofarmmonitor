'use strict';

const Router = require('express');
const relayRepo = require('../repo/relayRepository');

const getRelayRoutes = (app) => {
    const router = new Router();

    router
        .get('/status/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const result = relayRepo.getStatusById(id);
            res.send(result);
            //res.send("Status <" + id + ">");
        })
        .post('/on/:id', (req, res) => {
            const id = parseInt(req.params.id);     
            try {
                relayRepo.setStatus(id, 1);    
                console.debug("Rleay ID: " + id + " ON.");
                res.sendStatus(200,"Status successfuly updated to: ON.");
            } catch (error) {
                res.sendStatus(400,"Status update failed!");
            }
        })
        .post('/off/:id', (req, res) => {
            const id = parseInt(req.params.id);     
            try {
                relayRepo.setStatus(id, 0);    
                console.debug("Rleay ID: " + id + " OFF.");
                res.sendStatus(200,"Status successfuly updated to: OFF.");
            } catch (error) {
                res.sendStatus(400,"Status update failed!");
            }
        });

    app.use('/relay', router); 
};

module.exports = getRelayRoutes;