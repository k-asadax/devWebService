<template>
  <div
    v-if="isOpen"
    class="confirm-dialog confirm-dialog-show"
    id="confirm-dialog149993"
    style="margin-top: -86px"
  >
    <div class="confirm-dialog-title">
      {{ dialogText.title }}
    </div>
    <div class="confirm-dialog-content">
      <p class="confirm-dialog-message">
        {{ dialogText.text }}
      </p>
    </div>
    <div class="confirm-dialog-action">
      <label>hashCode:</label><input type="text" name="text-hash-code" id="text-hash-code">
      <button @click="f_submit" class="btn-test">buy</button>
    </div>
    <div class="iframe-wrap">
      <iframe name="testIframe2" frameborder="0"></iframe>
    </div>
    <div class="confirm-dialog-action">
      <!--<button @click="ok" class="btn-ok">{{ dialogText.ok }}</button>-->
      <button @click="cancel" class="btn-cancel">
        {{ dialogText.cancel }}
      </button>
    </div>
  </div>
  <div v-if="isOpen" @click="close" class="confirm-dialog-overlay"></div>
</template>
  
<script setup lang="ts">
  import { useConfirmDialog } from "@/composables/useConfirmDialog";
  import { encryptWithSHA1 } from "@/composables/encryptWithSHA1";
  import { Order } from '@/model/Order';
  const { isOpen, ok, cancel, close, dialogText } = useConfirmDialog();

  function f_submit() {
    let hashCode:HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('text-hash-code');
    var order: Order = new Order(
       "credit3d"
      ,"30132"
      ,"201"
      ,"SPSTestUser0001"
      ,""
      ,""
      ,"SPSOrderId" + getYYYYMMDDHHMMSS()
      ,"SPSTestItem0001"
      ,""
      ,"SPSテスト商品"
      ,""
      ,"100"
      ,"0"
      ,""
      ,"0"
      ,""
      ,""
      ,""
      ,""
      ,"0"
      ,"https://stbfep.sps-system.com/MerchantPaySuccess.jsp"
      ,"https://stbfep.sps-system.com/MerchantPayCancel.jsp"
      ,"https://stbfep.sps-system.com/MerchantPayError.jsp"
      ,"http://localhost/MerchantPayResultRecieveSuccess.jsp"
      ,"自由欄１　１２３４５６"
      ,"自由欄２　１２３４５６"
      ,"自由欄３　１２３４５６"
      ,""
      ,getYYYYMMDDHHMMSS()
      ,""
      ,hashCode.value
      ,[]
      ,""
      ,""
    );
    order.free_csv              = "";
    encryptWithSHA1(order.toString()).then(encrypted => {
      order.sps_hashcode = encrypted;
      var form: HTMLFormElement = <HTMLFormElement>document.createElement('form')
      form.action = "https://stbfep.sps-system.com/f01/FepBuyInfoReceive.do";
      form.target = "testIframe2";
      form.method = "POST";
      form.acceptCharset = "shift-jis";
      form.hidden = true;
      document.body.append(form);
      form.addEventListener('formdata', (e) => {
        var fd = e.formData;
        fd.set('pay_method'        ,order.pay_method       );
        fd.set('merchant_id'       ,order.merchant_id      );
        fd.set('service_id'        ,order.service_id       );
        fd.set('cust_code'         ,order.cust_code        );
        fd.set('sps_cust_no'       ,order.sps_cust_no      );
        fd.set('sps_payment_no'    ,order.sps_payment_no   );
        fd.set('order_id'          ,order.order_id         );
        fd.set('item_id'           ,order.item_id          );
        fd.set('pay_item_id'       ,order.pay_item_id      );
        fd.set('item_name'         ,order.item_name        );
        fd.set('tax'               ,order.tax              );
        fd.set('amount'            ,order.amount           );
        fd.set('pay_type'          ,order.pay_type         );
        fd.set('auto_charge_type'  ,order.auto_charge_type );
        fd.set('service_type'      ,order.service_type     );
        fd.set('div_settele'       ,order.div_settele      );
        fd.set('last_charge_month' ,order.last_charge_month);
        fd.set('camp_type'         ,order.camp_type        );
        fd.set('tracking_id'       ,order.tracking_id      );
        fd.set('terminal_type'     ,order.terminal_type    );
        fd.set('success_url'       ,order.success_url      );
        fd.set('cancel_url'        ,order.cancel_url       );
        fd.set('error_url'         ,order.error_url        );
        fd.set('pagecon_url'       ,order.pagecon_url      );
        fd.set('free1'             ,order.free1            );
        fd.set('free2'             ,order.free2            );
        fd.set('free3'             ,order.free3            );
        fd.set('free_csv'          ,order.free_csv         );
        fd.set('request_date'      ,order.request_date     );
        fd.set('limit_second'      ,order.limit_second     );
        fd.set('sps_hashcode'      ,order.sps_hashcode     );
        fd.set('hashkey'           ,order.hashkey          );
      });
      form.submit();
    });
  };
  
  function getYYYYMMDDHHMMSS() : string {
    var now = new Date();
    return now.getFullYear() + zeroPadding(now.getMonth() + 1) + zeroPadding(now.getDate()) +
           zeroPadding(now.getHours()) + zeroPadding(now.getMinutes()) + zeroPadding(now.getSeconds());
  };
  function zeroPadding(num: number) : string {
    return (num < 10 ? "0" + num : num.toString())
  };
