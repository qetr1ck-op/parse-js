;(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var parseID = '11chRVoYjMiVF09kkZf7hcn52H4QXatn5msz31tn',
            parseRestKey = 'V4BLSNT2tva3AmUS8EZT6MwCfIMtaYpyj2i63J34',
            parseUrlApi = 'https://api.parse.com/1/classes/MessageBoard',
            formNewUser = document.forms['new-user'];

        getMessages();

        document.querySelector("#send").onclick = function() {
            var username = formNewUser.elements.username.value,
                message = formNewUser.elements.message.value;

            var postPromise = new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', parseUrlApi, true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('X-Parse-Application-Id', parseID);
                xhr.setRequestHeader('X-Parse-REST-API-Key', parseRestKey);

                xhr.onload = function() {
                    xhr.status === 200 ?
                        resolve(xhr.response) : reject(xhr.responseText);
                };

                xhr.onerror = function() {
                    reject('Network Error');
                };

                xhr.send(JSON.stringify({
                    'username': username,
                    'message': message
                }));

            }).then(function(resp) {
                    console.log(resp);
                }, function(err) {
                    console.log(err);
                })
        };

        var tmplUsers = _.template(document.querySelector('#tmpl-users').innerHTML);

        function getMessages() {
            var postPromise = new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', parseUrlApi, true);

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('X-Parse-Application-Id', parseID);
                xhr.setRequestHeader('X-Parse-REST-API-Key', parseRestKey);

                xhr.onload = function() {
                    xhr.status === 200 ?
                        resolve(xhr.response) : reject(xhr.responseText);
                };

                xhr.onerror = function() {
                    reject('Network Error');
                };

                xhr.send();

            }).then(function(resp) {
                    console.log(resp);
                    var users = tmplUsers({
                        results: JSON.parse(resp).results
                    });
                    document.querySelector('#users tbody').innerHTML = users;
                }, function(err) {
                    console.log(err);
                })
        }
    })
})();
