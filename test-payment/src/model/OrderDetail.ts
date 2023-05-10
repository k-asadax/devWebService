export class OrderDetail {
    constructor(
        public dtl_rowno       : string,
        public dtl_item_id     : string,
        public dtl_item_name   : string,
        public dtl_item_count  : string,
        public dtl_tax         : string,
        public dtl_amount      : string,
        public dtl_free1       : string,
        public dtl_free2       : string,
        public dtl_free3       : string
    ){}

    public toString = () : string => {
        var result =
            this.dtl_rowno +
            this.dtl_item_id +
            this.dtl_item_name +
            this.dtl_item_count +
            this.dtl_tax +
            this.dtl_amount +
            this.dtl_free1 +
            this.dtl_free2 +
            this.dtl_free3;
        return result;
    }
}