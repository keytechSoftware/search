import { Element } from "./element";

    export class SearchResponse {
        constructor(
            public PageNumber: number,
            public Totalrecords: number,
            public PageSize: number,
            public ElementList: Element[]
        ){}

        public static ToElementListArray(response: SearchResponse){  
            let keys = [];
            for (let key in response.ElementList) {
                keys.push({value: response.ElementList[key]});
            }
            return keys;
        }

    };



