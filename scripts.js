/***************************
         INITIALIZE
 ***************************/
 
/* SETUP */
    var root = '/wp-blog/';
    var initial = true;
    var homeTitle = 'Recent Posts';
    var postGetLink = 'http://www.annegraydesign.com/wp-blog/wp-json/wp/v2/posts/';
    var contentTarget = document.getElementById('contentTarget');

/* Google Analytics */
function gaInit() {
    $.getScript('//www.google-analytics.com/analytics.js');
    window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
    ga('create', 'UA-71808277-1', 'auto');
    return ga;
}
function setAnalytics(path, title) {
  var track= {page: path, title: title};
  ga = window.ga || gaInit();
  ga('set', track);
  ga('send', 'pageview');
}

/* INITIAL PAGE LOAD */
function getContent(){
    if (location.pathname == root) {
        getPreviewContent();
    }
    else {
        var path = location.pathname.split('/');
        var slug = path[2];
        getPostContent(slug);
    }
}

/***************************
      STATES/BEHAVIORS
 ***************************/
 
/* EVENT LISTENER: Home Link (in header) */
function addHomeListener() {
    document.getElementById('home').addEventListener('click', function(e) {
        e.preventDefault();
        if (location.pathname != root) {
            getPreviewContent();
        }
    });
}

/* EVENT LISTENER: View Post Links */
function addNavListener() {
    $('.post-preview a').on('click', function(e){
        e.preventDefault();
        var slug = $(this).attr('href');
        getPostContent(slug);
    });
}

/* STATE CHANGE: BACK/FORWARD BUTTONS */
window.onpopstate = function(e) {
    var newState = e.state;
    loadContent(newState.content);
    setAnalytics(newState.path, newState.title);
    document.title = newState.title;
    addNavListener();
}

/* LOAD CONTENT */
function loadContent(content) {
        if (initial) {
            contentTarget.innerHTML = content;
            checkLoaded();
        }
        else {
            fadeOut();
            var timeout = setTimeout(function() {
                contentTarget.innerHTML = content;
                checkLoaded();
            }, 500);
            $(document).scrollTop(0);
        }
}

function fadeIn() {
    $('.content').addClass('fadein');
}

function fadeOut() {
    $('.content').removeClass('fadein');
}

function checkLoaded() {
    var imageCheck = 0;
    var image = document.getElementsByTagName("img");
    for (var i=0; i < image.length; i++) {
    image[i].onload = function() {
    imageCheck ++;
    if ( imageCheck == image.length) {
        fadeIn();
    }
    }
    }
}
/***************************
           VIEWS
 ***************************/
 
/* VIEW: POST PREVIEWS */
function getPreviewContent() {
    var request = new XMLHttpRequest();
    request.open('GET', postGetLink + '?_embed&per_page=9', true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        var count = data.length;
        var posts = '';
        var post = '';
        // loop through posts
        for (var i = 0; i < count; i++) {
            post = data[i];
            postContent = '<article class="post-preview" id="' + post.id + '">';
            postContent += '<a href="' + post.slug + '"><img src="' + post._embedded['https:\/\/api.w.org\/featuredmedia'][0]['media_details']['sizes']['medium']['source_url'] + '"/></a>';
            postContent += '<a href="' + post.slug + '"><h2>' + post.title.rendered + '</h2></a>';
            postContent += '</article>';
            posts += postContent;
        }
        var previewContent = '<h1>Recent Posts</h1><div class="preview-box">' + posts + '</div>';
        loadContent(previewContent);
        setAnalytics(root, homeTitle);
        if (!initial) {
            window.history.pushState({content: previewContent, title: homeTitle, path: root}, null, root);
            document.title = homeTitle;
        }
        else {
            window.history.replaceState({content: previewContent, title: homeTitle, path: root}, null, root);
            initial = false;
        }
        addNavListener();
        
    } else {
        // We reached our target server, but it returned an error
        contentTarget.innerHTML = ('404!');
    }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        contentTarget.innerHTML = ('error');
    };

    request.send();
}

/* VIEW: SINGLE POST */
function getPostContent(slug) {
    var request = new XMLHttpRequest();
    var theLink = postGetLink + '?filter[name]=' + slug;
    request.open('GET', theLink, true);
    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        var post = data[0];
        var postContent = '';
        var postTitle = post.title.rendered;
        var postPath = root + post.slug + '/';
        
        postContent = '<article class="post" id="' + post.id + '">';
        postContent += '<h1>' + postTitle + '</h1>';
        postContent += post.content.rendered + '</article>';

        loadContent(postContent);
        setAnalytics(postPath, postTitle);
        if (!initial) {
            window.history.pushState({content: postContent, title: postTitle, path: postPath}, null, postPath);
            document.title = postTitle;
        }
        else {
            window.history.replaceState({content: postContent, title: postTitle, path: postPath }, null, postPath);
            initial = false;
        }
        
    } else {
        // We reached our target server, but it returned an error
        contentTarget.innerHTML = ('404!');
        }
    };

    request.onerror = function() {
    // There was a connection error of some sort
        contentTarget.innerHTML = ('error');
    };

    request.send();
}
    
getContent();
addHomeListener();