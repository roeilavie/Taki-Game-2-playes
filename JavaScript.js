colors = ["yellow", "blue", "red", "green"];
types = [1, 3, 4, 5, 6, 7, 8, 9, "changesDirection", "2plush", "stop", "taki"];
var tmpColor = "";//global variable, we use him when change color card picked
var checkWinner = false;//global variable, we use him when we want to know if there is a winner to the game
var player1 = new Player("first");//player number one gets the name of the div
var player2 = new Player("second");//player number two gets the name of the div

var cashier;
var tableDeck;
var checkTurn = 1;

//player object
function Player(name) {
    this.arr = [];//the array of cards
    this.name = name;//the name of the div
    this.insert = function (card) {
        this.arr.push(card);
    }//insert card to the array of the player
    this.remove = function (card) {
        var index = this.arr.indexOf(card);
        this.arr.splice(index, 1);
        return card;
    }//remove the card from the array of the player
    this.render = function () {
        var str = "";
        for (var i = 0; i < this.arr.length; i++) {
            str += this.arr[i].renderCard();
        }
        return str;
    }//show the cards of the player
    this.search = function (type, color) {
        for (var i = 0; i < this.arr.length; i++) {
            if (type == this.arr[i].type && color == this.arr[i].color) {
                return i;
            }
        }
        return null;
    }//search the card in the array of cards
    this.makeDisableTrue = function (imgPlayer) {
        for (var i = 0; i < imgPlayer.length; i++) {
            imgPlayer[i].setAttribute("onclick", "onPickclick(" + "'" + this.arr[i].type + "'" + ',' + "'" + this.arr[i].color + "'" + ")");
        }
    }//return the option to click on the img
    this.makeDisableFalse = function (imgPlayer) {
        for (var i = 0; i < imgPlayer.length; i++) {
            imgPlayer[i].removeAttribute("onclick");
        }
    }//no option to click on the img
}
//Card object
function Card(type, color) {
    this.name = type + "_" + color;
    this.type = type;
    this.color = color;
    this.image = "images/" + this.name + ".jpg";//src
    this.renderCard = function () {
        var str = "<img src = " + this.image + ">" ;
        return str;
    }
}

//Shuffle the package, i took the function from the lecture
function shuffle() {
    var i = cashier.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cashier[j];
        cashier[j] = cashier[i];
        cashier[i] = temp;
    }
}

//the function responsible to divide the cards to the players at the beggining.
//also, the function call to other function for show the cards on the screen, and dicide who play first.
function start() {
    //the start button become home page button
    var homePage = document.getElementById("start");
    homePage.setAttribute("value", "Home Page");
    homePage.setAttribute("onclick", "location.reload()");
    document.getElementById("startButton").style.visibility = "visible";

    //removing the img, and the headline before we start the game
    document.body.removeChild(document.getElementsByTagName("img")[0]);
    document.body.removeChild(document.getElementsByTagName("h1")[0]);
    insertElements();
    newGame();
}

//insert the elements to the html page
function insertElements() {
    var deck = document.getElementById("Deck");
    var player1h3 = document.createElement("h3");
    player1h3.setAttribute("id", "player1");

    var first = document.createElement("div");
    first.setAttribute("id", "first");

    var tableDeckSpan = document.createElement("span");
    tableDeckSpan.setAttribute("id", "tableDeck");

    var cashierSpan = document.createElement("span");
    cashierSpan.setAttribute("id", "cashier");

    var second = document.createElement("div");
    second.setAttribute("id", "second");

    var player2h3 = document.createElement("h3");
    player2h3.setAttribute("id", "player2");

    var change = document.createElement("div");
    change.setAttribute("id", "change");

    deck.appendChild(player1h3);
    deck.appendChild(first);
    deck.appendChild(tableDeckSpan);
    deck.appendChild(cashierSpan);
    deck.appendChild(second);
    deck.appendChild(player2h3);
    document.getElementById("Deck").appendChild(change);

}

