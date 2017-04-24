$(document).ready(function () {
    var boardSize = 9;
    var board = createBoard(boardSize);
    render(board);

    /*click(){}
        1. 
    */


});


function Cell(id) {	
	this.state = ".inactive";
	this.container = '.grid';
	this.id = id;
	this.cssclass ="cell";
    this.isBomb = false;
};

function createBoard(size){
    var newBoard = [];
    var bombs = [];
    //determine bomb locations - any location on the board and equal to sqrt of the board... for now???
    for(i = 0;i < size; i++){
       bombs.push(Math.floor(Math.random()* (size * size)));
       console.log(bombs);
    }
    for(i = 0;i < size*size; i++){
        newBoard.push(new Cell(i));
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

    $('#gameContainer').height(height + 50);
    $('#gameContainer').width(width + 50);
    $('#boardContainer').css("width", width);
    $('#boardContainer').css("height",height);

    //add cells TO container
    for(i = 0; i< boardToRender.length; i++){
        var htmlstring = '<div id = "'+ boardToRender[i].id+ '" class = "inactive '+ boardToRender[i].cssclass+'"> </div>';
        $('#boardContainer').append($(htmlstring));
    }

}