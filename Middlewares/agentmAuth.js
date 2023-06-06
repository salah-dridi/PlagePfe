// importing modules
const express = require('express');
const db = require('../Models');

const AgentMunicipalite  = db.AgentMunicipalite;

const saveAgent = async (req, res, next) => {
    try {
      const emailCheck = await AgentMunicipalite.findOne({
        where: {
          email_municipalite: req.body.email_municipalite,
        },
      });
  
      // If email exists in the database, respond with a status of 409
      if (emailCheck) {
        return res.status(409).send('Email already taken');
      }
  
      next();
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = saveAgent;