//insert home page elements to the html page
function showLogo() {
    var img = document.createElement("img");
    img.setAttribute("src", "images/logo.png");
    img.setAttribute("id", "logo");

    var start = document.createElement("input");
    start.setAttribute("type", "button");
    start.setAttribute("id", "start");
    start.setAttribute("onclick", "start()");
    start.setAttribute("value", "start game");

    var startButton = document.createElement("input");
    startButton.setAttribute("type", "button");
    startButton.setAttribute("id", "startButton");
    startButton.setAttribute("onclick", "newGame()");
    startButton.setAttribute("value", "start new game");
    startButton.style.visibility = "hidden";

    var deck = document.createElement("div");
    deck.setAttribute("id", "Deck");

    var welcome = document.createElement("h1");
    welcome.innerText = "Welcome to the Taki game, click to start";
    document.body.appendChild(img);
    document.body.appendChild(welcome);
    document.body.appendChild(start);
    document.body.innerHTML += "<p></p>";
    document.body.appendChild(startButton);
    document.body.appendChild(deck);
}

//check the turn of the next player
function turn() {
    var first = document.getElementById("first");
    var second = document.getElementById("second");
    var imgPlayer1 = first.getElementsByTagName("img");
    var imgPlayer2 = second.getElementsByTagName("img");

    //if it is the turn of player1 we tell him thats his turn by border the div
    if (checkTurn == 2) {
        second.removeAttribute("style", "border:2px solid black;border-radius: 6px");
        first.setAttribute("style", "border:2px solid black;border-radius: 6px;");
        player1.makeDisableTrue(imgPlayer1);
        player2.makeDisableFalse(imgPlayer2);
        checkTurn = 1;
    }
    //if it is the turn of player2 we tell him thats his turn by border the div
    else {
        first.removeAttribute("style", "border:2px solid black; border-radius: 6px;");
        second.setAttribute("style", "border:2px solid black; border-radius: 6px;");
        player1.makeDisableFalse(imgPlayer1);
        player2.makeDisableTrue(imgPlayer2);
        checkTurn = 2;
    }

}

//show the cards of the players
function showCards() {
    var firstPlayer, secondPlayer, str = "";
    firstPlayer = document.getElementById("first");
    secondPlayer = document.getElementById("second");

    //present the players
    document.getElementById("player1").innerHTML = "player 1";
    document.getElementById("player2").innerHTML = "player 2";

    //Show the cards of the first player
    str += player1.render();
    firstPlayer.innerHTML += str;

    str = "";
    //Show the cards of the second player
    str += player2.render();
    secondPlayer.innerHTML += str;

}

//The game, the main method, details inside
function onPickclick(type, color) {
    var index, str = "", first, second;
    first = document.getElementById("first");
    second = document.getElementById("second");

    //if the color changer is in the table deck
    if (tableDeck[tableDeck.length - 1].type == "color" && tableDeck[tableDeck.length - 1].color == "changer") {
        //check if the player pick a color
        if (color == tmpColor && checkTurn == 1) {
            //check if the card he pick is special card
            if (specialEvents(type, color, player1.name, player1) == false) {
                insertCard(player1, type, color);//insert method from bellow
                tmpColor = "";
                turn();
            }
            //if it is special card we insert the card by calling the function specialEvents so we can end the action
            return;
        }

        //like above with the other player
        else if (color == tmpColor && checkTurn == 2) {// the other option
            if (specialEvents(type, color, player2.name, player2) == false) {
                insertCard(player2, type, color);//insers method from bellow
                tmpColor = "";
                turn();
            }
            return;
        }

        //if the player did not pick a color show him a message
        else if (tmpColor == "") {
            alert("You need to pick color !");
            return;
        }

        //if it was bad pick the player gets a card from the cashier
        else if (type != "color" && color != "changer") {
            alert("Wrong pick");
            cardFromCashier();
            return;
        }
    }

    //if we want to choose a color changer card
    if (type == "color" && color == "changer") {
        if (checkTurn == 1) {
            specialEvents(type, color, player1.name, player1);//method bellow inspect the special occations
        }

        else {
            specialEvents(type, color, player2.name, player2);//the same
        }
        alert("Pick color from below!")//alert to the player that he need to pick color from the buttoms
        return;
    }


    //if it is not color changer card
    if ((type == tableDeck[tableDeck.length - 1].type || color == tableDeck[tableDeck.length - 1].color) && checkTurn == 1) {
        if (specialEvents(type, color, player1.name, player1) == true) {
            return;
        }
        else {
            insertCard(player1, type, color);
        }
    }

    else if ((type == tableDeck[tableDeck.length - 1].type || color == tableDeck[tableDeck.length - 1].color) && checkTurn == 2) {
        if (specialEvents(type, color, player2.name, player2) == true) {
            return;
        }
        else {
            insertCard(player2, type, color);
        }
    }

    else {
        alert("Wrong pick");
        var str = "";
        cardFromCashier();
        return;
    }

    document.getElementById("tableDeck").innerHTML = tableDeck[tableDeck.length - 1].renderCard();
    turn();
    declareTheWinner(first, second);//cheking if there is a winner


}

