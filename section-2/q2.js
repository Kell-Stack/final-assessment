/*
Write a function that checks if a string is composed of all unique characters.
Example 1:
Input: "banana"
Returns: False (because the letters "a" and "n" are repeated)
Example 2:
Input: "bacon"
Returns: True (because each letter appears once)


Save the following code and text in a file called q2.js:
Write the function
If you’re not able to code the function, describe in words the algorithm you would use (be as specific as possible)
What is the runtime of this function? Briefly explain why.
Unit tests: What are some inputs you would test to make sure this function works? Please give specific example inputs.
*/

function uniqueStr(word){
    let regEx= /.[a-z]/g
    if (word.match(regEx).length){
        return true
    } else {
        return false
    }
}

/* I think is might be O(N^2) because it has to ask each charachter about another charachter. So we're
checking against the length of the array to see if the charachter appears. Ideally in my mind I would
do a regex that said it can be any charachter but it could only appear once (I forgot the syntax of this,
[a-z] would be in the brackets because it's inclusve and then another character would represent the once
occurence) then return true else return false.

*/
