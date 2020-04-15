const timelineController = {

    getTimeline: function (req,res) {
        var post = {};
      
        db.findMany('userPost',post,function(result){
            res.render('timeline',result);
        })
    },
}

module.exports = timelineController;