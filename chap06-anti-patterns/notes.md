# Learning JavaScript Design Patterns

## Chapter 6. Anti-Patterns

### What is an Anti-Pattern?

> is a bad design that is worthy of documenting. A lesson that has been learned

### Anti-patterns:

> * Describe a bad solution to a particular problem that resulted in a bad situation occurring.
> * Describe how to get out of said situation and how to go from there to a good solution.

### Anti-patterns in JavaScript

> * Polluting global namespace
> * Passing strings rather than functions to either `setTimeout` or `setInterval` as this triggers the use of `eval()` internally.
> * Modifying the `Object` class prototype
> * Using JavaScript in an inline form
> * Use `document.write` instead of `document.createElement`
