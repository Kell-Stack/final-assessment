/*Write a function that takes in an array of strings, and returns an array of the strings that start with “a”, “b”, or “c”.
Example:
Input: ["llama", "cow", "horse", "aardvark"]
Returns: ["cow", "aardvark"]
Save the following code and text in a file called q1.js:
Write the function
If you’re not able to code the function, describe in words the algorithm you would use (be as specific as possible)
What is the runtime of this function? Briefly explain why.
Unit tests: What are some inputs you would test to make sure this function works? Please give specific example inputs.
*/

function startsWithABC (inputArr){
    return inputArr.filter((abc) =>abc.startsWith('a'||'b'||'c'))
}


//ideally this would run in constant time O(1) becaue I'm asking every element in the array
//the same question('do you start with a b or c?'). By using filter it should return a new
//array with the strings that start with those letters. To run this, my replit would look like this:

/*

>let inputArr = ["llama", "cow", "horse", "aardvark"]
>startsWithABC (inputArr)
expected return:
> ["cow", "aardvark"]

*/
