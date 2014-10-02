/**
 * Chad Ramsey
 * date 3.20.2013
 * FB API
 */
//bg color = #3b5998
//jQuery navigational elements
$(function() {
	
// Additional JS functions here
window.fbAsyncInit = function() {
	FB.init({
		appId : '389957121112577', // App ID
		channelUrl : '//www.webpages.uncc.edu/channel.html', // Channel File
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

	
	
	//Hide all of the navigational panes of the site on start up
	$('#title').hide();
	$('#logo').hide();
	$('#navigation').hide();
	$('#main').hide();
	$('#privacy_treemap').hide();
	$('#policy_stats').hide();
	$('#loading_photos').hide();
	$('#album_details').hide();
	$('#album_details_back').hide();
	$('#treemap_sensitivity').button().hide();
	$('#treemap_threats').button().hide(); 
	$('#album_survey').hide();	
	$('#survey_next_page2').button().hide();
	$('#survey_back_page2').button().hide();
	$('#album_survey_questions_page2').hide();	
	
	//Fire the login() function when the Login button is clicked from index.php
	$('#login').button().click(function(event)	{
		
		login();
		
	});
	
	$('#piechartyear').button().click(function(event)	{
		
		document.getElementById('overview_album_activity').getElementsByTagName('div')[6].textContent="";
		drawPieChartYearPostLoad();
		
	});
	
	$('#piechartlocation').button().click(function(event)	{
		
		document.getElementById('overview_album_activity').getElementsByTagName('div')[6].textContent="";
		//drawPieChartLocationPostLoad();
		drawPieChartLocation(6);
		
	});
	
	//Clicking the Overview button shows the Album Overview pane while hiding the others
	
	/*$('#pstats_button').button().click(function(event) {

		alert('ok');

	});
	
	$('#pthreats_button').button().click(function(event) {

		alert('ok');

	});
	*/
	$('#survey_button').click(function(event)	{
		
		$('#overview_album_activity').hide();
		$('#overview_policy_stats').hide();
		$('#overview_privacy_threats').hide();
		$('#privacy_treemap').hide();
		$('#album_details').hide();
		$('#album_details_back').hide();
		$('#album_survey').hide();
		$('#policy_stats').hide();
		
		$('#treemap_sensitivity').button().hide();
		$('#treemap_threats').button().hide();
		
		$('#album_survey').fadeIn('fast');
		
	});
	
	$('#survey_next_page1').button().click(function(event)	{
		
		$("#album_survey_questions_page1").hide();
		$("#survey_next_page1").hide();
		
		$("#album_survey_questions_page2").fadeIn('fast');
		$("#survey_next_page2").fadeIn('fast');
		$('#survey_back_page2').fadeIn('fast');
		
	});
	
	$('#survey_back_page2').button().click(function(event)	{
		
		$("#album_survey_questions_page2").hide();
		$("#survey_next_page2").hide();
		$('#survey_back_page2').hide();
		
		$("#album_survey_questions_page1").fadeIn('fast');
		$('#survey_next_page1').fadeIn('fast');
	});
	
	$('#survey_next_page2').button().click(function(event)	{
		
		//go to page 3
		
	});
		
	$('#overview_privacy_threats').click(function(event)	{

		$('#overview_album_activity').hide();
		$('#overview_policy_stats').hide();
		$('#overview_privacy_threats').hide();
		$('#policy_stats').hide();
		$('#album_details').hide();
		$('#album_details_back').hide();
		$('#privacy_threat_buttons').show();
		$('#treemap_sensitivity').button().show();
		$('#treemap_threats').button().show();
		$('#album_survey').hide();
		$('#privacy_treemap').fadeIn('fast');
		
	});
	
	$('#overview_policy_stats').click(function(event)	{
		$('#privacy_threat_buttons').hide();
		$('#overview_album_activity').hide();
		$('#overview_policy_stats').hide();
		$('#overview_privacy_threats').hide();
		$('#privacy_treemap').hide();
		$('#album_details').hide();
		$('#album_details_back').hide();
		$('#album_survey').hide();
		$('#treemap_sensitivity').button().hide();
		$('#treemap_threats').button().hide();
		
		$('#policy_stats').fadeIn('fast');
		
	});
	
	$('#overview_button').button().click(function(event) {
		$('#privacy_treemap').hide();
		$('#policy_stats').hide();
		$('#privacy_threat_buttons').hide();		
		$('#treemap_sensitivity').button().hide();
		$('#treemap_threats').button().hide();
		$('#album_details').hide();
		$('#album_details_back').hide();
		$('#album_survey').hide();
		$('#overview_album_activity').fadeIn('fast');
		$('#overview_policy_stats').fadeIn('fast');
		$('#overview_privacy_threats').fadeIn('fast');

	});
	
	//Clicking the Privacy Threats button shows the Privacy Threats pane while hiding the others
	$('#privacy_threats_button').button().click(function(event) {
		$('#overview_album_activity').hide();
		$('#privacy_threat_buttons').show();
		$('#overview_policy_stats').hide();
		$('#overview_privacy_threats').hide();
		$('#policy_stats').hide();
		$('#album_details').hide();
		$('#album_details_back').hide();
		$('#treemap_sensitivity').button().show();
		$('#treemap_threats').button().show();
		$('#album_survey').hide();
		$('#privacy_treemap').fadeIn('fast');
		
	});
	
	//Clicking the Policy Statistics button shows the Ppolicy Statistics pane while hiding the others
	$('#policy_stats_button').button().click(function(event) {
		$('#overview_album_activity').hide();
		$('#privacy_threat_buttons').hide();
		$('#overview_policy_stats').hide();
		$('#overview_privacy_threats').hide();
		$('#privacy_treemap').hide();
		$('#album_details').hide();
		$('#album_details_back').hide();
		$('#album_survey').hide();
		$('#treemap_sensitivity').button().hide();
		$('#treemap_threats').button().hide();
		
		$('#policy_stats').fadeIn('fast');
		
	});
	
	$('#survey_button').button().click(function(event) {
		
		//$('#treemap_sensitivity').button().hide();
		//$('#treemap_threats').button().hide();
		//$('#album_details').hide();
		//$('#album_details_back').hide();
		
	});
		//Fire the login() function when the Login button is clicked from index.php
	$('#treemap_sensitivity').button().click(function(event)	{
        //alert($('#treemap_sensitivity').css("background-color")); 
		document.getElementById('treemap_sensitivity').style.background = '#B0B0B0' ;
		document.getElementById('treemap_threats').style.background = '#D8D8D8';
		drawTreeMap_ThreatSensitivity();
		
	});
	$('#treemap_threats').button().click(function(event)	{
		document.getElementById('treemap_threats').style.background = '#B0B0B0' ;
		document.getElementById('treemap_sensitivity').style.background = '#D8D8D8' ;
		drawTreeMap_NoOfThreats();
		
	});	
	$('#album_details_back').button().click(function(event)	{
		
		$('#overview_album_activity').hide();
		$('#overview_policy_stats').hide();
		$('#overview_privacy_threats').hide();
		$('#policy_stats').hide();
		$('#album_details').hide();
		$('#album_details_back').hide();
		$('#album_survey').hide();
		$('#treemap_sensitivity').button().show();
		$('#treemap_threats').button().show();
		
		$('#privacy_treemap').fadeIn('fast');
		
	});
	
	$('#treemap_sensitivity').button().click(function(event)	{
		
		console.log('show treemap sensitivity');
		
	});
	
	$('#treemap_threats').button().click(function(event)	{
		
		console.log('show treemap threats');
		
	});
	
	$('#albums_details_change').button().click(function(event)	{
		
		console.log('change albums settings');
		FB.api('/me/', function(response) {
		javascript:window.open('https://www.facebook.com/' + response.username + '/photos?collection_token='+ response.id +'%3A2305272732%3A6','_blank'); 
	    })
	
		
	});
	
	$('#albums_details_rescan').button().click(function(event)	{
		
		console.log('rescan album');
		
		$("#album_details_detected_threats").empty();
		var queries = '{"query1":"SELECT aid,object_id,owner,cover_pid,cover_object_id,name,created,modified,description,location,size,link,visible,modified_major,edit_link,type,can_upload,photo_count,video_count FROM album WHERE owner=me()",'+
					'"query2":"SELECT allow, deny, description,value,object_id FROM privacy WHERE object_id IN (SELECT object_id FROM #query1) "}';
      
		FB.api({

		method : 'fql.multiquery',
		queries : queries
		}, function(data) {
		
		albumResultsObject = data[0].fql_result_set;
		privacyResultsObject = data[1].fql_result_set;
        console.log(data);

		for (var i = 0; i < albumResultsObject.length; i++) {

			if (albumResultsObject[i].aid == albumid)
			{
				//alert(albumResultsObject[i].aid);
				albumObjects[i].allowedFriends = privacyResultsObject[i].allow;
				albumObjects[i].deniedFriends = privacyResultsObject[i].deny;
				albumObjects[i].description = privacyResultsObject[i].description;
				albumObjects[i].value = privacyResultsObject[i].value;
				privacyDictionary ={};
				privacyDictionary[albumObjects[0].description] = new Array();
				privacyDictionary[albumObjects[0].description].push(albumObjects[0]);	
				for(var j=1; j<albumObjects.length; j++)
				{
					if(privacyDictionary.hasOwnProperty(albumObjects[j].description))
					{
						
						privacyDictionary[albumObjects[j].description].push(albumObjects[j]);
					}
					else
					{
						privacyDictionary[albumObjects[j].description]= new Array();
						privacyDictionary[albumObjects[j].description].push(albumObjects[j]);
					}
					
				}
				
		       // callback(data);
		
			 	
				calculatePolicyMisconfigurations();		
				
		       $("#album_details_detected_threats").append('Detected Threats:</p>');
		       for(var l=0; l <albumObjects.length; l++)
		       {
		       	if(albumObjects[l].objectID== albumid)
		       	 {
		       	 	//alert( albumObjects[i].allowedNames + albumObjects[i].deniedNames );
					for(var k = 0; k < albumObjects[i].misconfigurations.length; k++)	{
						
						$('#template_details_threats_public').css('background-color', 'white');
						
						$("#album_details_detected_threats").append(''+albumObjects[i].misconfigurations[k].description+'</br>').click(function(event)	{
							
							//add logic here to highlight the specific threats
							$('#template_details_threats_public').css('background-color', 'red');
		
						});;
						
					}	
			        
			        $("#album_details_visible_to").empty();
					$("#album_details_visible_to").append('Visible To:</p>');
					
					for(var m = 0; m < albumObjects[l].allowedNames.length; m++)	{
						
						//var source = $("#albumdetailsthreat_public-template").html();
						//var template = Handlebars.compile(source);
						//$("#album_details_visible_to").append(template(albumObjects[i].allowedNames[l]));
						
						$("#album_details_visible_to").append(''+albumObjects[i].allowedNames[l]+'  ');
						
					}

					$("#album_details_hidden_from").empty();
					$("#album_details_hidden_from").append('Hidden From:</p>');
					
					for(var m = 0; m < albumObjects[l].deniedNames.length; m++)	{
						
						$("#album_details_hidden_from").append(''+albumObjects[l].deniedNames[m]+'  ');
						
					}
			        break;
			      }  				
			    }  				
				break;		
			}

		}

		});
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
//var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

//The album object formed from FQL result set data
function albumObject(objectID, photoCount, name, created, cphotoID, mostLikedPID, mostLikes, mostCommentedPID, mostCommented, mostTaggedPID, mostTags, location, allowedFriends, deniedFriends,allowedNames,deniedNames, description,value,misconfigurations,similarAlbums)
{	
	this.objectID = objectID;
	this.photoCount = photoCount;
	this.name = name;
	this.created = new Date(parseInt(created * 1000)).getFullYear();
	this.cphotoID = cphotoID;
	this.mostLikedPID = mostLikedPID;
	this.mostLikes = calculateAlbumMostLikedPhoto(objectID);
	this.mostCommentedPID = mostCommentedPID;
	this.mostCommented = calculateAlbumMostCommentedPhoto(objectID);
	this.mostTaggedPID = mostTaggedPID;
	this.mostTags = mostTags;
	this.location = location;
	this.allowedFriends = allowedFriends;
	this.deniedFriends = deniedFriends;
	this.allowedNames = allowedNames;
	this.deniedNames = deniedNames;
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
var tags = {};
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
var albumObjectLocations= {}; //Holds album location names
var countedAlbumLocations = {}; //Holds all counted album locations - used for pie chart

var datesArray = new Array();
var highSenitivity = new Array();
var mediumSensitivity = new Array();
var lowSensitivity = new Array();

var numberOfNoLocation = 0;

//Simple graph API call to get basic user data and display it (what is seen in the top banner)
function getBasicUserData() {

	//Get profile picture
	FB.api('/me/picture?type=large', function(response) {
		$('#title').append('<img src = ' + response.data.url + ' width = 100 height = 100/>') //Results are appended to title bar
	})
	//Get username
	FB.api('/me/', function(response) {
		$('#title').append("<br>Welcome " + response.birthday + "!")
	})
}

function getFriendResults(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
		//text : "Collecting your friend network"
	});

    $("#loading_photos").dialog('option', 'title', 'Collecting your friend network');
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
		//text : "Collecting your friend lists"
	});
	$("#loading_photos").dialog('option', 'title', 'Collecting your friend lists');
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
		text: "Collecting your album photos"
	});
	$("#loading_photos").dialog('option', 'title', 'Collecting your album photos');
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
												albumResultsObject[i].location,privacyResultsObject[i].allow,privacyResultsObject[i].deny,null,null,privacyResultsObject[i].description,privacyResultsObject[i].value)
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
	
	//albumPrint(albumObjects);
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
    $("#loading_photos").dialog('option', 'title', "Collecting your album privacy settings");
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
	 $("#loading_photos").dialog('option', 'title', "Collecting your photo tags");
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
	 $("#loading_photos").dialog('option', 'title', "Collecting your photo comments");
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
	 $("#loading_photos").dialog('option', 'title', "Collecting your photo likes");
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

	$('#login_container').hide();
	$('#title').show();
	$('#logo').show();
	$('#navigation').show();
	$('#main').show();
	//test(processtest);
	performCalculations();

}

function test(callback)		{
	

	$("#loading_photos").dialog({
		height : 140,
		modal : true,
	});
	
	var query = 'SELECT name FROM user WHERE name LIKE "a"  LIMIT 5';
//'SELECT name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) and strpos(lower(name),"i") ==0';
	
	FB.api({

		method : 'fql.query',
		query : query
	}, function(data) {

        callback(data);

	});
	
} function processtest(response) {
	
	console.log(response);
	
	$("#progress_bar").progressbar({
		value: 100
	});
	
}

function performCalculations()	{
	$('#logo').append('<img src = "js/scan.png" width = 90 height = 90/>');
	$('#privacy_threat_buttons').hide();
	calculateSimilarAlbums();
	calculatePolicyMisconfigurations();
	calculateTags();
	calculatePolicyStatistics();	
    //sortAlbumSensitivity();
	drawBarGraph();
	drawPieChartYear();
	drawPieChartLocation(1);
    drawTagCloud(250,150,'#overview_policy_stats');
    drawTagCloud(350,350,'#policy_stats_tagcloud');
    drawTreeMap_NoOfThreats();
    $('#privacy_treemap').hide();
	calculateMostCommented();
	calculateMostLiked();
	calculateMostTagged();
	calculateMostCommentedFriend();
	calculateMostLikedFriend();
	calculateMostTaggedFriend();
	calculateMostCommentedAlbum();
	calculateMostLikedAlbum();
	countAlbumLocations();
	
// JavaScript Document
/*
	jQuery.post('query_handler.php', {
	firstname:albumObjects[0].name,
	pass: albumObjects[0].objectID
	},  function(data){
     alert('ok');
	});
*/

window.location="dbconn.php";

}

	//'"query10":"SELECT flid, owner, name, count FROM friendlist WHERE owner=me() ",'+
	//'"query11":"SELECT allow, deny, description FROM privacy WHERE object_id IN (SELECT object_id FROM #query2) "}';
	
function calculateAlbumMostCommentedPhoto(aobjectid) {

	var query = "SELECT comment_info, object_id, src_big FROM photo WHERE owner = me() AND aid = " + "\"" + aobjectid + "\"" + "";
	FB.api({

		method : 'fql.query',
		query : query
	}, function(data) {

		var tempStart = data[0];
		var mostCommented = tempStart;

		for (var i = 1; i < data.length; i++) {

			if (parseInt(data[i].comment_info.comment_count) > parseInt(tempStart.comment_info.comment_count)) {

				tempStart = data[i];
				mostCommented = data[i];

			}

		}

		for (var i = 0; i < albumObjects.length; i++) {

			if (albumObjects[i].objectID == aobjectid) {
				
				albumObjects[i].mostCommentedPID = mostCommented.object_id;
				albumObjects[i].mostCommented = mostCommented;
				break;
				
			}	else	{
				
				console.log("no match found for most commented");
				
			}

		}

	});

}

function calculateAlbumMostLikedPhoto(aobjectid) {

	var query = "SELECT like_info, object_id, src_big FROM photo WHERE owner = me() AND aid = " + "\"" + aobjectid + "\"" + "";
	FB.api({

		method : 'fql.query',
		query : query
	}, function(data) {

		var tempStart = data[0];
		var mostLiked = tempStart;

		for (var i = 1; i < data.length; i++) {

			if (parseInt(data[i].like_info.like_count) > parseInt(tempStart.like_info.like_count)) {

				tempStart = data[i];
				mostLiked = data[i];

			}

		}

		for (var i = 0; i < albumObjects.length; i++) {

			if (albumObjects[i].objectID == aobjectid) {
				
				albumObjects[i].mostLikedPID = mostLiked.object_id;
				albumObjects[i].mostLiked = mostLiked;
				break;
				
			}	else	{
				
				console.log("no match found for most liked");
				
			}

		}

	});

}

function countAlbumLocations() {

	for (var i = 0; i < albumObjects.length; i++) {

		if ((albumObjects[i].location == "") || (albumObjects[i].location == null)) {
              if(Object.keys(albumObjectLocations).indexOf("No Location Defined")<0)
              {
              	albumObjectLocations["No Location Defined"]= new Number;
              	albumObjectLocations["No Location Defined"]= 1;
              }
              else
              {
              	albumObjectLocations["No Location Defined"]= albumObjectLocations["No Location Defined"] + 1;
              }
			//albumObjectLocations.push("No Location Defined")
			//constructedAlbumLocations.push(albumLocations(null, 1));

		} else {
              if(Object.keys(albumObjectLocations).indexOf(albumObjects[i].location)<0)
              {
              //	var index = Object.keys(albumObjectLocations).indexOf(albumObjects[i].location);
              	albumObjectLocations[albumObjects[i].location]= new Number;
              	albumObjectLocations[albumObjects[i].location]= 1;
              }
              else
              {
              //	var index = Object.keys(albumObjectLocations).indexOf(albumObjects[i].location);
              	albumObjectLocations[albumObjects[i].location]= albumObjectLocations[albumObjects[i].location] + 1;
              }
			//albumObjectLocations.push(albumObjects[i].location);
			//constructedAlbumLocations.push(albumLocations(albumObjects[i].location, 7));
		}
		
	}
	/*
	sortAlbumLocations();
	
	for(var i = 0; i < albumObjectLocations.length; i++)	{
		
		if(albumObjectLocations[i] == "No Location Defined")	{
			
			numberOfNoLocation++;
			
		}
		
	}
	
	spliceAlbumLocations();

	for (var i = 0, j = albumObjectLocations.length; i < j; i++) {
		if (countedAlbumLocations[albumObjectLocations[i]]) {
			countedAlbumLocations[albumObjectLocations[i]]++;
		} else {
			countedAlbumLocations[albumObjectLocations[i]] = 1;
		}
	}
*/
}
/*
function sortAlbumLocations()	{
	
	for (var i = 0; i < albumObjectLocations.length - 1; i++) {

		if (albumObjectLocations[i + 1] > albumObjectLocations[i]) {

			var temp = albumObjectLocations[i];
			albumObjectLocations[i] = albumObjectLocations[i + 1];
			albumObjectLocations[i + 1] = temp;

		}
	}
	
}

function spliceAlbumLocations()		{
	
	for (var i = 0; i < albumObjectLocations.length * albumObjectLocations.length; i++) {

		if (albumObjectLocations[i] == albumObjectLocations[i + 1]) {

			albumObjectLocations.splice(0,1);

		}

	}
	
}

*/
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
	$("#overview_album_content").append('<br>');
	$("#overview_album_content").append(template( mostCommentedPhoto));

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
			 			if(t>0)
			 			{
			 				temp1[t] = temp1[t].slice(1, temp1[t].length);
			 			}
			 			if(friends[temp1[t]]!=null)
			 			 allowed.push(friends[temp1[t]]);
			 		}
			 		albumObjects[i].allowedNames = temp1;			 		
			 		temp1 =  temp[1].slice(temp[1].indexOf(': ')+1,temp[1].length);
			 		temp1 = temp1.split(",");

			 		for(var t=0; t<temp1.length; t++)
			 		{
			 			if(t>0)
			 			{
			 				temp1[t] = temp1[t].slice(1, temp1[t].length);
			 			}
			 			if(friends[temp1[t]]!=null)
			 			 denied.push(friends[temp1[t]]);
			 		}
			 		albumObjects[i].deniedNames = temp1;
			 }
			 else
			 {
			 		var temp1 = temp[0].split(',');
			 		for(var t=0; t<temp1.length; t++)
			 		{
			 			if(t>0)
			 			{
			 				temp1[t] = temp1[t].slice(1, temp1[t].length);
			 			}
			 			if(friends[temp1[t]]!=null)
			 			 allowed.push(friends[temp1[t]]);
			 		}
			 		albumObjects[i].allowedNames = temp1;			 					 	
			 }
			
		}
		else
		{
			albumObjects[i].allowedNames = new Array;
			albumObjects[i].allowedNames.push(albumObjects[i].description);
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
							if(friendlist_members[friendlists[j].flid].indexOf(allowed[n][m])>=0 && (albumObjects[i].allowedFriends.indexOf(friendlists[j].flid)>=0 ) )
							{
								if(friends[friendlists[j].name] == null)
								 cause.push(friendlists[j].name);
								
							}
						}
						if(cause.length>0)
						{
				 		   misconfigurations.push({description:'common friends between the friend lists',cause:cause,sensitivity:'0.6'});
				 	  	  break;
				    	}
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
	var policyOpenness = new Number;
	var mostAllowedFriend = new String;
	var mostDeniedFriend = new String;
	var noUsedFriendlists = new Number;
	var noUniqueAlbumPolicies = Object.keys(privacyDictionary).length;
	var temp = new Object;
	var temp1 = new Object;
	temp.value = new Number;
	temp.value = tags[Object.keys(tags)[0]]['cnt'];
	temp.name = new String;
	temp.name = Object.keys(tags)[0];
    temp1.value = new Number;
    temp1.value = tags[Object.keys(tags)[0]]['cnt'];
	temp1.name = new String;
	temp1.name = Object.keys(tags)[0];

	for(var i=0; i<Object.keys(tags).length; i++ )
	{
		if(temp.value <=tags[Object.keys(tags)[i]]['cnt'] && friends[Object.keys(tags)[i].slice(0,Object.keys(tags)[i].length-1)]!=null)
		{
		 temp.value = tags[Object.keys(tags)[i]]['cnt'];
		 temp.name = Object.keys(tags)[i];
		}
		if(temp1.value >=tags[Object.keys(tags)[i]]['cnt'] && friends[Object.keys(tags)[i].slice(1,Object.keys(tags)[i].length-1)]!=null)
		{
		 temp1.value = tags[Object.keys(tags)[i]]['cnt'];
		 temp1.name = Object.keys(tags)[i];
		}		
	}
    mostAllowedFriend = temp.name.slice(0,temp.name.length-1);
    mostDeniedFriend = temp1.name.slice(0,temp1.name.length-1);
  //  alert(mostAllowedFriend + mostDeniedFriend);
	for(var i=0; i<friendlists.length; i++)
	{
		for(var j=0; j<Object.keys(privacyDictionary).length; j++)
		{
			if(Object.keys(privacyDictionary)[j].indexOf(friendlists[i].name)>=0)
			{
				noUsedFriendlists = noUsedFriendlists +1;
			}
		}
	}
    for(var i=0; i<albumObjects.length; i++)
    {
    	var albopenness = new Number;

	    	for(var j=0; j<albumObjects[i].allowedNames.length; j++)
	    	{
	    		var isFL = false;
	    		for(var k=0; k<friendlists.length; k++)
	    		{
	    			if(albumObjects[i].allowedNames[j] == friendlists[k].name)
	    			{
	    				albopenness = albopenness + friendlist_members[friendlists[k].flid].length;
	    				isFL = true;
	    			}
	    		}
	    		if(isFL== false)  

	    		{
	    			if(albumObjects[i].allowedNames[j] == 'Public' || albumObjects[i].allowedNames[j] == 'Friends')
	    			  albopenness = 1;
	    			else if (albumObjects[i].allowedNames[j] == 'Only Me')
	    			 albopenness = 0;
	    			 else
	    			 albopenness =  albopenness +1;
	    			 
	    		}
	    	}
	    	if(albumObjects[i].deniedNames!=null)
	    	{
		    	for(var j=0; j<albumObjects[i].deniedNames.length; j++)
		    	{
		    		var isFL = false;
		    		for(var k=0; k<friendlists.length; k++)
		    		{
		    			if(albumObjects[i].deniedNames[j] == friendlists[k].name)
		    			{
		    				albopenness = albopenness - friendlist_members[friendlists[k].flid].length;
		    				isFL = true;
		    			}
		    		}
		    		if(isFL== false)
		    		{
		    			albopenness = albopenness - 1;
		    		}
		    	} 
    	   }
    	albopenness = albopenness/ Object.keys(friends).length;
    	policyOpenness = policyOpenness +  albopenness;  	
    }
	policyOpenness = policyOpenness/albumObjects.length;
	policyOpenness = Math.round(policyOpenness*10)/10 ;
	if(policyOpenness <0.5)
	$('#policy_stats_statistics').append('<br><br> <font size = "4" > Policy Openness : <font color = "00CC00" >'+ policyOpenness.toString() + '</font>');
	else
	$('#policy_stats_statistics').append('<br><br><font size = "4" > Policy Openness : <font color = "FF0000" >'+ policyOpenness.toString() + '</font>');
	$('#policy_stats_statistics').append('<br><font size = "4" > Most Allowed Friend : '+ mostAllowedFriend.toString());
	$('#policy_stats_statistics').append('<br><font size = "4" > Most Denied Friend : '+ mostDeniedFriend.toString());
	$('#policy_stats_statistics').append('<br><font size = "4" > Number of unique Album Policies : '+ noUniqueAlbumPolicies.toString());
	$('#policy_stats_statistics').append('<br><font size = "4" > Number of friend lists used in the policies : '+ noUsedFriendlists.toString());
	
}