//checking the special events
function specialEvents(type, color, name, player) {
    var str = "";

    //if it is a color changer card, create a bottons and let him pick a color
    if (type == "color" && color == "changer") {
        insertCard(player, type, color);
        for (var i = 0; i < 4; i++)
            str += '<input type= "button" id="' + colors[i] + '" value="' + colors[i] + '"onclick="changecolor(' + "'" + colors[i] + "'" + ');'
                + '"onmouseover="colorButton(' + "'" + colors[i] + "'" + ');' + '"onmouseout="removeColorButton(' + "'" + colors[i] + "'" + ') "/>';
        document.getElementById("change").innerHTML = str;
        declareTheWinner();
        return true;
    }

    //if it is a taki card, let the player to put all the card he has from the same color
    if (type == 'taki') {
        //the player must put the taki card first
        var index = player.search(type, color);
        var tmpCardCopy = [];
        tableDeck.push(player.remove(player.arr[index]));

        //insert the cards to tmp array
        for (var i = 0; i < player.arr.length; i++) {
            if (player.arr[i].color == color) {
                tmpCardCopy.push(player.arr[i]);
            }
        }

        //insert the cards to the tableDeck, and remove them from the player
        for (var i = 0; i < tmpCardCopy.length; i++) {
            var searchIndex = player.search(tmpCardCopy[i].type, tmpCardCopy[i].color);
            tableDeck.push(player.remove(player.arr[searchIndex]));
        }

        str = player.render();
        document.getElementById("tableDeck").innerHTML = tableDeck[tableDeck.length - 1].renderCard();
        document.getElementById(name).innerHTML = str;
        turn();
        declareTheWinner();
        return true;
    }

    //if it is stop or changeDirection card, let the player to play one more play
    if (type == 'stop' || type == 'changesDirection') {
        insertCard(player, type, color);
        player.makeDisableTrue(document.getElementById(player.name).getElementsByTagName("img"));
        declareTheWinner();
        return true;
    }

    //if it is 2 plush card, insert to the other card 2 cards from the cashier
    if (type == '2plush') {
        if (name == "first") {
            player2.insert(cashier.shift());
            //if there is not cards in the cashier we want to insert cards from the cashier
            if (cashier.length == 0) {
                soldOut();
            }
            player2.insert(cashier.shift());
            insertCard(player, type, color);
            str = player2.render();
            document.getElementById(player2.name).innerHTML = str;
        }

        else {
            player1.insert(cashier.shift());
            if (cashier.length == 0) {
                soldOut();
            }
            player1.insert(cashier.shift());
            insertCard(player, type, color);
            str = player1.render();
            document.getElementById(player1.name).innerHTML = str;
        }
        declareTheWinner();
        turn();
        return true;
    }
    return false;
}

//special card change color, the method alert to the user which color was selected and replaces the turn
function changecolor(color) {

    tmpColor = color;
    alert("color selected is: " + color);
    document.getElementById('change').innerHTML = "";
    turn();

}

