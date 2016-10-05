var imageZoom = false;
var image = "";
var layout = 2;
var guide = "";
var isFullScreen = false;
var jsaw;
var leftDis = [167, 4, -160, -320, -480];
var background, border,
	imageCount,
	main_bgType, main_bgColor, main_bgImage,
	play_bgType, play_bgColor, play_bgImage;

function buildPuzzle(){
	console.log("code.js - buildPuzzle top");
	$(".container").css("background-image","none");
	$(".headerBackground").hide();
	$("#headerImg").hide();
	$("#instructions").hide();
	$("#guide").hide();
	$("#category-panel").hide();	
	$("#puzzel").show();

	console.log("code.js - buildPuzzle border = " + border);
	
	if(border == "none"){ //sets the border
		var borderToggle = false;
	} else {
		var borderToggle = true;
	}

	console.log("code.js - buildPuzzle before jsaw");

	jsaw = new jigsaw.Jigsaw({
		//defaultImage: "puzzle/images/puzzle/scottwills_meercats.jpg",
		defaultImage: image,
		spread: .98,
		piecesNumberTmpl: "%d Pieces",
		shuffled:true,
		rotatePieces:false,
		border:borderToggle,
		borderSize: 1.5,
		offsetTop: 60,
		borderColor: border
	});
	
	if (jigsaw.GET["image"]) { jsaw.set_image(jigsaw.GET["image"]); }

	jsaw.set_parts(layout*layout); //sets the number of puzzle pieces
	
	console.log("code.js - buildPuzzle before advanceMode = " + advanceMode);
	
	if (advanceMode){
		$("body").css("background-color",background); //sets the background color
	}
	else {
		if(play_bgType == 'image')
			$('body').css({
				'background-color': 'initial',
				'background-image': 'url(' + play_bgImage + ')'
			});
		else
			$('body').css({
				'background-color': play_bgColor,
				'background-image': 'initial'
			});
	}

	console.log("code.js - buildPuzzle before jsaw.eventBus.on...");
	
	jsaw.eventBus.on(jigsaw.Events.RENDER_FINISH, function() {
		jsaw.eventBus.emit(jigsaw.Events.SHOW_PREVIEW);
		if(guide == "on")
			$('#image-preview').addClass('grayscale');
		else
			$('#image-preview').removeClass('grayscale');
	});

	console.log("code.js - buildPuzzle before hideButtons");
	hideButtons();
	console.log("code.js - buildPuzzle after hideButtons");	
}

function hideButtons(){ //hides unwanted buttons
	//$("#clock").hide();
	//$("#SHOW_EDGE").hide();
	//$("#SHOW_MIDDLE").hide();
	//$("#SHOW_ALL").hide();
	$("#JIGSAW_SHUFFLE").hide();
	//$("#SHOW_PREVIEW").hide();
	$("#SHOW_HELP").hide();
	$(".styled-select").hide();
	$("#create").hide();

}

function gameInit(){
	$(".imageText").hide();
	$("#layout").hide();
	$("#background").hide();
	$("#border").hide();
	$("#guide").hide();
	$("#outline").hide();
	$("#puzzel").hide();

	
	console.log ("code.js - gameInit after .hides");
	//******************************************************************** IMAGES
	$('.imageBox').css('height', (Math.ceil(imageCount/5)*158) + 'px');
	$(".imageBox").on("vmousedown", function(){
		closeAll();
	});

	$('img[id^="image_btn"]').on("vmousedown", function(){
		console.log ("code.js - gameInit, image_btn function - top");		
/*
		var index = $(this).attr('data-index'),
			i = index - 1;
		if (imageZoom)
			closeAll();
		else {
			$(this).css("z-index", 50);
			$('.imageBox').show();
			$(this).animate({
				top: (7 - 165 * (Math.floor(i/5))) + 'px',
				left: leftDis[i % 5] + 'px',
				width: '455px',
				height: '455px',
				zIndex: '11'
			}, function(){$('.selectBtn').show()});
			imageZoom = true;
			$("#instructions").css("font-size","45px");
			$("#instructions").html("Click image to choose a different picture");
		}
*/	
		image = $(this).attr('src');
		console.log ("code.js - gameInit, image_btn function, before images.hide");		
//		$("#images").hide();
		//closeAll();
//		$("#instructions").html("Choose your puzzle size");
//		$("#layout").show();
	});

	$("#selectImage").on("vmousedown", function(){
//		$("#images").hide();
//		closeAll();
//		$("#instructions").html("Choose your puzzle size");
//		$("#layout").show();
	});
	console.log ("code.js - gameInit bottom");
}

