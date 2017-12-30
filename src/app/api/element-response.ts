import { ElementList } from "./element-list";

export class ElementResponse {
    constructor(
        public PageNumber: number,
        public Totalrecords: number,
        public PageSize: number,
        public ElementList: ElementList[]
    ){}
};



