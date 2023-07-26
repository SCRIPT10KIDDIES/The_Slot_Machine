const prompt=require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT =
{
    A:2,
    B:4,
    C:6,
    D:8
};

const SYMBOL_VALUES =
{
    A:5,
    B:3,
    C:2,
    D:1
};




const deposit = () =>
{
    while(true)
    {
        const dAmt = prompt("Enter the deposit amount: ");
    const noDepAmt = parseFloat(dAmt);

    if(isNaN(noDepAmt) || noDepAmt<=0)
    {
        console.log("Invalid!, Try again.")
    }
    else
    {
        return noDepAmt;
    }
    }
};



const getN =() =>
{
    while(true)
    {
        const n= prompt("Enter the number of lines for the bet(1-3): ");
        const noN= parseFloat(n);
        if(isNaN(noN) || noN<=0 || noN>3)
        {
            console.log("Inavlid! Try again.");
        }
        else
        {
            return(noN);
        }
    }

};



const getBet = (balance,lines) =>
{
    while(true)
    {
    const bet = prompt("Enter the Betting amount per line  ");
    const nBet = parseFloat(bet);
    if (isNaN(nBet) || nBet<=0 || nBet>(balance/lines))
    {
        console.log("Invalid! Try again.")
    }
    else
    {
        return(nBet);
    }
    }
};


const spin =() =>
{
    const syb=[];
    for(const [s,count] of Object.entries(SYMBOLS_COUNT))
    {
        for (let i=0;i<count;i++)
        {
            syb.push(s);
        }
    }
    const reels = [];
    for(let i=0;i<ROWS;i++)
    {
        reels.push([]);
        const reelSymb=[...syb];
        for(let j=0;j<COLS;j++)
        {
            const index = Math.floor(Math.random()*reelSymb.length);
            const selSyb = reelSymb[index];
            reels[i].push(selSyb);
            reelSymb.splice(index,1);
        }
    }
    return reels;
};


const printReels =  (reels) =>
{
    for(const row of reels)
    {
        let rowString = "";
        for(const [i,symbol] of row.entries())
        {
            rowString+=symbol;
            if(i!=row.length-1)
            {
                rowString+= " | ";
            }
        }
        console.log(rowString);
    }
};


const checkWin = (reels,bet,noN) =>
{
    let w = 0;
    for(let i = 0;i<noN;i++)
    {
        const sym = reels[i];
        let chck = true;
        for(const s of sym)
        {
            if(s!=sym[0])
            {
                chck=false;
                break;
            }
        }
        if(chck)
        {
            w+=bet*SYMBOL_VALUES[sym[0]];
        }
    }
    return w;
};

const game = () =>
{
    let balance = deposit();

    while(true){
    
    console.log("Your balance is $"+balance);
    const noN = getN();
    const bet = getBet(balance,noN);
    balance -= bet*noN; 
    const reels = spin();
    printReels(reels);
    const wi = checkWin(reels,bet,noN);
    balance+=wi;
    console.log("You won, $"+wi.toString());
    if(balance<=0)
    {
        console.log("You have NIL balance");
        break;
    }
    const again = prompt("Would you like to play again?(y/n) : ");
    if (again!='y')
    {
        break;
    }
}

};

game();







