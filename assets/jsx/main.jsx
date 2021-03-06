  $c.checkAndCreate("$w");
 $w.tableColW={c1:120,c2:200,c3:40,c4:40,c5:40}
 $w.W={b1:100,b2:50,l1:60}
 $w.catMap={
     "":"",
     "1":"CAT1",
     "2":"CAT2",
     "3":"CAT3",
 }
 var b = ReactBootstrap;
 var Item = React.createClass({ 
  render: function() {
    var c = this.props.rcd;
    return (
      <tr key={this.props.no*10} id={"row"+this.props.no} 
        onClick={$w.app.rowClick}  style={{backgroundColor: 
            (this.props.no==$w.app.state.selRow)?"#FFD0D0":"#FFFFFF"}} >
        <td key={this.props.no*10+1}
            style={{width:$w.tableColW.c1,border:1,borderStyle:"solid"}}>
                {c.name}</td>
        <td key={this.props.no*10+2}
            style={{width:$w.tableColW.c2,border:1,borderStyle:"solid"}}>
                {c.mail}</td>
        <td key={this.props.no*10+3}
            style={{width:$w.tableColW.c3,border:1,borderStyle:"solid"}}>
                {c.action?"Ｘ":""}</td>
        <td key={this.props.no*10+4}
            style={{width:$w.tableColW.c4,border:1,borderStyle:"solid"}}>
                {$w.catMap[c.cat]}</td>
        <td key={this.props.no*10+5}
            style={{width:$w.tableColW.c5,border:1,borderStyle:"solid"}}>
                {c.id}</td>
      </tr>
    );
  }
 });
  var Application = React.createClass({
    getInitialState: function() {
        $w.app = this;
        return {
                    blank:{
                        action:false,
                        id:null,
                        mail:"",
                        name:"",
                        cat:"",
                    },
                    rcds:[],
                    form:{
                        action:false,
                        id:null,
                        mail:"",
                        name:"",
                        cat:"",
                    },
                    selRow:-1,
                    alert:{
                        isShow:false,
                        message:""
                    }
                  };
    },
    render: function() {
        var rcds = $w.app.state.rcds;
        var object_list = [];
        for (var i = 0; i < rcds.length; i++) {
            object_list.push(
                <Item rcd={rcds[i]} no={i}/>
            );
        }
         return (  
            <div style={{width:480}}>
        <b.Row style={{margin:20}}>
            <b.Button bsSize="small" bsStyle="primary" 
                onClick={this.dataRead} name="btnSearch"
                style={{width:$w.W.b1,marginLeft:20}}>データ読込 </b.Button>
            <b.Button bsSize="small" bsStyle="primary" 
                onClick={this.dialogTest} name="btnSearch2"
                style={{width:$w.W.b1,marginLeft:20}}>ダイアログ</b.Button>
        </b.Row>
        <table cellPadding={10} cellSpacing={10} 
            style={{border:1,borderStyle:"solid",
             width:500,backgroundColor: "#F0F0F0"}}>
            <thead>
            <tr>
              <th width={$w.tableColW.c1} style={{border:1,borderStyle:"solid"}}>
                名前</th>
              <th width={$w.tableColW.c2} style={{border:1,borderStyle:"solid"}}>
                メール</th>
              <th width={$w.tableColW.c3} style={{border:1,borderStyle:"solid"}}>
                Action</th>
              <th width={$w.tableColW.c4} style={{border:1,borderStyle:"solid"}}>
                Cat</th>
              <th width={$w.tableColW.c5} style={{border:1,borderStyle:"solid"}}>
                id</th>
            </tr>
            </thead>
            <tbody>

            {object_list}
            </tbody>
        </table>        
        <b.Row style={{margin:20}}>
            <b.Button bsSize="small" bsStyle="primary" 
                onClick={this.updateClick} name="btnUpdate"
                style={{width:$w.W.b2,marginLeft:20}}>更新</b.Button>
            <b.Button bsSize="small" bsStyle="primary" 
                onClick={this.newClick} name="btnNew"
                style={{width:$w.W.b2,marginLeft:20}}>新規</b.Button>
            <b.Button bsSize="small" bsStyle="primary" 
                onClick={this.deleteClick} name="btnDelete"
                style={{width:$w.W.b2,marginLeft:20}}>削除</b.Button>
        </b.Row>  
        <b.Row style={{marginLeft:20}}>
            <span style={{width:$w.W.l1,marginLeft:20,float:"left",
                color:"#000000"}}>名前</span>
            <b.Input type="text" name="form#name" 
                value={$w.app.state.form.name} onChange={$c.onChange} 
                style={{width:"120",marginLeft:20,color:"#000000"}}/>
          </b.Row> 
        <b.Row style={{marginLeft:20}}>
            <span style={{width:$w.W.l1,marginLeft:20,float:"left",
                color:"#000000"}}>メール</span>
             <b.Input type="text" name="form#mail" 
                value={$w.app.state.form.mail} onChange={$c.onChange}  
                style={{width:"300",marginLeft:20,color:"#000000"}}/>
        </b.Row> 
        <b.Row style={{marginLeft:20,height:40}}>
           <span style={{width:$w.W.l1,marginLeft:20,float:"left",
            color:"#000000"}}>Action</span>
            <b.Input type="checkbox" name="form#action" 
            checked={$w.app.state.form.action?"checked":""}　
            onChange={$c.onChecked} 
            style={{width:"20",height:"20",marginTop:-10
            ,marginLeft:0,color:"#000000"}}/>
        </b.Row> 
          <b.Row style={{marginLeft:20}}>
            <span style={{width:$w.W.l1,marginLeft:20,float:"left",
                color:"#000000"}}>CAT</span>
            <b.Input type="select" label='' name={"form#cat"} 
              onChange={$c.onChange}  
              style={{height:30, width:88,color:"#000000"}}>
                {$c.Option($w.app.state.form.cat,$w.catMap)}
            </b.Input>
        </b.Row> 
        <b.Row style={{marginLeft:20}}>
            <span style={{width:$w.W.l1,float:"left",
                marginLeft:20,color:"#000000"}}>ID</span>
            <b.Input type="text" value={$w.app.state.form.id}
                disabled  style={{width:"60",color:"#000000"}}/>
        </b.Row> 
        <span style={{clear:"both"}}></span>
        <$c.Alert/>          
        </div>
        )
    } ,
    callback: function(res,status) { 
        var para =
            {
                rcds:res,
                selRow:-1,
                form:$c.deepCopy($w.app.state.blank)
            }
         $w.app.setState(para)
    },    
    dataRead: function() {    
        $c.ajaxPostJson("dataget",{},this.callback)
    },
    rowClick:function(e){
        row=e.target.parentNode.id.substr(3)
        var para={
            selRow:parseInt(row,10),
            form:$c.deepCopy($w.app.state.rcds[row])
        }
        $w.app.setState(para)
    },
    newClick:function(e){
        var para={
            selRow:-1,
            form:$c.deepCopy($w.app.state.blank)
        }
        $w.app.setState(para)
    },
    getId:function(){
        var maxid=-1
        for (i=0;i<$w.app.state.rcds.length;i++){
            if ($w.app.state.rcds[i]["id"] > maxid){
                maxid = $w.app.state.rcds[i]["id"]
            }
        }
        return maxid+1
    },
    deleteClick:function(e){
        var para=$w.app.state
        para.rcds.splice(para.selRow,1)
        para.selRow=-1
        para.form=$c.deepCopy($w.app.state.blank)
        $w.app.setState(para)
    },    
    updateClick:function(e){
        var para=$w.app.state
        if ($w.app.state.form.id==null){
            var len=$w.app.state.rcds.length
            para.rcds[len]=$c.deepCopy($w.app.state.form)
            para.rcds[len]["id"]=this.getId()
            para.selRow=-1
            para.form=$c.deepCopy($w.app.state.blank)
        } else {
            para.rcds[$w.app.state.selRow]=$c.deepCopy($w.app.state.form)
        }
        $w.app.setState(para)
    },
    dialogTest:function(e){
        para=$w.app.state.alert
        para["isShow"]=true
        para["message"]="これはダイアログの\nテストです。"
        $w.app.setState(para)
    }
  });
React.render(React.createElement(Application, null),
     document.getElementById('content'));