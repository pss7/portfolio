// 플래시 object
function dispswf(swf,w,h,bg,id,tit)
{
	if ("https:" == document.location.protocol) 
	{
		return false;
	}
	else
	{
		 document.write('<object id="'+id+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+w+'" height="'+h+'" align="middle" title="'+tit+'">');
		 document.write('<param name="allowScriptAccess" value="sameDomain" />');
		 document.write('<param name="movie" value="'+swf+'" />');
		 document.write('<param name="quality" value="high" />');
		 if(bg == ""){
		  document.write('<param name="wmode" value="transparent" />');
		  document.write('<param name="base" value="." />');
		  document.write('<embed name="'+id+'" src="'+swf+'" quality="high" wmode="transparent" width="'+w+'" height="'+h+'"  align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');  
		 }else{
		  document.write('<param name="bgcolor" value="'+bg+'" />');
		  document.write('<embed name="'+id+'" src="'+swf+'" quality="high" bgcolor="'+bg+'" width="'+w+'" height="'+h+'"  align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
		 }
		 document.write('</object>');
	}
}