function calculateDatesArray() {

	for (var i = 0; i < albumObjects.length; i++) {

		datesArray.push({
			date : albumObjects[i].created,
			photos : albumObjects[i].photoCount
		});
	}

	for (var j = 0; j < datesArray.length; j++) {

		for (var k = 0; k < datesArray.length; k++) {

			try {

				if (parseInt(datesArray[k + 1].date) > parseInt(datesArray[k].date)) {

					var temp = datesArray[k];
					datesArray[k] = datesArray[k + 1];
					datesArray[k + 1] = temp;

				}

			} catch(err) {

				console.log("end of sort");
			}

		}

	}
	
	prepareDates();

}


function prepareDates() {
	for (var i = 0; i < datesArray.length; i++) {

		for (var j = 0; j < datesArray.length; j++) {

			try {

				if (parseInt(datesArray[j + 1].date) == parseInt(datesArray[j].date)) {

					datesArray[j].photos = parseInt(datesArray[j].photos) + parseInt(datesArray[j + 1].photos);
					datesArray.splice(j + 1, 1);
				}

			} catch(err) {

				console.log("end of splice")
			}

		}

	}

}


function sortAlbumSensitivity() {

	for (var i = 0; i < albumObjects.length; i++) {

		try {

			if ((albumObjects[i].misconfigurations[0].sensitivity >= 0.7) && (albumObjects[i].misconfigurations.length != 0)) {

				highSenitivity.push(albumObjects[i]);

			} else if ((albumObjects[i].misconfigurations[0].sensitivity >= 0.3) && (albumObjects[i].misconfigurations[0].sensitivity < 0.7) && (albumObjects[i].misconfigurations.length != 0)) {

				mediumSensitivity.push(albumObjects[i]);

			} else {

				lowSensitivity.push(albumObjects[i]);

			}

		} catch	(err) {

			console.log("no album misconfigurations")
		}

	}

}







