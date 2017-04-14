<?php
  $m = new MongoClient();
  $db = $m->SocialMonitor;
  $collection = $db->twitter_display;
  $cursor = $collection->find()->sort(array('collected_year'=>1, 'collected_month'=>1, 'collected_day'=>1, 'collected_time'=>1));
  $cursor->next();
  for($i = 0; $i < (int)$_GET['count']; $i++) {
    $cursor->next();
  }
  echo json_encode($cursor->current());
?>
