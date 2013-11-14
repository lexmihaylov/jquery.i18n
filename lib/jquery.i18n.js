(function ($) {
    /**
    * 
    */
    $.i18n = {
        languages: {},
        current_locale: null,
        body: null,
        
        init: function (locale) {
            this.body = $(document);
            this.set_locale(locale);
            
        },
        
        set_locale: function (locale) {
            if(!this.languages[locale]) {
                throw "undefined dictionary '" + locale + "'";
            }
            if(this.current_locale !== locale) {
                this.current_locale = locale;
                
                this.load_locales();
            }
        },
        
        get: function(locale) {
            locale = locale.split('.');
            var text = this.languages[this.current_locale];
            for (i = 0; i < locale.length; i++) {
                text = text[locale[i]];
            }
                
            if(typeof text !== 'string') {
                throw "'" + locale + "' is not a string.";
            }
            
            return text;
        },
        
        reload: function (context) {
            this.load_locales(context);
        },
        
        load_locales: function (context) {            
            var self = this;
            
            if(!context) {
                context = this.body;
            }
            
            context.find('*[i18n]').each(function () {
                var $this = $(this),
                    attribute = $this.attr('i18n-attr'),
                    locale = $this.attr('i18n'),
                    i = 0;
                
                var text = self.get(locale);
                
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