async function transform(payload, mapping) {

    const body = JSON.stringify({
        data: payload,
        mapping: mapping,
        fromFormat: document.getElementById('fromType').value,
        toFormat: document.getElementById('toType').value
    });

    try {
        const response = await fetch('https://g1pi500ubh.execute-api.eu-central-1.amazonaws.com/dev/transform', { method: "POST", body })
        const json = await response.json();
        const formatteedJson = JSON.stringify(json, undefined, 4);
        document.getElementById('result').innerHTML = syntaxHighlight(formatteedJson);
    } catch (error) {
        console.log(error);
    }

    /* try {
         const response = await axios.post('https://pgu80stg82.execute-api.eu-central-1.amazonaws.com/dev/transform', body);
         const formatteedJson = JSON.stringify(response, undefined, 4);
         document.getElementById('result').innerHTML = syntaxHighlight(formatteedJson);
     } catch (err) {
         document.getElementById('result').innerHTML = JSON.stringify(JSON.parse(err.toJSON().config.data), undefined, 4);
         console.dir(err.response);
     }*/
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 4);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}