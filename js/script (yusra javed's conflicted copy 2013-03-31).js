/**
 * Chad Ramsey
 * date 3.20.2013
 * FB API
 */

//jQuery navigational elements
$(function() {
	
// Additional JS functions here
window.fbAsyncInit = function() {
	FB.init({
		appId : '389957121112577', // App ID
		//channelUrl : '//www.stylussoftworks.com/channel.html', // Channel File
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml : true // parse XFBML
	});

};

// Load the FB SDK Asynchronously
( function(d) {
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement('script');
		js.id = id;
		js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));

	
	
	//Hide all of the navgational panes of the site on start up
	$('#privacy_treemap').hide();
	$('#policy_stats').hide();
	$('#loading_photos').hide();
	
	
	//Fire the login() function when the Login button is clicked from index.php
	$('#login').button().click(function(event)	{
		
		login();
	});
	
	//Clicking the Overview button shows the Album Overview pane while hiding the others
	$('#overview_button').button().click(function(event) {
		$('#privacy_treemap').hide();
		$('#policy_stats').hide();
		
		$('#overview_album_activity').fadeIn('fast');
		$('#overview_policy_stats').fadeIn('fast');
		$('#overview_privacy_threats').fadeIn('fast');

	});
	
	//Clicking the Privacy Threats button shows the Privacy Threats pane while hiding the others
	$('#privacy_threats_button').button().click(function(event) {
		$('#overview_album_activity').hide();
		$('#overview_policy_stats').hide();
		$('#overview_privacy_threats').hide();
		$('#policy_stats').hide();
		
		$('#privacy_treemap').fadeIn('fast');
		
	});
	
	//Clicking the Policy Statistics button shows the Ppolicy Statistics pane while hiding the others
	$('#policy_stats_button').button().click(function(event) {
		$('#overview_album_activity').hide();
		$('#overview_policy_stats').hide();
		$('#overview_privacy_threats').hide();
		$('#privacy_treemap').hide();
		
		
		$('#policy_stats').fadeIn('fast');
		
	});
	
	$('#survey_button').button().click(function(event) {
		
	});
	
}); 


var mostTaggedUserID; //Holds value for the most Tagged User ID
var mostTaggedPhotoID; //Holds value for the most Tagged Photo ID
var mostTaggedPhoto; //Holds value for the most Tagged Photo
var mostCommentedFriendID; //Holds value for the most Commented Friend ID
var mostLikedFriendID; //Holds value for the most Liked Friend ID
var mostCommentedFriend; //Holds for the most Commented Friend
var mostLikedFriend; // Holds value for the most Liked Friend
var friendResultsObject = new Object(); //Array containing all friends
var albumResultsObject = new Object(); //Array containing all albums


//The album object formed from FQL result set data
function albumObject(objectID, photoCount, name, created, cphotoID, mostLikedPID, mostLikes, mostCommentedPID, mostCommented, mostTaggedPID, mostTags, location, allowedFriends, deniedFriends, description,value,misconfigurations,similarAlbums)
{	
	this.objectID = objectID;
	this.photoCount = photoCount;
	this.name = name;
	this.created = new Date(parseInt(created * 1000)).getFullYear();
	this.cphotoID = cphotoID;
	this.mostLikedPID = mostLikedPID;
	this.mostLikes = mostLikes;
	this.mostCommentedPID = mostCommentedPID;
	this.mostCommented = mostCommented;
	this.mostTaggedPID = mostTaggedPID;
	this.mostTags = mostTags;
	this.location = location;
	this.allowedFriends = allowedFriends;
	this.deniedFriends = deniedFriends;
	this.description = description;
	this.value = value;
	this.misconfigurations = misconfigurations;
	this.similarAlbums = similarAlbums;
	
}

//The album photo object formed from FQL result set data
function albumPhotosObject(aid, objectID, likeInfo, commentInfo, src, tags)	{
	
	this.aid = aid;
	this.objectID = objectID;
	this.likeInfo = likeInfo;
	this.commentInfo = commentInfo;
	this.src = src;
	this.tags = tags;
}

//The tagged album data formed from FQL result set data
function taggedPhotosObject(objectID, subject, text, pic)	{
	
	this.objectID = objectID;
	this.subject = subject;
	this.text = text;
	this.pic = pic;
}

function commentedPhotoObject(fromid)	{
	
	this.fromid = fromid
}

function likedPhotoObject(uid)		{
	
	this.uid = uid;
	
}

function likeFriendObject(name, pic, uid)	{
	
	this.name = name;
	this.pic = pic;
	this.uid = uid;
	
}

function commentedFriendObject(uid, name, pic)	{
	
	this.uid = uid;
	this.name = name;
	this.pic = pic;
}

//** All variabes below can be viewed by calling them in the Javascript console **

var albumObjects = new Array(); //Holds all album objects
var friends = {}; //Holds all friendIDs
var friendlists = new Array(); //Holds all friendlists
var friendlist_members = {}; // friendlist members dictionary with friendlist id as the key and members array stored at the key
var privacyDictionary = {}; // privacy dictionary with privacy setting as the key and albums with this privacy setting stored at the key
var albumPhotos = new Array(); //Holds all album photo objects
var taggedFriends = new Array(); //Holds all tagged friends
var taggedPhotos = new Array(); //Holds all tagged photos
var commentedPhotos = new Array(); //Holds all commented photos
var likedPhotos = new Array(); //Holds all liked photos
var commentedFriends = new Array(); //Holds all friends who have commented on album photos
var likedFriends = new Array(); //Holds all friends who have liked album photos
var mostCommentedAlbumPhotos = new Array(); //Holds objects for who has commented the most for each albums with photos
var mostLikedAlbumPhotos = new Array(); //Holds objects for who have liked the most for each albums with photos

//Simple graph API call to get basic user data and display it (what is seen in the top banner)
function getBasicUserData() {

	//Get profile picture
	FB.api('/me/picture?type=large', function(response) {
		$('#title').append('<img src = ' + response.data.url + ' width = 100 height = 100/>') //Results are appended to title bar
	})
	//Get username
	FB.api('/me/', function(response) {
		$('#title').append("</br>Welcome " + response.name + "!")
	})
	
	//Get number of albums
	FB.api('/me/albums', function(response) {
		$('#title').append("</br>You currently have " + response.data.length + " albums for evaluation.")
	})
}

function getFriendResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var queries = '{"query1":"SELECT uid2 FROM friend WHERE uid1 = me()",'+
					'"query2":"SELECT name FROM user WHERE uid IN (SELECT uid2 FROM #query1) "}';

	FB.api({

		method : 'fql.multiquery',
		queries : queries
	}, function(data) {

		//Store data into objects and arrays
		friendResultsObject = data[0].fql_result_set;
        var friendResultsObject1 = data[1].fql_result_set;
		for (var i = 0; i < friendResultsObject1.length; i++) {

			//Push friend IDs
			//alert(friendResultsObject1[i].name);
			friends[friendResultsObject1[i].name] = friendResultsObject[i].uid2 ;

		}
		
        callback(data);

	});
	
} function processGetFriendResults(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 10
	});
	
	getFriendlists(processGetFriendlists);
	

}

