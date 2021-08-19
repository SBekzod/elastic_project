const config = require('config');
var elastic_client = require('../db');

const indexName = config.elasticsearch.elasticsearchIndices.USERS.index;
const indexType = config.elasticsearch.elasticsearchIndices.USERS.type;

exports.insertOtherSingleData = async function (req, res) {
    try {
        const response = await elastic_client.index({
            index: indexName,
            type: indexType,
            body: {
                tags: [
                    "opster",
                    "elasticsearch"
                ],
                date: "01-01-2020"
            }
        });
        let hits = response;
        res.status(200).send(hits);

    } catch (err) {
        console.trace("ERROR insertSingleData: ", err.message);
        res.send('The data has not been inserted');
    }

};

