<!DOCTYPE HTML >
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>MIKE social monitoring</title>
		<link rel="shortcut icon" href="favicon.ico">
		<meta name="title" content="POP" />
		<meta name="description" content="social monitoring" />
		<meta name="keywords" content="Social Monitoring,Social Analysis" />

<!--linkre-->
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="style.css">

	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	</head>

	<body>
	<div class="top-banner">
		<!-- <div class = "row"> -->
			<div class="navbar-header" style="height: 100px">
				<img id="logo" src="images/logo1.png" />
				<!-- <div class="banner-detail" style="margin-left: 300px;margin-top:-40px;color: #666666;font-size: 32px"> -->
				<div class="banner-detail">
					<h1>Social monitoring<br/></h1>
				</div>
			</div>

			<div class = "pull-right">
				<form class="navbar-form navbar-left" role="search">
					<div class="form-group">
					<input type="text" class="form-control" placeholder="Search">
					</div>
					<button type="submit" class="btn btn-default">Submit</button>
				</form>
			</div>
	</div>

	<!-- <div class = "row"> -->
	<div class="container-fluid" style="margin-top: 20px;">
		<div class="row">
			<div class="col-sm-9">
				<div class="row">
					<div class="col-sm-6" style="border-right: thin solid gray;height: 100%">
						<div id="feedbox" class="well well-sm " style = "background-color: #47b2ef;">
							<h4>Twitter</h4>
						</div>
						<!-- <h1>eieieiei</h1> -->
						<div>
						 	<ul id="show-list" class="show-list"></ul>
						</div>
						<!-- <h1>eieieiei</h1> -->
					</div>
					<div class="col-sm-6" style="border-left: thin solid gray;">
						<div id="feedbox" class="well well-sm" style= "background-color: #8a12a8;">
							<h4>Pantip</h4>
						</div>
						<!-- <h1>eiei</h1>-->
						<!-- <div> -->
							<!-- <h1>eiei</h1> -->
							<ul id="show-list2" class="show-list"></ul>

						<!-- </div> -->
						<!-- <h1>eieieiei</h1> -->
					</div>
				</div>
			</div>

			<div class="col-sm-3">
				 <div class="panel panel-primary box-tc-related">
					<div class="panel-heading">Related TagCloud</div>
					<div class="panel-body">
						<div id="tc-related" class="tc"></div>
					</div>
				</div>
				<div class="panel panel-warning">
					<div class="panel-heading">TagHits TagCloud (Daily)</div>
					<div class="panel-body">
						<div id="tc-hashtag-d" class="tc hashtag"></div>
					</div>
				</div>
				<div class="panel panel-warning">
					<div class="panel-heading">TagHits TagCloud (Weekly)</div>
					<div class="panel-body">
						<div id="tc-hashtag-w"  class="tc hashtag"></div>
					</div>
				</div>
				<div class="panel panel-success">
					<div class="panel-heading">TopSearch TagCloud</div>
					<div class="panel-body">
						<div id="tc-search" class="tc search"></div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript">
		var showlist = $('#show-list');
		var newLi =  $('#show-list:first');
		var showlist2 = $('#show-list2');
		var newLi2 =  $('#show-list2:first');
		var myTimer = setInterval(autoAdd, 2000);
		var queue = [];
		var queue2 = [];
		setStart();
		function setStart(){
			for(var i = 0;i<20;i++){
				queue.push(i);
				queue2.push(i);
			}
			for(var i =0;i<20;i++){
				showlist2.prepend('<li class="show">'+queue2[i]+' </li>');
				showlist.prepend('<li class="show">'+queue[i]+' </li>');
			}
		}
		outoftwenty = $('#show-list >li:gt(20)');
		outoftwenty2 = $('#show-list2 >li:gt(20)');
		outoftwenty2.addClass("hide");
		outoftwenty.addClass("hide");
		//setTimeout());
		function autoAdd(){
			var twitter_data_box = $('div.twitter-data-mongo').first();
			var twitter_data = twitter_data_box.children('.username').text();
			twitter_data += "<br>" + twitter_data_box.children('.screen_name').text();
			twitter_data += "<br>" + twitter_data_box.children('.text').text();
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
			outoftwenty = $('#show-list >li:gt(19)');
			outoftwenty.addClass("hide");
			outoftwenty2 = $('#show-list2 >li:gt(19)');
			outoftwenty2.addClass("hide");
			$('#show-list li.hide').remove()
			$('#show-list2 li.hide').remove()

		}
		</script>
	</div>
	<?php
		$m = new MongoClient();
		$db = $m->SocialMonitor;
		$collection = $db->twitter;
		$cursor = $collection->find();
		foreach ($cursor as $document) {
			echo "<div class=\"twitter-data-mongo\">";
			echo "<p class=\"username\">" . $document["username"] . "</p>";
			echo "<p class=\"screen_name\">@" . $document["screen_name"] . "</p>";
			echo "<p class=\"text\">" . $document["text"] . "</p>";
			echo "</div>";
		}
	?>
</body>
</html>