function getFriendlists(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var queries = '{"query1":"SELECT flid, owner, name, count,type FROM friendlist WHERE owner=me() ",'+
					'"query2":"SELECT flid,uid FROM friendlist_member WHERE flid IN (SELECT flid FROM #query1) "}';
	
	FB.api({

		method : 'fql.multiquery',
		queries : queries
	}, function(data) {

		//Creating friendlist member dictionary
		friendlists = data[0].fql_result_set;
		var temp = data[1].fql_result_set;
		for(var i=0; i<friendlists.length; i++)
		{
			friendlist_members[friendlists[i].flid]= new Array();
			
		}
		for(var i=0; i<temp.length; i++)
		{
			
			friendlist_members[temp[i].flid].push(temp[i].uid); // finding that a friendlist exists: friendlist_members.hasOwnProperty(flid)   // length of dictionary: Object.keys(friendlist_members).length
		}
		
		
        callback(data);

	});
	
} function processGetFriendlists(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 13
	});
	
	
	getAlbumResults(processGetAlbumResults);

}


function getAlbumResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var queries = '{"query1":"SELECT aid,object_id,owner,cover_pid,cover_object_id,name,created,modified,description,location,size,link,visible,modified_major,edit_link,type,can_upload,photo_count,video_count FROM album WHERE owner=me()",'+
					'"query2":"SELECT allow, deny, description,value,object_id FROM privacy WHERE object_id IN (SELECT object_id FROM #query1) "}';

	FB.api({

		method : 'fql.multiquery',
		queries : queries
	}, function(data) {
		
		albumResultsObject = data[0].fql_result_set;
		privacyResultsObject = data[1].fql_result_set;


		for (var i = 0; i < albumResultsObject.length; i++) {

			//Push album  and privacy data
			var albumObjectTemp = new albumObject(albumResultsObject[i].aid, albumResultsObject[i].photo_count, albumResultsObject[i].name,
												albumResultsObject[i].created, albumResultsObject[i].cover_pid,null,null,null,null,null,null,
												null,privacyResultsObject[i].allow,privacyResultsObject[i].deny,privacyResultsObject[i].description,privacyResultsObject[i].value)
			albumObjects.push(albumObjectTemp);

		}
		
		//Creating privacy dictionary	
		privacyDictionary[albumObjects[0].description] = new Array();
		privacyDictionary[albumObjects[0].description].push(albumObjects[0]);	
		for(var i=1; i<albumObjects.length; i++)
		{
			if(privacyDictionary.hasOwnProperty(albumObjects[i].description))
			{
				
				privacyDictionary[albumObjects[i].description].push(albumObjects[i]);
			}
			else
			{
				privacyDictionary[albumObjects[i].description]= new Array();
				privacyDictionary[albumObjects[i].description].push(albumObjects[i]);
			}
			
		}
		
        callback(data);

	});
	
} function processGetAlbumResults(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 20
	});
	
	getPhotoResults(processGetPhotoResults);

}

function getPhotoResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var query = "SELECT album_object_id, object_id, like_info, comment_info, src_big FROM photo WHERE aid IN (SELECT aid FROM album WHERE owner = me())";
	
	FB.api({

		method : 'fql.query',
		query : query
	}, function(data) {

		photoResultsObject = data;
		for(var i = 0; i < photoResultsObject.length; i++)		{
				
				//Push photo data
				var albumPhotosTempObject = new albumPhotosObject(photoResultsObject[i].album_object_id, photoResultsObject[i].object_id, photoResultsObject[i].like_info, photoResultsObject[i].comment_info, photoResultsObject[i].src_big)
				albumPhotos.push(albumPhotosTempObject);
			
		}
		
        callback(data);

	});
	
} function processGetPhotoResults(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 30
	});
	
	getTaggedResults(processGetTaggedResults);

}

function getTaggedResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var queries = '{"query1":"SELECT album_object_id, object_id, like_info, comment_info, src_big FROM photo WHERE aid IN (SELECT aid FROM album WHERE owner = me())",'+
	'"query2":"SELECT text, subject, object_id FROM photo_tag WHERE object_id IN (SELECT object_id FROM #query1)"}';
	
	FB.api({

		method : 'fql.multiquery',
		queries : queries
	}, function(data) {

		taggedResultsObject = data[1].fql_result_set;
		for(var i = 0; i < taggedResultsObject.length; i++)	{
			
			//Push tagged data
			var taggedTempObject = new taggedPhotosObject(taggedResultsObject[i].object_id, taggedResultsObject[i].subject, taggedResultsObject[i].text);
			taggedPhotos.push(taggedTempObject);
		}
		
        callback(data);

	});
	
} function processGetTaggedResults(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 40
	});
	
	getCommentedPhotosResults(processGetCommentedPhotosResults);

}

function getCommentedPhotosResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var queries = '{"query1":"SELECT album_object_id, object_id, like_info, comment_info, src_big FROM photo WHERE aid IN (SELECT aid FROM album WHERE owner = me())",'+
	'"query2":"SELECT fromid FROM comment WHERE object_id IN (SELECT object_id FROM #query1)"}';
	
	FB.api({

		method : 'fql.multiquery',
		queries : queries
	}, function(data) {

		commentedPhotoResultsObject = data[1].fql_result_set;
		for(var i = 0; i < commentedPhotoResultsObject.length; i++)	{
			
			//Push commented data
			var commentedPhotoTempObject = new commentedPhotoObject(commentedPhotoResultsObject[i].fromid)
			commentedPhotos.push(commentedPhotoTempObject)
		}
		
        callback(data);

	});
	
} function processGetCommentedPhotosResults(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 50
	});
	
	getCommentedFriendsResults(processGetCommentedFriendsResults);

}

function getCommentedFriendsResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var queries = '{"query1":"SELECT album_object_id, object_id, like_info, comment_info, src_big FROM photo WHERE aid IN (SELECT aid FROM album WHERE owner = me())",'+
	'"query2":"SELECT fromid FROM comment WHERE object_id IN (SELECT object_id FROM #query1)",'+
	'"query3":"SELECT uid, name, pic FROM user WHERE uid IN (SELECT fromid FROM #query2)"}';
	
	FB.api({

		method : 'fql.multiquery',
		queries : queries
	}, function(data) {

		commentedFriendResultsObject = data[2].fql_result_set;
		for(var i = 0; i < commentedFriendResultsObject.length; i++)	{
			
			//Push friends who have commented
			var commentedFriendTempObject = new commentedFriendObject(commentedFriendResultsObject[i].uid, commentedFriendResultsObject[i].name, commentedFriendResultsObject[i].pic)
			commentedFriends.push(commentedFriendTempObject)
		}
		
        callback(data);

	});
	
} function processGetCommentedFriendsResults(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 60
	});
	
	getLikedPhotosResults(processGetLikedPhotosResults);

}

function getLikedPhotosResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var queries = '{"query1":"SELECT album_object_id, object_id, like_info, comment_info, src_big FROM photo WHERE aid IN (SELECT aid FROM album WHERE owner = me())",'+
	'"query2":"SELECT user_id FROM like WHERE object_id IN (SELECT object_id FROM #query1)"}';
	
	FB.api({

		method : 'fql.multiquery',
		queries : queries
	}, function(data) {

		likedPhotoResultsObject = data[1].fql_result_set;
		for(var i = 0; i < likedPhotoResultsObject.length; i++)	{
			
			//Push liked photos
			var likedPhotoTempObject = new likedPhotoObject(likedPhotoResultsObject[i].user_id)
			likedPhotos.push(likedPhotoTempObject)
		}
		
        callback(data);

	});
	
} function processGetLikedPhotosResults(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 70
	});
	
	getLikedFriendsResults(processGetLikedFriendsResults);

}

function getLikedFriendsResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var queries = '{"query1":"SELECT album_object_id, object_id, like_info, comment_info, src_big FROM photo WHERE aid IN (SELECT aid FROM album WHERE owner = me())",'+
	'"query2":"SELECT user_id FROM like WHERE object_id IN (SELECT object_id FROM #query1)",'+
	'"query3":"SELECT uid, name, pic FROM user WHERE uid IN (SELECT user_id FROM #query2)"}';
	
	FB.api({

		method : 'fql.multiquery',
		queries : queries
	}, function(data) {

		likedFriendResultsObject = data[2].fql_result_set;
		for(var i = 0; i < likedFriendResultsObject.length; i++)	{
			
			//Push friends who have liked
			var likedFriendTempObject = new likeFriendObject(likedFriendResultsObject[i].name, likedFriendResultsObject[i].pic, likedFriendResultsObject[i].uid)
			likedFriends.push(likedFriendTempObject)
		}
		
        callback(data);

	});
	
} function processGetLikedFriendsResults(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 100
	});
	
	$("#loading_photos").dialog("close");
	
	performCalculations();

}

function performCalculations()	{
	
	calculateSimilarAlbums();
	calculatePolicyMisconfigurations();
	drawPieChart();
    //drawTreeMap();
    drawTagCloud();
	calculateMostCommented();
	calculateMostLiked();
	calculateMostTagged();
	calculateMostCommentedFriend();
	calculateMostLikedFriend();
	calculateMostTaggedFriend();
	calculateMostCommentedAlbum();
	calculateMostLikedAlbum();


	

}

	//'"query10":"SELECT flid, owner, name, count FROM friendlist WHERE owner=me() ",'+
	//'"query11":"SELECT allow, deny, description FROM privacy WHERE object_id IN (SELECT object_id FROM #query2) "}';
	

function calculateMostCommentedAlbum() {
	
	var tempStart = albumPhotos[0];
	var tempCompairArray = new Array();

	for (var i = 0; i < albumPhotos.length; i++) {

			if (parseInt(albumPhotos[i].aid) == parseInt(tempStart.aid)) {

				tempCompairArray.push(albumPhotos[i]);
				console.log(albumPhotos[i]);

			} else {

				var mostCommentedPhoto = tempCompairArray[0];

				for (var j = 0; j < tempCompairArray.length; j++) {

					if (parseInt(tempCompairArray[j].commentInfo.comment_count) > (parseInt(mostCommentedPhoto.commentInfo.comment_count)))

						mostCommentedPhoto = tempCompairArray[j];

				}

				mostCommentedAlbumPhotos.push(mostCommentedPhoto);
				tempCompairArray = [];
				tempStart = albumPhotos[i];

			}

	}

}

function calculateMostLikedAlbum() {
	
	var tempStart = albumPhotos[0];
	var tempCompairArray = new Array();

	for (var i = 0; i < albumPhotos.length; i++) {

			if (parseInt(albumPhotos[i].aid) == parseInt(tempStart.aid)) {

				tempCompairArray.push(albumPhotos[i]);
				console.log(albumPhotos[i]);

			} else {

				var mostLikedAlbumPhoto = tempCompairArray[0];

				for (var j = 0; j < tempCompairArray.length; j++) {

					if (parseInt(tempCompairArray[j].likeInfo.like_count) > (parseInt(mostLikedAlbumPhoto.likeInfo.like_count)))

						mostLikedAlbumPhoto = tempCompairArray[j];

				}

				mostLikedAlbumPhotos.push(mostLikedAlbumPhoto);
				tempCompairArray = [];
				tempStart = albumPhotos[i];

			}

	}

}


