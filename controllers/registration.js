const config = require('config');
var elastic_client = require('../db');

const indexName = config.elasticsearch.elasticsearchIndices.COMETS.index;
const indexType = config.elasticsearch.elasticsearchIndices.COMETS.type;

exports.insertSingleData = async function(req, res) {
    try {
        const response = await elastic_client.index({
            index: indexName,
            type: indexType,
            body : {
                member_id: req.body.member_id,
                age: req.body.age,
                skills: req.body.skills,
                children: req.body.children,
                desc: req.body.desc
            }
          });
            let hits = response;
            res.status(200).send(hits);
    
    } catch(err) {
        console.trace("ERROR insertSingleData: ", err.message);
        res.send('The data has not been inserted');
    }
    
};

