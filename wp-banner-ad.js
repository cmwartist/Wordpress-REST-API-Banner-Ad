/*
BMS Banner Ad
Author: Chris Wong

Connects to Wordpress REST API to get the specified banner ad. Gets the custom post type "bms_banner_ad" and grabs custom field values from the specified post to populate the banner image and its link.
To use, create an empty div with the class "banner-ad-container" and this script will place the ad there yo.
Requires jQuery!
*/

//set the banner to display by pasting the wordpress slug for that banner here. 
var banner_slug = "bms-banner-ad"; 

$(document).ready(function(){
    getBannerAd();
});

console.log('Banner ad script loaded.');

function getBannerAd(){
    console.log('Banner to load: ' + banner_slug);
    console.log('Attempting to get banner ad.');
    
    //Connect to wordpress REST API and get posts of type "bms_banner_ad"
    $.get("https://cbdplususa.com/wp-json/wp/v2/bms_banner_ad?_embed", function (posts) {
        console.log("Connected to CBD Plus Wordpress API.");
        
        //Loop through each json post object
        $.each(posts, function(index, post){
            console.log("Searching for " + banner_slug + "...");
            
            //When specified slug is found, grab ACF values and build ad inside the ad container.
            if(post['slug'] == banner_slug){
                var banner_image = (post["acf"]["banner_image"]);
                var banner_link = (post["acf"]["banner_link"]);
                var banner_width = (post["acf"]["banner_width"]);
                var banner_height = (post["acf"]["banner_height"]);
                console.log(banner_slug + " found.");
                console.log("Banner image url: " + banner_image);
                console.log("Banner link url: " + banner_link);
                console.log("Banner width: " + banner_width);
                console.log("Banner height: " + banner_height);
                console.log("Build banner ad.");
                
                //populate image, link and style inside banner container
                $(".banner-ad-container").append("<a href='" + banner_link + "'><img class='bms-banner-image' src='" + banner_image + "'></a>");
                $(".bms-banner-image").css({"width":banner_width,"height":banner_height,"background-image":"url("+banner_image+")","margin":"20px 0","background-size":"contain","background-repeat":"no-repeat"});
            } 
        });
    });
}