function closeAll(){
	console.log ("code.js - closeAll top");		
//	$(".imageBox").hide();
//	$(".selectBtn").hide();
//	$("#instructions").html("choose your puzzle");

	$('img[id^="image_btn"]')
		.css("z-index", 1)
		.animate({
			top:"0px",
			left:"0px",
			width:"140px",
			height:"140px",
			zIndex: "1"
		});

	imageZoom = false;
	console.log ("code.js - closeAll bottom");	
}

function showPuzzleSelect () {
	$('#settings-panel').hide();
	$('#category-panel').show();	
}
function chooseGame(index){
//	$('#category-panel').hide();
	console.log ("code.js - chooseGame top, index = " + index);
	
	var game = items[index];
	imageCount = game.imageCount;
	main_bgType = game.main_bgType;
	main_bgColor = game.main_bgColor;
	main_bgImage = game.main_bgImage;
	play_bgType = game.play_bgType;
	play_bgColor = game.play_bgColor;
	play_bgImage = game.play_bgImage;

	if(main_bgType == 'image'){
		$('body').css({'background-image': 'url(' + main_bgImage + ')'})
	}
	else {
		$('body').css({'background-color': main_bgColor});
		$('.imageBox').css({'background-color': main_bgColor});
	}

	/*
	 for (var i=0; i<result.images.length; i++){
	 html += '<li class="btnImages"><img id="image_btn' + (i+1) + '" src="assets/' + (i+1) + '.png" data-index="' + (i+1) + '"></li>';
	 }
	 */
	
	var currentCategory = "categoryBtn" + index; 
	console.log ("code.js - chooseGame, selected button before = " + document.getElementById(currentCategory).classList);
	for (var i=0; i<3; i++)
		document.getElementById("categoryBtn" + i).classList.remove("active"); 

	document.getElementById("categoryBtn" + index).classList.add("active"); 
	console.log ("code.js - chooseGame, selected button after = " + document.getElementById(currentCategory).classList);	
	
	var listBox = $('#image-list');
	listBox.empty();

	for (var i=1; i<=imageCount; i++){
		$('<li class="btnImages"><img id="image_btn' + (i) + '" onclick="selectPuzzle(' + i + ', ' + imageCount + ')" src="assets/' + game.caption + '/' + (i) + '.png" data-index="' + (i) + '"></li>')
			.appendTo(listBox);	}

	document.getElementById("playPuzzleTitle").classList.remove("hide");
	document.getElementById("playPuzzleBtn").classList.remove("hide");;
	console.log ("code.js - chooseGame - before gameInit");
	gameInit();
	console.log ("code.js - chooseGame - after gameInit");	
}

function selectPuzzle (index, imageCount) {
	console.log("code.js - selectPuzzle, index = " + index + ", imageCount = " + imageCount);
	var selectedImageId = "image_btn" + index;
	console.log("   selectedImageId = " + selectedImageId);
	console.log("   image_btn(index).classList = " + document.getElementById(selectedImageId).classList);
	for (var i=1; i<imageCount; i++)
	{
		console.log("code.js - selectPuzzle, top of for loop, id = image_btn" +i);
		document.getElementById("image_btn"+i).classList.remove("active");		
		console.log("code.js - selectPuzzle, bottom of for loop");		
	}
	console.log("code.js - selectPuzzle, after for loop");			
	document.getElementById("image_btn"+index).classList.add("active");	
}


