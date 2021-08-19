const config = require('config');
var elastic_client = require('../db');

const indexName = config.elasticsearch.elasticsearchIndices.COMETS.index;
const indexType = config.elasticsearch.elasticsearchIndices.COMETS.type;

exports.updateSingleData = async function (req, res, next) {

    try {

        const response = await elastic_client.update({
            index: indexName,
            type: indexType,
            id: req.body.id,
            body: {
                doc: {
                    member_id: req.body.member_id,
                    age: req.body.age,
                    skills: req.body.skills,
                    children: req.body.children
                }
            }
        })
        var hits = response;
        res.status(200).send(hits);

    } catch (err) {
        console.log("Elasticsearch ERROR - data not updated");
        console.log('ERROR updateSingleData', err.message);
    }

};
