


$(function(){

$('#loading_img_1').hide();
$('#loading_img_2').hide();
$('#advanced_options_1').hide();
$('#advanced_options_2').hide();

var reset = function(){
	if($.mobile.activePage.attr('id') == "page_1") {
		$("#tweet_text").val('');
		$("#add_link").val('');
		$("#add_via_account").val('');
		$("#add_related_account").val('');
		$("#generateTweetable").prop('disabled', false).removeClass("buttonDisabled");
		$('#loading_img_1').hide();
		$('#advanced_options_1').hide();
		$("#tweet_result").html('');
		$("#tweet_text").attr('rows', '8');
	} else if($.mobile.activePage.attr('id') == "page_2") {
		$("#long_url").val('');
		$("#add_custom").val('');
		$("#generateShortUrl").prop('disabled', false).removeClass("buttonDisabled");
		$('#loading_img_2').hide();
		$('#advanced_options_2').hide();
		$("#shortenUrl_result").html('');
		$("#long_url").attr('rows', '8');
	}
}


var generateShortUrl = function(){
	var long_url = $("#long_url").val();
	if (long_url === $("#long_url").prop('defaultValue'))
		long_url = "";
	if(long_url == "") {
		alert("URL cannot be blank.");
		return;
	}
	var long_url_encoded = encodeURI(long_url);
	var custom = $("#add_custom").val();
	var req_url = "http://tweetable.link/api?api=S8VPzsdwwxPl&url=" + long_url_encoded;
	if(custom != '')
		req_url = req_url + "&custom=" + custom;
	$.ajax({
	    type:     "get",
	    url:      req_url,
	    dataType : 'text',
	    beforeSend: function() {
	    	$('#loading_img_2').show();
	    },
	    error: function (request, error) {
	        alert("Error!! -" + error);
	    },
	    success: function (data) {
	        var json_data= data.substr(0, (data.indexOf('}')+1)); 
	        var parsed_data = JSON.parse(json_data);
	        if(parsed_data.error != 1){
	        	$("#shortenUrl_result").html("Short Url has been successfully created.\n Long Press to Select and Copy. \nClick refresh at the top to generate again.");
            	$("#long_url").val(parsed_data.short);
            	$("#generateShortUrl").prop('disabled', true).addClass("buttonDisabled");
	        } else{
	        	alert(parsed_data.msg);
	        }
	    },
	    complete: function() {
	    	$('#loading_img_2').hide();
	    }
	});
};

var generateTweetable = function(){
	var tweet_text = $("#tweet_text").val();
	if (tweet_text === $("#tweet_text").prop('defaultValue'))
		tweet_text = "";
	var tweet_text_encoded = encodeURI(tweet_text);
	var link = $("#add_link").val();
	var via_acc = $("#add_via_account").val();
	var rel_acc = $("#add_related_account").val();
	var req_url = "http://tweetable.link/api?api=S8VPzsdwwxPl&tweetable=" + tweet_text_encoded;
	if(via_acc != '')
		req_url = req_url + "&via=" + via_acc;
	if(rel_acc != '')
		req_url = req_url + "&related=" + rel_acc;
	if(link != '')
		req_url = req_url + "&link=" + link;
	$.ajax({
	    type:     "get",
	    url:      req_url,
	    dataType : 'text',
	    beforeSend: function() {
	    	$('#loading_img_1').show();
	    },
	    error: function (request, error) {
	        alert("Error!! -" + error);
	    },
	    success: function (data) {
	        var json_data= data.substr(0, (data.indexOf('}')+1));
	        var parsed_data = JSON.parse(json_data);
	        if(parsed_data.error != 1){
	        	$("#tweet_result").html("Tweetable has been successfully created.\n Long Press to Select and Copy. \n Click refresh at the top to generate again.");
	        	$("#tweet_text").val(parsed_data.short);
            	$("#generateTweetable").prop('disabled', true).addClass("buttonDisabled");
	        } else {
	        	alert(parsed_data.msg);
	        }
	    },
	    complete: function() {
	    	$('#loading_img_1').hide();
	    }
	});
};

var showAdvancedOptions = function(){
	var id;
	if($.mobile.activePage.attr('id') == "page_1") {
		id = "advanced_options_1";
	} else if($.mobile.activePage.attr('id') == "page_2") {
		id = "advanced_options_2";
	}
	if($('#' + id).css('display') == 'none')
		$('#' + id).show();
	else
		$('#' + id).hide();
}



$(document).ready(reset);
$("#id_reset_1").click(reset);
$("#id_reset_2").click(reset);

$("#page_1").on('click', "#generateTweetable", generateTweetable);
$("#page_2").on('click', "#generateShortUrl", generateShortUrl);

$("#page_1").on('click', "#advanced", showAdvancedOptions);
$("#page_2").on('click', "#advanced", showAdvancedOptions);

});
