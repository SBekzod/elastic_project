const config = require('config');
var elastic_client = require('../db');

const indexName = config.elasticsearch.elasticsearchIndices.COMETS.index;
const indexType = config.elasticsearch.elasticsearchIndices.COMETS.type;


exports.getEachIndicesData = async function (req, res, next) {
    try {
        const response = await elastic_client.search({
            index: req.params["index"],
            body: {
                "from": 0, "size": 10000,
                query: {
                    match_all: {}
                }
            }
        })
        var hits = response.hits.hits;
        res.status(200).send(hits);
    } catch (err) {
        console.log("ERROR getRepeated: ", err.message);
        res.send(`No Indices with:  ${req.params["index"]}`);
    }
}

exports.getEachIndicesSingleRecord = async function (req, res, next) {
    try {
        const response = await elastic_client.search({
            index: indexName,
            type: indexType,
            body: {
                query: {
                    match: { "member_id": req.body.member_id }
                }
            }
        })
        var hits = response.hits.hits;
        res.status(200).send(hits);

    } catch (err) {
        console.trace("ERROR getEachIndicesSingleRecord: ", err.message);
        res.send(`No dat with that member_id: ${req.body.member_id}`);
    }
}

exports.getRepeatedFieldIndicesData = async function (req, res, next) {
    
    try {
        const response = await elastic_client.search({
            index: indexName,
            type: indexType,
            body: {
                "aggs": {
                    "count": {
                        "terms": {
                            "field": "dept.keyword",
                            "size": 100,
                        }
                    }
                }
            }
        })
        let hits = response
        res.status(200).send(hits);
        
    } catch (err) {
        console.trace("ERROR getRepeatedFieldIndicesData: ", err.message);
        res.send('NO REPEATED DATA')
    }

}