# Chapter 8 self-notes

## Design Pattern Categorization

### Creational

| Creational | Based on the concept of creating an object |
|------------|--------------------------------------------|
| **Class** |
| *Factory Method* | Makes an instance of several derived classes based on interfaced data or events|
| **Object** |
| *Abstract factory* | Creates an instance of several families of classes without detailing concrete classes |
| *Builder* | Separates object construction from its representation; always creates the same type of object |
| *Prototype* | A fully initialized instance used for copying or cloning |
| *Singleton* | A class with only a single instance with global access points |

### Structural

| Structural | Based on the idea of building blocks of objects |
|------------|-------------------------------------------------|
| **Class** ||
| *Adapter* | Matches interfaces of different classes so classes can work together despite incompatible interfaces |
| **Object** ||
| *Adapter* | Matches interfaces of different classes so classes can work together despite incompatible interfaces |
| *Bridge* | Separates an object's interface from its implementation so the two can vary independently |
| *Composite* | A structure of simple and composite objects that makes the total object more than just the sum of its parts |
| *Decorator* | Dynamically adds alternate processing to objects |
| *Facade* | A single class that hides the complexity of an entire subsystem |
| *Flyweight* | A fine-grained instance used for efficient sharing of information that is contained elsewhere |
| *Proxy* | A placeholder object representing the true object |

### Behavioral

| Behavioral | Based on the way objects play and work together |
|------------|-------------------------------------------------|
| **Class** ||
| *Interpreter* | A way to include language elements in an application to match the grammar of the intended language |
| *Template method* | Creates the shell of an algorithm in a method, then defers the exact steps to a subclass |
| **Object** ||
| *Chain of responsibility* | A way of passing a request between a chain of objects to find the object that can handle the request |
| *Command* | A way to separate the execution of a command from its invoker |
| *Iterator* | Sequentially accesses the elements of a collection without knowing the inner workings of the collection |
| *Mediator* | Defines simplified communication between classes to prevent a group of classes from referring explicity to each other |
| *Memento* | Captures an object's internal state to be able to restore it later |
| *Observer* | A way of notifying change to a number of classes to ensure consistency between the classes |
| *State* | Alters an object's behavior when its state changes |
| *Strategy* | Encapsulates an algorithm inside a class separating the selection from the implementation |
| *Visitor* | Adds a new operation to a class without changing the class |