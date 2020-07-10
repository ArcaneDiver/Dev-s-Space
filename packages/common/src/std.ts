export type StdType = ("stderr" | "stdout");

export interface IStd {
        type: StdType,
        message: string
}