function drawPieChartLocation(num) {

	countAlbumLocations();
	data = new google.visualization.DataTable();

	data.addColumn('string', 'Location');
	data.addColumn('number', 'Albums Containing Location')
/*
	data.addRows(albumObjectLocations.length);

	data.setCell(0, 0, "No Location Defined");
	data.setCell(0, 1, parseInt(numberOfNoLocation));

	for (var i = 1; i < albumObjectLocations.length; i++) {

		data.setCell(i, 0, albumObjectLocations[i].toString());
		data.setCell(i, 1, parseInt(countedAlbumLocations[albumObjectLocations[i]]));

	}
*/
    
//	data.setCell(0, 0, "No Location Defined");
//	data.setCell(0, 1, parseInt(numberOfNoLocation));
	data.addRows(Object.keys(albumObjectLocations).length);
	for (var i = 0; i < Object.keys(albumObjectLocations).length; i++) {

		data.setCell(i, 0, Object.keys(albumObjectLocations)[i]);
		data.setCell(i, 1, albumObjectLocations[Object.keys(albumObjectLocations)[i]]);

	}
	// Create and draw the visualization.
	new google.visualization.PieChart(document.getElementById('overview_album_activity').getElementsByTagName('div')[num]).draw(data, {
		backgroundColor : "#ffffff",
		fontName : "Roboto Condensed",
		fontSize : "14",
		title : '% Albums Created by Location',
		titleTextStyle : {
			color : '#000000',
			fontName : 'Roboto Condensed',
			fontSize : 20,
			bold : false
		},
		height : "450",
		width : "450",
		chartArea : {
			width : "75%",
			height : "75%"
		}
	});
}
/*
function drawPieChartLocationPostLoad() {

	data = new google.visualization.DataTable();

	data.addColumn('string', 'Location');
	data.addColumn('number', 'Alums Containing Location')

	data.addRows(albumObjectLocations.length);

	data.setCell(0, 0, "No Location Defined");
	data.setCell(0, 1, parseInt(numberOfNoLocation));

	for (var i = 1; i < albumObjectLocations.length; i++) {

		data.setCell(i, 0, albumObjectLocations[i].toString());
		data.setCell(i, 1, parseInt(countedAlbumLocations[albumObjectLocations[i]]));

	}

	// Create and draw the visualization.
	new google.visualization.PieChart(document.getElementById('overview_album_activity').getElementsByTagName('div')[6]).draw(data, {
		backgroundColor : "#ffffff",
		fontName : "Roboto Condensed",
		fontSize : "14",
		title : '% Albums Created by Location',
		titleTextStyle : {
			color : '#000000',
			fontName : 'Roboto Condensed',
			fontSize : 20,
			bold : false
		},
		height : "450",
		width : "450",
		chartArea : {
			width : "75%",
			height : "75%"
		}
	});
}

*/
function drawPieChartYear() {
	// Create and populate the data table.

	calculateDatesArray();
	data = new google.visualization.DataTable();

	data.addColumn('string', 'Year');
	data.addColumn('number', 'Albums Created In Year');

	data.addRows(albumObjects.length);

	for (var i = 0; i < datesArray.length; i++) {

		data.setCell(i, 0, datesArray[i].date.toString());
		data.setCell(i, 1, parseInt(datesArray[i].photos));

	}

	// Create and draw the visualization.
	new google.visualization.PieChart(document.getElementById('overview_album_activity').getElementsByTagName('div')[1]).draw(data, {
		backgroundColor : "#ffffff",
		fontName : "Roboto Condensed",
		fontSize : "14",
		title : '% Albums Created by Year',
		titleTextStyle : {
			color : '#000000',
			fontName : 'Roboto Condensed',
			fontSize : 20,
			bold : false
		},
		height : "450",
		width : "450",
		chartArea : {
			width : "75%",
			height : "75%"
		}
	});
}

