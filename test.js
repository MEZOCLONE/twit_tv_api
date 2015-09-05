/**
 * Created by xdevelop on 8/30/15.
 */

var test = require('./index');

var parameters = {
    'order': 'DESC',
    'range': 3
};

test.TWiT_request('sponsors','', parameters, function(error, result) {
    console.log(result);
});

test.TWiT_url('https://twit.tv/api/v1.0/sponsors?order=ASC%2Crange%3D3&page=2', function(error, result) {
    console.log(result);
});

