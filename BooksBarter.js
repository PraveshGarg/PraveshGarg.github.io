var city;
var BooksPostTable;
//var globalUrl = "http://localhost:3000";
var globalUrl = "https://booksbartersystem.herokuapp.com";

var loading_status;
var loading_duration = 0;
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


function urlParameters() {
	var urlstring = window.location.href;
	var url = new URL(urlstring);
	city = url.searchParams.get("City");
    city = decodeURIComponent(city);
    $("#homeBtn").attr("onclick", "javascript:window.location.href='BooksBarter.html?City=" + encodeURIComponent(city) + "'");    
    $("#Myposts").attr("onclick", "javascript:window.location.href='MyPosts.html?City=" + encodeURIComponent(city) + "'");
    $("#btnUserName").html('<i class="fas fa-user"></i>&nbsp;' + window.sessionStorage.getItem("username") + '&nbsp; &nbsp; <i class="fas fa-caret-down"></i>');
}


function loadAllBooksTableData(ActivateLoader) {
    if (ActivateLoader) {
        Loader(true);
    }
	$.ajax
		({
			url: globalUrl + "/CityBooksData",
			type: "POST",
            crossDomain: true,
            data: { "Userid": window.sessionStorage.getItem("useremail"), "City": city, "Token": window.sessionStorage.getItem("token") },
			headers:
			{
				"Access-Control-Allow-Headers": "x-requested-with",
				"Access-Control-Allow-Headers": "*",
			},
			success: function (data, status, xhr) {
				loadtablecontent(data);				
                $("input[type='search']").css({ "background-color": "white", "height": "30px" });				
                Loader(false);
			},
			error: function (er) {
				console.log(er);
			}
		})

	function loadtablecontent(dataSet) {
		BooksPostTable = $('#BooksPostTable').DataTable({
			data: dataSet,
			bDestroy: true,
			//"searching": false,
			paging: false,
			stateSave: true,
			"bPaginate": false,			
			info: false,
            columns: [
                {
                    title: "Person Name",
                },
				{
					title: "Book Name",
				},
				{
					title: "Book Type",
				},
				{
					title: "Book Language",
				},
				{
					title: "Author",
				},
				{
					title: "Book Link",
                    render: function (data, type, row, meta) {
                        if (data != null && data != "" && data != undefined) {
                            var a = "<a href='" + data + "'>Reference link</a>";
                            return a;
                        }
                        else {
                            return "";
                        }
					},
				},
				{
					title: "Description",
				},
				{
					title: "Interested In Books",
                },
                {
                    title: "Address",
                },				
			],
            columnDefs: [
                {
                    "targets": [0],
                    "orderable": false,
                    "searchable": false,                    
                },
                {
                    "targets": [1],
                    "orderable": false,
                    "searchable": true,
                },
                {
                    "targets": [2],
                    "orderable": false,
                    "searchable": true,
                },
                {
                    "targets": [3],
                    "orderable": false,
                    "searchable": true,
                },
                {
                    "targets": [4],
                    "orderable": false,
                    "searchable": true,
                },
                {
                    "targets": [5],
                    "orderable": false,
                    "searchable": true,
                },
                {
                    "targets": [6],
                    "orderable": false,
                    "searchable": true,
                },
                {
                    "targets": [7],
                    "orderable": false,
                    "searchable": true,                    
                },
				{
					"targets": [8],
					"orderable": false,
                    "searchable": true,					
				},
				{
					"targets": [9],
                    "orderable": false,
                    "searchable": false,
                    "visible": false,					
                },
                {
                    "targets": [10],
                    "orderable": false,
                    "searchable": false,
                    "visible": false,
                },                
                {
                    "targets": [11],
                    "orderable": false,
                    "searchable": false,
                    "visible": false,
                },  
                {
                    "targets": [12],
                    "orderable": false,
                    "searchable": false,
                    "visible": false,
                }, 
			],
			"aaSorting": [11, 'asc'],
			//"orderFixed": [9, 'asc'],				
            drawCallback: function (settings) {

                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;
                var counter = 0;

                api.column(11, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        var data9, data10, data12;
                        for (var j = 0; j < dataSet.length; j++) {
                            if (dataSet[j][11] == group) {
                                data9 = dataSet[j][9];
                                data10 = dataSet[j][10];
                                data12 = dataSet[j][12];
                            }
                        }
                        if (data10 == "Contact Button") {
                            $(rows).eq(i).before(
                                '<tr><td colspan="9">' +
                                '<b style="font-size:16px;"><i class="fa fa-user"></i>&nbsp;<label style="padding-left:5px">' + data9 + '</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' +
                                '<button class="yellowbtn" onclick="ContactPerson(' + "'" + group + "'" + ')" style="background-color: #F8E9A1;color: #24305E;font-size:15px;font-weight: bold;">Contact</button>' +
                                '</td></tr>'
                            )
                        }
                        else if (data10 == "Approve") {
                            $(rows).eq(i).before(
                                '<tr><td colspan="9">' +
                                '<b style="font-size:16px;"><i class="fa fa-user"></i>&nbsp;<label style="padding-left:5px">' + data9 + '</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' +
                                '<button class="yellowbtn" onclick="ApproveRequest(' + "'" + group + "'" + ',' + "'" + data12 + "'" + ')" style="background-color: #F8E9A1;color: #24305E;font-size:15px;font-weight: bold;">Approve</button>' +
                                '</td></tr>'
                            )
                        }
                        else if (data10 == "Waiting") {
                            $(rows).eq(i).before(
                                '<tr><td colspan="9">' +
                                '<b style="font-size:16px;"><i class="fa fa-user"></i>&nbsp;<label style="padding-left:5px">' + data9 + '</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' +
                                "<b style='font-size:16px; color:Green'>Waiting for person's approval</b>"+
                                '</td></tr>'
                            )
                        }
                        else {
                            $(rows).eq(i).before(
                                '<tr><td colspan="9">' +
                                '<b style="font-size:16px;"><i class="fa fa-user"></i>&nbsp;<label style="padding-left:5px">' + data9 + '</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>' +
                                '<b style="font-size:16px;">Mobile Number - <b>' + data10+
                                '</td></tr>'
                            )
                        }

                        last = group;
                    }
                })
                    }
		});
	}
	
}


