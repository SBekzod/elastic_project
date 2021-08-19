const config = require('config');
const chalk = require('chalk');

var elastic_client = require('../db');

const indexName = config.elasticsearch.elasticsearchIndices.COMETS.index;
const indexType = config.elasticsearch.elasticsearchIndices.COMETS.type;

exports.deleteUserData = async function (req, res, next) {

    try {

        const response = await elastic_client.deleteByQuery({
            index: indexName,
            type: indexType,
            body: {
                query: {
                    match: { "member_id": req.body.member_id }
                }
            }
        });
        var hits = response;
        res.status(200).send(hits);

    } catch (err) {
        console.log("Elasticsearch ERROR - data not present");
        console.log("ERROR deleteUserData: ", err.message);
    }

}


exports.deleteElasticSearchIndex = function (req, res, next) {
    var esIndexName = req.params.index;
    console.log(esIndexName);
    elastic_client.indices.delete({
        index: esIndexName //delete all indices '_all'
    }, function (err, response) {
        if (err) {
            console.error(chalk.red(err.message));
            res.send({
                status: 403,
                message: "Indices not present in elasticsearch"
            })
        } else {
            console.log(chalk.yellow('Indices have been deleted!', esIndexName));
            res.send({
                status: 200,
                message: esIndexName + " Indices have been deleted"
            })
        }
    });

}