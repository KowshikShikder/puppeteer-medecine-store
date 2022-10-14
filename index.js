const puppeteer = require('puppeteer')


const OrderProduct = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
    });

    // New Page Created
    const page = await browser.newPage();




    // Going to the targeted website
    await page.goto("https://maximcare.vercel.app/");



    // Waiting for "medicine_container" to load
    await page.waitForSelector(".medicine_container");



    // Adding product by clicking button "add to cart"
    await page.click(".medicine_container .medicine_details_container .add_cart_section");





    
    // Opening cart for review
    await page.click(".cart_container .cart_icon");


    // waiting for loading of ".cart_order_button_container div" section
    await page.waitForSelector(".cart_order_button_container .btn-success");





    // clicked in the "Order Button" to go to the "Checkout" Page
    await Promise.all([
        page.click(".cart_order_button_container .btn-success"),
        page.waitForNavigation()
    ])



    // Waiting to load tll the last section
    await page.waitForSelector(".order_summery_container .payment_section");


    // fill upping the form
    await page.type(".billing_container #name", "Kowshik")
    await page.select(".billing_container #division", "Chattagram")
    await page.select(".billing_container #district", "Coxsbazar")
    await page.select(".billing_container #thana", "Coxsbazar Sadar")
    await page.type(".billing_container #address", "এ- ১৪/৪ বড় মহেষখালী")
    await page.type(".billing_container #mobile", "01234567890")
    await page.type(".billing_container #email", "ex@yahoo.com")




    // Clicked for final review
    await page.click(".billing_container .btn-outline-primary")

    // Selected Payment Method
    await page.click(".order_summery_container .payment_section #pay_later")




    // Finally Order Placed and Go to homepage
    await Promise.all([page.click(".order_summery_container .btn_place_order"), page.waitForNavigation(), page.waitForSelector(".medicine_title")])

    

    await browser.close();
}


OrderProduct();