// add id for all chess square
var index = 0;
var x = ['1', '2', '3', '4', '5', '6', '7', '8'];
var y = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var chessPieces = ['pawn', 'castle', 'bishop', 'knight', 'king', 'queen'];
var check = 0;

for (var i = 0; i < 8; ++i) {
    for (var j = 0; j < 8; ++j) {
        document.getElementsByClassName('square')[index].setAttribute('id', x[i] + y[j]);
        ++index;
    }
}

// add how to move for chess peices
document.body.addEventListener('click', function (e) {
    var target = e.target;
    console.log(target);
    var aTag = target.parentElement;
    var parentId = aTag.id;
    var position = aTag.parentElement.id;
    
    if ($('a.selected').length !== 0 && $('a.can-eat').length !== 0 && target.classList[1] === 'can-eat') {
        $('.selected').prependTo('#' + parentId);
        target.remove();
    }
    removeEat();
    removeMove('active');
    for (chessPiece of chessPieces) {
        if (parentId.includes(chessPiece)) {
            var chess = window[chessPiece];
            chess.colorSide = aTag.className;
            aTag.classList.add('selected');
            console.log(chess);
            chess.calcMove(position);
            console.log(chess.position);
            createMove(chess, chess.colorSide);
            chess.notMove(chess.colorSide);
            moveChess('1');
        };
    }

    if (target.parentElement === 'img') {
        console.log('a');
        // do whatever you like ;-)
    }
    e.stopPropagation()
});

function removeEat () {
    var canEatElements = document.getElementsByClassName('can-eat');
    while (canEatElements.length > 0) {
        canEatElements[0].classList.remove('can-eat');
    }
}

function moveChess(clickedItem) {
    if ($('a.selected').length === 1) {
        $('a[class=active]').click(function () {
            $(".selected").prependTo("#" + this.parentElement.id);
        });
//        document.querySelectorAll('.can-eat').forEach(function (elem) {
//
//            elem.addEventListener('click', function () {
//                $(".selected").prependTo("#" + this.parentElement.id);
//                
//                if ($('a.can-eat').length !== 0) {
//                    document.getElementById(elem.id).remove();
//                    removeMove('active');
//                }
//            });
//        });
    }
};


function createMove(object, sameColor) {
    for (move of object.moves) {
        var squareMove = document.getElementById(move);
        var checkSameColorChess = document.getElementsByClassName(sameColor);
        var diffColor = (sameColor === 'white') ? 'black1' : 'white';
        var idDiff = document.getElementsByClassName(diffColor);
        var check1 = true,
            check2 = false;
        for (var i = 0; i < checkSameColorChess.length; ++i) {
            if (checkSameColorChess.item(i) === squareMove.firstElementChild) {
                check1 = false;
                break;
            }
        };
        if (check1) {
            for (var i = 0; i < idDiff.length; ++i) {
                if (idDiff.item(i) === squareMove.firstElementChild) {
                    check2 = true;
                    break;
                }
            }
            if (check2) {
                document.getElementById(move).firstElementChild.classList.add('can-eat');
                console.log(document.getElementById(move));
            } else {
                document.getElementById(move).innerHTML = '<a href ="#" class="active"></a>';
            }

        }
    };
};

function removeMove(itemClass) {
    $('a[class=' + itemClass + '] ').remove();
    $('.selected').removeClass('selected');
};

/* ---------------------------------- */
var id = 'pawn';
var ChessPieces = function (name) {
    this.name = name;
};

//ChessPieces.prototype.position = document.getElementById('pawn').parentNode.id;
ChessPieces.prototype.notMove = function (color) {
    switch (this.name) {
        case 'castle':
            var idOfSameColor = document.getElementsByClassName(color);
            for (move of this.moves) {
                console.log(idOfSameColor[0].parentElement.id, move);
            }
            break;
    }
}

function checkNotMove(moveItem, color) {
    var idOfSameColor = document.getElementsByClassName(color);
    var idOfDiffColor = document.getElementsByClassName((color === 'black1') ? 'white' : 'black1');
    for (var i = 0; i < idOfSameColor.length; ++i) {
        if (moveItem === idOfSameColor[i].parentElement.id) {
            return false;
        };
    };
    for (var i = 0; i < idOfDiffColor.length; ++i) {
        if (moveItem === idOfDiffColor[i].parentElement.id) {
            return 1;
        }
    };
};
function eatForPawn(moveItem, color) {
    var idOfSameColor = document.getElementsByClassName(color);
    var idOfDiffColor = document.getElementsByClassName((color === 'black1') ? 'white' : 'black1');
    
};

var king = new ChessPieces('king');
var queen = new ChessPieces('queen');
var knight = new ChessPieces('knight');
var pawn = new ChessPieces('pawn');
var castle = new ChessPieces('castle');
var bishop = new ChessPieces('bishop');


