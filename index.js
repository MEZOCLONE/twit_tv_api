/**
 * Created by Geoff Moore on 8/29/15.
 */

var req = require('request');
var twit = require('./credentials/twitCredentials');

var baseUri = 'https://twit.tv/api/v1.0/';

module.exports = {

    //* build your own API call
    TWiT_request: function(endpoint, id, opts, callback) {
        var methodUrl = baseUri + endpoint;
        if (id !== '') {
            methodUrl += '/' + id;
        }
        if (opts !== '') {
            methodUrl += '?';
            for (e in opts) {
                if (opts.hasOwnProperty(e)){
                    methodUrl += e + '=' + opts[e] + ',';
                }
            }
            //remove last comma
            methodUrl = methodUrl.substring(0, methodUrl.length - 1);
        }
        sendRequest(methodUrl, function(error, result) {
            callback(error, result);
        });
    },

    //* call the API with results from a TWiT_request or
    //* just type your own url string
    TWiT_url: function(url, callback) {
        sendRequest(url, function(error, result) {
            callback(error, result);
        });

    }
};

function sendRequest(methodUrl, callback) {
    var theUrl = methodUrl;
    var headers = {
        "Accept": "application/json",
        "app-id": twit.credentials().appid,
        "app-key": twit.credentials().appkey
    };

    var options = {
        url: theUrl,
        method: 'GET',
        headers: headers,
        json: true
    };

    req(options, function (error, response) {
        if (error) {
            callback(error, null)
        } else {
            if (response.statusCode == 200) {
                callback(null, response.body);
            } else {
                callback(response.body, null)
            }
        }
    });
}