function drawPieChartYearPostLoad() {
	// Create and populate the data table.

	data = new google.visualization.DataTable();

	data.addColumn('string', 'Year');
	data.addColumn('number', 'Albums Created In Year');

	data.addRows(albumObjects.length);

	for (var i = 0; i < datesArray.length; i++) {

		data.setCell(i, 0, datesArray[i].date.toString());
		data.setCell(i, 1, parseInt(datesArray[i].photos));

	}

	// Create and draw the visualization.
	new google.visualization.PieChart(document.getElementById('overview_album_activity').getElementsByTagName('div')[6]).draw(data, {
		backgroundColor : "#ffffff",
		fontName : "Roboto Condensed",
		fontSize : "14",
		title : '% Albums Created by Year',
		titleTextStyle : {
			color : '#000000',
			fontName : 'Roboto Condensed',
			fontSize : 20,
			bold : false
		},
		height : "450",
		width : "450",
		chartArea : {
			width : "75%",
			height : "75%"
		}
	});
}


function drawBarGraph() {
  // Create and populate the data table.
  
  sortAlbumSensitivity();
  var data = google.visualization.arrayToDataTable([
    ['Threat Level', 'Album Data', 'temp', 'temp1'],
    ['High Sensitivity',  highSenitivity.length ,0,0],
    ['Medium Sensitivity',  0,mediumSensitivity.length,0],
    ['Low Sensitivity',  0,0,lowSensitivity.length],
  ]);

  // Create and draw the visualization.

	new google.visualization.BarChart(document.getElementById('overview_privacy_threats')).draw(data, {
		backgroundColor : "#ffffff",
		fontName : "Roboto Condensed",
		fontSize : "13",
		//width : 400,
		//height : 300,
		colors : ['red','orange','yellow'],
        bar : {groupWidth:70}	,
        tooltip : {trigger: 'none'},
        title: 'Privacy Threats',
        titlePosition : 'out',
       titleTextStyle : {color: '#000000', fontName: 'Roboto Condensed', fontSize: 20, bold: false},
       	hAxis : {textStyle:{color: '#000000'},gridlines: {color:"#ffffff"}},
		legend : {
			position : 'none'
		}
		
	});
	}

