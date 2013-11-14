/**
* jQuery library used for implementing client-side translations
*
* @author Alexander Mihaylov
* @license http://www.opensource.org/licenses/mit-license.php MIT-LICENSE
*
* @requires jQuery
* 
*/

(function ($) {
    /**
    * Provides static methods and attributes for implementing client-side translations
    */
    $.i18n = {
        
        /**
        * Dictionary holder
        * @var Object
        */
        languages: {},
        
        /**
        * Holds the current locale string
        * @var String
        */
        current_locale: null,
        
        /**
        * Holds a jQuery representation of the document ($(document))
        * @var Object
        */
        body: null,
        
        /**
        * Initializes the library and sets an initial dictionary from the dictionary object
        * @param String locale 
        */
        init: function (locale) {
            if(!locale) {
                throw "No initial locale was set.";
            }
            
            this.body = $(document);
            this.set_locale(locale);  
        },
        
        /**
        * Changes the current language and retranslates the page
        * @param String locale
        */
        set_locale: function (locale) {
            if(!this.languages[locale]) {
                throw "undefined dictionary '" + locale + "'";
            }
            if(this.current_locale !== locale) {
                this.current_locale = locale;
                
                this.load_locales();
            }
        },
        
        /**
        * Returns a translation represented by a string
        * @param String translation
        * @return String
        */
        get: function(translation) {
            translation = translation.split('.');
            var text = this.languages[this.current_locale];
            for (i = 0; i < translation.length; i++) {
                text = text[translation[i]];
            }
                
            if(typeof text !== 'string') {
                throw "'" + translation + "' is not a string.";
            }
            
            return text;
        },
         
        /** 
        * Alias of load_locales
        * @param Object context
        */
        reload: function (context) {
            this.load_locales(context);
        },
        
        /**
        * Retranslates the page
        * @param context (Optional)
        */
        load_locales: function (context) {            
            var self = this;
            
            if(!context) {
                context = this.body;
            }
            
            context.find('*[i18n]').each(function () {
                var $this = $(this),
                    attribute = $this.attr('i18n-attr'),
                    translation = $this.attr('i18n'),
                    i = 0;
                
                var text = self.get(translation);
                
                if(typeof attribute !== 'undefined') {
                    $this.attr(attribute, text);
                } else {
                    switch ($this.prop('tagName').toLowerCase()){
                        case 'textarea':
                        case 'input':
                            $this.val(text);
                            break;
                        default:
                            $this.html(text);
                            break;
                    }
                }
            });
        }
    };
})(jQuery);