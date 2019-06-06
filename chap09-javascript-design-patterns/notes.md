# Learning JavaScript Design Patterns

## Chapter 9. JavaScript Design Patterns

### Singleton Pattern

#### Applicability

> * There must be exactly one instance of a class, and it must be accessible to clients from a well-known access point.
> * When the sole instance should be extensible by sub-classing, and clients should be able to use an extended instance without modifying their code.

### Mediator Pattern

> It is an object that handles the workflow between many other objects, aggregating the responsibility of that workflow knowledge into a single object

### Command Pattern

> It facilitates the execution of commands between an Invoker and a Receiver by encapsulating the implementation details on a method instead of calling the instance's methods that may change in the future.

#### Abstract Class

> An Abstract Class provides an Interface but it doesn't have instances. It acts as a base class from which others are derived.

#### Concrete Class

> A Concrete Class is a derived class which implements the missing functionality of an Abstract class.

### Facade Pattern

> It hides the complexity of use of an API by providing an interface which is easier to use, hiding all the implementation details from the user.

### Factory Pattern

> When to use?
>
> * When creating objects or components is really complex
> * When we need to create different instances of objects
> * When working with a lot of small objects that share the same properties.
> * When composing objects with instances of other objects
