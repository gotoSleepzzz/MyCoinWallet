import { Block } from "../models/block";

const getCurrentTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const isValidTimestamp = (newBlock: Block, previousBlock: Block): boolean => {
    return (previousBlock.timestamp - 60 < newBlock.timestamp)
        && newBlock.timestamp - 60 < getCurrentTimestamp();
};

export { getCurrentTimestamp, isValidTimestamp };