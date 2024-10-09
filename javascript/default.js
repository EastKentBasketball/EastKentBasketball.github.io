---
layout: blank
---
//Version {{ site.version_number }}
//{{ site.urllive }}

var linkProjectsDynamic = [ {% assign sorted_pages = site.pages | sort:"url" %}{% for p in sorted_pages %}{%- if p.title -%}{Name:'{{ p.title }}',URL:'{{ p.url }}'},{%- endif -%}{% endfor %} ];

var testpostsJSON = "{% assign sorted_posts = site.posts | sort:"url" %}{% for x in sorted_posts %}{%- if x.title -%}{{ x.url }}:'{{ x.title }}',{%- endif -%}{% endfor %}";


const _maxDaysForSubmission = 1000*60*60*24*4;
function forceLeagueRefresh(){
	setLocal("LeagueTable", "01-01-2000");	
	setLocal("ResultsTable", "01-01-2000");
	arrAdjust(z);
}

function timestampToDateObj(str){
	var datearr = str.split(" ")[0].split("/");
	var timearr = str.split(" ")[1].split(":");
	return new Date(datearr[2],datearr[1]-1,datearr[0],timearr[0],timearr[1],timearr[2]);
}
function buildResultTable(arr){
	return Object.values(arr.reduce((acc, obj) => {
		if(obj["Comment"] == "Game Removed"){return acc;}
		obj["Home Score"] = +obj["Home Score"] || 0; // convert to number
		obj["Away Score"] = +obj["Away Score"] || 0; // convert to number
		const keyHome = obj["League Year"] + '_' + obj["League Type"] + '_' + obj["Home Team"]; // unique combination of ids
		const key2 = obj["League Year"] + '_' + obj["League Type"] + '_' + obj["Away Team"]; // unique combination of ids
		acc[keyHome] = acc[keyHome] || {"League Year":obj["League Year"],"League Type":obj["League Type"],"Team":obj["Home Team"],"Games":0,"Forfeit":0,"Won":0,"Lost":0,"Points For":0,"Points Against":0,"Point Difference":0,"League Points":0};
		acc[key2] = acc[key2] || {"League Year":obj["League Year"],"League Type":obj["League Type"],"Team":obj["Away Team"],"Games":0,"Forfeit":0,"Won":0,"Lost":0,"Points For":0,"Points Against":0,"Point Difference":0,"League Points":0};
		if(obj["Game Status"] == "Home Forfeit"){
			acc[keyHome]["Forfeit"]++;
			acc[keyHome]["League Points"]--;
			obj["Away Score"] = 20;
		}else if(obj["Game Status"] == "Away Forfeit"){		
			acc[key2]["Forfeit"]++;
			acc[key2]["League Points"]--;
			obj["Home Score"] = 20;
		}	  
		if(obj["Home Score"] > obj["Away Score"]){
			acc[keyHome]["League Points"]+=2;
			acc[keyHome]["Won"]++;
			acc[key2]["League Points"]++;
			acc[key2]["Lost"]++;
		} else if(obj["Home Score"] < obj["Away Score"]) {
			acc[key2]["League Points"]+=2;
			acc[key2]["Won"]++;
			acc[keyHome]["League Points"]++;
			acc[keyHome]["Lost"]++;
		}
		acc[keyHome]["Games"]++;
		acc[keyHome]["Points For"]+=obj["Home Score"];
		acc[keyHome]["Points Against"]+=obj["Away Score"];
		acc[keyHome]["Point Difference"]+=( obj["Home Score"] - obj["Away Score"] );
		acc[key2]["Games"]++;
		acc[key2]["Points For"]+=obj["Away Score"];
		acc[key2]["Points Against"]+=obj["Home Score"];
		acc[key2]["Point Difference"]+=( - obj["Home Score"] + obj["Away Score"] );
		return acc;
	}, {}));
}
//Timestamp	League Year	League Type	Match Number	Home Score	Away Score	MVP	Comments/Additional Details	Match Sheet Photo	Home Team	Away Team	Referee 1	Referee 2	Date	Comment
var _joinTable = null;

