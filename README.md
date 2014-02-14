inherit.js
==========

A tiny utility library for applying pseudo-classical inheritance using the combination two techniques; Constructor stealing and prorotype chaining.

The function accepts the following parameters:

    1) sublassName {string} - The name of the subclass
    2) superClass {funciton} - The constructor of the superclass
    3) ctor {function} - The constructor of the subclass we want to create
    4) prototype {object} - The prototype we want to assign to the constructor of the subclass

Example:

    var Vehicle = function(wheels){
      this.wheels = wheels;
    };
    
    Vehicle.prototype = {
      drive: function() {  }
    };


    // creating a sublass
    var ctor = function(doors){
       this.doors = doors;
    };
    var proto = {
      // some methods
      
      // overide the base methods
      drive: function(){
        // call the drive method of the superclass
        this._base_.drive();
        
        // add tasks specific to this class
      }
    }
    
    var Car = inheritJS('Car', Vehicle, ctor, prototype);
