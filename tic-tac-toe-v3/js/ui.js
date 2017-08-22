(function($) {
 	$('#start .button').on('click',()=>{
 		 $('#start').hide();
         $('#board').show();
         let person = prompt("Please enter your name", "Harry Potter");
         playing(person);
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
        $('.boxes li').removeAttr('clicked');
    }

    function showOneTemplate(targetTemplate){
        templates = ['#start','#board','#finish']
        templates.forEach((template)=>$(template).hide());
        $(targetTemplate).show();
    
    }


	function playing(person){
        //initiate the value
        const wins = [7, 56, 448, 73, 146, 292, 273, 84];
        //let person=person;

        let score= {'X':0,'O':0};
        let moves = 0;
        let turn = 'O';     
        $('#player1').addClass('active');
        $('h2').html(person);
        let players = {
            'X':{'background-image':'url(img/x.svg)','id':'#player2','box-style':'box-filled-2'},
            'O':{'background-image':'url(img/o.svg)','id':'#player1','box-style':'box-filled-1'}
        }		
 		let cells = $('.boxes .box');
        let lists = [0,1,2,3,4,5,6,7,8];
        lists.forEach(list=>{
            let value = Math.pow(2,list);
            $(cells[list]).attr("value",value);
        })

        function removeListeners(){
            $('.boxes').off("click");
            $('.boxes').off("mouseover");
            $('.boxes').off("mouseout");       
        }

        // function sleep(ms) {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // }
 		$('.boxes').click(function(event){  
            let person = $('h2').html();  
            let oVal;
            let xVal;
			score[turn] = score[turn] + event.target.value;
			moves+=2; 
            console.log(lists);
			if (win(score[turn])) {
            	showOneTemplate('#finish');
                if (turn === 'O'){
                     $('.name').remove();
                     $('#finish').removeClass('screen-win-two');
                    $('#finish').addClass('screen-win-one');
                    $(`<h4 class='name'>${person} wins</h4>`).insertAfter('#finish h1');;
                }
                else {
                    $('#finish').removeClass('screen-win-one');
                    $('#finish').addClass('screen-win-two');
                    $('.name').remove();
                }
                removeListeners(); 
            } else if (moves > 9) {
 	            showOneTemplate('#finish');
                $('#finish').removeClass('screen-win-one');
                $('#finish').removeClass('screen-win-two');    
                $('#finish').addClass('screen-win-tie');	
                $('.name').remove();
                removeListeners();             		
            	
        	} else {
                $(event.target).css("background-image",players[turn]['background-image']);
                $(event.target).attr("clicked",1);
                $(event.target).addClass(players[turn]['box-style']);
                oVal = parseInt($(event.target).attr("order"));
                lists.splice(lists.indexOf(oVal),1);
                $(players['O']['id']).removeClass('active');
                $(players['X']['id']).addClass('active');
                computerPlaying(oVal);

        	}

		});

        function computerPlaying(oVal){

            let yVal = lists[Math.floor(Math.random( ) *lists.length )];
            $( ".boxes li[order=" + yVal + "]" ).attr("clicked",1);
            $( ".boxes li[order=" + yVal + "]" ).css("background-image",players['X']['background-image']);
            $( ".boxes li[order=" + yVal + "]" ).addClass(players['X']['box-style']);
            lists.splice(lists.indexOf(yVal),1);
            $(players['X']['id']).removeClass('active');
            $(players['O']['id']).addClass('active');
            score['X'] = score['X'] + parseInt($( ".boxes li[order=" + yVal + "]" ).attr('value'));
            if (win(score['X'])) {
                $('#finish').removeClass('screen-win-one');
                $('#finish').removeClass('screen-win-two');    
                $('#finish').addClass('screen-win-tie');    
                $('.name').remove();
                removeListeners(); 
            }
            //await sleep(2000);
        }



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
			
            for (let i = 0; i < wins.length; i += 1) {
                if ((wins[i] & score) === wins[i]) {
                    return true;
                }
            }
            return false;
		}

	}






})(jQuery);