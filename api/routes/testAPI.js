//testAPI.js -- Express server
var express = require("express");
var router = express.Router();
const puppeteer = require('puppeteer');


async function run (url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log("check2");
    await page.goto(url, {waitUntil: 'networkidle2', timeOut: 0});

    console.log("check3");
   	//await page.screenshot({path: 'screenshot1.png'});

   	console.log("check4");
	let tds;
    const innerHTML = await page.evaluate(() => {
    	let compInfo = Array.from(document.querySelectorAll('#compInfo table tr td'));
    	var cells = compInfo.map(t => t.textContent);
    	return cells;
    });
    
    let ans = {"Name": innerHTML[0]};
    for(let i=1; i < innerHTML.length; i++){
    	if(innerHTML[i].includes(":")){
    		let temp = innerHTML[i].split(":");
    		ans[temp[0].trim()] = temp[1].trim();
    	}
    }
    console.log(ans);    
    browser.close();
    return ans;
}

router.get("/:sym", function(req, res, next) {
    let symbol = req.params.sym;
    let PRE_url = "https://www1.nseindia.com/companytracker/cmtracker.jsp?symbol=";
    let POST_url = "&cName=cmtracker_nsedef.css";
    let url = PRE_url + symbol + POST_url;
    let content = run(url);
    content.then( value => {
    	res.json(value);	
    });
    
});

module.exports = router;


