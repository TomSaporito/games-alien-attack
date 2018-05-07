    /**
 * @constant {array} pfx
 * */
const pfx = ["webkit", "moz", "MS", "o", ""];//prefixes for browser support for animation events
const trans = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'otransitionend', 'MSTransitionEnd'];
/**
 * @func addPrefixedEvent
 * @desc add animation event listeners with proper vendor prefixes
 *
 * @param element    {DOM Element}     -   |required| the DOM element to attach/remove listener to/from;
 * @param type       {String}          -   |required| the event type to listen for;
 * @param callback   {Function}        -   |required| the handler function for when the event happens;
 * */
function addPrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {//loop through prefixes

        element.addEventListener(type, callback, false);//add that event listener to the specified element
    }
}

function addPrefixTrans(element, callback){
    for (let i = 0; i < trans.length; i++){
        element.addEventListener(trans[i], callback);
    }
}

function removePrefixTrans(element, callback){
    for (let i = 0; i < trans.length; i++){
        element.removeEventListener(trans[i], callback);
    }
}

/**
 *@func removePrefixedEvent
 * @desc utility for removing event listener to animation;
 *
 * @param element    {DOM Element}     -   |required| the DOM element to attach/remove listener to/from;
 * @param type       {String}          -   |required| the event type to listen for;
 * @param callback   {Function}        -   |required| the handler function for when the event happens;
 */
function removePrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {//loop through prefixes
        element.removeEventListener(type, callback);//remove that event listener from the specified element
    }
}

export {
    removePrefixTrans,
    removePrefixedEvent,
    addPrefixedEvent,
    addPrefixTrans
}