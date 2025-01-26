function parseMsg(msg){
    var data = msg.split(" ");
    if (data.length != 4){
        return(['no data','no data', 'no data', 'no data']);
    } else {
        return(data);
    }
}