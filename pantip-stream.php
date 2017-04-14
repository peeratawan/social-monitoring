<?php
  $m = new MongoClient();
  $db = $m->SocialMonitor;
  $collection = $db->pantip_display;
  $cursor = $collection->find();
  $cursor->next();
  for($i = 0; $i < (int)$_GET['count']; $i++) {
    $cursor->next();
  }
  echo json_encode($cursor->current());
?>
