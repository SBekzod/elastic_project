const config = require('config');
var elastic_client = require('../db');

const indexName = config.elasticsearch.elasticsearchIndices.COMETS.index;
const indexType = config.elasticsearch.elasticsearchIndices.COMETS.type;

exports.updateSingleData = function(req, res, next) {
    elastic_client.update({
        index: indexName,
        type: indexType,
        id: req.body.id,
        body: {
            doc : {
                member_id: req.body.member_id,
                age: req.body.age,
                dept: req.body.dept,
                skills: req.body.skills,
                children: req.body.children
            }
        }
      }).then(function (response) {
        var hits = response;
        res.status(200).send(hits);
    }, function (error) {
        console.trace(error.message)
    }).catch((err) => {
        console.log("Elasticsearch ERROR - data not updated");
    }) 
};
