<?php 
header('Content-Type: text/html; charset=utf-8');
$query = htmlspecialchars($_GET["q"]);
$query = str_replace(array('ø', 'æ', 'å', ' '), array('oe', 'ae', 'aa', '%20'), $query);
//$json = file_get_contents('http://ishoj.dk:8983/solr/ishoj/select?q=' . $query .'*&wt=json&rows=13&indent=true');
//$json = file_get_contents('http://udv.ishoj.bellcom.dk:9200/ishoj/_search?q=' . $query . '*');

$data = array(
	'query' => array(
	    'match' => array("_all" => $query)
	)
    );
$data_string = json_encode($data);                                                                                   
drupal_set_message('here');
$ch = curl_init('http://udv.ishoj.bellcom.dk:9200/ishoj/_search');                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);                                                                                                                   
 
$json = curl_exec($ch);

echo $json;
?>