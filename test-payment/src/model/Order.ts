import { OrderDetail } from "./OrderDetail";

export class Order {
    constructor(
        public pay_method            : string,
        public merchant_id           : string,
        public service_id            : string,
        public cust_code             : string,
        public sps_cust_no           : string,
        public sps_payment_no        : string,
        public order_id              : string,
        public item_id               : string,
        public pay_item_id           : string,
        public item_name             : string,
        public tax                   : string,
        public amount                : string,
        public pay_type              : string,
        public auto_charge_type      : string,
        public service_type          : string,
        public div_settele           : string,
        public last_charge_month     : string,
        public camp_type             : string,
        public tracking_id           : string,
        public terminal_type         : string,
        public success_url           : string,
        public cancel_url            : string,
        public error_url             : string,
        public pagecon_url           : string,
        public free1                 : string,
        public free2                 : string,
        public free3                 : string,
        public free_csv_input        : string,
        public request_date          : string,
        public limit_second          : string,
        public hashkey               : string,
        public orderDetail           : OrderDetail[],
        public free_csv              : string,
        public sps_hashcode          : string
    ){}

    public setOrderDetail(
        dtl_rowno       : string,
        dtl_item_id     : string,
        dtl_item_name   : string,
        dtl_item_count  : string,
        dtl_tax         : string,
        dtl_amount      : string,
        dtl_free1       : string,
        dtl_free2       : string,
        dtl_free3       : string
    ): void {
        let tmp: OrderDetail = new OrderDetail(
            dtl_rowno      ,
            dtl_item_id    ,
            dtl_item_name  ,
            dtl_item_count ,
            dtl_tax        ,
            dtl_amount     ,
            dtl_free1      ,
            dtl_free2      ,
            dtl_free3      
        );
        this.orderDetail.push(tmp);
    }

    public toString = () : string => {
        var resultOrderDetail = "";
        for (var i = 0; i < this.orderDetail.length; i++) {
            resultOrderDetail = resultOrderDetail + this.orderDetail[i].toString();
        }
        var result =
            this.pay_method +
            this.merchant_id +
            this.service_id +
            this.cust_code +
            this.sps_cust_no +
            this.sps_payment_no +
            this.order_id +
            this.item_id +
            this.pay_item_id +
            this.item_name +
            this.tax +
            this.amount +
            this.pay_type +
            this.auto_charge_type +
            this.service_type +
            this.div_settele +
            this.last_charge_month +
            this.camp_type +
            this.tracking_id +
            this.terminal_type +
            this.success_url +
            this.cancel_url +
            this.error_url +
            this.pagecon_url +
            this.free1 +
            this.free2 +
            this.free3 +
            this.free_csv +
            resultOrderDetail +
            this.request_date +
            this.limit_second +
            this.hashkey;
        return result;
    }
}