function calculateTags()
{
	/* Based on album policies
	  for(var i=0; i< albumObjects.length; i++)
	  {
	  	for(var j =0; j< albumObjects[i].allowedNames.length; j++)
	  	{
			if(tags[albumObjects[i].allowedNames[j]]==null)
			{
				 tags[albumObjects[i].allowedNames[j]] = new Number;
				 tags[albumObjects[i].allowedNames[j]] = 1;
			}
			else
				 tags[albumObjects[i].allowedNames[j]] = tags[albumObjects[i].allowedNames[j]] +1;  		
	  	}
	  	if(albumObjects[i].deniedNames!= null)
	  	{
		  	for(var j =0; j< albumObjects[i].deniedNames.length; j++)
		  	{
				if(tags[albumObjects[i].deniedNames[j]]==null)
				{
					 tags[albumObjects[i].deniedNames[j]] = new Number;
					 tags[albumObjects[i].deniedNames[j]] = 1;
				}
				else
					 tags[albumObjects[i].deniedNames[j]] = tags[albumObjects[i].deniedNames[j]] +1;  		
		  	 }
		 }
	  }
    */
   
  	  for(var i=0; i< albumObjects.length; i++)
	  {
	  	for(var j =0; j< albumObjects[i].allowedNames.length; j++)
	  	{
	  		var tagname = albumObjects[i].allowedNames[j]+ 'g';
			if(tags[tagname]==null)
			{
				     tags[tagname] = new Object;
				     tags[tagname]['color'] = '#00CC00';
				     tags[tagname]['cnt'] = new Number;
				     tags[tagname]['size'] = new Number;
					 if(friends[tagname.slice(0,tagname.length-1)] ==null)
					 {
					 	for(var k =0; k< friendlists.length; k++)
					 	{
					 		if(friendlists[k].name == tagname.slice(0,tagname.length-1))
					 		{
					 			tags[tagname]['size'] = friendlist_members[friendlists[k].flid].length;
					 			tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
					 		}
					 	}
					 	 if(tagname== 'Only Mer' || tagname== 'Only Meg')
					 	 {
						  tags[tagname]['size'] = 1;
						  tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
						 }
						 else if(tagname== 'Friendsr' || tagname== 'Friendsg')
						 {
						  tags[tagname]['size'] = 50;
						   tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
						 }
						 else if(tagname== 'Publicr' || tagname== 'Publicg')
						 {
						  tags[tagname]['size'] = 80;
						  tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
						 }		
							
					 }
					 else
					 {
						 tags[tagname]['size'] = 1;	
						 tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
					 }
	 
			}
			else
			{
				tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
			}
				// tags[tagname] = tags[tagname] +1;  		
	  	}
	  	
	  	if(albumObjects[i].deniedNames!= null)
	  	{
		  	for(var j =0; j< albumObjects[i].deniedNames.length; j++)
		  	{
		  		var tagname = albumObjects[i].deniedNames[j]+ 'r';
				if(tags[tagname]==null)
				{
					 tags[tagname] = new Object;
					 tags[tagname]['color']= '#ff0000';
					 tags[tagname]['size'] = 1;
					 tags[tagname]['cnt'] = new Number;
					 tags[tagname]['cnt']=1;
					 if(friends[tagname.slice(0,tagname.length-1)] ==null)
					 {
					 	for(var k =0; k< friendlists.length; k++)
					 	{
					 		if(friendlists[k].name == tagname.slice(0,tagname.length-1))
					 		{
					 			tags[tagname]['size'] = friendlist_members[friendlists[k].flid].length;
					 			tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
					 		}
					 	}
					 }
					 else
					 {
						 tags[tagname]['size'] = 1;
						 tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
					 }
				}
				else
				{
					tags[tagname]['cnt'] = tags[tagname]['cnt']+1;
				}
					// tags[tagname] = tags[tagname] +1;  		
		  	 }
		 }
	  } 
 } 