function calculateMostCommented() {

	var mostCommentedPhoto = albumPhotos[0];

	for (var i = 0; i < albumPhotos.length; i++) {

		try {

			if (parseInt(albumPhotos[i].commentInfo.comment_count) > (parseInt(mostCommentedPhoto.commentInfo.comment_count)))

				mostCommentedPhoto = albumPhotos[i];

		} catch(err) {

			console.log("Photo comments calculation error")
		}

	}

	console.log(mostCommentedPhoto);

	var source = $("#albumoverviewcomments-template").html();
	var template = Handlebars.compile(source);
	$("#overview_album_content").append(template(mostCommentedPhoto));

}

	
function calculateMostLiked() {

	var mostLikedPhoto = albumPhotos[0];

	for (var i = 0; i < albumPhotos.length; i++) {

		try {

			if (parseInt(albumPhotos[i].likeInfo.like_count) > (parseInt(mostLikedPhoto.likeInfo.like_count)))

				mostLikedPhoto = albumPhotos[i];

		} catch(err) {

			console.log("Photo like calculation error")
		}

	}

	console.log(mostLikedPhoto);

	var source = $("#albumoverviewlikes-template").html();
	var template = Handlebars.compile(source);
	$("#overview_album_content").append(template(mostLikedPhoto));

}

	

function calculateMostTagged() {
	
	var tempTaggedPhotoArray = new Array();
	var tempTaggedTextArray = new Array();
    if(taggedPhotos.length>0)
    {
		for (var i = 0; i < taggedPhotos.length; i++) {
	
			try {
				
				tempTaggedPhotoArray.push(taggedPhotos[i].objectID);
				tempTaggedTextArray.push(taggedPhotos[i].text)
	
			} catch(err) {
	
				console.log("Tagged photo calculation error")
			}
	
		}
		
		mostTaggedPhotoID = calculateMost(tempTaggedPhotoArray);
		mostTaggedUserID = calculateMost(tempTaggedTextArray);
		
		for (var j = 0; j < albumPhotos.length; j++)	{
			
			try		{
				
				if(parseInt(mostTaggedPhotoID[0]) == parseInt(albumPhotos[j].objectID))	{
					
					mostTaggedPhoto = albumPhotos[j];
					mostTaggedPhoto.tags = mostTaggedPhotoID[1];
					break;
					
				}
				
			} catch(err)	{
				
				console.log("Tagged photo calculation error");
				
			}
			
		}
	
		var source = $("#albumoverviewtagged-template").html();
		var template = Handlebars.compile(source);
		$("#overview_album_content").append(template(mostTaggedPhoto));
	}
	else
	{
		var source = $("#albumoverviewtagged-template").html();
		var template = Handlebars.compile(source);
		$("#overview_album_content").append(template('None'));
	}

}

function calculateMostCommentedFriend()	{

	var tempCommentedPhotoArray = new Array();
    if(commentedPhotos.length>0)
    {
		for (var i = 0; i < commentedPhotos.length; i++) {
			try {
	
				tempCommentedPhotoArray.push(commentedPhotos[i].fromid);
	
			} catch(err) {
	
				console.log("Commented friend calculation error")
			}
	
		}
	
		mostCommentedFriendID = calculateMost(tempCommentedPhotoArray);
	
		for (var j = 0; j < commentedFriends.length; j++) {
	
			try {
	
				if (parseInt(mostCommentedFriendID[0]) == parseInt(commentedFriends[j].uid)) {
	
					mostCommentedFriend = commentedFriends[j];
					break;
	
				}
	
			} catch(err) {
	
				console.log("Commented friend calculation error");
	
			}
	
		}
		
		var source = $("#albumoverviewmcf-template").html();
		var template = Handlebars.compile(source);
		$("#overview_album_content").append(template(mostCommentedFriend));
	}
	else
	{
		var source = $("#albumoverviewmcf-template").html();
		var template = Handlebars.compile(source);
		$("#overview_album_content").append(template("None"));
	}
	
}

function calculateMostLikedFriend()	{

	var tempLikedPhotoArray = new Array();
   
	for (var i = 0; i < likedPhotos.length; i++) {
		try {

			tempLikedPhotoArray.push(likedPhotos[i].uid);

		} catch(err) {

			console.log("Liked friend calculation error")
		}

	}

	mostLikedFriendID = calculateMost(tempLikedPhotoArray);
    if(likedFriends.length>0)
    {
	for (var j = 0; j < likedFriends.length; j++) {

		try {

			if (parseInt(mostLikedFriendID[0]) == parseInt(likedFriends[j].uid)) {

				mostLikedFriend = likedFriends[j];
				break;

			}

		} catch(err) {

			console.log("Liked friend calculation error");

		}

	}
	
	var source = $("#albumoverviewmlf-template").html();
	var template = Handlebars.compile(source);
	$("#overview_album_content").append(template(mostCommentedFriend));
	}
	else
	{
	    var source = $("#albumoverviewmlf-template").html();
	    var template = Handlebars.compile(source);
	    $("#overview_album_content").append(template('None'));
	}
	
}

