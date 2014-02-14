
var inheritJS = (function(){
        /**
         * Will apply inheritance to the given ctor. The methods uses the combination
         * of constructor stealing-prototype chaining
         *
         * @param {string} name - The name of the new constructor 
         * @param {object} parent - The parent object that is being extended
         * @param {function} ctor - The constructor function that will extend the parent constructor
         * @param {object} propertyMembers - An object holding all the property members to be added to the extended constructor
         */
        return function (name, parent, ctor, prototypeMembers) {
            ctor = ctor || function () { };
            prototypeMembers = prototypeMembers || {};

            var augmentedCtor = function () {
                // constructor-stealing
                parent.apply(this, arguments);
                ctor.apply(this, arguments);
            };

            augmentedCtor.prototype = function () {
                // prototype chaining
                var proto = Object.create(parent.prototype);

                var publicApi = $.extend(proto, {
                    constructor: ctor,
                    _base_: Object.create(parent.prototype)
                });

                // extend
                $.extend(publicApi, prototypeMembers);

                return publicApi;
            }();

            // for debugging purposes, we want the name of the constructor to match the name
            // of the child constructor and not be called augmentedCtor
            var code = 'var ' + name + '=' + augmentedCtor +
                        ';' + name + '.prototype = augmentedCtor.prototype' +
                       ';(function() { return ' + name + ' }())';

            return eval(code);
        }
});
