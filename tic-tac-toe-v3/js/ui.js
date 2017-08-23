(function($) {
    $('#yes').on('click',()=>{
         $('#yes').remove();
         $('#no').remove();
         $('p').remove();
         let html =`<p>
            Player1: <input type="text" id="p1" value="Mickey">
         </p><a href="#" id='startBtn' class="button">Start game</a>`
         $(html).insertAfter('#start h1');
         $('#startBtn').on('click',()=>{
             let person = $('#p1').val();          
             $('#start').hide();
             $('#board').show();
             playingWithComputer(person);
         });
    });

    $('#no').on('click',()=>{
         $('#yes').remove();
         $('#no').remove();
         $('p').remove();
         let html =`<p>
            Player1: <input type="text" id="p1" value="Mickey">
            Player2: <input type="text" id="p2" value="Mickey">
         </p><a href="#" id='startBtn' class="button">Start game</a>`
         $(html).insertAfter('#start h1');
         $('#startBtn').on('click',()=>{
             let person1 = $('#p1').val();    
             let person2 = $('#p2').val();        
             $('#start').hide();
             $('#board').show();
             playing(person1,person2);
         });
    });

    $('#finish .button').on('click',()=>{
        showOneTemplate('#board');
        clearBoard();
        let p1 = $('#p1_name').html();
        let p2 = $('#p2_name').html();

        (p2  === "")? playingWithComputer(p1):playing(p1,p2);
        

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

    function removeListeners(){
        $('.boxes').off("click");
        $('.boxes').off("mouseover");
        $('.boxes').off("mouseout");       
    }

    function win(score){
        const wins = [7, 56, 448, 73, 146, 292, 273, 84];
        for (let i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    }

    $('.boxes').on('mouseover',(event)=>{
            if (!$(event.target).attr('clicked')){
                if ($('#player1').hasClass("active")){$(event.target).css("background-image",'url(img/o.svg)');}
                else{$(event.target).css("background-image",'url(img/x.svg)');}
                
            }

    });
    $('.boxes').on('mouseout',(event)=>{
            if (!$(event.target).attr('clicked')){
                $(event.target).css("background-image",'');
            }
    }); 

    function playing(person1,person2){
        const wins = [7, 56, 448, 73, 146, 292, 273, 84];
        $('#p1_name').html(person1);
        if (person2 !=='') {$('#p2_name').html(person2)};
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

        $('.boxes').click(function(event){    
            score[turn] = score[turn] + event.target.value;
            moves+=1; 
            if (win(score[turn])) {
                showOneTemplate('#finish');
                turn === 'O'?$('#finish').addClass('screen-win-one'):$('#finish').addClass('screen-win-two');
                removeListeners(); 
            } else if (moves === 9) {
                showOneTemplate('#finish');
                $('#finish').removeClass('screen-win-one');
                $('#finish').removeClass('screen-win-two');    
                $('#finish').addClass('screen-win-tie');    
                removeListeners();                  
                
            } else {
                $(event.target).css("background-image",players[turn]['background-image']);
                $(event.target).attr("clicked",1);
                $(event.target).addClass(players[turn]['box-style']);
                $(players[turn]['id']).removeClass('active');
                turn= turn==='O'?'X':'O';
                $(players[turn]['id']).addClass('active');
            }

        });
    }

    function playingWithPerson(person1,person2){
        //initiate the value
        // const wins = [7, 56, 448, 73, 146, 292, 273, 84];
        // $('#p1_name').html(person1);
        // $('#p2_name').html(person2);
        // let score= {'X':0,'O':0};
        // let moves = 0;
        // let turn = 'O';     
        // $('#player1').addClass('active');
        // let players = {
        //     'X':{'background-image':'url(img/x.svg)','id':'#player2','box-style':'box-filled-2'},
        //     'O':{'background-image':'url(img/o.svg)','id':'#player1','box-style':'box-filled-1'}
        // }       
        // let cells = $('.boxes .box');
        // for (let i=0;i<9;i++){
        //     let value = Math.pow(2,i);
        //     $(cells[i]).attr("value",value);
        // }
        // playing(person1,person2);

        // $('.boxes').click(function(event){    
        //     score[turn] = score[turn] + event.target.value;
        //     moves+=1; 
        //     if (win(score[turn])) {
        //         showOneTemplate('#finish');
        //         turn === 'O'?$('#finish').addClass('screen-win-one'):$('#finish').addClass('screen-win-two');
        //         removeListeners(); 
        //     } else if (moves === 9) {
        //         showOneTemplate('#finish');
        //         $('#finish').removeClass('screen-win-one');
        //         $('#finish').removeClass('screen-win-two');    
        //         $('#finish').addClass('screen-win-tie');    
        //         removeListeners();                  
                
        //     } else {
        //         $(event.target).css("background-image",players[turn]['background-image']);
        //         $(event.target).attr("clicked",1);
        //         $(event.target).addClass(players[turn]['box-style']);
        //         $(players[turn]['id']).removeClass('active');
        //         turn= turn==='O'?'X':'O';
        //         $(players[turn]['id']).addClass('active');
        //     }

        // });
    }

	function playingWithComputer(person){
        //initiate the value
        
        let score= {'X':0,'O':0};
        let moves = 0;
        let turn = 'O';     
        $('#player1').addClass('active');
        $('#p1_name').html(person);

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

 		$('.boxes').click(function(event){  
            let person = $('#player1').html();  
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
                    $('#finish').removeClass('screen-win-tie');    
                    $(`<h4 class='name'>${person} wins</h4>`).insertAfter('#finish h1');
                }
                else {
                    $('#finish').removeClass('screen-win-one');
                    $('#finish').addClass('screen-win-two');
                    $('#finish').removeClass('screen-win-tie');    
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
                showOneTemplate('#finish');
                $('#finish').removeClass('screen-win-one');
                $('#finish').addClass('screen-win-two');    
                $('#finish').removeClass('screen-win-tie');    
                $('.name').remove();
                removeListeners(); 
            }
        }



	

	}






})(jQuery);