

function calpricewithgst(rate,price) {
    // price=x+x*10/100//price*100/100+r
// ye wali function price return karte hai without gst 

    const result=(price*100)/(rate+100);

    return result;



}


function calGrossProfit(sps,spc) {

    return (spc-sps);

    
}


function calNetProfit(spsWithGst,spcWithGst) {
    
    return (spcWithGst-spsWithGst);

}




function calDiscountRateOnMrp(spc,mrp) {
    // spc+mrp*x/100=mrp mrp*x/100=(mrp-spc)*100/mrp

    if(spc>mrp){

        console.log("invalid input spc is not graeter than mrp");
        return -1;

    }
    const result=(mrp-spc)*100/mrp;

    return result;


}




function calGrossMargin(spc,profitWithoutGst) {
    // spc*x/100=profit;

    const result=(profitWithoutGst*100)/spc;

    return result;

}



function calNetMargin(spc,profitWithGst) {
    // spc*x/100=profit;

    const result=(profitWithGst*100)/spc;//

    return result;

}

function calEverything(seller,customer,rate,MRP) {
    
  const  spExGstForS= calpricewithgst(rate,seller);//for seller without gst
   const spInGstForS=seller;// for seller inclduling gst
   const spExGst=calpricewithgst(rate,customer);// for customer without gst
 const  spInGst=customer;// for customer including gst

const  grossProfitForS=calGrossProfit(seller,customer);//gross for profit

const  netProfitForS=calNetProfit(spExGstForS,spExGst);//net profit

const  mrp=MRP;//mrp

const grossProfitMarginForS=calGrossMargin(customer,grossProfitForS);
const netProfitMarginForS=calNetMargin(customer,netProfitForS);
const discount=calDiscountRateOnMrp(customer,MRP);// discount 

const result={
    spExGstForS,
    spInGstForS,
    spExGst,
    spInGst,
    grossProfitForS,
    netProfitForS,
    mrp,
    grossProfitMarginForS,
    netProfitMarginForS,
    discount
};




return result;


}







module.exports=calEverything;
