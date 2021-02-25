var city;
var MyBooksPostTable;
var InterestedPersonAdTable;
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
}


function loadMyBooksPostTableData(activateLoader) {	    
    if (activateLoader) {
        Loader(true);
    }

	$.ajax
		({
			url: globalUrl + "/MyBookPostsData",
			type: "POST",
			crossDomain: true,
            data: { "Userid": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token") },
			headers:
			{
				"Access-Control-Allow-Headers": "x-requested-with",
				"Access-Control-Allow-Headers": "*",
			},
			success: function (data, status, xhr) {
                loadtablecontent(data);	
                Loader(false);
				$("input[type='search']").css({ "background-color": "white", "height": "30px" });				
			},
			error: function (er) {
				console.log(er);
			}
		})

	function loadtablecontent(dataSet) {
		MyBooksPostTable = $('#MyBooksPostTable').DataTable({
			data: dataSet,
			bDestroy: true,
			//"searching": false,
			paging: false,
			stateSave: true,
			"bPaginate": false,			
			info: false,
            columns: [
                {
                    "render": function (data, type, row, meta) {
                        var a = "<a data-pop='popover' data-content='Click to edit this post' href='#' style='border-radius:50px; padding-left:10px' title='Edit post' data-toggle='modal' data-target='#EditMyPostAdModal' data-backdrop='static' data-postrecordid='" + data + "' data-formtype='Edit' style='color:white; border-radius:15px;font-size:x-small;'><i class='fas fa-edit' aria-hidden='true' style='color:#4080a5;padding-right:0px;font-size:large'></i></a>" +
                            "<a data-pop='popover' data-content='Click to delete this post' href='#' style='border-radius:50px; padding-left:10px' title='Delete post' data-toggle='modal' data-target='#DeleteMyPostAdModal' data-backdrop='static' data-adid='" + data + "' data-formtype='Edit' style='color:white; border-radius:15px;font-size:x-small;'><i class='fas fa-trash-alt' aria-hidden='true' style='color:#4080a5;padding-right:0px;font-size:large'></i></a>";
                        return a;
                    }
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
			],
            columnDefs: [
                {
                    "targets": [0],
                    "orderable": true,
                    "searchable": true,
                    
                },                
                {
                    "targets": [1],
                    "orderable": true,
                    "searchable": true,
                    
                },
                {
                    "targets": [2],
                    "orderable": true,
                    "searchable": true,
                    
                },
                {
                    "targets": [3],
                    "orderable": true,
                    "searchable": true,
                    
                },
                {
                    "targets": [4],
                    "orderable": true,
                    "searchable": true,
                    
                },
                {
                    "targets": [5],
                    "orderable": true,
                    "searchable": true,
                    
                },
                {
                    "targets": [6],
                    "orderable": true,
                    "searchable": true,
                    
                },
                {
                    "targets": [7],
                    "orderable": true,
                    "searchable": true,
                    
                },
				//{
				//	"targets": [8],
				//	"orderable": false,
    //                "searchable": false,	
    //                "width": "125px",
				//},
				//{
				//	"targets": [9],
				//	"orderable": false,
				//	"searchable": false,
				//	"visible": false,
				//},
			],
            order: [[0, "asc"]]				

		});
	}
	
}


function onEditMyPostAdModalOpen() {
    $("#EditMyPostAdModal").on('shown.bs.modal', function (event) {
        Loader(true);
        var modal = $(this);        
        var Button = $(event.relatedTarget)
        var postId = Button.data('postrecordid');
        $("#inputAdId").val(postId);
        $("#inputGetBookName").removeClass("error"); $("#inputGetBookName-error").css("visibility", "hidden");
        $("#inputGetBookLanguage").removeClass("error"); $("#inputGetBookLanguage-error").css("visibility", "hidden");
        $("#inputGetBookAuthor").removeClass("error"); $("#inputGetBookAuthor-error").css("visibility", "hidden");

        $.ajax
            ({
                url: globalUrl + "/GetEditMyPostData",
                type: "POST",
                crossDomain: true,
                data: { "adId": postId, "Userid": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token") },
                headers:
                {
                    "Access-Control-Allow-Headers": "x-requested-with",
                    "Access-Control-Allow-Headers": "*",
                },
                success: function (data, status, xhr) {
                    $("#inputGetBookName").val(data[0]);
                    $("#selGetBookType").val(data[1]);
                    $("#inputGetBookLanguage").val(data[2]);
                    $("#inputGetBookAuthor").val(data[3]);
                    $("#inputGetBookLink").val(data[4]);
                    $("#inputGetBookDescription").val(data[5]);
                    $("#inputGetBookInterestedIn").val(data[6]);
                    Loader(false);
                },
                error: function (er) {
                    console.log(er);
                }
            })

        		
    });
}


function btnEditMyPostAdFunction() {
    $("#btnEditMyPostAd").on('click', function () {                
        Loader(true);
        var bookname = $("#inputGetBookName").val();
        var booktype = $("#selGetBookType").val();
        var booklanguage = $("#inputGetBookLanguage").val();
        var bookauthor = $("#inputGetBookAuthor").val();
        var booklink = $("#inputGetBookLink").val();
        var bookdescription = $("#inputGetBookDescription").val();		
		var bookInterestedIn = $("#inputGetBookInterestedIn").val();
		if (bookname.trim() != "" & booktype.trim() != "" & booklanguage.trim() != "" & bookauthor.trim() != "") {   
			$("#EditMyPostAdModal").modal('hide');
			$.ajax
				({
					url: globalUrl + "/EditMyPostBooksAdData",
					type: "POST",
					crossDomain: true,
                    data: { "adId": $("#inputAdId").val(), "BookName": bookname, "BookType": booktype, "TextLanguage": booklanguage, "Author": bookauthor, "BookLink": booklink, "Description": bookdescription, "BookInterestedIn": bookInterestedIn, "Userid": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token") },
					headers:
					{
						"Access-Control-Allow-Headers": "x-requested-with",
						"Access-Control-Allow-Headers": "*",
					},
					success: function (data, status, xhr) {                        
                        $("#notification").text(data[0]);
                        $("#notification").css("color", data[1]);
                        $("#NotificationModal").modal('show');
                        loadMyBooksPostTableData(false);
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
        }
    });
}


function onDeleteMyPostAdModalOpen() {
    $("#DeleteMyPostAdModal").on('shown.bs.modal', function (event) {
        var modal = $(this);
        var adIdButton = $(event.relatedTarget);
        var adId = adIdButton.data('adid');
        $("#inputAdId2").val(adId);
    })
}


function onbtnDeleteMyPostAdClicked() {
    $("#btnDeleteMyPostAd").on('click', function (event) {
        Loader(true);        
        
        $.ajax
            ({
                url: globalUrl + "/DeleteMyPostData",
                type: "POST",
                crossDomain: true,
                data: { "AdId": $("#inputAdId2").val(), "Userid": window.sessionStorage.getItem("useremail"), "Token": window.sessionStorage.getItem("token") },
                headers:
                {
                    "Access-Control-Allow-Headers": "x-requested-with",
                    "Access-Control-Allow-Headers": "*",
                },
                success: function (data, status, xhr) {                    
                    loadMyBooksPostTableData(false);
                    $("#DeleteMyPostAdModal").modal('hide');
                    $("#notification").text(data[0]);
                    $("#notification").css("color", data[1]);
                    $("#NotificationModal").modal('show');
                },
                error: function (er) {
                    console.log(er);
                }
            })
    })
}
