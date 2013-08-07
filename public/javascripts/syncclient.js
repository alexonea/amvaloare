var getCurrentWeek = function () {
	$.ajax({
		type: "POST",
		url: '/sync',
		data: {rid: 0, type: true},
		success: function (json) {
			if(json.trim()) {
				var data = JSON.parse(json);

				if (data.length == 0) {
					$('#history')[0].innerHTML = '<i class="centre">No recent activity</i>';
				} else {
					$('#history')[0].innerHTML = '';

					for (var i = 0; i < data.length; i++) {
						$('#history')[0].innerHTML += '<p><b>' + data[i].value + '</b> on ' + data[0].date + '</p>';
					}
				}
				
			} else {
				$('#history')[0].innerHTML = '<b class="red">Error</b>';
			}
		},
		error: function(err) {
			console.error(err);
		}
	});
};

$(document).ready(function () {
	getCurrentWeek();
});