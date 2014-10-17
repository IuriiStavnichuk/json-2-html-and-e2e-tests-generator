/* jQuery jqEasyCharCounter plugin
* Examples and documentation at: http://www.jqeasy.com/
* Version: 1.0 (05/07/2010)
* No license. Use it however you want. Just keep this notice included.
* Requires: jQuery v1.3+
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
(function($) {

    $.fn.extend({
        jqEasyCounter: function(givenOptions) {
            return this.each(function() {
                var $this = $(this),
                options = $.extend({
                    maxChars: 1000,
                    maxCharsWarning: 800,    
                    msgAppendMethod: 'insertAfter',
                    counterText: ' characters left.'
                }, givenOptions);

                if (options.maxChars <= 0) return;

                // create counter element
                var jqEasyCounterMsg = $("<div class=\"character-count-msg\">&nbsp;</div>");
                var jqEasyCounterMsgStyle = {       
                    'text-align': options.msgTextAlign,                    
                    'opacity': 0
                };
                jqEasyCounterMsg.css(jqEasyCounterMsgStyle);
                // append counter element to DOM
                jqEasyCounterMsg[options.msgAppendMethod]($this);

                // bind events to this element
                $this
				.bind('keydown keyup keypress', doCount)
				//.bind('focus paste', function() { setTimeout(doCount, 10); })
				.bind('focus paste cut', function() { setTimeout(doCount, 10); })
				.bind('blur', function() { jqEasyCounterMsg.stop().fadeTo('fast', 0); return false; });

                function doCount() {
                    var val = $this.val(),
					length = val.length

                    if (length >= options.maxChars) {
                        val = val.substring(0, options.maxChars);
                    };

                    if (length > options.maxChars) {
                        // keep scroll bar position
                        var originalScrollTopPosition = $this.scrollTop();
                        $this.val(val.substring(0, options.maxChars));
                        $this.scrollTop(originalScrollTopPosition);
                    };

                    if (length >= options.maxCharsWarning) {
                        jqEasyCounterMsg.css({ "color": options.msgWarningColor });
                    } else {
                        jqEasyCounterMsg.css({ "color": options.msgFontColor });
                    };

                    /*
                    jqEasyCounterMsg.html(options.maxChars - $this.val().length + ' characters left.');
                    */
                    jqEasyCounterMsg.html(options.maxChars - $this.val().length + options.counterText);
                    jqEasyCounterMsg.stop().fadeTo('fast', 1);
                };
            });
        }
    });

})(jQuery);





/* for use by server control AlertPayTextBoxWithCounter */

function countOnkeydownOnkeyupOnkeypressInternal(textboxelement, countmsgelement, customOptions) {

    var options = $.extend
    (
        {
            counterText: ' characters left.',
            messageRegularFontColor: '',
            messageWarningFontColor: '',
            maxCharactersWarning: 0,
            maxCharactersLimit: 1000
        }
        ,
        customOptions
    );

    var jqEasyCounterMsg = $(countmsgelement);

    var textarea = $(textboxelement);
    var textareaVal = textarea.val();
    var length = textareaVal.length;

    if (length >= options.maxCharactersLimit) {
        textareaVal = textareaVal.substring(0, options.maxCharactersLimit);
    };

    if (length > options.maxCharactersLimit) {
        // keep scroll bar position
        var originalScrollTopPosition = textarea.scrollTop();
        textarea.val(textareaVal.substring(0, options.maxCharactersLimit));
        textarea.scrollTop(originalScrollTopPosition);
    };

    if (options.maxCharactersWarning > 0 && options.messageWarningFontColor != '' && length >= options.maxCharactersWarning) {
        jqEasyCounterMsg.css({ "color": options.messageWarningFontColor });
    }
    else if (options.maxCharactersWarning > 0 && options.messageWarningFontColor != '' && length < options.maxCharactersWarning && options.messageRegularFontColor == '') {
        jqEasyCounterMsg.css({ "color": '' });
    }
    else if (options.messageRegularFontColor != '') {
        jqEasyCounterMsg.css({ "color": options.messageRegularFontColor });
    };

    jqEasyCounterMsg.html(options.maxCharactersLimit - textarea.val().length + options.counterText);
    jqEasyCounterMsg.stop().fadeTo('fast', 1);
};

function countOnfocusOnpasteOncutInternal(textboxelement, countmsgelement, customOptions) {
    setTimeout(
        function() {
            countOnkeydownOnkeyupOnkeypressInternal(textboxelement, countmsgelement, customOptions);
        }
        ,
        10
    );
}

function countOnblurInternal(countmsgelement) {
    var jqEasyCounterMsg = $(countmsgelement);
    jqEasyCounterMsg.stop().fadeTo('fast', 0);
    return false;
}
