# WP-REST-API-Single-Page-Application-Test

 INTRODUCTION
--------------
Testing out the WP API, using JavaScript, jQuery (for now), and not much else. Not sure if this needs a detailed readme, but I need the practice. My goal is to build an acceptable, single-page blog app utilizing the WP REST API. I copied the database from my old DIY blog (http://www.heavilyedited.com/blog/) to use as test content.

The initial upload is most definitely flawed. The whole point of this is to track my progress.

 SERVER-SIDE STUFF
-------------------
I installed WordPress in a sub-directory (/wp/) of my demo site (http://www.annegraydesign.com/wp-blog/), imported & migrated the blog database, configured WP and installed the WordPress REST API (Version 2) plugin. I created a basic theme that contains the following elements:

1. index.php - contains calls to header.php & footer.php, and includes a target element (<section>).
2. header.php
3. footer.php
4. functions.php
5. style.css
6. scripts.js
