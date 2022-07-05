// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB

function getStats(txt) {
  // you need to write your own code here

  //First change all the text to lower case letters for initialization
  txt = txt.toLowerCase();

  //NumChars

  //Number of Chars is basically the length of the string which the built in javascript function takes
  var charcount = txt.length;

  //NumWords

  //For number of words we first use the regex for alphanumerics (including spaces and new line characters)
  const regex = /[^A-Za-z0-9/\s//\n/]/g;

  //Now we replace all of the non alphanumerics with an empty string
  const newStr = txt.replace(regex, "");

  //This regex separates the words from the numbers
  const words = newStr.match(/[a-zA-Z]+|[0-9]+/g);

  //NumLines

  //Lines are separated by the new line character, so we will split on that
  const lines = txt.split("\n");

  //next we set a variable to count the number of lines
  var numberOfLines = 0;

  //If the entire string given is not empty then we can set the number of lines.
  if (txt) {
    numberOfLines = lines.length;
  }

  //LongestLine

  //Sort the list of lines by length and take the length of the first element.
  var sortedlines = lines.sort((a, b) => b.length - a.length);
  var longest = sortedlines[0].length;
  //Non Empty Lines

  //A pretty easy method to count the number of non empty lines

  //We first initialize the number of non empty lines to 0
  var nonEmpty = 0;
  //Next we create a regex for white spaces
  const newRegex = /\s+/;
  //Now we first remove all the whitespaces and whitespace characters from the line and then check if the line is still not empty
  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(newRegex, "");
    if (lines[i]) {
      nonEmpty++;
    }
  }

  //Average Word Length

  //Initialize
  var total = 0;
  var count = 0;

  //Loop around the word array
  for (var i = 0; i < words.length; i++) {
    //Total just adds until it has all of the word lengths combined
    total = total + words[i].length;

    //count counts how many lines are
    count++;
  }
  //Simple math for the average word length
  var averageWordLength = total / count;
  //Use math function to help round it up: https://www.codingem.com/javascript-how-to-limit-decimal-places/
  averageWordLength =
    Math.round((averageWordLength + Number.EPSILON) * 100) / 100;

  //TenLongestWords

  //We first sort the words alphabetically
  words.sort(function (a, b) {
    return a.localeCompare(b);
  });

  //next we sort the words in descending order by length
  const desc = words.sort((a, b) => b.length - a.length);
  let uniqueChars = [...new Set(desc)];

  //Made this sorting function that sorts alphabet first and then number second.

  //Basically what it does is it first checks if the current word is a number and if the number after it is a word
  //If that is true, then the next thing we check is if their lengths are equal to eachother
  //This helps tie break the number and the word, so if it is true then we swap it
  for (var i = 0; i < uniqueChars.length - 1; i++) {
    if (!isNaN(uniqueChars[i]) && isNaN(uniqueChars[i + 1])) {
      if (uniqueChars[i].length == uniqueChars[i + 1].length) {
        var temp = uniqueChars[i + 1];
        uniqueChars[i + 1] = uniqueChars[i];
        uniqueChars[i] = temp;
      }
    }
  }
  //Now we just splice the first 10
  var tenlongest = uniqueChars.slice(0, 10);

  //TenMostFrequent

  //First sort the words list alphabetically
  words.sort(function (a, b) {
    return a.localeCompare(b);
  });

  //now we copy the words array
  let newWords = words.slice();
  //make a new array for the numbers
  var numbers = new Array();

  //This is a check. When the words are alphabetically sorted, numbers always come first
  //We will keep stripping the beginning of the words list until we see a word not a number
  while (!isNaN(newWords[0])) {
    numbers.push(newWords.shift());
  }

  //Now we have the sorted words first and the sorted numbers after
  var fullarray = newWords.concat(numbers);

  //We create a new hashmap
  let mostfrequent = new Map();

  //Now we populate the hashmap
  //We loop through the full array of words and numbers and if we have seen the key, we will add to it.
  //If we have not see the key before we add it and initialize its value to 1.
  for (var i = 0; i < fullarray.length; i++) {
    if (mostfrequent.has(fullarray[i])) {
      var number = mostfrequent.get(fullarray[i]) + 1;
      mostfrequent.set(fullarray[i], number);
    } else {
      mostfrequent.set(fullarray[i], 1);
    }
  }

  //Now we sort the hash map by value
  // How to sort by value of hash map : https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript
  const mapSort1 = new Map(
    [...mostfrequent.entries()].sort((a, b) => b[1] - a[1])
  );

  //Now we make a new final array
  var tenFrequent = new Array();

  //loop through the hashmap and glue the key with its corresponding value
  for (let [key, value] of mapSort1) {
    tenFrequent.push(key + "(" + value + ")");
  }

  //And take the first ten values
  tenFrequent = tenFrequent.slice(0, 10);

  return {
    nChars: charcount,
    nWords: words.length,
    nLines: numberOfLines,
    nNonEmptyLines: nonEmpty,
    averageWordLength: averageWordLength,
    maxLineLength: longest,
    tenLongestWords: tenlongest,
    mostFrequentWords: tenFrequent,
  };

  return {
    nChars: 58,
    nWords: 22,
    nLines: 10,
    nNonEmptyLines: 22,
    averageWordLength: 3.3,
    maxLineLength: 33,
    tenLongestWords: ["xxxxxxxxx", "123444444"],
    tenMostFrequentWords: ["a", "this", "the"],
  };
}
