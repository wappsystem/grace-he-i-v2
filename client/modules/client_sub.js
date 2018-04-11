//-------------------------------------
//input needed in module input variables
var prefix=$vm.module_list[$vm.vm['__ID'].name].prefix; if(prefix==undefined) prefix="";
var client_pid=$vm.module_list[prefix+'client'].table_id;
var sql_client="JSON_VALUE(Information,'$.Applicant')";
//-------------------------------------
var _task_fields='';
//-------------------------------------
_set_req=_set_req_export=function(){
    var client_where="";
    var client_uid=$vm.vm['__ID'].op.applicant_uid;
    if(client_uid!==undefined){
        client_where=" where uid="+client_uid;
    }
    var sql="with client as (select clientUID=UID,sql_client="+sql_client+" from [TABLE-"+client_pid+"] "+client_where+" )";
    sql+=",task as (select ID,UID,PUID,S3,Information,sql_client,DateTime,Author,RowNum=row_number() over (order by ID DESC) from [TABLE-"+_db_pid+"-@S1] join client on PUID=clientUID)";
    sql+=" select ID,S3,UID,Information,client=sql_client,DateTime,Author,RowNum,dirty=0, valid=1 from task where RowNum between @I6 and @I7";
    var sql_n="with client as (select clientUID=UID from [TABLE-"+client_pid+"] )";
    sql_n+=" select count(ID) from [TABLE-"+_db_pid+"-@S1] join client on PUID=clientUID";

    _req={cmd:'query_records',sql:sql,sql_n:sql_n,s1:'"'+$('#keyword__ID').val()+'"',I:$('#I__ID').text(),page_size:$('#page_size__ID').val()}
}
//-------------------------------------
_set_req_export=function(){
/*    _fields_e="Applicant ID|clientUID,client,"+_task_fields
    var sql="with client as (select Site=S1,clientUID=UID,sql_client="+_module.var.sql_client+",RowNum=row_number() over (order by ID DESC) from [FORM-"+client_pid+"]"+site_sql_where+" )";
    sql+=",task as (select ID,UID,PUID,S3,Information,DateTime,Author from [FORM-"+_db_pid+"-@S1])";
    sql+=" select ID,clientUID,Site,Information,client=sql_client,DateTime,Author from client left join task on PUID=clientUID";
    _set_from_to();
    if(_from!='0' && _to!='0') sql+=" where RowNum between @I6 and @I7";
    else sql+=" order by clientUID DESC";
    _req={cmd:'query_records',sql:sql,i6:_from,i7:_to}
    */
}
//-------------------------------------
var _default_cell_render=function(records,I,field,td,set_value,source){
    switch(field){
    }
}
//-------------------------------------
_new_pre_data_process=function(){
    if($vm.vm['__ID'].op.applicant_uid!==undefined) _records[0].applicant_uid=$vm.vm['__ID'].op.applicant_uid;
    if($vm.vm['__ID'].op.applicant!==undefined) _records[0].applicant=$vm.vm['__ID'].op.applicant;
    if($vm.vm['__ID'].op.file_name!==undefined) _records[0].File_Name=$vm.vm['__ID'].op.file_name;
}
//-------------------------------------
