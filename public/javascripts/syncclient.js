var getCurrentWeek = function () {
	$.ajax({
		type: "POST",
		url: '/sync',
		data: {rid: 0, type: 0},
		success: function (json) {
			if(json.trim()) {
				var data = json.trim();
				$('#history')[0].innerHTML = data;
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