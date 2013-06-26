/*
Underscore Deep Extend

"You shouldn't use this in production!" - Some engineer

"OK, well I still made this from examples I found online." - Me
*/

_.deepExtend = function(obj) {
  var hasOwnProperty, parentRE, slice;
  parentRE = /#{\s*?_\s*?}/;
  slice = Array.prototype.slice;
  hasOwnProperty = Object.prototype.hasOwnProperty;
  _.each(slice.call(arguments, 1), function(source) {
    var prop, _results;
    _results = [];
    for (prop in source) {
      if (hasOwnProperty.call(source, prop)) {
        if (_.isUndefined(obj[prop])) {
          _results.push(obj[prop] = source[prop]);
        } else if (_.isString(source[prop]) && parentRE.test(source[prop])) {
          if (_.isString(obj[prop])) {
            _results.push(obj[prop] = source[prop].replace(parentRE, obj[prop]));
          } else {
            _results.push(void 0);
          }
        } else if (_.isArray(obj[prop]) || _.isArray(source[prop])) {
          if (!_.isArray(obj[prop]) || !_.isArray(source[prop])) {
            throw "Error: Trying to combine an array with a non-array (" + prop + ")";
          } else {
            _results.push(obj[prop] = _.reject(_.deepExtend(obj[prop], source[prop]), function(item) {
              return _.isNull(item);
            }));
          }
        } else if (_.isObject(obj[prop]) || _.isObject(source[prop])) {
          if (!_.isObject(obj[prop]) || !_.isObject(source[prop])) {
            throw "Error: Trying to combine an object with a non-object (" + prop + ")";
          } else {
            _results.push(obj[prop] = _.deepExtend(obj[prop], source[prop]));
          }
        } else {
          _results.push(obj[prop] = source[prop]);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });
  return obj;
};
