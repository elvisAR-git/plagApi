send_response = function (data, is_error, message) {
    var json = { data: data, is_error: is_error, message: message };
    if (is_error === undefined)
    {
        json.is_error = false;
    }
    if (message === undefined)
    {
        json.message = '';
    }

    return json;
};
