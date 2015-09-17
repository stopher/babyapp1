var Ads = (function() {

    var admobid = {};
    
    me = {};

    me.showBannerTop = function() {
        if(AdMob) AdMob.createBanner( admobid.banner );
    },
    me.showBannerBottom = function() {
        if(AdMob) AdMob.createBanner( {
            adId:admobid.banner, 
            position:AdMob.AD_POSITION.BOTTOM_CENTER, 
            autoShow:true} );
    },
    me.showInterstitial = function() {
        if(AdMob) AdMob.showInterstitial();
    },
    me.prepareInterstitial = function() {
         if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
    },
    me.init = function() {
    
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                banner: 'ca-app-pub-9885144648586728/4536230493',
                interstitial: 'ca-app-pub-9885144648586728/6012963690'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-9885144648586728/9106030899',
                interstitial: 'ca-app-pub-9885144648586728/1582764095'
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-9885144648586728/1443163295',
                interstitial: 'ca-app-pub-9885144648586728/2919896493'
            };
        }
    };
    return me;
}());