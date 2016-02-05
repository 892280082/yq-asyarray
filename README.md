# yq-asyarray

/**
 * @desc 包介绍
 * 用于数组,并且数组内的元素需要异步调用的。
 * 例如数据库查询
 * 根据一个ID数组查询所有的数据,用这个方法就能很方便的解决。
 * */

#test

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

/**
 *@array {Array} - 数组
 *@limit {Number ?} - 同时执行线程的大小，不设置默认为数组的长度
 *@itemFn {Function} - 每个元素调用的函数
 *@overFn {Function} - 数组处理完的结束函数
 */
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

 


