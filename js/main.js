$(function(){
    function includeHtml() {
        const includeTarget = document.querySelectorAll('.includeJs');
        includeTarget.forEach(function(el, idx) {
            const targetFile = el.dataset.includeFile;
            if(targetFile){
                let xhttp = new XMLHttpRequest();
            
                xhttp.onreadystatechange = function() {
                    if (this.readyState === XMLHttpRequest.DONE) {
                        this.status === 200 ? (el.innerHTML = this.responseText) : null
                        this.status === 404 ? (el.innerHTML = 'include not found.') : null
                    }
                }
                xhttp.open('GET', targetFile, true);
                xhttp.send();
                return;
            }
        });
    };

    includeHtml();
})();

$(document).ready(function(){
    $(".selectLang > select").change(function(){
        if($( this ).val()!=""){
            window.location.href=$( this ).val();
        }
    });
});

$(document).ready(function(){
	var popCount = 0;
	if(getCookie("noPop") !="Y"){
		if(popCount > 0){
			mvJs.popup.open('#layer_image_slide');
		}
    } 
});  
//쿠키설정    
function setCookie( name, value, expiredays ) {
var todayDate = new Date();
todayDate.setDate( todayDate.getDate() + expiredays );
document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
}

//쿠키 불러오기
function getCookie(name) 
{ 
    var obj = name + "="; 
    var x = 0; 
    while ( x <= document.cookie.length ) 
    { 
        var y = (x+obj.length); 
        if ( document.cookie.substring( x, y ) == obj ) 
        { 
            if ((endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
                endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) ); 
        } 
        x = document.cookie.indexOf( " ", x ) + 1; 
        
        if ( x == 0 ) break; 
    } 
    return ""; 
}
 
//닫기 버튼 클릭시
function closeWin(key)
{
    if($("#todaycloseyn").prop("checked"))
    {
        setCookie('noPop', 'Y' , 1 );
    }
    mvJs.popup.close('#layer_image_slide');
}

$('[alt=sobija]').closest('a').attr('title','새창');
$('[alt=sobija]').attr('alt','').closest('.swiper-slide').append(`
    <div class="hidden">
    <strong>파스쿠찌</strong><br>
    소비자상담실 휴무안내<br><br>
    홈페이지 1:1 문의하기에 글 남겨 주시면
    영업일에 답변 드리도록 하겠습니다.<br>
    소비자상담실 : 080-916-9000 (수신자 요금부담)<br>
    1:1 문의하기
    </div>
`);