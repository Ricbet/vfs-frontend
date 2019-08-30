import { Inode } from "../../../public/lib";

export class TInode extends Inode {

    public children!: TInode[]

    constructor() {
        super();
        this.init()
    }

    public init(): void {
        this.children = []
    }

    public setChildren(c: TInode[]): this {
        this.children = c || []
        return this
    }

}
