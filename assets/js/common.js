
  "use strict";
	var checkAndCreate;

	checkAndCreate = function(v) {
		if (window[v] == null) {
			return window[v] = {};
		}
	};

	checkAndCreate("$c");

	$c.checkAndCreate = checkAndCreate;
    $c.contextpath ="/";

	$c.onChange = function(e) {
		var state = $w.app.state;
		var names = e.target.name.split("#")
		switch (names.length) {
			case 1: state[names[0]]=e.target.value
				break;
			case 2: state[names[0]][names[1]]=e.target.value
				break;
			case 3: state[names[0]][names[1]][names[2]]=e.target.value
				break;
			case 4: state[names[0]][names[1]][names[2]][names[3]]=e.target.value
				break;
			default:
				panic("name length over")
		}
		$w.app.setState(state)

	};
    $c.onChecked = function(e) {
		var state = $w.app.state;
		var names = e.target.name.split("#")
		switch (names.length) {
			case 1: state[names[0]]=e.target.checked?true:false
				break;
			case 2: state[names[0]][names[1]]=e.target.checked?true:false
				break;
			case 3: state[names[0]][names[1]][names[2]]=e.target.checked?true:false
				break;
			case 4: state[names[0]][names[1]][names[2]][names[3]]=e.target.checked?true:false
				break;
			default:
				panic("name length over")
		}
		$w.app.setState(state)

	};

	$c.ajaxPost = function(url, data, contenttype, callback) {
		$.ajax({
			type : "POST",
			url : $c.contextpath + url,
			data : data,
			contentType : contenttype
		}).fail(function(jqXHR, textStatus) {
		  console.log("Internet or Server Error")
          callback(jqXHR, textStatus)
		}).done(callback);
	}

	$c.ajaxPostJson = function(url, param, callback) {
		var data = JSON.stringify(param);
		$c.ajaxPost(url, data, "text/json", callback);
	}
  
