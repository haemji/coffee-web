function fnSendSNS(type) {
	var target="_blank"; 
	var currentURL = window.location.href;			
 	if (type == 'twitter') { 		
		url = "https://twitter.com/share?url="+encodeURIComponent(currentURL);
		window.open(url, target);
	} else if (type == 'facebook') {
		url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(currentURL);
		window.open(url, target);
	} else if(type == 'copy') {
		navigator.clipboard.writeText(currentURL);
		alert("URL이 복사되었습니다.")
	}
 	

}
function fnPrint(){
	window.print();	
}
