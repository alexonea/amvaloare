$('.add-income').tooltip({ title: 'Add income source' });
$('.add-expense').tooltip({ title: 'Register an expense' });

$('.add-income').on('click', function (e) {
	$('#add-income').modal();
	updateDate();
});

$('#recurring-label-income').on('click', function () {
	toggleRecurringOptions(this);
});

$('#close-income').on('click', function () {
	$('#add-income').modal('toggle');
});

$('#submit-income').on('click', function () {
	$('#add-income-form').submit();
});

var updateDate = function () {

	var now = new Date();
 
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" +(day) ;

    $('#date').val(today);
};

var toggleRecurringOptions = function (e) {
	if ($(e).children()[0].checked)
		$('#recurring-options').show();
	else
		$('#recurring-options').hide();
};