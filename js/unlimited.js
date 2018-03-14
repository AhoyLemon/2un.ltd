// jshint -W117

var q = 0;
var parties = 0;
var segment = 0;
var isReady = false;
var recentMobileVideos = [];

function sendGA(c, a, l, v) {
 if (v) {
    ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l, eventValue:v });
    console.log('CATEGORY: '+c+', ACTION:'+a+', LABEL:'+l+', VALUE:'+v);
  } else if (l) {
    ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l });
    console.log('CATEGORY: '+c+', ACTION:'+a+', LABEL:'+l);
  } else {
    ga('send', 'event', { eventCategory: c, eventAction: a });
    console.log('CATEGORY: '+c+', ACTION:'+a);
  }
}

function changeMobileVideo() {
  if ($(window).width() < 701) {
    var r = Math.floor(Math.random() * 25) + 1;
    if (recentMobileVideos.indexOf(r) != -1) {
      changeMobileVideo();
    } else {
      recentMobileVideos.unshift(r);
      $('.mobile-background').css('background-image','url(img/dance'+r+'.gif)');
      recentMobileVideos.length = 3;
    }
  }
}

changeMobileVideo();


var ruReady = new Howl({
  src: ['audio/ready.ogg', 'audio/ready.mp3'],
  volume: 1
});

var byLemon = new Howl({
  src: ['audio/bylemon.mp3'],
  volume: 1
});



var spriteNumber = 1;
var spriteStart = 0;
var spriteLength = 1500;
var sprites = {
  '1': [0, spriteLength]
};
while (spriteStart < 106000) {
  spriteNumber++;
  spriteStart = spriteStart + spriteLength;
  var s = spriteNumber.toString();
  sprites[s] = [spriteStart,spriteLength];
}

console.log(sprites);


var song = new Howl({
  src: ['audio/song.ogg', 'audio/song.mp3'],
  volume: 1,
  sprite: sprites,
  onend: function() {
    //addParty();
    q--;
    if (q > 0) {
      playSegment();
      // eq();
    } else {
      parties++;
      noLongerReady();
      if (parties == 4) {
        $('#Banner').addClass('visible');
        byLemon.play();
      }
    }
  }
});

$('#Banner .close').click(function() {
  $('#Banner').removeClass('visible');
})


ruReady.play();

function noLongerReady() {
  changeMobileVideo();
  isReady = false;
  $('.fullscreen-video, .video-overlay, .mobile-background').removeClass('visible');
  $('[ready-status]').attr('ready-status', 'no');
  isReady = false;
  setTimeout(function(){ 
    if (isReady === false) {
      //ruReady.play();
    }
  }, spriteLength);

}

$('#YesReady').click(function() {
  if (q < 1) {
    q = 1;
    playSegment();
  } else {
    q++;
  }
});



$('#NotReady').click(function() {
  q = 0;
  song.stop();
  noLongerReady();
});

function playSegment() {
  segment++;
  isReady = true;
  if (segment >= spriteNumber) { segment = 1; }
  segment = segment.toString();
  $('.fullscreen-video, .video-overlay, .mobile-background').addClass('visible');
  $('[ready-status]').attr('ready-status', 'yes');
  song.play(segment);
}

$('.sidebar-button').click(function() {
  $(this).toggleClass('is-active');
  $('.sidebar').toggleClass('visible');
});

$('#HomescreenLink').click(function() {
  $('#HomescreenHolder').show();
});

$('#CloseHomeScreenHelp').click(function() {
  $('#HomescreenHolder').hide();
});


// ADD TO HOME SCREEN

function addToHomeScreen(device,browser) {
  if (device == "android") {
    $('#HomescreenLink').text('add to home screen');
    $('#HomescreenLink, #HomescreenHolder').addClass('android').addClass(browser);
  } else if (device == "ios") {
    $('#HomescreenLink').text('add to home screen');
    $('#HomescreenLink, #HomescreenHolder').addClass('ios safari');
  } else if (browser == "edge" || browser == "ie") {  
    $('#HomescreenLink').text('pin to start');
    $('#HomescreenLink, #HomescreenHolder').addClass('windows edge');
  } else if (browser == "opera") {
    $('#HomescreenLink').text('add to favorites');
    $('#HomescreenLink, #HomescreenHolder').addClass('windows opera');
  } else if (browser == "chrome") {
    $('#HomescreenLink').text('add to desktop');
    $('#HomescreenLink, #HomescreenHolder').addClass('desktop-chrome');
  } else if (browser == "firefox") {
    $('#AddToHomeScreen').html('<span class="label">bookmark 2un.ltd</span><span class="indent">Control+D</span>');
  } else {
    $('#AddToHomeScreen').remove();
  }
}

$(document).ready(function() {

  var ua = navigator.userAgent.toLowerCase();
  console.log(ua);
  device = "";
  browser = "";

  if (ua.indexOf("android") > -1) {
    device = "android";
    if (ua.indexOf("firefox") > -1) {
      // Android Firefox
      browser="firefox";
    } else if (ua.indexOf("opr") > -1) {
      // Android Opera
      browser="opera";
    } else if (ua.indexOf("chrome") > -1) {
      // Android Chrome
      browser="chrome";
    }
  } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) {
    device = "ios";
  } else if (ua.indexOf('windows') > -1) {
    device = "windows";
    if (ua.indexOf("edge") > -1) {
      browser = "edge";
    } else if (ua.indexOf("trident") > -1) {
      browser = "ie";
    } else if (ua.indexOf('firefox') > -1) {
      browser = "firefox";
    } else if (ua.indexOf('opr') > -1) {
      browser = "opera";
    } else if (ua.indexOf('chrome') > -1) {
      browser = "chrome";
    }
  } else if (ua.indexOf('firefox') > -1) {
    browser = "firefox";
  } else if (ua.indexOf('chrome') > -1) {
    device = "unknown";
    browser = "chrome";
  }
  console.log('device: '+device+'. browser:'+browser);
  addToHomeScreen(device,browser);
});
