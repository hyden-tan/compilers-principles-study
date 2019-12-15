/**
 * @todo
 * 1. 完成p53页2.6节练习
 */

const isNumber = (number) => !isNaN(Number(number));

const isLetter = (letter) => /[a-z|A-Z|0-9|_|\$]/.test(letter);

const NUM = 256;
const ID = 257;
const TRUE = 258;
const FALSE = 259;

function Token(tag) {
    this.tag = tag;
}

function Num(value) {
    Token.call(this, NUM);
    this.value = value;
}

function Word(tag, lexName) {
    Token.call(this, tag);
    this.lexName = lexName;
}

function simpleLexicalAnalyzer(input) {
    if (typeof input !== 'string') {
        throw('非法输入');
    }

    let index = 0;
    let line = 1;
    let peek = '';
    let words = [
        new Word(TRUE, 'true'),
        new Word(FALSE, 'false'),
    ];
    let res = [];

    function scan() {
        const readIn = () => input[index ++];
        while(true) {
            peek = readIn();
    
            if (peek === ' ' || peek === '\t') {}
            else if (peek === '\n') {
                line += 1;
            } else {
                break;
            }
        }
    
        if (isNumber(peek)) {
            let v = 0;
            do {
                v = 10 * v + Number(peek);
                peek = readIn();
            } while (isNumber(peek));
            
            return Num(v);
        }
    
        if (isLetter(peek)) {
            let strBuffer = '';
    
            do {
                strBuffer += peek;
                peek = readIn();
            } while (isLetter(peek));

            const word = words.find(item => item.lexName == strBuffer);
            if (word !== undefined) {
                return word;
            }
            const newWord = new Word(ID, strBuffer);
            words.push(newWord)
            return newWord;
        }
        const temp = peek;
        peek = '';
        return new Token(temp)
    }

    while(index < input.length) {
        res.push(scan());
    }
   
    console.log('line: ', line);
    console.log('peek: ', peek);
    console.log('words: ', words);
    console.log('res: ', res);
}