function calculateMostTaggedFriend() {
	
	var tempTaggedTextArray = new Array();
    if(taggedPhotos.length>0)
    {
	for (var i = 0; i < taggedPhotos.length; i++) {

		try {
			
			tempTaggedTextArray.push(taggedPhotos[i].text)

		} catch(err) {

			console.log("Tagged photo calculation error")
		}

	}
	
	mostTaggedUserID = calculateMost(tempTaggedTextArray);

	var source = $("#albumoverviewmtf-template").html();
	var template = Handlebars.compile(source);
	$("#overview_album_content").append(template(mostTaggedUserID));
	}
	else
	{
		var source = $("#albumoverviewmtf-template").html();
		var template = Handlebars.compile(source);
		$("#overview_album_content").append(template('None'));		
	}

}
			
function login() {
	
	FB.login(function(response) {
		if (response.authResponse) {
			
			$('#overview_album_piechart').empty();
			$('#overview_album_content').empty();
			$('#title').empty();
			
			getBasicUserData();
			getFriendResults(processGetFriendResults);
			
		} else {
			// cancelled
		}
	}, {
		//User permissions listing
		scope : "email,user_about_me,user_website,read_friendlists,user_birthday,"+
			"friends_birthday,user_hometown,friends_hometown,user_location,friends_location,"+
			"user_education_history,friends_education_history,user_work_history,friends_work_history,"+
			"user_relationship_details,friends_relationship_details,user_religion_politics,friends_religion_politics,"+
			"user_relationships,friends_relationships,user_photos,user_groups,friends_groups"
	});
}

//Algorith credit to StackOverflow
function calculateMost(array)	{
	
	if (array.length == 0)
		return null;
	var modeMap = {};
	var maxEl = array[0], maxCount = 1;
	for (var i = 0; i < array.length; i++) {
		var el = array[i];
		if (modeMap[el] == null)
			modeMap[el] = 1;
		else
			modeMap[el]++;
		if (modeMap[el] > maxCount) {
			maxEl = el;
			maxCount = modeMap[el];
		}
	}

	return [maxEl, maxCount];

	
}

function calculateAlbumDates()	{
	
	for(var i = 0; i < albumObjects.length; i++)		{
		
		console.log(albumObjects[i].created);
		console.log(albumObjects[i].photoCount);
	}

}

function calculateSimilarAlbums(){
	for(var i=0; i<albumObjects.length; i++)
	{ 
		var similar = new Array();
		for(var j=0; j<albumObjects.length; j++)
		{
			if(i!=j && albumObjects[i].description == albumObjects[j].description)
			{
				similar.push(albumObjects[j].name);
			}
		}
		albumObjects[i].similarAlbums = similar;
	}	
}

