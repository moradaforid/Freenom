
// ------ routes

current_host = window.location.host;
current_path = window.location.href.split("/")[3];


//TSSTOOLKIT_base = "http://eventelo.com/sdm/extension";


host_path_route = {
	
	
	
	// multi monitoring  =========================
	"my.freenom.com" : 
	{
		// page
		"clientarea.php?action=domains" : freenom_direct_edit_domain,
		"clientarea.php?script_start=true" : freenom_script_start,
		"domains.php" : freenom_register,
	}
	
};

// trim route
//var regex = /^[/]+|[/]+$/g;
//current_path = current_path.replace(regex, '');


// manage route and call controler 
if( current_host in host_path_route ){
	// loop 
	for( var i in host_path_route[ current_host ] ){
		// if string in string 
		if( current_path.indexOf( i ) != -1 ){
			// call controller
			host_path_route[ current_host ][ i ]();
		}	

		//if( current_path in i ) host_path_route[ current_host ][ i ]();
	}
	//if( current_path in host_path_route[ current_host ] ) host_path_route[ current_host ][ current_path ]();
}







// ------ controllers
function servers_number_sent_saver(){
	include( "components/number_sent/index.js?v=1.3" );
}


function freenom_direct_edit_domain(){

	// get all tr 
	var trs = document.querySelectorAll(".table.table-striped.table-bordered tr");
	// loop tr and find domain name & id
	for( var i = 1; i < trs.length; i++ ){
		// get domain from second
		var domain = trs[i].querySelector(".second a").innerText.replaceAll(" ","");
		// get id from seventh
		var id = trs[i].querySelector(".seventh a").href.split("id=")[1];
		// add button to btn-group
		var btn = document.createElement("a");
		btn.className = "smallBtn whiteBtn pullRight";
		btn.href = "http://my.freenom.com/clientarea.php?script_start=true&managedns=" + domain + "&domainid=" + id ;
		btn.innerText = "RUN";
		btn.target = "_blank";
		btn.style.marginRight = "10px";
		trs[i].querySelector(".seventh").appendChild(btn);
	}


}


function freenom_script_start(){
	
	// retrive spf_saved from localstorage if exist
	var spf_saved = localStorage.getItem("spf_saved");
	if( !spf_saved ){ spf_saved = ""; }

	// check if script_start=true in url parameter
	if( window.location.href.split("script_start=true")[1] ){
		// code begin
		var div = document.createElement("div");
		html = `
			<div style="margin:auto;max-width:1500px;text-align:center;">
			<input type="text" placeholder="MS verification" id="sdm_MSVerification" value="" size="30" style="border:1px solid black;">
			<input type="text" placeholder="SPF" id="sdm_SPF" value="` + spf_saved + `" size="30" style="border:1px solid black;">
			<input type="text" placeholder="account" id="sdm_account" value="" size="30" style="border:1px solid black;">
			<input type="text" placeholder="ip_server" id="ip_server" value="" size="30" style="border:1px solid black;">
			<button class="smallBtn primaryColor" onclick='start_add_verification()' style="margin: 0px 10px 20px 5px; font-weight: 600; float:left;">RUN</button><br>
			<button class="smallBtn primaryColor" onclick='start_add_verification_SUBDOMAINS()' style="margin: 0px 10px 20px 5px; font-weight: 600; float:left;">DAKIR</button>
			</div>
		`;
		div.innerHTML = html;
		document.querySelector("section.pageHeader").appendChild(div);
	}
}


function freenom_register(){
		var div = document.createElement("div");
		html = `
			<div style="margin:auto;max-width:1500px;text-align:center;">
			<input type="text" id="xxxx" placeholder=""><br>
			<button class="smallBtn primaryColor" onclick='register_domains()' style="margin: 0px 10px 20px 5px; font-weight: 600; float:left;">Register Domains</button><br>
			<a href="/cart.php?a=confdomains" class="addToCart borderRadius" style="margin: 0px 10px 20px 5px; font-weight: 600; float:left;">Checkout</a><br>
			</div>
		`;
		div.innerHTML = html;
		document.querySelector("form.searchform").appendChild(div);
}

function register_domain(domain){
	fetch("https://my.freenom.com/includes/domains/fn-available.php", {
	  "headers": {
	    "accept": "*/*",
	    "accept-language": "en-US,en;q=0.9",
	    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
	    "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
	    "sec-ch-ua-mobile": "?0",
	    "sec-ch-ua-platform": "\"Linux\"",
	    "sec-fetch-dest": "empty",
	    "sec-fetch-mode": "cors",
	    "sec-fetch-site": "same-origin"
	  },
	  "referrer": "https://my.freenom.com/domains.php",
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": `domain=${domain}&tld=ml`,
	  "method": "POST",
	  "mode": "cors",
	  "credentials": "include"
	})
	.then((response) => response.json())
	.then((data) => console.log(data));
}

