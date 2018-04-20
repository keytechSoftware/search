import { Element } from "./element";

export class ElementResponse {
    constructor(
        public PageNumber: number,
        public Totalrecords: number,
        public PageSize: number,
        public ElementList: Element[]
    ){}
};