function calculatePolicyMisconfigurations(){
	for(var i=0; i<albumObjects.length; i++)
	{
		var misconfigurations = new Array();
		var allowed = new Array();
		var denied = new Array();
		

		//Album is empty
		if(albumObjects[i].photoCount==0)
		{
			misconfigurations.push({description:'empty album',cause:'',sensitivity:'0.1'});
		}
		// Album is accessible to people outside the friend network
		if(albumObjects[i].value!='CUSTOM' && (albumObjects[i].value=='EVERYONE' || albumObjects[i].value=='FRIENDS_OF_FRIENDS'))
		{
			 misconfigurations.push({description:'visible outside friend network',cause:albumObjects[i].description,sensitivity:'1'});
		}
        //Empty friend list and smart list usage
		if(albumObjects[i].allowedFriends!=null)
		{
			for(var j =0; j<friendlists.length; j++ )
		    {
				if(albumObjects[i].allowedFriends.indexOf(friendlists[j].flid)>=0)
				{
					
					if(friendlists[j].count==0)
					{
						
						 misconfigurations.push({description:'empty friend list has been used',cause:friendlists[j].name,sensitivity:'0.4'});
					}
					else if(friendlists[j].type=='education' || friendlists[j].type=='work' || friendlists[j].type=='current_city' )
					{
						
						misconfigurations.push({description:'smart list has been used',cause:friendlists[j].name,sensitivity:'0.9'});
					}
					allowed.push(friendlist_members[friendlists[j].flid]);

				}
				
			}
		}
		if(albumObjects[i].deniedFriends!= null)
		{
			for(var j =0; j<friendlists.length; j++ )
		    {
				if(albumObjects[i].deniedFriends.indexOf(friendlists[j].flid)>=0)
				{
					if(friendlists[j].count==0)
					{
						
						misconfigurations.push({description:'empty friend list has been used',cause:friendlists[j].name,sensitivity:'0.4'});
					}
					else if(friendlists[j].type=='education' || friendlists[j].type=='work' || friendlists[j].type=='current_city' || friendlists[j].type=='family')
					{
						
						misconfigurations.push({description:'smart list has been used',cause:friendlists[j].name,sensitivity:'0.9'});
					}
					denied.push(friendlist_members[friendlists[j].flid]);

				}
			}
		}
		
	    var temp;
		if(albumObjects[i].allowedFriends!= null)
		{		
			temp = albumObjects[i].description.split(";");
			if(temp.length>1)
			 {
			 	    //alert(albumObjects[i].description);
			 		var temp1 = temp[0].split(',');
			 		for(var t=0; t<temp1.length; t++)
			 		{
			 			//alert(temp1[t]);
			 			if(friends[temp1[t]]!=null)
			 			 allowed.push(friends[temp1[t]]);
			 		}
			 		temp1 = temp[1].split(':');
			 		for(var t=1; t<temp1.length; t++)
			 		{
			 			//alert(temp1[t]);
			 			if(friends[temp1[t]]!=null)
			 			 denied.push(friends[temp1[t]]);
			 		}

			 }
			
		}

		//friends exist in both allowed and denied fields

		
		for(var k=0; k<allowed.length; k++)
		{
			for(var n=0; n<denied.length; n++) // for each allowed friend list check the members of the other allowed friend lists
			{
				for(var m =0; m < denied[n].length; m++)
				{
					
					 if(allowed[k].indexOf(denied[n][m]) >=0)
					 {
				 		var cause = new Array();
						for(var j=0; j<friendlists.length; j++)
						{
							if(friendlist_members[friendlists[j].flid].indexOf(denied[n][m])>=0 && (albumObjects[i].allowedFriends.indexOf(friendlists[j].flid)>=0 || albumObjects[i].deniedFriends.indexOf(friendlists[j].flid)>=0))
							{
								cause.push(friendlists[j].name);
								
							}
						}
				 		misconfigurations.push({description:'friend exists in both allowed and denied field',cause:cause,sensitivity:'0.3'});
				 		break;
				 	}
				}
			}
		}
		//common friends between the friendlists
		
		for(var k=0; k<allowed.length; k++)
		{
			for(var n=k+1; n<allowed.length; n++) // for each allowed friend list check the members of the other allowed friend lists
			{
				for(var m =0; m < allowed[n].length; m++)
				{
					
					 if(allowed[k].indexOf(allowed[n][m]) >=0)
					 {
				 		var cause = new Array();
						for(var j=0; j<friendlists.length; j++)
						{
							if(friendlist_members[friendlists[j].flid].indexOf(allowed[n][m])>=0 && (albumObjects[i].allowedFriends.indexOf(friendlists[j].flid)>=0 ))
							{
								cause.push(friendlists[j].name);
								
							}
						}
				 		misconfigurations.push({description:'common friends between the friend lists',cause:cause,sensitivity:'0.6'});
				 		break;
				 	}
				}
			}
		}
		for(var k=0; k<denied.length; k++)
		{
			for(var n=k+1; n<denied.length; n++) // for each denied friend list check the members of the other denied friend lists
			{
				for(var m =0; m < denied[n].length; m++)
				{
					
					 if(denied[k].indexOf(denied[n][m]) >=0)
					 {
				 		var cause = new Array();
						for(var j=0; j<friendlists.length; j++)
						{
							if(friendlist_members[friendlists[j].flid].indexOf(denied[n][m])>=0 && (albumObjects[i].deniedFriends.indexOf(friendlists[j].flid)>=0 ))
							{
								cause.push(friendlists[j].name);
								
							}
						}
				 		misconfigurations.push({description:'common friends between the friend lists',cause:cause,sensitivity:'0.6'});
				 		break;
				 	}
				}
			}
		}
		albumObjects[i].misconfigurations  = misconfigurations;
	}
}

function calculatePolicyStatistics()
{
	var policyOpenness;
	var mostAllowedFriend;
	var mostDeniedFriend;
	var noUsedFriendlists;
	var noUniqueAlbumPolicies = Object.keys(privacyDictionary).length;
	
	
}
//Sample code for pie chart
function drawPieChart() {
  // Create and populate the data table.
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Albums Created In Year'],
    ['2009', 3],
    ['2010', 1],
    ['2011', 2],
    ['2012', 2],
    ['2013', 1]
  ]);

  // Create and draw the visualization.
  new google.visualization.PieChart(document.getElementById('overview_album_activity').getElementsByTagName('div')[1]).
      draw(data, {title:"", 
      backgroundColor: "#3b5998", 
      fontName: "Tahoma", 
      fontSize: "14",
      height: "500", 
      width: "500", 
      chartArea: {width: "75%", height: "75%"}});
}

