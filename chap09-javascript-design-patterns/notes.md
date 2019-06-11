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

### Flyweight Pattern

> The Flyweight pattern is a classical structural solution for optimizing code that is repetitive, slow and inefficiently shares data. It aims to minimize the use of memory in an application by sharing as much data as possible with related objects.

#### The two states of a Flyweight Pattern

##### Intrinsic

> Intrinsic information may be required by internal methods in our objects which they absolutely cannot function without.

##### Extrinsic

> Extrinsic information can however be removed and stored externally.

#### Types of Flyweight components

##### Flyweight

> defines an interface through which flyweights are able to receive and act on existing states.

##### Concrete Flyweight

> actually implements the Flyweight interface and stores intrinsic state. Concrete Flyweights need to be shareable and capable of manipulating state tha is extrinsic.

##### Flyweights Factory

> manages flyweight objects and creates them too. it makes sure that our flyweights are shared and manages them as a group of objects which can be queried if we require individual instances. If an object has been already created in the group it returns it, otherwise it adds a new object to the pool and returns it.
