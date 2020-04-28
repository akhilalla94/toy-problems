
var deepEqual = function(a, b) {

    if(a === b) {

        return true;

    } else if ((a!= null && typeof a === 'object') && (b != null && typeof b ==='object')) {

        if(Object.keys(a).length != Object.keys(b).length) {

            return false;
        }

        for(var prop in a) {

            if(b.hasOwnProperty(prop)) {
                if(! deepEqual(a[prop], b[prop]))  {

                    return false;
                } 
            } else {
                return false;
            }
        }
        return true;
        
    } else {

        return false;
    }   
}
// //test cases
var obj = {name: {ALLA: "AKHIL"}, object: 41};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {name: {ALLA:"AKHIL"}, object: 41}));
console.log(deepEqual(obj, {name: {A: "AKHIL"}, object: 41}));
console.log(deepEqual(obj, {name: {ALLA: "AKIL"}, object: 41}));
console.log(deepEqual(obj, {name: {ALLA: "AKHIL"}, object: 41}));