king.calcMove = function (idNumber) {
    var moves = [],
        moveItem, char1 = idNumber.charAt(0),
        char2 = idNumber.charAt(1);
    var a = x.indexOf(char1),
        b = y.indexOf(char2);
    //    for (var i = 1; i < 4; i ++) {
    if (x[a - 1] !== undefined) {
        for (var i = b - 1; i <= b + 1; ++i) {
            if (y[i] !== undefined) {
                moveItem = x[a - 1] + y[i];
                moves.push(moveItem);
            }
        }
    };
    for (var i = b - 1; i <= b + 1; ++i) {
        if (y[i] !== undefined && i != b) {
            moveItem = x[a] + y[i];
            moves.push(moveItem);
        }
    };
    if (x[a + 1] !== undefined) {
        for (var i = b - 1; i <= b + 1; ++i) {
            if (y[i] !== undefined) {
                moveItem = x[a + 1] + y[i];
                moves.push(moveItem);
            }
        }
    };
    this.moves = moves;

};
castle.calcMove = function (idNumber) {
    var moves = [],
        moveItem, char1 = idNumber.charAt(0),
        char2 = idNumber.charAt(1);
    var a = x.indexOf(char1),
        b = y.indexOf(char2);
    check = 0;
    console.log(a, b);
    for (var i = a + 1; i < 8; ++i) {
        moveItem = x[i] + char2;
        if (checkNotMove(moveItem, this.colorSide) === false) {
            break;
        };
        if (checkNotMove(moveItem, this.colorSide) === 1) {
            moves.push(moveItem);
            break;
        }
        moves.push(moveItem);
        console.log(moveItem);
    };
    check = 0;
    for (var i = a - 1; i > -1; --i) {
        moveItem = x[i] + char2;
        if (checkNotMove(moveItem, this.colorSide) === false) {
            break;
        };
        if (checkNotMove(moveItem, this.colorSide) === 1) {
            moves.push(moveItem);
            break;
        }
        moves.push(moveItem);
        console.log(moveItem);
    };
    check = 0;
    for (var i = b + 1; i < 8; ++i) {
        moveItem = char1 + y[i];
        if (checkNotMove(moveItem, this.colorSide) === false) {
            break;
        };
        if (checkNotMove(moveItem, this.colorSide) === 1) {
            moves.push(moveItem);
            break;
        }
        moves.push(moveItem);
        console.log(moveItem);
    };
    check = 0;
    for (var i = b - 1; i > -1; --i) {
        moveItem = char1 + y[i];
        if (checkNotMove(moveItem, this.colorSide) === false) {
            break;
        };
        if (checkNotMove(moveItem, this.colorSide) === 1) {
            moves.push(moveItem);
            break;
        }
        moves.push(moveItem);
        console.log(moveItem);
    };
    this.moves = moves;
};

knight.calcMove = function (idNumber) {
    var moves = [],
        moveItem, char1 = idNumber.charAt(0),
        char2 = idNumber.charAt(1);
    var a = x.indexOf(char1),
        b = y.indexOf(char2);
    for (var i = 1; i < 3; ++i) {
        if (x[a + i] !== undefined) {
            if (y[b - (3 - i)] !== undefined) {
                moveItem = x[a + i] + y[b - (3 - i)];
                moves.push(moveItem);
            }
            if (y[b + (3 - i)] !== undefined) {
                moveItem = x[a + i] + y[b + (3 - i)];
                moves.push(moveItem);
            }
        }
    }
    for (var i = 1; i < 3; ++i) {
        if (x[a - i] !== undefined) {
            if (y[b - (3 - i)] !== undefined) {
                moveItem = x[a - i] + y[b - (3 - i)];
                moves.push(moveItem);
            }
            if (y[b + (3 - i)] !== undefined) {
                moveItem = x[a - i] + y[b + (3 - i)];
                moves.push(moveItem);
            }
        }
    }
    this.moves = moves;

};

