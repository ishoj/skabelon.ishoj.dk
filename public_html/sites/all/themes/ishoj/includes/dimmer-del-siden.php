<?php


$output .= "<!-- DIMMER DEL SIDEN START -->";
$output .= "<div class=\"dimmer-delsiden hidden\">";

$output .= "<a class=\"breaking-close\" href=\"#\" title=\"Luk\"></a>";

  $output .= "<ul>";
    $output .= "<li class=\"sociale-medier\"><a class=\"sprite sprite-facebook\" href=\"https://www.facebook.com/sharer/sharer.php?u=" . $abs_url . "\" title=\"Del siden på Facebook\"><span><span class=\"screen-reader\">Del siden på Facebook</span></span></a></li>";
    $output .= "<li class=\"sociale-medier\"><a class=\"sprite sprite-twitter\" href=\"https://twitter.com/home?status=" . $title . " " . $abs_url . "\" title=\"Del siden på Twitter\"><span><span class=\"screen-reader\">Del siden på Twitter</span></span></a></li>";
    $output .= "<li class=\"sociale-medier\"><a class=\"sprite sprite-googleplus\" href=\"https://plus.google.com/share?url=" . $abs_url . "\" title=\"Del siden på Google+\"><span><span class=\"screen-reader\">Del siden på Google+</span></span></a></li>";
    $output .= "<li class=\"sociale-medier\"><a class=\"sprite sprite-linkedin\" href=\"https://www.linkedin.com/shareArticle?url=" . $abs_url . "&title=" . $title . "&summary=&source=&mini=true\" title=\"Del siden på LinkedIn\"><span><span class=\"screen-reader\">Del siden på LinkedIn</span></span></a></li>";          
    $output .= "<li class=\"sociale-medier\"><a class=\"sprite sprite-mail\" href=\"mailto:?subject=" . $title . " title=\"Send som e-mail\"><span><span class=\"screen-reader\">Send som e-mail</span></span></a></li>";          
    $output .= "<li class=\"sociale-medier\"><a class=\"sprite sprite-link\" href=\"#\" title=\"Del link\"><span><span class=\"screen-reader\">Del link</span></span></a></li>";          
  $output .= "</ul>";
  $output .= "<div class=\"link-url\">";
    $output .= "<textarea>" . $abs_url . "</textarea>";
  $output .= "</div>";
$output .= "</div>";
$output .= "<!-- DIMMER DEL SIDEN SLUT -->";


?>