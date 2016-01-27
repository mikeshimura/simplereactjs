var b = ReactBootstrap;
$c.MulitLine = React.createClass({
  render: function () {
    var sarray = this.props.value.split("\n");
    var lines = sarray.map(function(line,i){
        if (i===0){
          return <span key={i}>{line}</span>;
        } else {
          return <span  key={i}><br/>{line}</span>;
        }
      },this);
    return (
        <div>
        {lines}
        </div>
      );
  }
});
$c.Alert = React.createClass({
    mixins: [b.OverlayMixin],
    render: function () {
        return (
            <span/>
        );
    },
    renderOverlay: function () {
        if ($w.app.state.alert.isShow==false){
            return (
            <span/>
        );
    }
    return (
        <b.Modal onRequestHide={function(){}} className="alert" >
            <div className="modal-body">
            <$c.MulitLine value={$w.app.state.alert.message} />
                </div>
            <div className="modal-footer">
            <b.Button bsStyle="primary" onClick={this.onClick} 
                name="alert#CloseBtn">了解</b.Button>
            </div>
            </b.Modal>
        );
    },
    onClick:function(){
        para=$w.app.state.alert
        para["isShow"]=false
        para["message"]=""
        $w.app.setState(para)
    }
});  
$c.Option= function(value,map){
var options = []
for (key in map){
        options.push( 
        <option  
        value={key} label={map[key]} 
        selected={(key==value)?"selected":""}
        >{map[key]}</option> )
    }  
    return options  
}