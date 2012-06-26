define(['fs','./../common/CommonUtil'],function(FS,commonUtil){
    var COPY = commonUtil.copy;
    var Storage = function(project,branch){
        var objects = {};

        /*public functions*/
        var get = function(id,cb){
            setTimeout(function(){
                if(objects[id]){
                    cb(null,objects[id]);
                }
                else{
                    cb(1);
                }
            },1);
        };
        var getAll = function(cb){
            setTimeout(function(){
                cb(null,COPY(objects));
            },1);
        };
        var set = function(id,object,cb){
            setTimeout(function(){
                objects[id] = object;
                cb();},1);
        };
        var del = function(id,cb){
            setTimeout(function(){
                objects[id] = null;
                cb();},1);
        };
        var print = function(){
            console.log("STORAGE\n"+JSON.stringify(objects)+"\nSTORAGE\n");
        };
        var save = function(){
            FS.writeFileSync("../test/"+project+"_"+branch+".tpf",JSON.stringify(objects),"utf8");
        };
        /*private functions*/

        /*main*/
        objects = FS.readFileSync("../test/"+project+"_"+branch+".tpf");
        objects = JSON.parse(objects) || {};

        return {
            get:get,
            getAll:getAll,
            set:set,
            del:del,
            print:print,
            save:save
        };
    };

    return Storage;
});