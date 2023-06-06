// importing modules
const express = require('express');
const db = require('../Models');

// assigning db.citoyens to Citoyen variable
const Citoyen = db.citoyen;

// function to check if email already exists in the database
const saveCitoyen = async (req, res, next) => {
  try {
    const emailcheck = await Citoyen.findOne({
      where: {
        email_citoyen: req.body.email_citoyen,
      },
    });

    // if email exists in the database, respond with a status of 409
    if (emailcheck) {
      return res.status(409).send('Email already taken');
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

// exporting module
module.exports = {
  saveCitoyen,
};
