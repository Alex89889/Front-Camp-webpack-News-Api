'use strict';

import "./style.css";
console.log("hello, world");
 
import News from "./news.js";
let  source = new News('https://newsapi.org/v2/sources?apiKey=a09253e9d8614d7f86d01ec6998b70de');
source.printSource();

let news = new News();
news.printNews();