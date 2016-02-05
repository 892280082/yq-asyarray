var asyArray = require('./index');
/**
 * @Test
 * */

function db_getData(str,callback){
	setTimeout(function(){
		callback("数据库处理:"+str);
	},Math.random()*2000);
}

var _array = [{data:"111"},{data:"222"},{data:"333"},{data:"444"}];

var resultArray = [];
asyArray(_array,2,function(ele,index,array,next){
        db_getData(ele.data,function(str){
        	console.log("index:"+index+" element:"+ele.data);
        	resultArray.push(str);
        	next();
        })
},function(){
    console.log("result:",resultArray);
    console.log("over");
})
