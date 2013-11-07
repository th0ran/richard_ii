<?php

$host = $_SERVER['HTTP_HOST'];

if ($host == 'richard2.ravewebmedia.com') {
	$output = file_get_contents('index-live.html');
	print $output;
} else {
	$output = file_get_contents('index-holding.html');
	print $output;
}