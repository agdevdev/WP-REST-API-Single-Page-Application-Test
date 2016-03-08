var is_root = location.pathname == "/wp-blog/";
var postGetLink = 'http://www.annegraydesign.com/wp-blog/wp-json/wp/v2/posts/';
var contentTarget = document.getElementById('contentTarget');

// Add event listener to nav links
function addNavListener() {
        $('.internal').on('click', function(e){
            e.preventDefault();
            var slug = $(this).attr('href');
            getPostContent(slug);
        });
}
// Format the date
function formatDate(date) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var formattedDate = months[m] + ' ' + d + ', ' + y;
        return formattedDate;    
}

// Load home page post previews
function getPreviewContent() {
    var request = new XMLHttpRequest();
    request.open('GET', postGetLink + '?_embed', true);

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
            postContent += '<a href="' + post.slug + '" class="internal"><img src="' + post._embedded['https:\/\/api.w.org\/featuredmedia'][0]['media_details']['sizes']['medium']['source_url'] + '"/></a>';
            postContent += '<a class="post-link" href="' + post.slug + '" class="internal"><h2>' + post.title.rendered+ '</h2></a>';
            postContent += '</article>';
            posts += postContent;
        }
        contentTarget.innerHTML = ('<h1>Recent Posts</h1><div class="preview-box">' + posts + '</div>');
        window.history.pushState(null, post.title, '/wp-blog/');
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

// Load post view
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

        postContent = '<article class="post" id="' + post.id + '">';
        postContent += '<h1>' + post.title.rendered+ '</h1>';
        postContent += post.content.rendered + '</article>';

        contentTarget.innerHTML = (postContent);
        window.history.replaceState(null, post.title, '/wp-blog/' + post.slug + '/');
        
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
    $(document).scrollTop(0);
}

$(document).ready(function() {
    window.onpopstate = function(e) {
        if (e.state == null) {
            getPreviewContent();
        }
        else {
            getPostContent(e.url);
        }
    }
    // if home, load blog feed
    if (is_root) {
        // Load post previews
        getPreviewContent();
    }
    // if not home, get slug/id and load that post
    else {
        var path = location.pathname.split('/');
        var slug = path[2];
        getPostContent(slug);
    }
});