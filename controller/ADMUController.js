const db = require('../models/db.js');

const ADMUController = {


    getADMU: function (req, res){
        res.render('timelineADMU');
    }


}

module.exports = ADMUController;