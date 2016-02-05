/**
 * @desc 包介绍
 * 用于数组,并且数组内的元素需要异步调用的。
 * 例如数据库查询
 * 根据一个ID数组查询所有的数据,用这个方法就能很方便的解决。
 * */

/**
 * @desc 保存用户的配置
 * @type {{array: null, limit: null, itemFn: null, overFn: null, setParam: Function}}
 */
var USERPARAM = {
    //数组
    array:null,
    //线程池的大小
    limit:null,
    //每个元素执行的方法
    itemFn:null,
    //程序结束的方法
    overFn:null,
    /**
     *
     * @param {{array:Array,
     *          limit:Number,
     *          itemFn:Function,
     *          overFn:Function}} param - 用户设置的参数
     * @returns {USERPARAM} - 返回自身
     */
    setParam:function(param){
        for(p in param){
            if(p in USERPARAM){
                USERPARAM[p] = param[p];
            }
        }
        if(this.limit>=this.array.length)
            this.limit = this.array.length;
        return this;
    }
}

/**
 * @desc 线程池对象
 * @type {{finIndex: number, arrayIndex: number, init: Function, outPool: Function, addEle: Function}}
 */
var POOL = {
    finIndex:0,
    arrayIndex:0,
    /**
     * @desc 初始化线程池
     */
    init:function(){
        var _tempArray = [];
        while(this.arrayIndex<USERPARAM.limit) {
            _tempArray.push(USERPARAM.array[this.arrayIndex++]);
        }
        this.addEle(_tempArray);
    },
    /**
     * @desc 当一个线程退出线程时的操作
     */
    outPool:function(){
        //结束游标增加
        this.finIndex++;
        //像线程池增加元素
        this.addEle();
        //结束,调用结束方法
        if(POOL.finIndex == USERPARAM.array.length){
            USERPARAM.overFn();
        }
    },
    /**
     * @desc 增加数据进入线程池,如果数据是数组则启动与数组个数相等的异步线程
     * @param {Array?} array
     */
    addEle:function(array){
        var _this = this;
        if(array && array instanceof Array){
            array.forEach(function(element,index){
                setTimeout(function(){
                    USERPARAM.itemFn(element,index,USERPARAM.array,_this.outPool.bind(_this));
                },0);
            });
        }else{
            if(this.arrayIndex>=USERPARAM.array.length)
                return;
            var index = this.arrayIndex++;
            var element = USERPARAM.array[index];
            setTimeout(function(){
                USERPARAM.itemFn(element,index,USERPARAM.array,_this.outPool.bind(_this));
            },0);
        }
    }
}


/**
 *@desc 程序主入口
 *@array {Array} - 数组
 *@limit {Number ?} - 同时执行线程的大小，不设置默认为数组的长度
 *@itemFn {Function} - 每个元素调用的函数
 *@overFn {Function} - 数组处理完的结束函数
 */
function main(array,limit,itemFn,overFn){
    if(arguments.length == 3){
        overFn = itemFn;
        itemFn =limit;
        limit = array.length;
    }
    USERPARAM.setParam({
        "array":array,
        "limit":limit,
        "itemFn":itemFn,
        "overFn":overFn
    });
    POOL.init();
}

//导出入口函数
module.exports = main;
