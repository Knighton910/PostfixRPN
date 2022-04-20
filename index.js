var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("rnp ");
rl.prompt();

var debug = process.argv.slice(2).indexOf("-debug") > -1;
var env = {}; // holds variable values

rl.on("line", function (line) {
  var ar = line.split(/\\s+/),
    st = [],
    token;
  while ((token = ar.shift())) {
    if (token == +token) {
      // numeric
      st.push(token);
    } else {
      var n2 = st.pop(),
        n1 = st.pop();
      st.push(eval(n1 + token + n2));
    }
  }
  return st.pop();
  rl.prompt();
})
  .on("SIGINT", function () {
    rl.close();
  })
  .on("close", function () {
    console.log("Have a great day!");
    process.exit(0);
  });
