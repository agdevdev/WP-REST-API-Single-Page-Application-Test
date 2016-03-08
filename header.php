<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title><?php is_front_page() ? bloginfo('description') : wp_title(''); ?> | <?php bloginfo('name'); ?></title>
<meta name="description" content="A single page app experiment featuring the WordPress REST API" />
<link rel="icon" href="http://www.annegraydesign.com/wp-blog/wp/wp-content/themes/agd/favicon.ico" type="image/x-icon" />

<!-- I never enqueue on personal projects -->
<link href="http://fonts.googleapis.com/css?family=Lato:400,700|Roboto+Slab:400,700" rel="stylesheet" type='text/css'>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
<link href="http://www.annegraydesign.com/wp-blog/wp/wp-content/themes/agd/style.css" rel="stylesheet">

<!-- Don't include in public uploads -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-71808277-1', 'auto');
  ga('send', 'pageview');
</script>
</head>
<body>
    
<!-- Header/Nav -->
<header>
  <div class="inner">
    <a href="http://www.annegraydesign.com/wp-blog/" class="home">Home</a>
    <a href="https://github.com/annegraydesign" target="_blank">View on GitHub <span class="icon">&#xf09b;</span></a>
  </div>
</header>