"use strict";


// PART 1: SHOW A FORTUNE 

function showFortune(evt) {
    // sends get request to server
    // calls function at @app.route('/fortune') in server.py
    /*
    before switching to selector.load()
    $.get('/fortune', (data)=> {
        // data is what the function in server.py returns
        // in this case, it would be a random.choice(FORTUNES)
        $('#fortune-text').text(data);
        // we add this return string to the #fortune-text div in index.html
    });
    */
    let url = "/fortune";
    $('#fortune-text').load(url);

}

$('#get-fortune-button').on('click', showFortune);


// PART 2: SHOW WEATHER

function showWeather(evt) {
    evt.preventDefault();
    let url = "/weather.json forecast";
    // value at #zipcode-field is what the user enters as their zipcode before hitting submit
    // #weather-form
    
    const formData = $('#weather-form').serialize();
    /* serialized from:
    let formData = {"zipcode": $("#zipcode-field").val()};
    */
    // performs a GET request on @app.route('/weather.json'), 
    // which returns a json string containing weather info (passed into data)
    
    /* before switching to selector.load()
    $.get(url, formData, (data)=> {
        $('#weather-info').text(data['forecast']);
    });
    */

    $('#weather-info').load(url, FormData);
}
$
$("#weather-form").on('submit', showWeather);


// PART 3: ORDER MELONS

function orderMelons(evt) {
    evt.preventDefault();
    let url = "/order-melons.json";
    // gets user inputs from the melon-type field and quantity field
    // and store them into a variable
    const formInputs = $('#order-form').serialize();
    /* serialized from: 
    const formInputs = {
        'melon_type': $('#melon-type-field').val(),
        'qty': $('#qty-field').val()
    };
    */

    // performs POST request on @app.route('/order-melons.json', methods=['POST'])
    $.post(url, formInputs, (res)=> {
        // gets a json response with status code and message
        let statusCode = res['code'];
        let message = res['msg'];
        // if there's an error we change the text red
        if (statusCode === 'ERROR') {
            $('#order-status').addClass('order-error');
        }
        // add message into the div
        $('#order-status').text(message);
    });
}

$("#order-form").on('submit', orderMelons);


