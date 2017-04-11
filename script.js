$( document ).ready(function() {
  var showlist = $('#show-list');
  var newLi =  $('#show-list:first');
  var showlist2 = $('#show-list2');
  var newLi2 =  $('#show-list2:first');
  var myTimer = setInterval(autoAdd, 2000);
  var myTimer2 = setInterval(getData, 1000);
  var queue = [];
  var queue2 = [];
  var twitter_count = 0;
  setStart();
  function setStart(){
    for(var i = 0;i<10;i++){
      queue.push(i);
      queue2.push(i);
    }
    for(var i =0;i<10;i++){
      showlist2.prepend('<li class="show">'+queue2[i]+' </li>');
      showlist.prepend('<li class="show">'+queue[i]+' </li>');
    }
  }
  outoftwenty = $('#show-list >li:gt(10)');
  outoftwenty2 = $('#show-list2 >li:gt(10)');
  outoftwenty2.addClass("hide");
  outoftwenty.addClass("hide");
  //setTimeout());
  function autoAdd(){
    var twitter_data_box = $('div.twitter-data-mongo').first();
    var twitter_data = twitter_data_box.children('.username').text();
    twitter_data += "<br>" + twitter_data_box.children('.screen_name').text();
    twitter_data += "<br>" + twitter_data_box.children('.text').text();
    twitter_data += "<br>" + twitter_data_box.children('.collected_time').text();
    twitter_data_box.remove();
    queue.push(twitter_data);
    queue2.push('auto');
    showlist2.prepend('<li>'+queue2[(queue2.length)-1]+' </li>');
    showlist.prepend('<li>'+queue[(queue.length)-1]+' </li>');
    var j = queue.shift();
    var j2 = queue2.shift();
    newLi =  $('#show-list >li:first');
    newLi2 =  $('#show-list2 >li:first');

    setTimeout(function() {
    newLi.addClass("show");
    newLi2.addClass("show");
  }, 100);
    outoftwenty = $('#show-list >li:gt(9)');
    outoftwenty.addClass("hide");
    outoftwenty2 = $('#show-list2 >li:gt(9)');
    outoftwenty2.addClass("hide");
    $('#show-list li.hide').remove()
    $('#show-list2 li.hide').remove()
  }
  var a;
  function getData() {
    $.get('./twitter-stream.php?count=' + twitter_count, function(data) {
      console.log(data);
      twitter_count++;
    });
  }
});
