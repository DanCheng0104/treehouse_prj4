(function($) {
    //this is when the user click the yes button on the start page, so it will play against computer
    $('#yes').on('click',()=>{
        //remove all the bottoms and player p tag
         $('#yes').remove();
         $('#no').remove();
         $('p').remove();
         let html =`<p>
            Player1: <input type="text" id="p1" placeholder="player1">
         </p><a href="#" id='startBtn' class="button">Start game</a>`
         $(html).insertAfter('#start h1');
         $('#startBtn').on('click',()=>{
             let person = $('#p1').val();          
             $('#start').hide();
             $('#board').show();
             playing(person);
         });
    });
    //this is when the user click the no button on the start page, so it will play against computer
    $('#no').on('click',()=>{
        //remove all the bottoms and player p tag
         $('#yes').remove();
         $('#no').remove();
         $('p').remove();
         let html =`<p>
            Player1: <input type="text" id="p1" placeholder="player1">
            Player2: <input type="text" id="p2" placeholder="player2">
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
        (p2  === "")? playing(p1):playing(p1,p2);        
    });

	showOneTemplate('#start');
    //clear the board when game is over
    function clearBoard(){
        $('.boxes li').removeClass('box-filled-1');
        $('.boxes li').removeClass('box-filled-2');
        $('.boxes li').css("background-image",'');
        $('#player1').removeClass('active');
        $('#player2').removeClass('active'); 
        $('.boxes li').removeAttr('clicked');
    }
    //by default all the three html templates are in the html, the
    function showOneTemplate(targetTemplate){
        templates = ['#start','#board','#finish']
        templates.forEach((template)=>$(template).hide());
        $(targetTemplate).show();
    
    }
    //remove all the listners on the board
    function removeListeners(){
        $('.boxes').off("click");
        $('.boxes').off("mouseover");
        $('.boxes').off("mouseout");       
    }

    //check if the player wins
    function win(score){
        const wins = [7, 56, 448, 73, 146, 292, 273, 84];
        for (let i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    }

    //showing correct class based on which player wins
    function polishFinish(class_added,text){
        showOneTemplate('#finish');
        const classes = ['screen-win-one','screen-win-two','screen-win-tie'];
        classes.forEach(x => $('#finish').removeClass(x));
        $('#finish').addClass(class_added);  
        $('h4').remove(); 
        $(`<h4 class='name'>${text}</h4>`).insertAfter('#finish h1');
        removeListeners(); 
    }

    //core function in this code, when person 2 is not defined, it will play with computer
    function playing(person1,person2){
        const wins = [7, 56, 448, 73, 146, 292, 273, 84];
        //set player 1's name on the board
        $('#p1_name').html(person1);
        let cells = $('.boxes .box');
        for (let i=0;i<9;i++){
            let value = Math.pow(2,i);
            $(cells[i]).attr("value",value);
        }  

        if (person2 !=='') {
            //set player 2's name on the board
            $('#p2_name').html(person2);
        }

        let lists = [0,1,2,3,4,5,6,7,8];
        //give each cell value, from which we calculate the score, based on the score, we would know if the player wins
        lists.forEach(list=>{
            let value = Math.pow(2,list);
            $(cells[list]).attr("value",value);
        })
        let score= {'X':0,'O':0};
        let moves = 0;
        let turn = 'O';     
        $('#player1').addClass('active');
        let players = {
            'X':{'background-image':'url(img/x.svg)','id':'#player2','box-style':'box-filled-2'},
            'O':{'background-image':'url(img/o.svg)','id':'#player1','box-style':'box-filled-1'}
        }       

        
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
                polishFinish('screen-win-two','Computer wins!');   
            }
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

        $('.boxes').click(function(event){    
            console.log(person1);
            console.log(person2);
            //when two players are playing
            if (person2 !== undefined) {
                score[turn] = score[turn] + event.target.value;
                moves+=1; 
                if (win(score[turn])) {
                    (turn === 'O')?polishFinish('screen-win-one',person1 + ' wins!'):polishFinish('screen-win-two',person2 + ' wins!');   
                } else if (moves === 9) {
                    polishFinish('screen-win-tie','It\'s a tie!');           
                
                } else {
                    $(event.target).css("background-image",players[turn]['background-image']);
                    $(event.target).attr("clicked",1);
                    $(event.target).addClass(players[turn]['box-style']);
                    $(players[turn]['id']).removeClass('active');
                    turn= turn==='O'?'X':'O';
                    $(players[turn]['id']).addClass('active');
                }
              
            }
            //when playing against computer
            else{
                let oVal;
                score[turn] = score[turn] + event.target.value;
                moves+=2; 
                if (win(score[turn])) {
                    polishFinish('screen-win-one',person1 + ' wins!')
                } else if (moves > 9) {
                    polishFinish('screen-win-two',person2 + ' wins!');                                    
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

            }

        });

    }

})(jQuery);