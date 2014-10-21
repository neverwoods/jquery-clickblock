# jQuery ClickBlock plugin

Simple jQuery 'plugin' package to make block elements clickable based on their first child anchor

### CHANGELOG

- 2.3.4    First GitHub & Bower release
- 2.3.2    Fixed bug where rel='external' wasn't reset on elements that arent originally external links.
- 2.3.1    Removed 'throw new Error' when element could not be found in DOM. This ensures backwards compatibility and enables
         clickblock do die silently like you would expect from a jQuery plugin.
- 2.3      When a modifier key is pressed (CTRL, CMD), open link in new Window (like the browser would normally do).
         **IMPORTANT NOTICE**: This uses jquery-externalLinks as an optional dependency.
- 2.2      Added extra check on empty href
- 2.1      Fixed it to work with jQuery 1.8.3.
- 2.0      Complete rewrite to native javascript class with optional jQuery plugin support.
         **IMPORTANT CHANGE**: option 'hoverclass' is deprecated in favor of 'hoverClass'.
- 1.2      Changed click logic to trigger the targets click event.
- 1.1      Added custom mouse enter and mouse leave events.
- 1.0      First release
