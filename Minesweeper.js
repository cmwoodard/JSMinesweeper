$(document).ready(function () {
    var boardSize = 15;
    var board = createBoard(boardSize);
    //array of cells that surround any particular cell
    var offset = [-(boardSize-1), -boardSize, -(boardSize+1), boardSize+1, boardSize-1, boardSize, 1, -1];
    var leftOffset = [-boardSize, -(boardSize-1), boardSize+1, boardSize, 1];
    var rightOffset = [-boardSize, -(boardSize+1), boardSize-1, boardSize, -1];
    render(board);

    /*click(){}
        1. 
    */
     $('.cell').on("click", function(){
            var bomb = board[$(this).attr('id')].isBomb;
            var id = board[$(this).attr('id')].id;
            var currentOffset = offset;

            //prevents overflow by removing right/left from the offset
            if(id%boardSize == 0){
                currentOffset = leftOffset.slice();
            }
            else if(id%boardSize == boardSize-1){
                currentOffset = rightOffset.slice();
            }            
            if(bomb){
                $(this).addClass('bomb');
            }
            else{
                $(this).addClass('active');
            }
            $(this).text(board[id].numAdjacent);
            for(i = 0;i <currentOffset.length; i++){
                var element = $('#'+(id+currentOffset[i]));
                var currentID = (id+currentOffset[i]);

                //this is temporary, we don't it to show bombs if you click somewhere near it
                //instead lets show the number of bombs around it rather than just making it active.... maybe we should calculate that....
                //.... initially?
                if(currentID >= 0 && currentID < (boardSize*boardSize) && !board[currentID].isBomb){
                    $(element).addClass('active');     

                }
                else{
                    $(element).addClass('bomb');
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
};

function createBoard(size){
    var newBoard = [];
    var bombs = [];
    
    var currentOffset = [-(size-1), -size, -(size+1), size+1, size-1, size, 1, -1];
    

   
    //cycles throughh the entire board
    for(i = 0;i < size*size; i++){
        newBoard.push(new Cell(i));
    }
    //determine bomb locations - any location on the board and equal to sqrt of the board... for now???
    for(i = 0;i < size; i++){
       bombs.push(Math.floor(Math.random()* (size * size)));
       newBoard[bombs[i]].isBomb = true;
    }

    for(i = 0;i < size*size; i++){
       
        //this sets id to the current element on the board
        var id = newBoard[i].id;        
        
        //prevents overflow by removing right/left from the offset
        if(id%size == 0){
            currentOffset = [-size, -(size-1), size+1, size, 1];
        }
        else if(id%size == size-1){
            currentOffset = [-size, -(size+1), size-1, size, -1];
        }
        else{
            currentOffset = [-(size-1), -size, -(size+1), size+1, size-1, size, 1, -1];
        }

        //this SHOULD be an inner loop to scroll through all of the surrounding cells
        for(j = 0;j <currentOffset.length; j++){
            var currentID = (id+currentOffset[j]);
            /*if(currentID >=0 && currentID < size*size){
                console.log(currentID + ': ' + newBoard[currentID]);
            }*/
           /*
            if(currentID >= 0 && currentID < (size*size) && newBoard[currentID].isBomb){
                //console.log(newBoard[currentID].isBomb);
                console.log(newBoard[currentID].isBomb);
            }*/
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