function register_domains() {
	var idn = document.querySelector('#xxxx').value;

	// generate 10 domain names

	register_domain(idn);
/*	register_domain('a' + idn + 'a');
	register_domain('b' + idn + 'b');
	register_domain('c' + idn + 'c');
	register_domain('d' + idn + 'd');
	register_domain('d' + idn + 'd');
	register_domain('e' + idn + 'e');
	register_domain('f' + idn + 'f');
	register_domain('g' + idn + 'g');
	register_domain('h' + idn + 'h');*/
}


//DAKIIIIIIIIIIIIIIIIRRRRR
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
function start_add_verification_SUBDOMAINS(){

	// retrive data
	var dakirMSVerification = document.querySelector("#sdm_MSVerification").value;

    var MSVerification = dakirMSVerification.split("_")[1]
	var SPF = dakirMSVerification.split("_")[3]
	var server_ip = dakirMSVerification.split("_")[4]
	var account = dakirMSVerification.split("_")[2]

	// retreive managedns parameter from url
	var domain = window.location.href.split("managedns=")[1].split("&")[0].replaceAll("." , "-");


	// MS Verfification
	add_input_with_value( "" , 7 , MSVerification );

	document.querySelector("#add_record").click();

	// SPF
	add_input_with_value( "" , 7 , SPF );


	document.querySelector("#add_record").click();


	// ip server
	add_input_with_value( "" , 0 , server_ip );

	document.querySelector("#add_record").click();

	

	// CNAME
	add_input_with_value( "AUTODISCOVER" , 2 , "autodiscover.outlook.com" );

	document.querySelector("#add_record").click();

	// MX
	add_input_with_value( "" , 4 , domain + ".mail.protection.outlook.com" );

	document.querySelector("#add_record").click();


	// Selector 1
	add_input_with_value( "SELECTOR1._DOMAINKEY" , 2 ,  "selector1-" + domain + "._domainkey." + account.split("@")[1] );

	document.querySelector("#add_record").click();

	// Selector 2
	add_input_with_value( "SELECTOR2._DOMAINKEY" , 2 ,  "selector2-" + domain + "._domainkey." + account.split("@")[1] );


	// save spf  
	chrome.storage.local.set({'spf_saved': SPF});


	//DAKIIIIIIIIIIIIIIIIIIRRRR END 

}
function start_add_verification(){
	
	// retrive data
	var MSVerification = document.querySelector("#sdm_MSVerification").value;
	var SPF = document.querySelector("#sdm_SPF").value;
	var account = document.querySelector("#sdm_account").value;
	var server_ip = document.querySelector("#ip_server").value;

	// retreive managedns parameter from url
	var domain = window.location.href.split("managedns=")[1].split("&")[0].replaceAll("." , "-");


	// MS Verfification
	add_input_with_value( "" , 7 , MSVerification );

	document.querySelector("#add_record").click();

	// ip server
	add_input_with_value( "" , 0 , server_ip );

	document.querySelector("#add_record").click();

	// SPF
	add_input_with_value( "" , 7 , SPF );


	document.querySelector("#add_record").click();

	// CNAME
	add_input_with_value( "AUTODISCOVER" , 2 , "autodiscover.outlook.com" );

	document.querySelector("#add_record").click();

	// MX
	add_input_with_value( "" , 4 , domain + ".mail.protection.outlook.com" );

	document.querySelector("#add_record").click();


	// Selector 1
	add_input_with_value( "SELECTOR1._DOMAINKEY" , 2 ,  "selector1-" + domain + "._domainkey." + account.split("@")[1] );

	document.querySelector("#add_record").click();

	// Selector 2
	add_input_with_value( "SELECTOR2._DOMAINKEY" , 2 ,  "selector2-" + domain + "._domainkey." + account.split("@")[1] );


	// save spf  
	chrome.storage.local.set({'spf_saved': SPF});

}



function add_input_with_value( key , type , value  ){
	
	// get the last tr containing three inputs
	var last_input = document.querySelectorAll("#add_record_table tr")[document.querySelectorAll("#add_record_table tr").length - 1];

	// retrive three inputs key , type , value select by input tag 
	var key_input = last_input.querySelectorAll("input")[0];
	var type_input = last_input.querySelector("select");
	var value_input = last_input.querySelectorAll("input")[2];

	// set value
	key_input.value = key;
	type_input.selectedIndex = type;
	value_input.value = value;

}










// ------ Helper tools
/*async function include( src ){
	var s = document.createElement('script');
	s.src = TSSTOOLKIT_base + src;
	s.onload = function() {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
}*/

function bypass_cache(){ return Math.floor(Math.random() * 99999) + 10000 }
