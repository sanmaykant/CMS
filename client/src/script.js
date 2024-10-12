const signup = () => {
    const token = localStorage.getItem('token')
    if (token) {
        return
    }

    var signupUrl = "http://localhost:5000/api/auth/signup"
    var xhr = new XMLHttpRequest();

    var userElement = document.getElementById('username');
    var passwordElement = document.getElementById('password');
    var email = userElement.value;
    var password = passwordElement.value;

    xhr.open('POST', signupUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', function () {
        var responseObject = JSON.parse(this.response);
        console.log(responseObject);

        login(email, password)
    });

    var sendObject = JSON.stringify({ email: email, password: password });
    console.log('going to send', sendObject);
    xhr.send(sendObject);
}

const login = (email, password) => {
    var loginUrl = "http://localhost:5000/api/auth/login"
    var xhr = new XMLHttpRequest()

    xhr.open("POST", loginUrl, true)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', function () {
        var responseObject = JSON.parse(this.response);
        var token = responseObject.token.split(" ")[1]; // Example: Replace "Authorization" with the actual header name
        console.log(token)

        localStorage.setItem('token', token)
    });

    var sendObject = JSON.stringify({ email: email, password: password });
    console.log('going to send', sendObject);
    xhr.send(sendObject);
}

document.getElementById('authForm').addEventListener('submit', function (e) {
    e.preventDefault();
});

