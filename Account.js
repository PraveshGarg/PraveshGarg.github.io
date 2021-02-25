var loading_status;
var loading_duration = 0;
//var globalUrl = "http://localhost:3000";
var globalUrl = "https://booksbartersystem.herokuapp.com";

function Loader(status) {
    loading_status = status;
    if (loading_status) {
        var html = `

                        <div id="loading_id" style=" position: fixed; z-index: 11454; left: 0; top: 0; width: 100%;  height: 100%;  overflow: auto; background-color: rgb(0,0,0);  background-color: rgba(0,0,0,0.4); ">
                          <div style="background-color: #fefefe; padding: 20px; width: 18%; margin-top: 15%; margin-left: 40%;border-radius: 10px; border: none;">
                                <p style="margin: 0 0 1%;" id="pLoader"><i class="fa fa-spinner fa-pulse fa-4x fa-fw" aria-hidden="true"></i><label style="font-size: 15px; margin-bottom: 10%;" id="lblLoader">Please wait...</label> </p>
                          </div>
                        </div>
                        
                        `;

        $("body").append(html);
        var loading_int = setInterval(function () {

            if (loading_status) {
                loading_duration++;
                $("#lblLoader").html(`Please wait...`);
            }
            else {
                $("#loading_id").remove();
                loading_status = false;
                loading_duration = 0;
                clearInterval(loading_int);
            }
        }, 1000)
    }

    function toHHMMSS(number) {
        var sec_num = parseInt(number, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

}

function loadAccountDetailsFormData(LoaderActivate) {
    if (LoaderActivate) {
        Loader(true);
    }
    $.ajax
        ({
            url: globalUrl + "/GetAccountDetails",
            type: "POST",
            crossDomain: true,
            data: { "Userid": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token") },
            headers:
            {
                "Access-Control-Allow-Headers": "x-requested-with",
                "Access-Control-Allow-Headers": "*",
            },
            success: function (data, status, xhr) {
                $("#inputSignUpFirstName").val(data[0]);
                $("#inputSignUpLastName").val(data[1]);
                $("#inputSignUpMobile").val(data[2]);
                $("#selSignUpCity").val(data[3]);
                $("#inputSignUpAddress").val(data[4]);
                $("#inputSignUpEmail").val(data[5]);
                                
                $("#homeBtn").attr("onclick", "javascript:window.location.href='BooksBarter.html?City=" + encodeURIComponent(data[3]) + "'");
                $("#Myposts").attr("onclick", "javascript:window.location.href='MyPosts.html?City=" + encodeURIComponent(data[3]) + "'");

                Loader(false);
            },
            error: function (er) {
                console.log(er);
            }
        })
}


function btnEditAccountSubmitClicked() {
    $("#btnEditAccountSubmit").on('click', function () {
        Loader(true);
        $("#inputSignUpFirstNameError").css("display", "none");
        $("#inputSignUpLastNameError").css("display", "none");
        $("#inputSignUpMobileError").css("display", "none");
        $("#selSignUpCityError").css("display", "none");
        $("#inputSignUpAddressError").css("display", "none");
        $("#inputSignUpOldPasswordError").css("display", "none");
        $("#inputSignUpPasswordError").css("display", "none");
        $("#inputSignUpRePasswordError").css("display", "none");

        if ($("#inputSignUpFirstName").val() != "" && $("#inputSignUpLastName").val() != "" && $("#inputSignUpMobile").val() != "" && $("#inputSignUpAddress").val() != "" && $("#selSignUpCity").val() != "Select") {

            $.ajax
                ({
                    url: globalUrl + "/EditAccountDetails",
                    type: "POST",
                    crossDomain: true,
                    data: { "firstname": $("#inputSignUpFirstName").val(), "lastname": $("#inputSignUpLastName").val(), "mobile": $("#inputSignUpMobile").val(), "city": $("#selSignUpCity").val(), "address": $("#inputSignUpAddress").val(), "UserId": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token") },
                    headers:
                    {
                        "Access-Control-Allow-Headers": "x-requested-with",
                        "Access-Control-Allow-Headers": "*",
                    },
                    success: function (data, status, xhr) {                        
                        $("#notification").text(data[0]);
                        $("#notification").css("color", data[1]);
                        $("#NotificationModal").modal('show');
                        loadAccountDetailsFormData(false);
                    },
                    error: function (er) {
                        console.log(er);
                    }
                })
        }
        else {
            if ($("#inputSignUpFirstName").val() == "") {
                $("#inputSignUpFirstNameError").css("display", "block");
            }
            else if ($("#inputSignUpLastName").val() == "") {
                $("#inputSignUpLastNameError").css("display", "block");
            }
            else if ($("#inputSignUpMobile").val() == "") {
                $("#inputSignUpMobileError").css("display", "block");
            }
            else if ($("#selSignUpCity").val() == "Select") {
                $("#selSignUpCityError").css("display", "block");
            }
            else if ($("#inputSignUpAddress").val() == "") {
                $("#inputSignUpAddressError").css("display", "block");
            }
            Loader(false);
        }
    })
}


function btnChangePasswordClicked() {
    $("#btnChangePassword").on('click', function () {
        Loader(true);
        $("#inputSignUpFirstNameError").css("display", "none");
        $("#inputSignUpLastNameError").css("display", "none");
        $("#inputSignUpMobileError").css("display", "none");
        $("#selSignUpCityError").css("display", "none");
        $("#inputSignUpAddressError").css("display", "none");
        $("#inputSignUpOldPasswordError").css("display", "none");
        $("#inputSignUpPasswordError").css("display", "none");
        $("#inputSignUpRePasswordError").css("display", "none");

        if ($("#inputSignUpPassword").val() == $("#inputSignUpRePassword").val() && $("#inputSignUpPassword").val() != "") {

            $.ajax
                ({
                    url: globalUrl + "/ChangePassword",
                    type: "POST",
                    crossDomain: true,
                    data: { "OldPassword": $("#inputSignUpOldPassword").val(), "NewPassword": $("#inputSignUpPassword").val(), "UserId": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token") },
                    headers:
                    {
                        "Access-Control-Allow-Headers": "x-requested-with",
                        "Access-Control-Allow-Headers": "*",
                    },
                    success: function (data, status, xhr) {
                        if (data[0] == "Incorrect Password") {
                            $("#inputSignUpOldPasswordError").css("display", "block");                            
                        }
                        else {
                            $("#inputSignUpOldPassword").val("");
                            $("#inputSignUpPassword").val("");
                            $("#inputSignUpRePassword").val("");

                            $("#notification").text(data[0]);
                            $("#notification").css("color", data[1]);
                            $("#NotificationModal").modal('show');
                        }
                        Loader(false);
                    },
                    error: function (er) {
                        console.log(er);
                    }
                })
        }
        else {
            if ($("#inputSignUpPassword").val() == "") {
                $("#inputSignUpPasswordError").css("display", "block");
            }
            else if ($("#inputSignUpPassword").val() != $("#inputSignUpRePassword").val()) {
                $("#inputSignUpRePasswordError").css("display", "block");
            }
            Loader(false);
        }
    })
}