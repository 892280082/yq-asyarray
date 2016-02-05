var asyArray = require('./index');
/**
 * @Test
 * */
var _array = [{data:"111"},{data:"222"},{data:"333"},{data:"444"}];

var resultArray = [];
asyArray(_array,2,function(ele,index,array,next){
    setTimeout(function(){
        resultArray.push(ele.data);
        console.log("index:"+index+" element:"+ele.data);
        next();
    },1000);
},function(){
    console.log("result:",resultArray);
    console.log("over");
})
