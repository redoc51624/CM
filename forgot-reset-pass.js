/*  
 * @FORGOT PASSWORD BUTTON JS
 * @project COMPETENCY MATRIX
 * @author VIKAS KUMAR, SapientNitro 
 * @email < vkumar141@sapient.com >
 * @licensor IAP1 * @site COMPETENCY MATRIX
 */

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementsByClassName("modal")[0];
var bacgrnd = document.getElementsByClassName("background")[0];

document.getElementById("forgot-password").addEventListener("click", function () {
    console.log("forgot_password button clicked...");
    bacgrnd.style.opacity = 0.5;
    modal.style.display = "block";

});


span.addEventListener("click", function () {
    console.log("in close.....");
    bacgrnd.style.opacity = 1;
    modal.style.display = "none";
})

window.onclick = function (event) {
    if (event.target === modal) {
        bacgrnd.style.opacity = 1;
        modal.style.display = "none";
    }
}

document.getElementsByClassName("submit-forgot").addEventListener("click", function () {
    console.log("inside submit-forgot called....");
    var userid = document.getElementsByClassName("username-textbox");

    var uemail;

    ///----------FETCH DATA------------------------------------


    var url = "http://localhost:3000/user_pass/";

    function fetchData(url, callback) {

        var data;
        console.log("Inside ajax call ");

        var xhttp = function () {
            if (window.XMLHttpRequest) {
                xhttp = new XMLHttpRequest();
            } else {
                xhttp = new ActiveXObject("Microsoft.XMLHttp");
            }
            return xhttp;
        }


        xhr = xhttp();
        xhr.open('GET', "http://localhost:3000/user_pass/", true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);

                console.log("DATA IS " + data);

                for (var i = 0; i < data.length; i++) {

                    if (userid === user_pass[i].id) {

                        uemail = user_pass[i].email;
                        console.log("got emailid from json.....");
                    }

                }

                callback(data);
            }
        }
    }


    //-------------------------forgot-function pass--------------
    //password creation  
    //
    //Crated pasword emailed


    var pwd;

    function successsCallBack(data) {
        if (data.email === uemail) {

            data.password = pwd;
            data = JSON.stringify(data);

            var url = "http://localhost:3000/user_pass/";
            writeData("http://localhost:3000/user_pass/", data);
            reset();
            console.log("New password created  and sent to email id..........!!");


        }
    }

    function pwdreset() {
        var url = "http://localhost:3000/user_pass/";
        fetchData("http://localhost:3000/user_pass/", successsCallBack);
    }
    pwdreset();


    function reset() {
        function stringGen(len) {
            var text = " ";
            var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

            for (var i = 0; i < len; i++)
                text += charset.charAt(Math.floor(Math.random() * charset.length));

            return text;
        }
        pwd = stringGen(10);

        //email reset code using email.js server
        emailjs.send("gmail", "template_Tz9VEnSb", {
            pass: pwd,
            notes: "password changed for the user!"
        })
        console.log("reset code sent.......!!!!")
    }

    // writeData utility writes data at the backend. obj is the data to be written at the url
    var url = "http://localhost:3000/user_pass/";

    function writeData(url, password) {
        var xhttp = function () {
            if (window.XMLHttpRequest) {
                xhttp = new XMLHttpRequest();
            } else {
                xhttp = new ActiveXObject("Microsoft.XMLHttp");
            }
            return xhttp;
        }

        xhr = xhttp();
        xhr.open('PUT', "http://localhost:3000/user_pass/", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(obj);
    }

});
//onclick event ends here
