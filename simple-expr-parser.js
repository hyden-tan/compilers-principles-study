const OPERATORS = ['+', '-'];

const isNumber = (number) => !isNaN(Number(number));

const isInValidateInput = (input) => typeof input !== 'string' || input === '';

const trim = (input) => input.replace(/[\s|\r\n|\n]/g, '');


function simpleExprParser(input) {
    input = trim(input);
    if (isInValidateInput(input)) {
        return;
    }

    let index = 0;
    let lookahead = input[index++];
    let res = '';
    function expr() {
        term();
        while(true) {
            const opIndex = OPERATORS.indexOf(lookahead);
            if (opIndex > -1) {
                const t = lookahead;
                match(OPERATORS[opIndex]);
                term();
                res += t;
                continue;
            }
            return;
        }
    }
    
    function term() {
        if (isNumber(lookahead)) {
            res += lookahead;
            next();
        }
    }

    function match(t) {
        if (lookahead == t) {
            next();
        } else {
            throw('syntax error');
        }
    }

    function next() {
        lookahead = input[index++];
    }
    expr();
    console.log(res);
}
