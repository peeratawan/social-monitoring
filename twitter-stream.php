<?php
  $m = new MongoClient();
  $db = $m->SocialMonitor;
  $collection = $db->twitter;
  $cursor = $collection->find();
  $cursor->next();
  for($i = 0; $i < $_GET['count']; $i++) {
    $cursor->next();
  }
  echo json_encode($cursor->current());
  // echo '{"twitter": [';
  // foreach ($cursor as $document) {
  //   // echo "<div class=\"twitter-data-mongo\">";
  //   // echo "<p class=\"username\">" . $document["username"] . "</p>";
  //   // echo "<p class=\"screen_name\">@" . $document["screen_name"] . "</p>";
  //   // echo "<p class=\"text\">" . $document["text"] . "</p>";
  //   // echo "<p class=\"collected_time\">" . $document["collected_time"] . "</p>";
  //   // echo "</div>";
  //   echo json_encode($document) . ',';
  // }
  // echo ']}';
?>
