// var jsondata={};

$(document).ready(function() {
	
	
	 $.ajax({
                type: "get",
                beforesend: function () { $("#studentData").html("<center id='loader'><img src='images/loading.gif' width='100' height='100' style='position:absolute;top:200px;' /></center>");},
                url: "https://www.hatchways.io/api/assessment/students", // put this url jor github https://api.myjson.com/bins/14rjg0
                timeout: 10000,
                error: function (xhr, status, error) {
                    alert("error: " + xhr.status + " - " + error);
                },
                datatype: "json",
                success: function (data) {
					jsondata=data.students;
                    $("#studentData").html("");
						var htmlString=getHtmlString(jsondata);

                    $("#studentData").append(htmlString); 
					$("#searchByName").keyup(function() {
						$("#searchByTag").val("");
							var strvalue=$("#searchByName").val().toLowerCase();	
						var searchData={"students":[]};
					if(strvalue.length > 0){
						var as=$(jsondata).filter(function (i,n){
							if(n.firstName.toLowerCase().indexOf(strvalue) != -1 || n.lastName.toLowerCase().indexOf(strvalue) != -1){
								return n;
							}
							});
							var filterdata=getHtmlString(as);
							$("#studentData").html(filterdata);
							
							$("#studentData h2").click(
						function() {
							$(this).toggleClass("minus");
							$(this).next().children('div').eq(1).slideToggle( "slow" );
						}
					);
						}else
						{
							var htmldata=getHtmlString(jsondata);
							$("#studentData").html(htmldata);
							
							$("#studentData h2").click(
						function() {
							$(this).toggleClass("minus");
							$(this).next().children('div').eq(1).slideToggle( "slow" );
						}
					);
						}
					});
					
					
					$("#searchByTag").keyup(function() {
						
						$("#searchByName").val("");
						var strvalue=$("#searchByTag").val().toLowerCase();	
						var searchdata={"students":[]};
						
					if(strvalue.length > 0){
						var fdata=[];
						for(var j=0;j<jsondata.length;j++){
							var isExist=false;
							as=$(jsondata[j].tags).filter(function (i,n){
								if(n.toLowerCase().indexOf(strvalue) != -1){
									isExist=true;
								}
								});	
								
								if(isExist)
								{
									fdata.push(jsondata[j]);
								}
							}
								var filterdata=getHtmlString(fdata);
								$("#studentData").html(filterdata);
							$("#studentData h2").click(
						function() {
							$(this).toggleClass("minus");
							$(this).next().children('div').eq(1).slideToggle( "slow" );
						});
						}else
						{
							var htmldata=getHtmlString(jsondata);
							$("#studentData").html(htmldata);
								$("#studentData h2").click(
						function() {
							$(this).toggleClass("minus");
							$(this).next().children('div').eq(1).slideToggle( "slow" );
						});
						}
					});
					
					$("#studentData h2").click(
						function() {
							$(this).toggleClass("minus");
							$(this).next().children('div').eq(1).slideToggle( "slow" );
						}
					);
				}
                   
    });
	
}); 

function getHtmlString(jsondata) {
	var str = "<h1>student information</h1>";
						for(var i=0;i<jsondata.length;i++)
						{
							jsondata[i].tags=[];
							
							randomData=["vaimik","patel","steve","ronak","dvij","hardik"];
							Math.random(0,5),random2=Math.random(0,5);
							
							jsondata[i].tags.push(randomData[Math.round(Math.random(0,5))]);
							jsondata[i].tags.push(randomData[Math.round(Math.random(0,5))]);
							
							str+="<h2 class=''>"+jsondata[i].firstName +"&nbsp; &nbsp; "+jsondata[i].lastName+"</h2>";
							str+="<div><div class='visibleSection'><div class='imgdiv'><img src='"+jsondata[i].pic+"' /></div>";
							str+="<div class='stdInfo'><p>email : "+jsondata[i].email+"</p><p>company : "+jsondata[i].company+"</p>";
							str+="<p>skill : "+jsondata[i].skill+"</p><p> average : "+getAverage(jsondata[i].grades)+"%</p></div></div>";
							str+="<div class='togglingSection'><ul>";
								for(var j=0; j<jsondata[i].grades.length;j++)
									{
										str+="<li>Test "+j+" :"+jsondata[i].grades[j]+"</li>";
									}
							str+="</ul><div id='tagsdiv'><div id='tags"+i+"'>";
							str+=displayTags(jsondata[i])+"</div>";
							
							str+="<input type='text' id='tag"+i+"' placeholder='Enter Tag' value='' /><br/><input type='button' id='1' onClick='addTag("+i+")' value='Add Tag' />";
							str+="</div></div></div>";
						}
						
						return str;
};

function getAverage(array){
	
	var total=0;
	for(var i=0;i<array.length;i++)
	{
		total+=parseInt(array[i]);
	}
	return (total/array.length);
};

function displayTags(tagArray){
	var sId=tagArray.id;
	var str="<p> Tags : ";
	if(tagArray.length === 0 )
	{
		str+="No Tags";
	}
	else
	{
		for(var p=0;p<tagArray.tags.length;p++)
		{
			str+=tagArray.tags[p]+" , ";
		}
		str+="</p>";
	}
	return str;
};

function addTag(num){
	if(document.getElementById("tag"+num).value.length != 0){
		
	jsondata[num].tags.push(document.getElementById("tag"+num).value)
	document.getElementById("tag"+num).value="";
	document.getElementById("tags"+num).innerHTML=displayTags(jsondata[num]);
	}
};

