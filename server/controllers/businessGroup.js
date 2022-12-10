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

const getBussinesGroupById = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const bussinesGroup = await BusinessGroup.findById(id);
        console.log(bussinesGroup);

        if( !bussinesGroup ){
            return res.status(404).json({
                msg: 'Information not found by this id' + id
            });
        }
        res.status(200).json(bussinesGroup);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Talk with the administrator'
        });
        
    }

}

    const getAllBussinesGroup = async(req, res = response) => {

    try {
        const bussinesGroup = await BusinessGroup.find();

        if( !bussinesGroup ){
            return res.status(404).json({
                msg: 'There are not data to show'
            });
        }
        res.status(200).json({ bussinesGroup });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Talk with the administrator'
        });
        
    }
}

module.exports = {
    createBusinessGroup,
    getBussinesGroupById,
    getAllBussinesGroup
}