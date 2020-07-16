export type messgeType = ("stderr" | "stdout");

export interface IMessage {
        type: messgeType,
        message: string
}