</script>
  
<style scoped>
  .confirm-dialog {
    color: #1b1919;
    position: fixed;
    z-index: 1061;
    border-radius: 2px;
    width: 400px;
    margin-left: -200px;
    background-color: #fff;
    -webkit-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
      0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
      0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    left: 50%;
    top: 25%;
    font-size: 16px;
  }
  
  .confirm-dialog.confirm-dialog-show {
    -webkit-animation: bounceIn 0.35s ease;
    -o-animation: bounceIn 0.35s ease;
    animation: bounceIn 0.35s ease;
  }
  
  .confirm-dialog .confirm-dialog-title {
    text-align: center;
    padding: 24px 30px 20px 30px;
    font-size: 18px;
    line-height: 1.4;
    font-weight: bold;
    color: #1b1919;
  }
  
  .confirm-dialog .confirm-dialog-title + .confirm-dialog-content {
    padding-top: 0;
  }
  
  .confirm-dialog .confirm-dialog-content {
    text-align: justify;
    padding: 30px 30px 5px 30px;
  }
  
  .confirm-dialog .confirm-dialog-content .confirm-dialog-message {
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    margin: 0;
    padding: 0;
    color: #635a56;
  }
  
  .confirm-dialog .confirm-dialog-content .confirm-dialog-prompt input {
    width: 100%;
    height: 36px;
    display: inline-block;
    padding: 6px 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: none;
    outline: none;
    font-size: 16px;
    color: #1b1919;
    border-bottom: 1px solid #d9d6d4;
  }
  
  .confirm-dialog .confirm-dialog-action {
    display: flex;
    flex-direction: column;
    margin: 10px 30px;
  }
  
  .confirm-dialog .confirm-dialog-action [class*="btn-"] {
    font-size: 14px;
    margin: 7px 0;
    cursor: pointer;
    color: #1b1919;
    height: 36px;
    min-width: 88px;
    text-align: center;
    display: inline-block;
    border: 1px solid #dedede;
    border-radius: 12px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.12);
    -webkit-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    -o-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .confirm-dialog .confirm-dialog-action .btn-ok {
    background-color: black;
    border-color: black;
    color: #fff;
  }
  
  .confirm-dialog .confirm-dialog-action .btn-ok:active {
    background-color: #444;
  }
  
  .confirm-dialog .confirm-dialog-action .btn-cancel {
    background-color: #ececec;
    color: #635a56;
  }
  
  .confirm-dialog .confirm-dialog-action .btn-cancel:active {
    background-color: #dcdcdc;
  }
  
  @media all and (max-width: 540px) {
    .confirm-dialog {
      width: auto;
      margin-left: 0;
      margin-right: 0;
      left: 15px;
      right: 15px;
    }
  }
  
  .confirm-dialog-overlay {
    position: fixed;
    background-color: #000;
    z-index: 1060;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.4;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    -webkit-transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    -o-transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .iframe-wrap {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: none;
  }
  .iframe-wrap iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
</style>