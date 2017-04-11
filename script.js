$( document ).ready(function() {
  var showlist = $('#show-list');
  var newLi =  $('#show-list:first');
  // var showlist2 = $('#show-list2');
  // var newLi2 =  $('#show-list2:first');
  // var myTimer = setInterval(autoAdd, 2000);
  var myTimer2 = setInterval(getData, 200);
  var queue = [];
  var queue2 = [];
  var twitter_count = 0;
  // outoftwenty = $('#show-list >li:gt(10)');
  // outoftwenty2 = $('#show-list2 >li:gt(10)');
  // outoftwenty2.addClass("hide");
  // outoftwenty.addClass("hide");
  //setTimeout());
  // function autoAdd(){
  //   var twitter_data_box = $('div.twitter-data-mongo').first();
  //   var twitter_data = twitter_data_box.children('.username').text();
  //   twitter_data += "<br>" + twitter_data_box.children('.screen_name').text();
  //   twitter_data += "<br>" + twitter_data_box.children('.text').text();
  //   twitter_data += "<br>" + twitter_data_box.children('.collected_time').text();
  //   twitter_data_box.remove();
  //   queue.push(twitter_data);
  //   queue2.push('auto');
  //   showlist2.prepend('<li>'+queue2[(queue2.length)-1]+' </li>');
  //   showlist.prepend('<li>'+queue[(queue.length)-1]+' </li>');
  //   var j = queue.shift();
  //   var j2 = queue2.shift();
  //   newLi =  $('#show-list >li:first');
  //   newLi2 =  $('#show-list2 >li:first');
  //
  //   setTimeout(function() {
  //   newLi.addClass("show");
  //   newLi2.addClass("show");
  // }, 100);
  //   outoftwenty = $('#show-list >li:gt(9)');
  //   outoftwenty.addClass("hide");
  //   outoftwenty2 = $('#show-list2 >li:gt(9)');
  //   outoftwenty2.addClass("hide");
  //   $('#show-list li.hide').remove()
  //   $('#show-list2 li.hide').remove()
  // }
  function getData() {
    if(twitter_count < 9) {
      $.get('./twitter-stream.php?count=' + twitter_count, function(data) {
        // console.log(data);
        data = JSON.parse(data);
        if(twitter_count < 9) {
          twitter_count++;
        }
        var twitter_data = data['username'];
        twitter_data += "<br>@" + data['screen_name'];
        twitter_data += "<br>" + data['text'];
        twitter_data += "<br>" + data['collected_time'];
        queue.push(twitter_data);
        showlist.prepend('<li>'+queue[(queue.length)-1]+' </li>');
        var j = queue.shift();
        newLi =  $('#show-list >li:first');

        setTimeout(function() {
          newLi.addClass("show");
        }, 100);
        outoftwenty = $('#show-list >li:gt(9)');
        outoftwenty.addClass("hide");
        $('#show-list li.hide').remove()
      });
    } else {
      $.get('./twitter-stream.php?count=' + twitter_count, function(data) {
        // console.log(data);
        data = JSON.parse(data);
        var twitter_data = data['username'];
        twitter_data += "<br>@" + data['screen_name'];
        twitter_data += "<br>" + data['text'];
        twitter_data += "<br>" + data['collected_time'];
        var newest = $('#show-list > li').first().text();
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
        console.log('hello');
        queue.push(twitter_data);
        showlist.prepend('<li>'+queue[(queue.length)-1]+' </li>');
        var j = queue.shift();
        newLi =  $('#show-list >li:first');

        setTimeout(function() {
          newLi.addClass("show");
        }, 100);
        outoftwenty = $('#show-list >li:gt(9)');
        outoftwenty.addClass("hide");
        $('#show-list li.hide').remove()
      });
    }
  }
});