function drawTagCloud(){
  var fill = d3.scale.category20();

  d3.layout.cloud().size([300, 300])
      .words([
        "Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this"].map(function(d) {
        return {text: d, size: 10 + Math.random() * 90};
      }))
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();
function draw(words){
    d3.select('privacy_treemap').append("svg")
        .attr("width", 300)
        .attr("height", 300)
      .append("g")
        .attr("transform", "translate(150,150)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }

}
      function drawTreeMap() {
        // Create and populate the data table.
		  data = new google.visualization.DataTable(); 
		    data.addColumn('string', 'Album'); 
            data.addColumn('string', 'Privacy Settings'); 
            data.addColumn('number', 'Photos (size)'); 
            data.addColumn('number', 'Misconfigurations (color)'); 
            data.addColumn({type:'string', role:'tooltip'});
            data.addRows(Object.keys(privacyDictionary).length +1);
            data.setCell(0,0,'Album Privacy Groups');
            data.setCell(0,1,null);
            data.setCell(0,2,0);
            data.setCell(0,3,0);
            data.setCell(0,4,"");
			for(var i=0; i<Object.keys(privacyDictionary).length; i++)
			{
			 	var policy = Object.keys(privacyDictionary)[i];
			 	policy = policy.split(";");
			 	var allowed;
			 	var denied;
			 	if(policy.length>1)
			 	{
			 		allowed = 'Allowed: '+ policy[0];
			 		denied = 'Denied: '+ policy[1].slice(policy[1].indexOf(': ')+1,policy[1].length);
			 		//alert(allowed+denied);
			 	}
			 	else
			 	{
			 		allowed = "Allowed: "+ policy;
			 		denied = " ";
			 	}
			 	
			 	data.setCell(i+1,0,allowed+'\n'+denied);
            	data.setCell(i+1,1,'Album Privacy Groups');
           		data.setCell(i+1,2,0);
           		data.setCell(i+1,3,0);
			 	data.setCell(i+1,4, "jj,,jk");
			 	for(var j=0; j<privacyDictionary[Object.keys(privacyDictionary)[i]].length; j++)
			 	{
			 		var rowIndex = data.getNumberOfRows();
			 		
			 		data.addRows(1);
				 	data.setCell(rowIndex,0,privacyDictionary[Object.keys(privacyDictionary)[i]][j].name + ' ID: ' + privacyDictionary[Object.keys(privacyDictionary)[i]][j].objectID );
	            	data.setCell(rowIndex,1,allowed+'\n'+denied);
	           		data.setCell(rowIndex,2,parseInt(privacyDictionary[Object.keys(privacyDictionary)[i]][j].photoCount));
	           		if(privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations == null || privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length ==0 )
	           		data.setCell(rowIndex,3,0);	
	           		else
	           		{
	           			data.setCell(rowIndex,3,privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length); // number of misconfigurations	
	           			 var average_sensitivity =0;
	           			 for(var k=0; k<privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length; k++)
	           			 {
	           			 	average_sensitivity = average_sensitivity + privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations[k].sensitivity;
	           			 }
	           			 average_sensitivity = average_sensitivity/privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length;
	           			 //alert(privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length);
	           			// data.setCell(rowIndex,3,average_sensitivity);			
	           		}
 		

			 	}
			 	
			}


        // Create and draw the visualization.
        
        $('#privacy_treemap').show();
        
        var treemap = new google.visualization.TreeMap(document.getElementById('privacy_treemap'));
	   treemap.draw(data, {
	    minColor: 'yellow',
	    midColor: 'orange',
	    maxColor: 'red',
	    headerHeight: 15,
	    fontColor: 'black',
	    showScale: true});
         $('#privacy_treemap').hide();
 
         google.visualization.events.addListener(treemap, 'select', function () {
    
	     var row = treemap.getSelection()[0].row;
         // user clicked individual album
	      if(data.getValue(row, 1)!='Album Privacy Groups' && data.getValue(row, 1)!=null )
	      {
	        alert('ok');
	      }
	
	
	      });
	      
	      /*  Custom tool tip
	      google.visualization.events.addListener(treemap,  'onmouseover', barMouseOver);
          google.visualization.events.addListener(treemap, 'onmouseout', barMouseOut);


        function barMouseOver(e) {
        	var row = treemap.getSelection()[0].row;
        treemap.setSelection( data.getValue(row, 2));
        }

        function barMouseOut(e) {
        treemap.setSelection([{'row': null, 'column': null}]);
        }
        */
      
      }