queen.calcMove = function (idNumber) {
    var moves = [],
        moveItem1, moveItem2, char1 = idNumber.charAt(0),
        char2 = idNumber.charAt(1);
    var a = x.indexOf(char1),
        b = y.indexOf(char2);
    for (var i = 1; x[a + i] !== undefined; ++i) {
        if (y[b + i] !== undefined) {
            moveItem = x[a + i] + y[b + i];
            if (checkNotMove(moveItem, this.colorSide) === false) {
                break;
            };
            if (checkNotMove(moveItem, this.colorSide) === 1) {
                moves.push(moveItem);
                break;
            }
            moves.push(moveItem);
        }
    }
    for (var i = 1; x[a + i] !== undefined; ++i) {
        if (y[b - i] !== undefined) {
            moveItem = x[a + i] + y[b - i];
            if (checkNotMove(moveItem, this.colorSide) === false) {
                break;
            };
            if (checkNotMove(moveItem, this.colorSide) === 1) {
                moves.push(moveItem);
                break;
            }
            moves.push(moveItem);
        }

    }
    for (var i = 1; x[a - i] !== undefined; ++i) {
        if (y[b + i] !== undefined) {
            moveItem = x[a - i] + y[b + i];
            if (checkNotMove(moveItem, this.colorSide) === false) {
                break;
            };
            if (checkNotMove(moveItem, this.colorSide) === 1) {
                moves.push(moveItem);
                break;
            }
            moves.push(moveItem);
        }
    }
    for (var i = 1; x[a - i] !== undefined; ++i) {
        if (y[b - i] !== undefined) {
            moveItem = x[a - i] + y[b - i];
            if (checkNotMove(moveItem, this.colorSide) === false) {
                break;
            };
            if (checkNotMove(moveItem, this.colorSide) === 1) {
                moves.push(moveItem);
                break;
            }
            moves.push(moveItem);
        }

    }
    for (var i = a + 1; i < 8; ++i) {
        moveItem = x[i] + char2;
        if (checkNotMove(moveItem, this.colorSide) === false) {
            break;
        };
        if (checkNotMove(moveItem, this.colorSide) === 1) {
            moves.push(moveItem);
            break;
        }
        moves.push(moveItem);
        console.log(moveItem);
    };
    for (var i = a - 1; i > -1; --i) {
        moveItem = x[i] + char2;
        if (checkNotMove(moveItem, this.colorSide) === false) {
            break;
        };
        if (checkNotMove(moveItem, this.colorSide) === 1) {
            moves.push(moveItem);
            break;
        }
        moves.push(moveItem);
        console.log(moveItem);
    };
    for (var i = b + 1; i < 8; ++i) {
        moveItem = char1 + y[i];
        if (checkNotMove(moveItem, this.colorSide) === false) {
            break;
        };
        if (checkNotMove(moveItem, this.colorSide) === 1) {
            moves.push(moveItem);
            break;
        }
        moves.push(moveItem);
        console.log(moveItem);
    };
    for (var i = b - 1; i > -1; --i) {
        moveItem = char1 + y[i];
        if (checkNotMove(moveItem, this.colorSide) === false) {
            break;
        };
        if (checkNotMove(moveItem, this.colorSide) === 1) {
            moves.push(moveItem);
            break;
        }
        moves.push(moveItem);
        console.log(moveItem);
    };
    this.moves = moves;

}

bishop.calcMove = function (idNumber) {
    var moves = [],
        moveItem1, moveItem2, char1 = idNumber.charAt(0),
        char2 = idNumber.charAt(1);
    var a = x.indexOf(char1),
        b = y.indexOf(char2);
    for (var i = 1; x[a + i] !== undefined; ++i) {
        if (y[b + i] !== undefined) {
            moveItem = x[a + i] + y[b + i];
            if (checkNotMove(moveItem, this.colorSide) === false) {
                break;
            };
            if (checkNotMove(moveItem, this.colorSide) === 1) {
                moves.push(moveItem);
                break;
            }
            moves.push(moveItem);
        }
    }
    for (var i = 1; x[a + i] !== undefined; ++i) {
        if (y[b - i] !== undefined) {
            moveItem = x[a + i] + y[b - i];
            if (checkNotMove(moveItem, this.colorSide) === false) {
                break;
            };
            if (checkNotMove(moveItem, this.colorSide) === 1) {
                moves.push(moveItem);
                break;
            }
            moves.push(moveItem);
        }

    }
    for (var i = 1; x[a - i] !== undefined; ++i) {
        if (y[b + i] !== undefined) {
            moveItem = x[a - i] + y[b + i];
            if (checkNotMove(moveItem, this.colorSide) === false) {
                break;
            };
            if (checkNotMove(moveItem, this.colorSide) === 1) {
                moves.push(moveItem);
                break;
            }
            moves.push(moveItem);
        }
    }
    for (var i = 1; x[a - i] !== undefined; ++i) {
        if (y[b - i] !== undefined) {
            moveItem = x[a - i] + y[b - i];
            if (checkNotMove(moveItem, this.colorSide) === false) {
                break;
            };
            if (checkNotMove(moveItem, this.colorSide) === 1) {
                moves.push(moveItem);
                break;
            }
            moves.push(moveItem);
        }

    }
    this.moves = moves;
}


pawn.calcMove = function (idNumber) {
    var moves=[], moveItem1, moveItem2, char1 = idNumber.charAt(0),
        char2 = idNumber.charAt(1);
    var a = x.indexOf(char1),
        b = y.indexOf(char2);
    if (this.colorSide === 'black1')  {
        if (a === 1) {
            moveItem1 = x[a+1] + y[b];
            moves.push(moveItem1);
            moveItem2 = x[a+2] + y[b];
            moves.push(moveItem2);
        } else {
            moves.push(x[a+1] + y[b]);
        }
    } else {
        if (a === 6) {
            moveItem1 = x[a-1] + y[b];
            moves.push(moveItem1);
            moveItem2 = x[a-2] + y[b];
            moves.push(moveItem2);
        } else {
            moves.push(x[a-1] + y[b]);
        }
    }
        
    
    this.moves = moves;
}

// increase a char 
function nextChar(c, number) {
    return String.fromCharCode(c.charCodeAt(0) + number);
}
nextChar('a');

//function calcKnight(a, b) {
//    for(var i = 1; i < 3; ++i) {
//        if (a+1 <= 8 && a+1 > 0)
//        moveItem = x[a+1] + y[b-2];
//        moves.push(moveItem);
//    }
//};
