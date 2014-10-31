var stopwatch = (function () {
    var selector = '',
        seconds = 0, minutes = 0, hours = 0, centiseconds = 0,
        t;

    function tick() {
        centiseconds++;
        if(centiseconds >= 100) {
            centiseconds = 0;
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }

        displayStopwatch();

        timer();
    }

    function timer() {
        t = setTimeout(tick, 10);
    }

    function displayStopwatch(){
        var currentTime = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
                      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
                      (seconds > 9 ? seconds : "0" + seconds) + ":" +
                      (centiseconds ? centiseconds : '00');
        selector.innerHtml = currentTime;
    }


    function start() {
        timer();
    }

    function stop() {
        clearTimeout(t);
    }

    function clear() {
        selector.textContent = '00:00:00:00';
        centiseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
    }

    return {
        init: function (sel) {
            selector = document.getElementById(sel);
        },
        start: start,
        stop: stop,
        clear: clear
    }
}());