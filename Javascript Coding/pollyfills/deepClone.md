## BASIC VERSION
const cloneDeep=(obj)=>{
    let res= Array.isArray(obj) ? [] : {}
    const helper=(obj,res)=>{
        for(let key in obj){
            if(Array.isArray(obj[key])){
              res[key] =  helper(obj[key],[])
            }
            else if(typeof obj[key] === 'object' && obj[key] ){
                 res[key] =  helper(obj[key],{})
            }
            else {
                console.log( obj[key])
                res[key] = obj[key]
            }
        }
        return res
    }
    
    helper(obj,res)
    return res
}





## ADVANCE VERSION
const cloneDeep = (obj) => {
    const seen = new WeakMap();

    const helper = (obj) => {
        if (obj === null || typeof obj !== "object") return obj; // Handle primitives

        if (seen.has(obj)) return seen.get(obj); // Handle circular reference

        let res = Array.isArray(obj) ? [] : {}; // Create correct structure
        seen.set(obj, res); // Store reference

        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                let value = obj[key];

                if (value instanceof Date) res[key] = new Date(value); // Clone Date
                else if (value instanceof RegExp) res[key] = new RegExp(value); // Clone RegExp
                else if (value instanceof Set) res[key] = new Set([...value]); // Clone Set
                else if (value instanceof Map) res[key] = new Map([...value]); // Clone Map
                else res[key] = helper(value); // Recursively clone other objects
            }
        }

        return res;
    };

    return helper(obj);
};
