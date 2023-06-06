// importing modules
const express = require('express');
const db = require('../Models');

// assigning db.Locataire to Locataire variable
const Locataire = db.Locataire;

// function to check if email already exists in the database
const saveLocataire = async (req, res, next) => {
  try {
    const emailcheck = await Locataire.findOne({
      where: {
        email_locataire: req.body.email_locataire,
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
  saveLocataire,
};