function drawTagCloud(width,height,DIV){

 var fill = d3.scale.category20();
  //var zz= ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"];


/*
  			for(var i=0; i<Object.keys(privacyDictionary).length; i++)
			{
			 	var policy = Object.keys(privacyDictionary)[i];
			 	policy = policy.split(";");
			 	var allowed;
			 	var denied;
			 	if(policy.length>1)
			 	{
			 		allowed = policy[0].split(",");
			 		denied =  policy[1].slice(policy[1].indexOf(': ')+1,policy[1].length);
			 		denied = denied.split(",");
			 		for(var j=0; j<denied.length;j++)
			 		{
			 			if(j>0)
			 			  denied[j] = denied[j].slice(1,denied[j].length);
			 		   	if(tags[denied[j]]==null)
			 			{
			 				tags[denied[j]] = new Number;
			 				tags[denied[j]] = tags[denied[j]] +1;
			 			} 
			 			else
			 			tags[denied[j]] = tags[denied[j]] +1;
			 		}
			 	}
			 	else
			 	{
			 		allowed = policy[0].split(",");
			 	}
			 	for(var j=0; j<allowed.length;j++)
			 	{
			 		if(j>0)
			 			allowed[j] = allowed[j].slice(1,allowed[j].length);
			 		if(tags[allowed[j]]==null)
			 		{
			 			tags[allowed[j]] = new Number;
			 			tags[allowed[j]] = tags[allowed[j]] +1;
			 		}
			 		else
			 		tags[allowed[j]] = tags[allowed[j]] +1;
			 		
			 	}
			 }
			 */
  d3.layout.cloud().size([width, height])

      .words((Object.keys(tags)).map(function(d) {
        return {text: d.slice(0,d.length-1), size: tags[d].size+10, color: tags[d].color, cnt: tags[d].cnt};
      }))
      .rotate(function() { return 0; }) //~~(Math.random() * 2) * 90
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select(DIV).append("svg")
        .attr("width", width>300?width+800 :width+100)
        .attr("height", height>300?height+140:height+100)
      .append("g")
        .attr("transform", height>300?"translate(330,180)":"translate(150,100)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill",function(d, i) {return d.color; })//var temp = d.text ; alert(i + temp); if (temp.slice(temp.length-1,temp.length)=='r') { return '#ff0000';} else {return '#00ff00';} })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .on("click", function(d) {
   		 alert(d.cnt.toString() + ' of your privacy settings contain ' + d.text +'\n'+ (d.size-10).toString() + ' users are present inside '+ d.text);});
       }

}
      function drawTreeMap_NoOfThreats() {
        // Create and populate the data table.
          document.getElementById('treemap_threats').style.background = '#B0B0B0' ;
		  document.getElementById('treemap_sensitivity').style.background = '#D8D8D8' ;
		  data = new google.visualization.DataTable(); 
		    data.addColumn('string', 'Album'); 
            data.addColumn('string', 'Privacy Settings'); 
            data.addColumn('number', 'Photos (size)'); 
            data.addColumn('number', 'Misconfigurations (color)');             
            data.addColumn({type:'string', role:'tooltip'});
            data.addColumn('string', 'AlbumID');             
            data.addRows(Object.keys(privacyDictionary).length +1);
            data.setCell(0,0,'Album Privacy Groups');
            data.setCell(0,1,null);
            data.setCell(0,2,0);
            data.setCell(0,3,0);
            data.setCell(0,4,"");
            data.setCell(0,5,"");
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
			 	data.setCell(i+1,5,"");
			 	for(var j=0; j<privacyDictionary[Object.keys(privacyDictionary)[i]].length; j++)
			 	{
			 		var rowIndex = data.getNumberOfRows();
			 		
			 		data.addRows(1);
				 	data.setCell(rowIndex,0,privacyDictionary[Object.keys(privacyDictionary)[i]][j].name + ' ID: ' + privacyDictionary[Object.keys(privacyDictionary)[i]][j].objectID );
	            		data.setCell(rowIndex,1,allowed+'\n'+denied);
	           		data.setCell(rowIndex,2,parseInt(privacyDictionary[Object.keys(privacyDictionary)[i]][j].photoCount));
	           		data.setCell(rowIndex,4,privacyDictionary[Object.keys(privacyDictionary)[i]][j].objectID );
	           		data.setCell(rowIndex,5,privacyDictionary[Object.keys(privacyDictionary)[i]][j].objectID);
	           		if(privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations == null || privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length ==0 )
	           		data.setCell(rowIndex,3,0);	
	           		else
	           		{

	           			  data.setCell(rowIndex,3,privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length); // number of threats
					/*
	           			 var average_sensitivity =0;
		           			 for(var k=0; k<privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length; k++)
		           			 {
		           			 	average_sensitivity = average_sensitivity + parseFloat(privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations[k].sensitivity);
		           			 }
		           			 average_sensitivity = average_sensitivity/privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length;
		           			 //alert(privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length);
		           			 data.setCell(rowIndex,3,average_sensitivity);	
		           	  */	
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
	   // width : 400,
	   // height: 500,
	    fontColor: 'black',
	    showScale: true});
        // $('#privacy_treemap').hide();
 
         google.visualization.events.addListener(treemap, 'select', function () {
    
	     var row = treemap.getSelection()[0].row;
         // user clicked individual album
	      if(data.getValue(row, 1)!='Album Privacy Groups' && data.getValue(row, 1)!=null )
	      {
            
			albumid = data.getValue(row, 5).toString(); /// ALBUM ID TO POPULATE THE ALBUM DETAILS SCREEN 
			$('#overview_album_activity').hide();
			$('#overview_policy_stats').hide();
			$('#overview_privacy_threats').hide();
			$('#privacy_treemap').hide();

			$('#treemap_sensitivity').button().hide();
			$('#treemap_threats').button().hide();

			$('#album_details').fadeIn('fast');
			$('#album_details_back').fadeIn('fast');
			
			for(var i = 0; i < albumObjects.length; i++)	{
				
				if(albumObjects[i].objectID == albumid)	{	
					
					console.log(albumObjects[i]);
					
					$("#album_details_title").empty();
					$("#album_details_title").append(''+albumObjects[i].name+'');
					
					$("#album_details_specs").empty();
					$("#album_details_specs").append('Album Details:</p>');
					
					FB.api('/me/albums', function(response) {

							var picURL = "http://graph.facebook.com/" + response.data[i].id + "?fields=picture";
							console.log(response.data[i].id)
							FB.api(picURL, function(response) {
								console.log(response);
								$("#album_details_specs").append('<img src='+response.picture.data.url+'></br>');
								$("#album_details_specs").append('Album Title: '+albumObjects[i].name+'</br>');
								$("#album_details_specs").append('Photo Count: '+albumObjects[i].photoCount+'</br>');
								$("#album_details_specs").append('Album Threats: '+albumObjects[i].misconfigurations.length+'');
							})
					})
					
					$("#album_details_most_commented").empty();
					$("#album_details_most_commented").append('<img src='+albumObjects[i].mostCommented.src_big+' width = 100 height = 80></br>');
					$("#album_details_most_commented").append('Most Commented('+albumObjects[i].mostCommented.comment_info.comment_count+')');
					
					$("#album_details_most_liked").empty();
					$("#album_details_most_liked").append('<img src='+albumObjects[i].mostLiked.src_big+' width = 100 height = 80></br>');
					$("#album_details_most_liked").append('Most Liked('+albumObjects[i].mostLiked.like_info.like_count+')');
					
					$("#album_details_similar_albums").empty();
					$("#album_details_similar_albums").append('Similar Albums:</p>');
					
					for(var x = 0; x < albumObjects[i].similarAlbums.length; x++)		{
						
						for(var y = 0; y < albumObjects.length; y++)		{
							
								if(albumObjects[i].similarAlbums[x] == albumObjects[y].name)		{
									
									if(albumObjects[y].mostLiked != null)		{
										
										var source = $("#albumdetailssimilar-template").html();
										var template = Handlebars.compile(source);
										$("#album_details_similar_albums").append('<br>');
										$("#album_details_similar_albums").append(template(albumObjects[y]));
										
										//$("#album_details_similar_albums").append('<div><img src='+albumObjects[y].mostLiked.src_big+' width = 100 height = 80>'+albumObjects[y].name+'</div></p>');
										
									}	else	{
										
										console.log('null src');									
									}
								
							}	else	{
							
								console.log('not found');
							}
							
						}
					
				}
				
					$("#album_details_detected_threats").empty();
					$("#album_details_detected_threats").append('Detected Threats:</p>');
					
					for(var k = 0; k < albumObjects[i].misconfigurations.length; k++)	{
						
						$('#template_details_threats_public').css('background-color', 'white');
						
						$("#album_details_detected_threats").append(''+albumObjects[i].misconfigurations[k].description+'</br>').click(function(event)	{
							
							//add logic here to highlight the specific threats
							$('#template_details_threats_public').css('background-color', 'red');
		
						});;
						
					}
					
					$("#album_details_visible_to").empty();
					$("#album_details_visible_to").append('Visible To:</p>');
					
					for(var l = 0; l < albumObjects[i].allowedNames.length; l++)	{
						
						//var source = $("#albumdetailsthreat_public-template").html();
						//var template = Handlebars.compile(source);
						//$("#album_details_visible_to").append(template(albumObjects[i]));
						
						$("#album_details_visible_to").append(''+albumObjects[i].allowedNames[l]+'  ');
						
					}

					$("#album_details_hidden_from").empty();
					$("#album_details_hidden_from").append('Hidden From:</p>');
					
					for(var m = 0; m < albumObjects[i].deniedNames.length; m++)	{
						
						$("#album_details_hidden_from").append(''+albumObjects[i].deniedNames[m]+'  ');
						
					}
					
				}
				
			}

	      }
	
	
	      });
      
      }

      function drawTreeMap_ThreatSensitivity() {
 		  data = new google.visualization.DataTable(); 
		    data.addColumn('string', 'Album'); 
            data.addColumn('string', 'Privacy Settings'); 
            data.addColumn('number', 'Photos (size)'); 
            data.addColumn('number', 'Misconfigurations (color)'); 
            data.addColumn({type:'string', role:'tooltip'});
            data.addColumn('string', 'AlbumId');            
            data.addRows(Object.keys(privacyDictionary).length +1);
            data.setCell(0,0,'Album Privacy Groups');
            data.setCell(0,1,null);
            data.setCell(0,2,0);
            data.setCell(0,3,0);
            data.setCell(0,4,"");
            data.setCell(0,5,"");
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
			 	data.setCell(i+1,5, "");
			 	for(var j=0; j<privacyDictionary[Object.keys(privacyDictionary)[i]].length; j++)
			 	{
			 		var rowIndex = data.getNumberOfRows();
			 		
			 		data.addRows(1);
				 	data.setCell(rowIndex,0,privacyDictionary[Object.keys(privacyDictionary)[i]][j].name + ' ID: ' + privacyDictionary[Object.keys(privacyDictionary)[i]][j].objectID );
	            		data.setCell(rowIndex,1,allowed+'\n'+denied);
	           		data.setCell(rowIndex,2,parseInt(privacyDictionary[Object.keys(privacyDictionary)[i]][j].photoCount));
	           		data.setCell(rowIndex,5,privacyDictionary[Object.keys(privacyDictionary)[i]][j].objectID);
	           		if(privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations == null || privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length ==0 )
	           		data.setCell(rowIndex,3,0);	
	           		else
	           		{

	           			//  data.setCell(rowIndex,3,privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length); // number of threats

	           			 var average_sensitivity =0;
		           			 for(var k=0; k<privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length; k++)
		           			 {
		           			 	average_sensitivity = average_sensitivity + parseFloat(privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations[k].sensitivity);
		           			 }
		           			 average_sensitivity = average_sensitivity/privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length;
		           			 //alert(privacyDictionary[Object.keys(privacyDictionary)[i]][j].misconfigurations.length);
		           			 data.setCell(rowIndex,3,average_sensitivity);	
		           	    	
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
	   // width : 400,
	   // height: 500,
	    fontColor: 'black',
	    showScale: true});
        // $('#privacy_treemap').hide();
 
         google.visualization.events.addListener(treemap, 'select', function () {
    
	     var row = treemap.getSelection()[0].row;
         // user clicked individual album
	      if(data.getValue(row, 1)!='Album Privacy Groups' && data.getValue(row, 1)!=null )
	      {

			albumid = data.getValue(row, 5).toString(); /// ALBUM ID TO POPULATE THE ALBUM DETAILS SCREEN 
			$('#overview_album_activity').hide();
			$('#overview_policy_stats').hide();
			$('#overview_privacy_threats').hide();
			$('#privacy_treemap').hide();

			$('#treemap_sensitivity').button().hide();
			$('#treemap_threats').button().hide();

			$('#album_details').fadeIn('fast');
			$('#album_details_back').fadeIn('fast');
			
			for(var i = 0; i < albumObjects.length; i++)	{
				
				if(albumObjects[i].objectID == albumid)	{	
					
					console.log(albumObjects[i]);
					
					$("#album_details_title").empty();
					$("#album_details_title").append(''+albumObjects[i].name+'');
					
					$("#album_details_specs").empty();
					$("#album_details_specs").append('Album Details:</p>');
					
					FB.api('/me/albums', function(response) {

							var picURL = "http://graph.facebook.com/" + response.data[i].id + "?fields=picture";
							console.log(response.data[i].id)
							FB.api(picURL, function(response) {
								console.log(response);
								$("#album_details_specs").append('<img src='+response.picture.data.url+'></br>');
								$("#album_details_specs").append('Album Title: '+albumObjects[i].name+'</br>');
								$("#album_details_specs").append('Photo Count: '+albumObjects[i].photoCount+'</br>');
								$("#album_details_specs").append('Album Threats: '+albumObjects[i].misconfigurations.length+'');
							})
					})
					
					$("#album_details_most_commented").empty();
					$("#album_details_most_commented").append('<img src='+albumObjects[i].mostCommented.src_big+' width = 100 height = 80></br>');
					$("#album_details_most_commented").append('Most Commented('+albumObjects[i].mostCommented.comment_info.comment_count+')');
					
					$("#album_details_most_liked").empty();
					$("#album_details_most_liked").append('<img src='+albumObjects[i].mostLiked.src_big+' width = 100 height = 80></br>');
					$("#album_details_most_liked").append('Most Liked('+albumObjects[i].mostLiked.like_info.like_count+')');
					
					$("#album_details_similar_albums").empty();
					$("#album_details_similar_albums").append('Similar Albums:</p>');
					
					for(var x = 0; x < albumObjects[i].similarAlbums.length; x++)		{
						
						for(var y = 0; y < albumObjects.length; y++)		{
							
								if(albumObjects[i].similarAlbums[x] == albumObjects[y].name)		{
									
									if(albumObjects[y].mostLiked != null)		{
										
										var source = $("#albumdetailssimilar-template").html();
										var template = Handlebars.compile(source);
										$("#album_details_similar_albums").append('<br>');
										$("#album_details_similar_albums").append(template(albumObjects[y]));
										
										//$("#album_details_similar_albums").append('<div><img src='+albumObjects[y].mostLiked.src_big+' width = 100 height = 80>'+albumObjects[y].name+'</div></p>');
										
									}	else	{
										
										console.log('null src');									
									}
								
							}	else	{
							
								console.log('not found');
							}
							
						}
					
				}
				
					$("#album_details_detected_threats").empty();
					$("#album_details_detected_threats").append('Detected Threats:</p>');
					
					for(var k = 0; k < albumObjects[i].misconfigurations.length; k++)	{
						
						$('#template_details_threats_public').css('background-color', 'white');
						
						$("#album_details_detected_threats").append(''+albumObjects[i].misconfigurations[k].description+'</br>').click(function(event)	{
							
							//add logic here to highlight the specific threats
							$('#template_details_threats_public').css('background-color', 'red');
		
						});;
						
					}
					
					$("#album_details_visible_to").empty();
					$("#album_details_visible_to").append('Visible To:</p>');
					
					for(var l = 0; l < albumObjects[i].allowedNames.length; l++)	{
						
						//var source = $("#albumdetailsthreat_public-template").html();
						//var template = Handlebars.compile(source);
						//$("#album_details_visible_to").append(template(albumObjects[i]));
						
						$("#album_details_visible_to").append(''+albumObjects[i].allowedNames[l]+'  ');
						
					}

					$("#album_details_hidden_from").empty();
					$("#album_details_hidden_from").append('Hidden From:</p>');
					
					for(var m = 0; m < albumObjects[i].deniedNames.length; m++)	{
						
						$("#album_details_hidden_from").append(''+albumObjects[i].deniedNames[m]+'  ');
						
					}
					
				}
				
			}

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