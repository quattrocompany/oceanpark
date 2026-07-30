(function() {
    
    var via = getQueryStringVia();
    
    if (via) {
        setCookie('via', via);
        console.log('setCookie');
    }

    via = getCookie('via');
    console.log(via);
    fillViaHiddenElement(via);

    function setCookie(key, value) {

        var expires="expires=0; ";
        if (window.navigator.userAgent.indexOf("MSIE ")) {
            expires = "";
        }

        document.cookie = key + "=" + value + "; " + expires + "path=/";
    }

    function getCookie(key) {
        var name = key + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    function getQueryStringVia() {

        var via = '';
        var queryString = location.search.substring(1).split('&');

        for(var i in queryString) {
            if (queryString[i].indexOf('via=') !== -1) {
                via = queryString[i].split('via=')[1];
            }
        }

        return via;
    }

    function fillViaHiddenElement(via) {
        var element = document.getElementById('hidden-via');
        if (element) {
            element.value = via;
        }
    }

}) ();