//the function inserts a Card to the player/to the tableDeck
function insertCard(player, type, color) {
    var str = "";
    var index = player.search(type, color);
    tableDeck.push(player.remove(player.arr[index]));
    str += player.render();
    document.getElementById("tableDeck").innerHTML = tableDeck[tableDeck.length - 1].renderCard();
    document.getElementById(player.name).innerHTML = str;
}

//the function takes card from the cashier and insert it to the player
function cardFromCashier() {
    soldOut();//checking if there is cards in the cashier
    if (checkTurn == 1) {
        player1.insert(cashier.shift());
        document.getElementById("first").innerHTML = player1.render();
    }
    else {
        player2.insert(cashier.shift());
        document.getElementById("second").innerHTML = player2.render();
    }
    turn();
}

//check who wins
function declareTheWinner() {
    var deck = document.getElementById("Deck");
    if (player1.arr.length == 0) {
        deck.innerHTML = "";
        document.body.innerHTML += "<h1>its a win for player 1</h1><img src = 'images/win.jpg' id = 'win'/>";
        checkWinner = true;
        document.body.removeChild(document.getElementById("startButton"));
    }
    else if (player2.arr.length == 0) {
        deck.innerHTML = "";
        document.body.innerHTML += "<h1>its a win for player 2</h1><img src = 'images/win.jpg' id = 'win'/>";
        checkWinner = true;
        document.body.removeChild(document.getElementById("startButton"));
    }

}

//returns the cards from the tableDeck to the cashier, or start the game from the beginning if there is just one card in the tableDeck
function soldOut() {
    var tmpTableDeck = [];
    if ((cashier.length == 1 || cashier.length == 0) && tableDeck.length > 1) {
        for (var i = 0; i < tableDeck.length - 1; i++) {
            tmpTableDeck.push(tableDeck[i]);
        }

        for (var i = 0; i < tmpTableDeck.length; i++) {
            cashier.push(tmpTableDeck[i]);
            tableDeck.shift();
        }
        shuffle();
    }

    if ((cashier.length == 1 || cashier.length == 0) && tableDeck.length == 1) {
        alert("No cards in the cashier, You will back to the home page");
        location.reload();
    }
}

//change the color of the button by hover
function colorButton(color) {
    var button = document.getElementById(color);
    button.style.backgroundColor = color;
}

//change to default color 
function removeColorButton(color) {
    var button = document.getElementById(color);
    button.style.backgroundColor = "";
}

//start a new game 
function newGame() {
    tableDeck = [];
    cashier = [];
    player1= new Player("first");
    player2 = new Player("second");
    document.getElementById("first").innerHTML = "";
    document.getElementById("second").innerHTML = "";
    var str = "";

    //Build the cashier
    for (var i = 0; i < types.length; i++) {
        for (var j = 0; j < colors.length; j++) {
            var card = new Card(types[i], colors[j]);
            cashier.push(card);
        }
    }

    //two cards of color changer entered manually
    var card = new Card("color", "changer");
    cashier.push(card);
    cashier.push(card);

    //the method inserts the elements to the page
    shuffle();

    //Give cards for the players
    var flag = false;
    for (var i = 0; i < 16; i++) {
        var card = cashier.pop();
        if (flag == false) {
            player1.insert(card);
            flag = true;
        }
        else {
            player2.insert(card);
            flag = false;
        }
    }

    //Show the first card in the table desk, with this loop we promise that the first card would not be command card
    var index = 0;
    while (cashier[index].type == "changesDirection" || cashier[index].type == "2plush" ||
        cashier[index].type == "stop" || cashier[index].type == "taki" || cashier[index].type == "color") {
        index++;
    }

    tableDeck.push(cashier[index]);
    cashier.splice(index, 1);
    document.getElementById("cashier").innerHTML = '<img src = "images/cashier.jpg"' + ' onclick = "cardFromCashier()" id ="cashierCard"/>';
    document.getElementById("tableDeck").innerHTML = tableDeck[0].renderCard();

    showCards();
    turn();
}