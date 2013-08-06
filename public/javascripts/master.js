$('.add-income').tooltip({ title: 'Add income source' });
$('.add-expense').tooltip({ title: 'Register an expense' });

$('.add-income').on('click', function (e) {
	$('#add-income').modal();
	updateDate();
});

$('#recurring-label-income').on('click', function () {
	toggleRecurringOptions(this, 'income');
});

$('#close-income').on('click', function () {
	$('#add-income').modal('toggle');
});

$('#submit-income').on('click', function () {
	$('#add-income-form').submit();
});

$('.add-expense').on('click', function (e) {
	$('#add-expense').modal();
	updateDate();
});

$('#recurring-label-expense').on('click', function () {
	toggleRecurringOptions(this, 'expense');
});

$('#close-expense').on('click', function () {
	$('#add-expense').modal('toggle');
});

$('#submit-expense').on('click', function () {
	$('#add-expense-form').submit();
});

var updateDate = function () {

	var now = new Date();
 
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" +(day) ;

    $('#date').val(today);
};

var toggleRecurringOptions = function (e, form) {
	if ($(e).children()[0].checked)
		$('#recurring-options' + '-' + form).show();
	else
		$('#recurring-options' + '-' + form).hide();
};