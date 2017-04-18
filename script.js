$( document ).ready(function() {
  // alert('hello');
  var max_twitter = 17;
  var max_pantip = 10;
  var dict = {'topic': 'ตั้งกระทู้', 'comment' : 'ความคิดเห็น', 'reply' : 'ความคิดเห็นย่อย'};
  var showlist = $('.show-list.twitter');
  var newLi =  $('.show-list.twitter > li:first');
  var showlist2 = $('.show-list.pantip');
  var newLi2 =  $('.show-list.pantip > li:first');
  var timerPantip = setInterval(getPantipData, 500);
  var timerTwitter = setInterval(getTwitterData, 500);
  var timerIframeTwitter = setInterval(refreshTwitterWC, 60000);
  var timerIframePantip = setInterval(refreshPantipWC, 60000);
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
      var link = 'http://www.twitter.com/' + data['user_id'] + '/status/' + data['id_str'];
      var twitter_data = '<a href="' + link + '" target="_blank">' +  "<div style=\"float: left;\"><img class=\"profile_pic\" src=\"images/twitter.png\"></div>";
      twitter_data += "<div style=\"display: block; margin-left: 70px;\"><b>" + data['username'] + "</b>";
      twitter_data += " <em class=\"screen_name\">@" + data['screen_name'] + '</em> · ' + data['collected_time'].substring(0,5);
      twitter_data += "<br>" + data['text'];
      twitter_data += '</div></a>';
      var cursor = twitter_data.indexOf("@") + 1;
      var end = false;
      var link = twitter_data.indexOf('https://', cursor);
      var hash = twitter_data.indexOf('#', cursor);
      while(link !== -1 || hash !== -1) {
        if(link !== -1 && link < hash) {
          cursor = link;
        } else if(hash !== -1 && hash < link) {
          cursor = hash;
        } else {
          cursor = (link > hash) ? link : hash;
        }
        var space = twitter_data.indexOf(' ', cursor + 1);
        if(space === -1) {
          space = twitter_data.length - '</div></a>'.length;
          end = true;
        }
        var orange = "<em class=\"link\">" + twitter_data.substring(cursor, space) +"</em>";
        if(cursor == link) {
          orange = '<br>' + orange;
        }
        var skip = cursor + orange.length;
        twitter_data = twitter_data.substring(0,cursor) + orange + twitter_data.substring(space);
        cursor = skip + 1;
        link = twitter_data.indexOf('https://', cursor);
        hash = twitter_data.indexOf('#', cursor);
      }
      console.log(data['text'].length);
      if(twitter_count < max_twitter - 1) {
        twitter_count++;
      } else {
        var newest = $('.show-list.twitter li').first().html();
        var compare = twitter_data;
        // console.log(newest + '\n' + compare);
        if(compare === newest || twitter_data.length <= 5 ){
          return;
        }
      }
      queue.push(twitter_data);
      showlist.prepend('<li>' + queue[(queue.length)-1] +'</li>');
      // showlist.prepend('<li>'+queue[(queue.length)-1]+'</li>');
      var j = queue.shift();
      newLi =  $('.show-list.twitter li:first');

      setTimeout(function() {
        newLi.addClass("show");
      }, 50);
      outoftwenty = $('.show-list.twitter li:gt(' + (max_twitter - 1) + ')');
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
      var link = data['link'];
      var pantip_data = '<a href="' + link + '" target="_blank">'
      pantip_data += "<em class=\"topic-name\">" + data['title'] + "</em>";
      pantip_data += "<br><em class=\"comment\">" + dict[data['status']] + "</em>";
      pantip_data += "<br><br><em class=\"pantip-text\">" + data['text'] + "</em>";
      pantip_data += "<br><em class=\"time-user\">" + data['username'];
      pantip_data += " · " + data['post_hour'] + ':' + data['post_minute'] + "</em>";
      pantip_data += '</a>'
      if(pantip_count < max_pantip - 1) {
        pantip_count++;
      } else {
        var tmp = $('ul.tmp');
        var newest = $('.show-list.pantip li').first().html();
        var compare = pantip_data;
        tmp.prepend('<li>' + compare+ '</li>');
        compare = $('ul.tmp li').first().html();
        if(compare === newest || pantip_data.length <= 5 ){
          return;
        }
        // console.log(newest + '\n' + compare);
      }
      queue.push(pantip_data);
      showlist2.prepend('<li class="theme-' + data['theme'] + '">' + queue[(queue.length)-1]+ '</li>');
      // showlist2.prepend('<li>'+queue[(queue.length)-1]+'</li>');
      var j = queue.shift();
      newLi2 =  $('.show-list.pantip li:first');

      setTimeout(function() {
        newLi2.addClass("show");
      }, 50);
      outoftwenty = $('.show-list.pantip li:gt(' + (max_pantip - 1) +')');
      outoftwenty.addClass("hide");
      $('.show-list.pantip li.hide').remove()
    });
  }
  function refreshTwitterWC() {
    $('#twitter-wc').attr('src', $('#twitter-wc').attr('src'));
  }
  function refreshPantipWC() {
    $('#pantip-wc').attr('src', $('#pantip-wc').attr('src'));
  }
});