function ApproveRequest(UserId2, adId) {
    Loader(true);
    $.ajax
        ({
            url: globalUrl + "/ApproveRequest",
            type: "POST",
            crossDomain: true,
            data: { "UserId2": UserId2, "UserId1": window.sessionStorage.getItem("useremail"), "adId": adId, "Token": window.sessionStorage.getItem("token") },
            headers:
            {
                "Access-Control-Allow-Headers": "x-requested-with",
                "Access-Control-Allow-Headers": "*",
            },
            success: function (data, status, xhr) {
                $("#notification").text(data[0]);
                $("#notification").css("color", data[1]);
                $("#NotificationModal").modal('show');                
                loadAllBooksTableData(false);                
            },
            error: function (er) {
                console.log(er);
            }
        })
}


function onPostAdModalOpen() {
    $("#PostAdModal").on('shown.bs.modal', function (event) {
        Loader(true);
        $("#inputGetBookName").removeClass("error"); $("#inputGetBookName-error").css("visibility", "hidden");
        $("#inputGetBookLanguage").removeClass("error"); $("#inputGetBookLanguage-error").css("visibility", "hidden");
        $("#inputGetBookAuthor").removeClass("error"); $("#inputGetBookAuthor-error").css("visibility", "hidden");

        $("#inputGetBookName").val("");
        $("#inputGetBookLanguage").val("");
        $("#inputGetBookAuthor").val("");
        $("#inputGetBookLink").val("");
		$("#inputGetBookDescription").val("");
        $("#inputGetBookInterestedIn").val("");		
        Loader(false);
    });
}


function btnSavePostAdFunction() {
    $("#btnSavePostAd").on('click', function () {                
        Loader(true);

        var bookname = $("#inputGetBookName").val();
        var booktype = $("#selGetBookType").val();
        var booklanguage = $("#inputGetBookLanguage").val();
        var bookauthor = $("#inputGetBookAuthor").val();
        var booklink = $("#inputGetBookLink").val();
        var bookdescription = $("#inputGetBookDescription").val();		
		var bookInterestedIn = $("#inputGetBookInterestedIn").val();
		if (bookname.trim() != "" & booktype.trim() != "" & booklanguage.trim() != "" & bookauthor.trim() != "") {   
			$("#PostAdModal").modal('hide');
			$.ajax
				({
					url: globalUrl + "/PostBooksAdData",
					type: "POST",
					crossDomain: true,
                    data: { "UserId": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token"), "City": city, "BookName": bookname, "BookType": booktype, "TextLanguage": booklanguage, "Author": bookauthor, "BookLink": booklink, "Description": bookdescription, "BookInterestedIn": bookInterestedIn },
					headers:
					{
						"Access-Control-Allow-Headers": "x-requested-with",
						"Access-Control-Allow-Headers": "*",
					},
                    success: function (data, status, xhr) {
                        $("#notification").text(data[0]);
                        $("#notification").css("color", data[1]);
                        $("#NotificationModal").modal('show');
                        Loader(false);
					},
					error: function (er) {
						console.log(er);
					}
				})			
        }
        else {
            if (bookname.trim() == "") {
                $("#inputGetBookName").addClass("error");
                $("#inputGetBookName-error").css("visibility", "visible");
            }           
            else if (booklanguage.trim() == "") {
                $("#inputGetBookLanguage").addClass("error");
                $("#inputGetBookLanguage-error").css("visibility", "visible");
            }
            else if (bookauthor.trim() == "") {
                $("#inputGetBookAuthor").addClass("error");
                $("#inputGetBookAuthor-error").css("visibility", "visible");
            }
            Loader(false);
        }
    });
}


function btnLogoutClicked() {
	$("#btnLogout").on('click', function () {
		window.location.href = "LoginSignUp.html";
	})
}


function ContactPerson(UserId2) {
    Loader(true);
	$.ajax
		({
			url: globalUrl + "/ContactButtonClicked",
			type: "POST",
			crossDomain: true,
            data: { "UserId2": UserId2, "UserId1": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token") },
			headers:
			{
				"Access-Control-Allow-Headers": "x-requested-with",
				"Access-Control-Allow-Headers": "*",
			},
            success: function (data, status, xhr) {
                $("#notification").text(data[0]);
                $("#notification").css("color", data[1]);
                $("#NotificationModal").modal('show');                
                loadAllBooksTableData(false);                
			},
			error: function (er) {
				console.log(er);
			}
		})
}