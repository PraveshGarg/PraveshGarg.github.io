// JavaScript source code

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

function btnSignUpClicked() {
    $("#btnSignUp").on('click', function () { 
        Loader(true);
        $("#inputSignUpEmailError").css("display", "none");
        $("#inputSignUpPasswordError").css("display", "none");
        $("#inputSignUpRePasswordError").css("display", "none");
        $("#inputEmailExistsError").css("display", "none");
        $("#inputSignUpFirstNameError").css("display", "none");
        $("#inputSignUpLastNameError").css("display", "none");
        $("#inputSignUpMobileError").css("display", "none");
        $("#selSignUpCityError").css("display", "none");
        $("#inputSignUpAddressError").css("display", "none");        

        $("#inputSignUpEmail").val("");

        $("#LoginSignUpForm").css("display", "none");
        $("#SignUpForm").css("display", "block");
        Loader(false);
    })
}

function btnSignUpSubmitClicked(){
    $("#btnSignUpSubmit").on('click', function () {
        Loader(true);
        $("#inputSignUpFirstNameError").css("display", "none");
        $("#inputSignUpLastNameError").css("display", "none");
        $("#inputSignUpMobileError").css("display", "none");
        $("#selSignUpCityError").css("display", "none");
        $("#inputSignUpAddressError").css("display", "none"); 
        $("#inputSignUpEmailError").css("display", "none");
        $("#inputSignUpPasswordError").css("display", "none");
        $("#inputSignUpRePasswordError").css("display", "none");
        $("#inputEmailExistsError").css("display", "none");

        var email = $("#inputSignUpEmail").val();
        var password = $("#inputSignUpPassword").val();
        
        if ($("#inputSignUpPassword").val() == $("#inputSignUpRePassword").val() && $("#inputSignUpPassword").val() != "" && $("#inputSignUpEmail").val() != "" && $("#inputSignUpFirstName").val() != "" && $("#inputSignUpLastName").val() != "" && $("#inputSignUpMobile").val() != "" && $("#inputSignUpAddress").val() != "" && $("#selSignUpCity").val() != "Select") {

            $.ajax
                ({
                    url: globalUrl + "/signup",
                    type: "POST",
                    crossDomain: true,
                    data: { "email": email, "password": password, "firstname": $("#inputSignUpFirstName").val(), "lastname": $("#inputSignUpLastName").val(), "mobile": $("#inputSignUpMobile").val(), "city": $("#selSignUpCity").val(), "address": $("#inputSignUpAddress").val()},
                    headers:
                    {
                        "Access-Control-Allow-Headers": "x-requested-with",
                        "Access-Control-Allow-Headers": "*",
                    },
                    success: function (data, status, xhr) {
                        Loader(false);
                        if (xhr.responseText != "") {
                            window.sessionStorage.setItem("useremail", data[0]);
                            window.sessionStorage.setItem("token", data[2]);
                            window.location.assign(data[1]);
                        }
                        else {
                            $("#inputEmailExistsError").css("display", "block");
                        }
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
            else if ($("#inputSignUpEmail").val() == "") {
                $("#inputSignUpEmailError").css("display", "block");
            }
            else if ($("#inputSignUpPassword").val() == "") {
                $("#inputSignUpPasswordError").css("display", "block");
            }
            else if ($("#inputSignUpPassword").val() != $("#inputSignUpRePassword").val()) {
                $("#inputSignUpRePasswordError").css("display", "block");
            }
            Loader(false);
        }
    })
}

function btnLoginClicked() {
    $("#btnLogin").on('click', function () {        
        Loader(true);
        var email = $("#inputLoginUserName").val();
        var password = $("#inputLoginPassword").val();

        if (email != "" && password != "") {
			//-------------------------------------------------------------------------------			

			$.ajax
				({
					url: globalUrl + "/login",
					type: "POST",
					crossDomain: true,
					data:{ "email": email, "password": password },					
					headers:
					{
						"Access-Control-Allow-Headers": "x-requested-with",
                        "Access-Control-Allow-Headers": "*",                        
					},
                    success: function (data, status, xhr) {
                        Loader(false);
						if (xhr.responseText!="") {
                            window.sessionStorage.setItem("useremail", data[0]);
                            window.sessionStorage.setItem("token", data[2]);
                            window.location.assign(data[1]);                            
						}
						else {
							$("#inputLoginError").css("display", "block");
						}
					},
					error: function (er) {						
						console.log(er);
					}
				})            
        }
        else {
            $("#inputLoginError").css("display", "block");
            Loader(false);
        }
    })
}

function anchorForgotPasswordClicked() {
    $("#anchorForgotPassword").on('click', function () {
        Loader(true);
		$("#inputForgotPasswordEmailError").css("display", "none");
		$("#inputForgotPasswordOTPSuccess").css("display", "none");
		$("#inputForgotPasswordOTPError").css("display", "none");		

		$("#inputForgotPasswordEmail").val("");
		$("#inputForgotPasswordOTP").val("");

		$("#LoginSignUpForm").css("display", "none");
        $("#ForgotPasswordForm").css("display", "block");
        Loader(false);
	})
}

function sendOtp() {
    $("#btnSendOTP").on('click', function () {
        Loader(true);
		var email = $("#inputForgotPasswordEmail").val();
		$.ajax
			({
				url: globalUrl + "/ForgotPassword",
				type: "POST",
				crossDomain: true,
				data: { "email": email },
				headers:
				{
					"Access-Control-Allow-Headers": "x-requested-with",
					"Access-Control-Allow-Headers": "*",
				},
                success: function (data, status, xhr) {
                    Loader(false);
					if (xhr.responseText != "") {
						$("#inputForgotPasswordOTPSuccess").css("display", "block");						
						$("#inputPasswordResetEmail").val($("#inputForgotPasswordEmail").val());
					}
					else {
						$("#inputForgotPasswordEmailError").css("display", "block");
					}
				},
				error: function (er) {
					console.log(er);
				}
			})

	})
}

function btnSubmitOTPClicked() {
    $("#btnSubmitOTP").on('click', function () {
        Loader(true);        

        $.ajax
            ({
                url: globalUrl + "/SubmitOtp",
                type: "POST",
                crossDomain: true,
                data: { "email": $("#inputForgotPasswordEmail").val(), "otp": $("#inputForgotPasswordOTP").val() },
                headers:
                {
                    "Access-Control-Allow-Headers": "x-requested-with",
                    "Access-Control-Allow-Headers": "*",
                },
                success: function (data, status, xhr) {
                    if (data=="success") {
                        $("#ForgotPasswordForm").css("display", "none");
                        $("#PasswordResetForm").css("display", "block");
                    }
                    else {
                        $("#inputForgotPasswordOTPError").css("display", "block");
                    }
                    Loader(false);
                },
                error: function (er) {
                    console.log(er);
                }
            })
		
	})
}

function btnResetPasswordClicked() {
    $("#btnResetPassword").on('click', function () {
        Loader(true);
		if ($("#inputPasswordResetPassword").val() == $("#inputPasswordResetRePassword").val()) {
			$.ajax
				({
					url: globalUrl + "/ResetPassword",
					type: "POST",
					crossDomain: true,
					data: { "email": $("#inputPasswordResetEmail").val(), "password": $("#inputPasswordResetPassword").val() },
					headers:
					{
						"Access-Control-Allow-Headers": "x-requested-with",
						"Access-Control-Allow-Headers": "*",
					},
                    success: function (data, status, xhr) {
                        Loader(false);
						if (xhr.responseText != "") {
                            window.sessionStorage.setItem("useremail", data[0]);
                            window.sessionStorage.setItem("token", data[2]);
                            window.location.assign(data[1]);
						}
						
					},
					error: function (er) {
						console.log(er);
					}
				})
		}
		else {
            $("#inputPasswordResetError").css("display", "block");
            Loader(false);
		}
	})
}