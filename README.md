jQuery i18n
===========
jQuery library used for implementing front-end translations

Inistallation
=============
Copy the script to your project and include it in your html after the jquery script tag

```
<script type="text/javascript" src="lib/jquery.js"></script>
<script type="text/javascript" src="jquery.i18n.min.js"></script>
```

Usage
=====
Organize your languages files and include them or inline them in your html

Example 'lang.js': 

``` JavaScript
$.i18n.languages = {
    'en': {
        'title': 'Example use of i18n.',
        'hello': 'Hello, ',
        'world': 'world!',
        'button': {
            'en': 'English',
            'bg': 'Bulgarian',
            'add_dynamic_content': 'Add dynamic content'
        },
        'enter_content': 'Enter text'
    },
    'bg': {
        'title': 'Пример за използване на i18n',
        'hello': 'Здравей, ',
        'world': 'свят!',
        'button': {
            'en': 'Английски',
            'bg': 'Български',
            'add_dynamic_content': 'Добави динамично съдържание'
        },
        'enter_content': 'Въведете текст'
    }
};
```

```
<script type="text/javascript" src="lang.js"></script>
```

After you have that done you can initialize the library

``` JavaScript
$.i18n.init('en');
```

To change the current language you can use the set_locale method

``` JavaScript
$.i18n.set_locale('en');
```

`$.i18n.current_locale` will retrieve the current language string

You can set the translation options in the html by using `i18n=""` and `i18n-attr=""` html attributes

- i18n="" will load the translation variable described in your language file
- i18n-attr="" will load the translated value in a selected by you html attribute

```
<button id="en" i18n="button.en"></button>
<button id="bg" i18n="button.bg"></button>
<input type="text" i18n="enter_content" i18n-attr="placeholder" />
```

Most of the time there is alot of content loaded by an Ajax call. To load the translations returned by the Ajax call you will need to run `$.i18n.reload(context)` in which context is the dom element that had been updated. If context is not provided the library will use $(document) object.

``` JavaScript
var div = $('<div/>');
div.append('<span i18n="enter_content"></span>: ');
div.append('<span><input type="text" i18n="enter_content" i18n-attr="placeholder" /></span>');
                    
$('body').append(div);
                    
$.i18n.reload(div); // reload with div as context
// $.i18n.reload(); // reload with document as context
```