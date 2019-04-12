// Bonus Question (only work on this if you have fully completed the previous questions)
// Write a function that checks if parentheses in a string are correctly matched and nested. You can ignore any other characters in the string.
// Example 1:
// Input: "(A + (B - C) )"
// Returns: True
// Example 2:
// Input: "( ) ) ( "
// Returns: False (because the 3rd parenthesis is a closing parenthesis with no matching open parenthesis)
// Save the following code and text in a file called bonus1.js:
// Write the function
// If you’re not able to code the function, describe in words the algorithm you would use (be as specific as possible)
// What is the runtime of this function? Briefly explain why.
// Unit tests: What are some inputs you would test to make sure this function works? Please give specific example inputs.


function parMarch(parStr) {
    let newArr = parStr.split("")
        for (let i = 0; i <parStr.length; i++)

}

// I'm having a little trouble writing this function out but a way to solve this would be to divide
//and conquer. We know that each open par needs a closing par but multiple open parantheses could be
//nested as long as they're equally matched with closed pars.