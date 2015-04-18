$(document).ready(function(){




	$(".deleteButton").click(function(){
		var thisId=$(this)[0].id;
		console.log(this.id);
		console.log(typeof thisId);


		$.ajax({
			url: "/todo",
			method: "DELETE",
			data:{
				todo_id: thisId
			},
			success: function (response){
					$("#row_"+thisId).remove();
					console.log("#row_"+ thisId);
			}
		});
	});


});
