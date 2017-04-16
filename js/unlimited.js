// jshint -W117

var q = 0;
var parties = 0;
var segment = 0;

var isReady = false;

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


var ruReady = new Howl({
  src: ['audio/ready.ogg', 'audio/ready.mp3'],
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
      noLongerReady();
    }
  }
});


ruReady.play();

function noLongerReady() {
  isReady = false;
  $('.fullscreen-video, .video-overlay').removeClass('visible');
  isReady = false;
  setTimeout(function(){ 
    if (isReady === false) {
      ruReady.play();
    }
  }, spriteLength);
}

$('#YesReady').click(function() {
  if (q < 1) {
    q = 1;
    playSegment();
    //eq();
  } else {
    q++;
    //eq();
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
  $('.fullscreen-video, .video-overlay').addClass('visible');
  song.play(segment);
}

function party() {
  var p = Math.floor((Math.random() * 75) + 1);
  p++;
  p = p.toString();
  //console.log(p);
  sound.play(p);
  sendGA('PARTY', p,  q+' parties queued');
}

$('.sidebar-button').click(function() {
  $(this).toggleClass('is-active');
  $('.sidebar').toggleClass('visible');
});























/*


function eq() {
  $('.eq li').hide();
  if (q > 1)  { $('.eq li[data-eq="10"]').show(); }
  if (q > 2)  { $('.eq li[data-eq="9"]').show(); }
  if (q > 3)  { $('.eq li[data-eq="8"]').show(); }
  if (q > 4)  { $('.eq li[data-eq="7"]').show(); }
  if (q > 5)  { $('.eq li[data-eq="6"]').show(); }
  if (q > 6)  { $('.eq li[data-eq="5"]').show(); }
  if (q > 7)  { $('.eq li[data-eq="4"]').show(); }
  if (q > 8)  { $('.eq li[data-eq="3"]').show(); }
  if (q > 9)  { $('.eq li[data-eq="2"]').show(); }
  if (q > 10) { $('.eq li[data-eq="1"]').show(); }

  if (q > 12) { 
    $('.eq li.max-party').show();
    venga.volume(0.4);
  } else {
    venga.volume(0);
  }
}

function addParty() {
  parties++;
  if (parties > 9) { 
    $('#Count').show();
    $('#Count').text(parties);
  }
}
*/

/*

var sound = new Howl({
  src: ['audio/party.ogg', 'audio/party.mp3'],
  volume: 1,
  sprite: {
    '1': [0, 396],
    '2': [380, 430],
    '3': [832, 409],
    '4': [1244, 401],
    '5': [2097, 395],
    '6': [2518, 1693],
    '7': [4239, 393],
    '8': [4643, 441],
    '9': [5099, 442],
    '10': [5532, 437],
    '11': [5935, 424],
    '12': [6403, 464],
    '13': [6851, 452],
    '14': [7356, 441],
    '15': [7776, 457],
    '16': [8228, 430],
    '17': [8672, 389],
    '18': [9060, 441],
    '19': [9060, 441],
    '20': [9504, 436],
    '21': [9949, 2826],
    '22': [12981, 957],
    '23': [13948, 434],
    '24': [13948, 434],
    '25': [14368, 455],
    '26': [14805, 420],
    '27': [15211, 423],
    '28': [15623, 434],
    '29': [16046, 434],
    '30': [16491, 1824],
    '31': [18778, 416],
    '32': [19180, 445],
    '33': [19610, 448],
    '34': [20051, 430],
    '35': [20474, 405],
    '36': [20864, 466],
    '37': [21328, 516],
    '38': [21955, 446],
    '39': [22396, 432],
    '40': [22821, 418],
    '41': [23241, 439],
    '42': [23671, 404],
    '43': [24077, 427],
    '44': [24520, 512],
    '45': [25675, 421],
    '46': [26102, 420],
    '47': [26536, 411],
    '48': [26966, 414],
    '49': [27400, 848],
    '50': [29200, 1449],
    '51': [31188, 403],
    '52': [31500, 444],
    '53': [32005, 421],
    '54': [32545, 414],
    '55': [32920, 380],
    '56': [33387, 900],
    '57': [34912, 1658],
    '58': [37049, 407],
    '59': [37460, 400],
    '60': [37908, 400],
    '61': [38341, 403],
    '62': [38772, 420],
    '63': [39206, 401],
    '64': [40390, 450],
    '65': [40875, 399],
    '66': [41297, 404],
    '67': [41697, 410],
    '68': [42120, 400],
    '69': [42490, 400],
    '70': [43000, 400],
    '71': [43436, 409],
    '72': [43854, 403],
    '73': [44272, 398],
    '74': [44640, 2330],
    '75': [46908, 2100],
    '76': [45109, 1783]
  },
  onend: function() {
    addParty();
    q--;
    if (q > 0) {
      party();
      eq();
    }
  }
});

var venga = new Howl({
  src: ['audio/venga.ogg', 'audio/venga.mp3'],
  volume: 0,
  autoplay: true,
  loop:true
});

$('#Party').click(function() {
  if (q < 1) {
    q = 1;
    party();
    eq();
  } else {
    q++;
    eq();
  }
});

*/



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
    $('#AddToHomeScreen').html('<span class="label">bookmark idiots.win</span><span class="indent">Control+D</span>');
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









// 1. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      //start: 37,
      loop: 1,
      controls: 0,
      showinfo: 0,
      autohide: 1,
      modestbranding: 1,
      enablejsapi: 1,
      playlist: 'yx5UutLeMr8'
    },
    videoId: 'yx5UutLeMr8',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 3. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  player.mute();
}

var done = false;
function onPlayerStateChange(event) {

}
function stopVideo() {
  player.stopVideo();
}
