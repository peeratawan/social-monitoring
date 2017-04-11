<?php
  $m = new MongoClient();
  $db = $m->SocialMonitor;
  $collection = $db->twitter_display;
  $cursor = $collection->find();
  $cursor->next();
  for($i = 0; $i < $_GET['count']; $i++) {
    $cursor->next();
  }
  echo json_encode($cursor->current());
?>
