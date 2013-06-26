###
Underscore Deep Extend

"You shouldn't use this in production!" - Some engineer

"OK, well I still made this from examples I found online." - Me
###

_.deepExtend = (obj) ->
  parentRE       = /#{\s*?_\s*?}/
  slice          = Array::slice
  hasOwnProperty = Object::hasOwnProperty

  _.each slice.call(arguments, 1), (source) ->
    
    for prop of source
      
      if hasOwnProperty.call(source, prop)
        
        if _.isUndefined(obj[prop])
          obj[prop] = source[prop]
        
        else if _.isString(source[prop]) and parentRE.test(source[prop])
          obj[prop] = source[prop].replace(parentRE, obj[prop])  if _.isString(obj[prop])
        
        else if _.isArray(obj[prop]) or _.isArray(source[prop])
          
          if not _.isArray(obj[prop]) or not _.isArray(source[prop])
            throw "Error: Trying to combine an array with a non-array (" + prop + ")"
          
          else
            obj[prop] = _.reject(_.deepExtend(obj[prop], source[prop]), (item) ->
              _.isNull item
            )
        
        else if _.isObject(obj[prop]) or _.isObject(source[prop])
          
          if not _.isObject(obj[prop]) or not _.isObject(source[prop])
            throw "Error: Trying to combine an object with a non-object (" + prop + ")"
          
          else
            obj[prop] = _.deepExtend(obj[prop], source[prop])
        
        else
          obj[prop] = source[prop]

  obj
