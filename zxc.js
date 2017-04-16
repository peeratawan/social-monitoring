$( document ).ready(function() {
  // alert('hello');
  var showlist = $('.show-list.twitter');
  var newLi =  $('.show-list.twitter > li:first');
  var showlist2 = $('.show-list.pantip');
  var newLi2 =  $('.show-list.pantip > li:first');
  // var myTimer = setInterval(autoAdd, 2000);
  var timePantip = setInterval(getPantipData, 500);
  var timerTwitter = setInterval(getTwitterData, 500);
  var queue = [];
  var queue2 = [];
  var twitter_count = 0, pantip_count = 0;
  function getTwitterData() {
    $.get('./twitter-stream.php?count=' + twitter_count, function(data) {
      // console.log(data);
      data = JSON.parse(data);
      if(data === null) {
        return;
      }
      var twitter_data = data['username'];
      twitter_data += " (@" + data['screen_name'] + ')';
      twitter_data += "<br>" + data['text'];
      twitter_data += "<br><br>" + data['collected_time'];
      if(twitter_count < 9) {
        twitter_count++;
      } else {
        var newest = $('.show-list.twitter li').first().text();
        var compare = twitter_data;
        while(compare.search('<br>') !== -1) {
          compare = compare.replace('<br>', '');
        }
        while(compare.search(' ') !== -1) {
          compare = compare.replace(' ', '');
        }
        while(newest.search(' ') !== -1) {
          newest = newest.replace(' ', '');
        }
        if(compare === newest || twitter_data.length <= 5 ){
          return;
        }
      }
      var link = 'http://www.twitter.com/' + data['user_id'] + '/status/' + data['id_str'];
      queue.push(twitter_data);
      showlist.prepend('<li>' + '<a href="' + link + '" target="_blank">' + queue[(queue.length)-1] +'</a></li>');
      // showlist.prepend('<li>'+queue[(queue.length)-1]+'</li>');
      var j = queue.shift();
      newLi =  $('.show-list.twitter li:first');

      setTimeout(function() {
        newLi.addClass("show");
      }, 100);
      outoftwenty = $('.show-list.twitter li:gt(9)');
      outoftwenty.addClass("hide");
      $('.show-list.twitter li.hide').remove()
    });
  }
  function getPantipData() {
    $.get('./pantip-stream.php?count=' + pantip_count, function(data) {
      // console.log(data);
      data = JSON.parse(data);
      if(data === null) {
        return;
      }
      var pantip_data = 'Status : ' + data['status']
      pantip_data += "<br>" + data['username'];
      pantip_data += "<br>Topic : " + data['title'];
      pantip_data += "<br><br>" + data['text'];
      pantip_data += "<br><br>" + data['collected_time'];
      if(pantip_count < 9) {
        pantip_count++;
      } else {
        var newest = $('.show-list.pantip li').first().text();
        var compare = pantip_data;
        while(compare.search('<br>') !== -1) {
          compare = compare.replace('<br>', '');
        }
        while(compare.search(' ') !== -1) {
          compare = compare.replace(' ', '');
        }
        while(newest.search(' ') !== -1) {
          newest = newest.replace(' ', '');
        }
        if(compare === newest || pantip_data.length <= 5 ){
          return;
        }
      }
      var link = data['link'];
      queue.push(pantip_data);
      showlist2.prepend('<li>' + '<a href="' + link + '" target="_blank">' + queue[(queue.length)-1]+'</a></li>');
      // showlist2.prepend('<li>'+queue[(queue.length)-1]+'</li>');
      var j = queue.shift();
      newLi2 =  $('.show-list.pantip li:first');

      setTimeout(function() {
        newLi2.addClass("show");
      }, 100);
      outoftwenty = $('.show-list.pantip li:gt(9)');
      outoftwenty.addClass("hide");
      $('.show-list.pantip li.hide').remove()
    });
  }
});
