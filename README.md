### Main decisions
1. Use a html5 form polyfill instead of importing a form validation library.
2. Use plain JavaScript instead of jQuery.
3. Show validation error messages not only on submit but after the field has been blurred if it is invalid.
4. Redesign the form CSS a little and make sure it is responsive.
5. Use webpack so that I can use CommonJS/SASS easily.
6. Use aria attributes such as aria-hidden and aria-describedby where appropriate.

[View the form](http://alex.holachek.com/projects/challenge-form/)

### Didn't get to:
1. Browser testing
2. Testing in general
3. Fixing the Flash-of-Unstyled-Content issue  
