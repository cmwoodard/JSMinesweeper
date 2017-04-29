$(document).ready(function () {
    var boardSize = 15;
    var board = createBoard(boardSize);
    //array of cells that surround any particular cell
    var offset = [-(boardSize-1), -boardSize, -(boardSize+1), boardSize+1, boardSize-1, boardSize, 1, -1];
    var leftOffset = [-boardSize, -(boardSize-1), boardSize+1, boardSize, 1];
    var rightOffset = [-boardSize, -(boardSize+1), boardSize-1, boardSize, -1];
    render(board);
    

    $('.cell').mousedown(function(event) {
        switch (event.which) {
            case 1:
                console.log('Left Mouse button pressed.');
                break;
            case 2:
                console.log('Middle Mouse button pressed.');
                break;
            case 3:
                console.log('Right Mouse button pressed.');
                var oncontextmenu = document.oncontextmenu;
                document.oncontextmenu = function(){return false;};
                $(this).addClass('flagged');
                break;
    }
});
     $('.cell').on("click", function(){
            var bomb = board[$(this).attr('id')].isBomb;
            var id = board[$(this).attr('id')].id;
            var currentOffset = offset;
            var queue = [board[id]];
           

            //prevents overflow by removing right/left from the offset
            currentOffset = getOffset(id, boardSize);        
            if(bomb){
                $(this).addClass('bomb');
            }

            //makes THIS square active
            board[id].active = true;

            //loop through all surrounding cells and push each to the queue if it's not marked active
            //activate queue[0], push its surrounding inactive cells to queue and delete queue[0]
            //repeat until queue is empty
            while(queue.length > 0){
            //loops through adjacent cells
                for(i = 0;i <currentOffset.length; i++){
                    var currentID = (id+currentOffset[i]);
                    //var element = $('#'+(id+currentOffset[i]));                

                    if(currentID >= 0 && currentID < (boardSize*boardSize) && !board[currentID].isBomb &&!board[currentID].active && !board[currentID].flagged){         
                        if(board[currentID].numAdjacent == 0){
                            queue.push(board[currentID]);
                        }
                        else{
                            board[currentID].active = true;
                            var element = $('#'+(board[currentID]).id);
                            $(element).addClass('active');
                        }
                        
                    }                   
                }
                var element = $('#'+(queue[0]).id);
                $(element).addClass('active');
                queue[0].active = true;
                id = queue.shift().id;
                currentOffset = getOffset(id, boardSize);
            }

            for(i = 0;i <board.length; i++){
                if(board[i].numAdjacent != 0 && board[i].active){
                        $('#'+i).text(board[i].numAdjacent);
                }            
            }
     });
});

function Cell(id) {	
	this.state = ".inactive";
	this.container = '.grid';
	this.id = id;
	this.cssclass ="cell";
    this.isBomb = false;
    this.numAdjacent = 0;
    this.active = false;
    this.flagged = false;
};

function createBoard(size){
    var newBoard = [];
    var bombs = [];    
    //var currentOffset = [-(size-1), -size, -(size+1), size+1, size-1, size, 1, -1];
    var currentOffset = [];
   
    //cycles throughh the entire board
    for(i = 0;i < size*size; i++){
        newBoard.push(new Cell(i));
    }
    //determine bomb locations - any location on the board and equal to sqrt of the board... for now???
    for(i = 0;i < size*4; i++){
       bombs.push(Math.floor(Math.random()* (size * size)));
       newBoard[bombs[i]].isBomb = true;
    }

    for(i = 0;i < size*size; i++){
       
        //this sets id to the current element on the board
        var id = newBoard[i].id;      
        
        //prevents overflow by removing right/left from the offset
        var offset = [-(size-1), -size, -(size+1), size+1, size-1, size, 1, -1];
        var leftOffset = [-size, -(size-1), size+1, size, 1];
        var rightOffset = [-size, -(size+1), size-1, size, -1];
        if(id%size == 0){
            currentOffset = leftOffset.slice();
        }
        else if(id%size == size-1){
            currentOffset = rightOffset.slice();
        } 
        else{
            currentOffset= offset.slice();
        }  

        //this SHOULD be an inner loop to scroll through all of the surrounding cells
        for(j = 0;j <currentOffset.length; j++){
            var currentID = (id+currentOffset[j]);
            if(currentID >= 0 && currentID < (size*size) && newBoard[currentID].isBomb){                
                newBoard[i].numAdjacent +=1;
            }               
        }

    }
    
    return newBoard;
}

function render(boardToRender){
    //wipe the game container clean
    $('#boardContainer').html('');

    //set cell Height and Width
    var cellHeight = 15;
    $('.cell').css("height", cellWidth);
    var cellWidth = 15;
    $('.cell').css("width", cellWidth);
    
    //set container height and width
    var height = Math.sqrt(boardToRender.length)*(cellHeight+2);
    var width = Math.sqrt(boardToRender.length)*(cellWidth+2);

    $('#gameContainer').height(height + (height*.1));
    $('#gameContainer').width(width + (width*.1));
    $('#boardContainer').css("width", width);
    $('#boardContainer').css("height",height);

    //add cells TO container
    for(i = 0; i< boardToRender.length; i++){
        var htmlstring = '<div id = "'+ boardToRender[i].id+ '" class = "inactive '+ boardToRender[i].cssclass+'"> </div>';
        $('#boardContainer').append($(htmlstring));
    }

}

function getOffset(currentID, size){
    //all directions
    var offset = [-(size-1), -size, -(size+1), size+1, size-1, size, 1, -1];
    var leftOffset = [-size, -(size-1), size+1, size, 1];
    var rightOffset = [-size, -(size+1), size-1, size, -1];

    //this set is just 4 cardinal directions
    //var offset      = [-size, size,  1, -1];
    //var leftOffset  = [-size, size,  1];
    //var rightOffset = [-size, size, -1];

    if(currentID%size == 0){
        return leftOffset.slice();
    }
    else if(currentID%size == size-1){
        return rightOffset.slice();
    } 
    else{
        return offset.slice();
    }  
}