// JavaScript Document
$(document).ready(function() {
	
    // button version of layout choice button
	$('button[id^="layoutBtn"]').on("vmousedown", function(){
//		layout = $(this).attr('data-layout');
		setPuzzleSize($(this).attr('data-layout'));
		
	});
	
	//******************************************************************** LAYOUT	
//	$('li[id^="layoutBtn"]').on("vmousedown", function(){
//		layout = $(this).attr('data-layout');
//		$("#layout").hide();
//		if(advanceMode){
//			$("#instructions").html("Choose your background color");
//			$("#background").show();
//		}
//		else {
//			$("#instructions").html("Choose border color");
//			$("#outline").show();
//		}
//	});
	
	//******************************************************************** BACKGROUND
	
	$("#backgroundBtn1").on("vmousedown", function(){
		background = "Red";
//		$("#background").hide();
//		$("#instructions").html("Choose border color");
//		$("#outline").show();
	});
	
	$("#backgroundBtn2").on("vmousedown", function(){
		background = "Blue";
//		$("#background").hide();
//		$("#instructions").html("Choose border color");
//		$("#outline").show();
	});
	
	$("#backgroundBtn3").on("vmousedown", function(){
		background = "Yellow";
//		$("#background").hide();
//		$("#instructions").html("Choose border color");
//		$("#outline").show();
	});
	
	$("#backgroundBtn4").on("vmousedown", function(){
		background = "White";
//		$("#background").hide();
//		$("#instructions").html("Choose border color");
//		$("#outline").show();
	});
	
	$("#backgroundBtn5").on("vmousedown", function(){
		background = "Grey";
//		$("#background").hide();
//		$("#instructions").html("Choose border color");
//		$("#outline").show();
	});
	
	$("#backgroundBtn6").on("vmousedown", function(){
		background = "Black";
//		$("#background").hide();
//		$("#instructions").html("Choose border color");
//		$("#outline").show();
	});
	
	//******************************************************************** BORDER
	$("#outlineBtn1").on("vmousedown", function(){
		setBorder(1, "purple");
//		border = "purple";
//		$("#outline").hide();
//		$("#instructions").html("Choose guide");
//		$("#guide").show();
	});
	
	$("#outlineBtn2").on("vmousedown", function(){
		setBorder(2, "orange");
//		border = "orange";
//		$("#outline").hide();
//		$("#instructions").html("Choose guide");
//		$("#guide").show();
	});
	
	$("#outlineBtn3").on("vmousedown", function(){
		setBorder(3, "green");
//		border = "green";
//		$("#outline").hide();
//		$("#instructions").html("Choose guide");
//		$("#guide").show();
	});
	
	$("#outlineBtn4").on("vmousedown", function(){
		setBorder(4, "black");	
//		border = "black";
//		$("#outline").hide();
//		$("#instructions").html("Choose guide");
//		$("#guide").show();
	});
	
	$("#outlineBtn5").on("vmousedown", function(){
		setBorder(5, "white");	
//		border = "white";
//		$("#outline").hide();
//		$("#instructions").html("Choose guide");
//		$("#guide").show();
	});
	
	$("#outlineBtn6").on("vmousedown", function(){
		setBorder(6, "none");
//		border = "none";
//		$("#outline").hide();
//		$("#instructions").html("Choose guide");
//		$("#guide").show();
	});
	
	//******************************************************************** GUIDE
	
	$("#guideBtn1").on("vmousedown", function(){
		setGuide("on");
//		guide = "on";
//		buildPuzzle(); 
	});
	
	$("#guideBtn2").on("vmousedown", function(){
		setGuide("off");
//		guide = "off";		
//		buildPuzzle();
	});
	
	function setPuzzleSize(size) 
	{
//		console.log("code.js, setPuzzleSize top");		
		layout = size;
		
		for (var i=1; i<7; i++)
		{
			var btnId = "layoutBtn" + i;
			document.getElementById(btnId).className = "btn settings";		
		}	
		
		var currentButtonId = "layoutBtn"+(size-1);
		document.getElementById(currentButtonId).className = "btn settings active";							
		
		console.log("code.js, setPuzzleSize - layout = " + layout);				
	}
	

	function setBorder(index, color) 
	{
//		console.log("code.js, setBorder top");
		border = color;

		console.log("code.js, setBorder, at start - outlineBtn1 class = " + document.getElementById("outlineBtn1").classList);
		for (var i=1; i<7; i++)
		{
			var btnId = "outlineBtn" + i;
			document.getElementById(btnId).className = "btn settings";		
		}
			
		var currentButtonId = "outlineBtn"+index;
		document.getElementById(currentButtonId).className = "btn settings active";						

		console.log("code.js, setPuzzleSize - border = " + border);	
	}
	
	function setGuide(position) 
	{
//		console.log("code.js, setGuide top");		
		guide = position;

		$("#guideBtn1").removeClass("active");		
		$("#guideBtn2").removeClass("active");

		if (guide == "on")
			$("#guideBtn1").addClass("active");						
		else
			$("#guideBtn2").addClass("active");						

		console.log("code.js, setPuzzleSize - guide = " + guide);	
	}
		
	//******************************************************************** PUZZLE
	
	$("#SHOW_PREVIEW").on("vmousedown", function(){
		//$("#image-preview").toggle();
		//var previewLeft = -(canvas.width / 2) + "px";
		//$("#image-preview").css("margin-left", previewLeft);
		jsaw.eventBus.emit(jigsaw.Events.SHOW_PREVIEW);
	});
	
	$("#NEW_PUZZLE").on("vmousedown", function(){
		location.reload();
	});
	
	$("#FULLSCREEN").on("vmousedown", function(){
		fullscreen();
	});
	
	function fullscreen(){
		if(!isFullScreen){
			console.log("entering fullscreen");
			isFullScreen = true;
			var i = document.getElementById("fullscreenOP");
			if (i.requestFullscreen) {
				i.requestFullscreen();
			} else if (i.webkitRequestFullscreen) {
				i.webkitRequestFullscreen();
			} else if (i.mozRequestFullScreen) {
				i.mozRequestFullScreen();
			} else if (i.msRequestFullscreen) {
				i.msRequestFullscreen();
			}
			$(".container").css("background-color", background);
			$("body").css("background-color", background);
			//$(".btnPuzzle-container").css("width","835px");

			$("#FULLSCREEN").html("Exit Fullscreen");
		} else {
			console.log("exiting fullscreen");
			isFullScreen = false;
			//var i = document.getElementById("fullscreenOP");

			var i = document;
			if (i.cancelFullScreen) {
				i.cancelFullScreen();
			} else if (i.webkitCancelFullScreen) {
				i.webkitCancelFullScreen();
			} else if (i.mozCancelFullScreen) {
				i.mozCancelFullScreen();
			} else if (i.msCancelFullScreen) {
				i.msCancelFullScreen();
			}
		//	$(".btnPuzzle-container").css("width","835px");
		//	$("element.style").css("width","800px");
			$("#FULLSCREEN").html("Fullscreen");
		}
	}

	var changeHandler = function(){  //detects if browser is in fullscreen
		if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
			isFullScreen = true;
			$(".container").css("background-color", background);
			$("body").css("background-color", background);
	//		$(".btnPuzzle-container").css("width","835px");             
      	}                                                                      
      	else {
			isFullScreen = false;
	//	  	$("element.style").css("width","800px");
		  	$("#FULLSCREEN").html("Fullscreen");               
      	}                                                                      
   	};

   	document.addEventListener("fullscreenchange", changeHandler, false);      
   	document.addEventListener("webkitfullscreenchange", changeHandler, false);
   	document.addEventListener("mozfullscreenchange", changeHandler, false);

	var pan = $('#cat-btns');
	for (var i=0; i<items.length; i++){
		var btnId = "categoryBtn" + i;
//		$('<button class="btn cat-btn" onclick="chooseGame(' + i + ')">' + items[i].caption + '</button>').appendTo(pan);
		$('<button type="button" class="btn settings" id="' + btnId + '" onclick="chooseGame(' + i + ')">' + items[i].caption + '</button>').appendTo(pan);
	}
});
