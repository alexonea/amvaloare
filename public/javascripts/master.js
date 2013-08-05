$('.add-income').tooltip({ title: 'Record a new income' });
$('.add-expense').tooltip({ title: 'Record a new expense' });

$('.add-income').on('click', function (e) {
	$('#add-income').modal();
});