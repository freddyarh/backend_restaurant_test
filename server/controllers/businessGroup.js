const { response } = require('express');
const { BusinessGroup } = require('../models');

const createBusinessGroup = async(req, res = response) => {
    const { name, logo, state, color, companies, ...rest } = req.body;
    const { id } = req.params;
    const { nombre } = req.query;

    const data = {
        name,
        logo,
        state,
        color,
        companies
    }

    const bussinesGroup = new BusinessGroup( data );
    await bussinesGroup.save();

    res.status(201).json(bussinesGroup);
}

module.exports = {
    createBusinessGroup
}