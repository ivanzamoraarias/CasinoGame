import {EWinType} from "../constants/constants"


export interface IRandomOutcome {
    randomOne: number;
    randomTwo: number;
    randomThree: number;
}

export const GenerateRandomInt = (max: number, min: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const GetRandomOutcome = () =>
{
    const randomOutcome : IRandomOutcome  = {
        randomOne: GenerateRandomInt(0, 5),
        randomTwo: GenerateRandomInt(0, 5),
        randomThree: GenerateRandomInt(0, 5),
    }

    return randomOutcome;
}

export const GetWinType = (coincidences: string) => {

    console.log(coincidences);
    switch (coincidences) {
        case "1":
            return EWinType.NoWin;
            break;

        case "2":
            return EWinType.SmallWin;
            break;

        case "3":
            return EWinType.BigWin;
            break;
    
        default:
            return EWinType.NoWin;
            break;
    }
}