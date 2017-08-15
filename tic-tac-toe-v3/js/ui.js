(function($) {

	// function changeBody(html){
	//  	$('body').empty();
	//  	//const startHTML = '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>';
	//  	$('body').append(html);		
	// }

	// changeBody('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>');

 	$('#start .button').on('click',()=>{
 		 $('#start').hide();
         $('#board').show();
         playing();
 	});

    $('#finish .button').on('click',()=>{
        showOneTemplate('#board');
        clearBoard();
        playing();

    });
	showOneTemplate('#start');

    function clearBoard(){
        $('.boxes li').removeClass('box-filled-1');
        $('.boxes li').removeClass('box-filled-2');
        $('.boxes li').css("background-image",'');
        $('#player1').removeClass('active');
        $('#player2').removeClass('active');
    }

    function showOneTemplate(targetTemplate){
        templates = ['#start','#board','#finish']
        templates.forEach((template)=>$(template).hide());
        $(targetTemplate).show();
    
    }


	function playing(){
        //initiate the value
        const wins = [7, 56, 448, 73, 146, 292, 273, 84];

        let score= {'X':0,'O':0};
        let moves = 0;
        let turn = 'O';     
        $('#player1').addClass('active');
        let players = {
            'X':{'background-image':'url(img/x.svg)','id':'#player2','box-style':'box-filled-2'},
            'O':{'background-image':'url(img/o.svg)','id':'#player1','box-style':'box-filled-1'}
        }		
 		let cells = $('.boxes .box');
 		for (let i=0;i<9;i++){
			let value = Math.pow(2,i);
			$(cells[i]).attr("value",value);
		}
        this.test= 1;
 		$('.boxes').click(function(event){    
			score[turn] = score[turn] + event.target.value;
			moves+=1; 
			if (win(score[turn])) {
            	showOneTemplate('#finish');
                turn === 'O'?$('#finish').addClass('screen-win-one'):$('#finish').addClass('screen-win-two');
                score= {'X':0,'O':0};
                moves = 0;
                turn = 'O';    
            } else if (moves === 9) {
 	            showOneTemplate('#finish');
                $('#finish').removeClass('screen-win-one');
                $('#finish').removeClass('screen-win-two');    
                $('#finish').addClass('screen-win-tie');	
                score= {'X':0,'O':0};
                moves = 0;
                turn = 'O';                  		
            	
        	} else {
                $(event.target).css("background-image",players[turn]['background-image']);
                $(event.target).attr("clicked",1);
                $(event.target).addClass(players[turn]['box-style']);
                $(players[turn]['id']).removeClass('active');
                turn= turn==='O'?'X':'O';
                $(players[turn]['id']).addClass('active');
        	}

		});

		$('.boxes').on('mouseover',(event)=>{
        		if (!$(event.target).attr('clicked')){
        			if (turn === 'O'){$(event.target).css("background-image",'url(img/o.svg)');}
        			else{$(event.target).css("background-image",'url(img/x.svg)');}
        			
        		}

		});
		$('.boxes').on('mouseout',(event)=>{
        		if (!$(event.target).attr('clicked')){
        			$(event.target).css("background-image",'');
        		}
		});		
		function win(score){
			return wins.indexOf(score) >-1?true:false;
		}

	}






})(jQuery);