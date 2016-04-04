function photoC(node) {
    var rootCtnr;
    if (typeof node == 'string') {
        rootCtnr = document.querySelector(node);
    } else if (node instanceof Element) {
        rootCtnr = node;
    } else {
        throw new TypeError('Illegal argument type.');
    }
    var original = document.querySelector('.photo-original')
        , controls = document.querySelectorAll('.toggle-control li')
        , photo = document.querySelector('.photo')
        , separator = document.querySelector('.separator')
        , container = document.getElementById('container-1')
        , widthDiv = container.clientWidth - original.offsetWidth + original.offsetWidth
        , separatorMoving = false;

    container.addEventListener('mousemove', handler);
    separator.addEventListener('mousedown', function () {
        separatorMoving = true;
    });
    document.addEventListener('mouseup', function () {
        separatorMoving = false;
    })
    function handler(e) {
        if (separatorMoving) {
            var divCoord = container.getBoundingClientRect()
                , divLeft = divCoord.left + container.clientLeft
                , x = e.clientX - divLeft + original.offsetWidth / 2 - original.offsetWidth / 2
                , y = e.clientX - divLeft + separator.offsetWidth / 2 - separator.offsetWidth / 2; //Fix it
            original.style.width = ((x < 0) ? 0 : (x > widthDiv) ? widthDiv : x) + 'px';
            separator.style.left = ((y < 0) ? 0 : (y > widthDiv) ? widthDiv : y) + 'px'; //fix it
        }
    }
    for (var i = 0; i < controls.length; i++) {
        controls[i].innerHTML = controls[i].dataset.filter;
        clickControl(controls[i]);
    }
    function toggleFilter(control) {
        for (var i = 0; i < controls.length; i++) {
            controls[i].classList.remove('active');
            photo.classList.remove(controls[i].dataset.filter);
        }
        control.classList.add('active');
        if (photo) {
            photo.classList.add(control.dataset.filter);
        }
    }
    function clickControl(control) {
        control.addEventListener('click', function () {
            toggleFilter(control);
        });
    }
    var defaultFilter = document.querySelector('li.moon');
    toggleFilter(defaultFilter);
}
photoC('i');