async function getResultTable(){
    return getLeagueTable(true)
}
async function getLeagueTable(resultTable = false){
	var _resultsTable = null;
	var _leagueTable = await fetchData("https://docs.google.com/spreadsheets/d/e/2PACX-1vS2lKSaFjfsuZK7Lseo_HsGYhq1VpQQ_qRqntI2NQqc8qlCRAY919Zje_IaCbsorgAgtA-8noCqHyWL/pub?gid=197807890&single=true&output=csv", "OBJECT", "LeagueTable", (60*60));
	if (_leagueTable != null) {
		_resultsTable = await fetchData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSfCDBr6vjSUVxA41chCnyUR46oNnPVyzCyS0_NbvLbk_9eh0Got1BPnZkIKmDngC2bp0bshVm3NiK2/pub?gid=1564670715&single=true&output=csv", "OBJECT", "ResultsTable", (60*60));
		_joinTable =_resultsTable != null ? leftJoinObjects(_leagueTable, _resultsTable,["League Year","League Type","Match Number"]) : _leagueTable;
		var teamTable = await getTeamList();
		var clubTable = await getClubList();
		_joinTable.forEach(function(item, index) {
			var homeTeam = arrFilter(teamTable,{"League Year": [item["League Year"],"exact"],"Club Affiliation":[item["Home Team"],"filtercontains"],"Team Type":[item["League Type"],"filtercontains"]});
			if(homeTeam.length == 1 && homeTeam[0]["Display Name"] != ""){item["Home Team"] = homeTeam[0]["Club Affiliation"] + " (" + homeTeam[0]["Display Name"] + ")";}
			var awayTeam = arrFilter(teamTable,{"League Year": [item["League Year"],"exact"],"Club Affiliation":[item["Away Team"],"filtercontains"],"Team Type":[item["League Type"],"filtercontains"]});
			if(awayTeam.length == 1 && awayTeam[0]["Display Name"] != ""){item["Away Team"] = awayTeam[0]["Club Affiliation"] + " (" + awayTeam[0]["Display Name"] + ")";}
			if(!resultTable){
				item["Home Score"] = +item["Home Score"] || 0; // convert to number
				item["Away Score"] = +item["Away Score"] || 0; // convert to number
				var MatchDate = new Date(item.Date).getTime();
				var dateNow = new Date(UTCString(true)).getTime();
				if (item["Timestamp"] !== undefined){
					if(item["Game Status"] == "Home Forfeit"){
						item["Away Score"] = 20;
					}else if(item["Game Status"] == "Away Forfeit"){	
						item["Home Score"] = 20;
					}	
					var SubmitTime = timestampToDateObj(item["Timestamp"]).getTime();
					if ((MatchDate + _maxDaysForSubmission) < SubmitTime){
						item["Game Status"] = "Submit Late";
					}
					if (item["Home Score"] > item["Away Score"]){
						item.Winner = item["Home Team"];
					} else if(item["Home Score"] < item["Away Score"]){
						item.Winner = item["Away Team"];			
					} else {
						item.Winner = "Draw";
					}
				} else{
					item["Game Status"] = "To Play";
					item["Submit Result"] = "https://docs.google.com/forms/d/e/1FAIpQLSe_zCLLs9ADsMD2oUFQ76WKY2ZMayX_5tVO2M4h4FNhK1RhLA/viewform?usp=pp_url&entry.821820740=" + item['League Year'] + "&entry.492201271=" + item['League Type'].replace(' ', '+') + "&entry.1142329140=" + item['Match Number'];
				}
				if (item["Timestamp"] === undefined && ((MatchDate + _maxDaysForSubmission) < dateNow)){
					item.Winner = "Late To Submit";
				}
				if(item["Comment"] == "Game Removed"){item["Game Status"] = item.Winner = "Removed";}
				delete item["Timestamp"];
				//delete item["Game Status"];
				var x = arrFilter(clubTable,{"League Year": [item["League Year"],"exact"],"Club Name":[item["Home Team"],"filtercontains"]});
				if(x.length == 1){
					item["Court Address"] = x[0]["Court Address"];
					item["Primary Playing Night"] = x[0]["Primary Playing Night"];
					item["Primary Tip Time"] = x[0]["Primary Tip Time"];
					item["Alternative Playing Nights-Tip Times [If Applicable]"] = x[0]["Alternative Playing Nights-Tip Times [If Applicable]"];
				}
			}
		});
		if (resultTable){return buildResultTable(_joinTable);}
		return (_joinTable)
	} else {
		getElem('tbl').insertAdjacentHTML("beforebegin", "Error Download Failed");
	}
}


async function getClubList(){
	var x = await fetchData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSBFzz85twDjZygxSXPle6b7tQIochbr3sVpeD6BnuUudu31QLDfYODAp9gmTbH2Et4OpWHNpx_eF-M/pub?gid=801951213&single=true&output=csv", "OBJECT", "ClubList", (60*60));
	x.forEach((item,i,array) => {item["Show Teams"] = "<span onclick='showTeams(\"" + item["Club Name"] + "\")'>Click Here</span>";});
	return x;
}
async function getTeamList(team = ""){
	var x =  await fetchData("https://docs.google.com/spreadsheets/d/e/2PACX-1vSBFzz85twDjZygxSXPle6b7tQIochbr3sVpeD6BnuUudu31QLDfYODAp9gmTbH2Et4OpWHNpx_eF-M/pub?gid=1431975959&single=true&output=csv", "OBJECT", "TeamList", (60*60));
	//var y = renameKeyInArrOfObj(x,"Club Affiliation","Club Name")
	if(team != ""){
		var y = arrFilter(x,{"Club Affiliation": [team,"exact"]});
		return y;
	} else{
		return x;
	}
}

function renameKeyInArrOfObj(arr, key, newkey){
	return arr.map(item => {
      var temp = item[key];
      delete item[key];
      return {
        ...item,
        [newkey]: temp
      };
	});   
}

async function showTeams(team = ""){
	var a = await getTeamList(team);
	buildCards("tblClubs", a, "Club Affiliation");
	getElem('tblClubs').insertAdjacentHTML("afterbegin", "<button onclick='showClubs()'>Back To Club List</button>");
}
function showClubs(){
	const z = {"getArrFunction":"getClubList","id":"tblClubs","display":"cards","displaySettings":{"idKey":"Club Name"},"colData":[{"col":"League Year","filter":"dropdown"},{"col":"Court Address","hide":"1"},{"col":"Primary Playing Night","hide":"1"},{"col":"Primary Tip Time","hide":"1"},{"col":"Alternative Playing Nights-Tip Times [If Applicable]","hide":"1"},{"col":"Junior Teams","hide":"1"},{"col":"Facebook Link","hide":"1","type":"masked-url"},{"col":"Twitter Link","hide":"1","type":"masked-url"},{"col":"Instagram Link","hide":"1","type":"masked-url"},{"col":"Club Website","hide":"1","type":"masked-url"},{"col":"Club Synopsis","hide":"1"}],"sort":["Club Name"]};
	var a = JSON.parse(getLocal("arrSettings_" + z.id));
	var b = a == null ? z : a;
	arrAdjust(b);
}