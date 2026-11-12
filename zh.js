/* 繁體中文 layer for visitors whose browser language is zh-TW / zh-HK / zh-MO / zh-Hant.
   The site itself stays in its English mode (data-lang="en", PayPal checkout); this file only
   swaps visible English UI text for Traditional Chinese, and puts the English back when EN is chosen.
   Loaded only for those visitors by the small loader in the page head. */
(function(){
'use strict';
var H=document.documentElement;
/* any Chinese browser: Traditional for Taiwan / Hong Kong / Macau, Simplified (mainland, Singapore…) otherwise */
var NL=navigator.language||'', ZU=/^zh/i.test(NL);
/*HANS*/var HC="並并併并來来個个備备傳传僅仅價价內内兩两刪删則则務务區区問问啟启單单嗎吗嘗尝國国圖图堅坚報报壓压壞坏學学實实寫写將将尋寻層层帳帐幾几庫库廳厅張张後后態态戶户捲卷掛挂損损擇择擔担據据擬拟敗败數数斷断於于時时暫暂書书會会業业樓楼標标樹树權权歷历氣气沒没減减準准濟济瀏浏為为無无營营牆墙狀状獎奖獲获獻献畫画異异當当發发盡尽確确碼码稅税稱称筆笔範范簡简簽签約约紅红納纳紙纸細细結结絕绝絡络給给經经網网線线編编總总繪绘繳缴續续聯联聲声與与蓋盖藝艺虛虚號号術术裝装裡里製制複复見见規规親亲覽览訂订計计訊讯記记設设許许訴诉註注評评詢询試试話话認认語语誤误請请論论謝谢議议護护讀读變变負负貨货販贩買买費费貼贴資资賣卖購购蹤踪車车較较載载輸输辦办這这連连週周進进運运過过達达遞递適适選选還还郵邮錄录錯错閉闭開开間间閱阅關关隨随隱隐電电靜静韓韩頁页項项預预領领題题額额顯显駐驻麼么點点",HW={"· 每件作品皆為限量版或單件原作，恕不接受退貨。若商品送達時有損壞，請於收件後 7 天內附上商品及包裝的照片與我聯絡，確認損壞後將為您辦理退款。":"· 每件作品皆为限量版或单件原作，恕不接受退货。若商品送达时有损坏，请于收件后 7 天内附上商品及包装的照片与我联系，确认损坏后将为您办理退款。","傳送":"发送","傳送中…":"发送中…","傳送失敗。":"发送失败。","傳送失敗。請再試一次，或寄信至 ":"发送失败。请再试一次，或寄信至 ","傳送訊息":"发送消息","傳送訊息給藝術家":"发送消息给艺术家","可使用 PayPal 付款，或透過 PayPal 以信用卡／簽帳金融卡付款。以卡片付款不需要 PayPal 帳戶。":"可使用 PayPal 付款，或通过 PayPal 以信用卡／借记卡付款。以卡片付款不需要 PayPal 帐户。","商品資訊":"商品信息","尚無聯絡資訊。":"尚无联系信息。","尚無訊息。":"尚无消息。","已複製連結，請貼到 Safari 或 Chrome 開啟":"已拷贝链接，请贴到 Safari 或 Chrome 打开","布面壓克力":"布面丙烯","建議在 Safari 或 Chrome 中結帳。請點右上角的 •••，再選擇「在外部瀏覽器開啟」。":"建议在 Safari 或 Chrome 中结帐。请点右上角的 •••，再选择「在外部浏览器打开」。","彩繪 3D 列印樹脂":"彩绘 3D 打印树脂","影片":"视频","您的收件資訊會隨 PayPal 訂單一併送出。可使用信用卡／簽帳金融卡付款。進口關稅與稅金由買家負擔；美國訂單除外，以完稅方式寄送（到貨時無需另付費用）。":"您的收件信息会随 PayPal 订单一并送出。可使用信用卡／借记卡付款。进口关税与税金由买家负担；美国订单除外，以完税方式寄送（到货时无需另付费用）。","收件資訊":"收件信息","數位合成照片":"数字合成照片","查詢":"查找","每件作品皆為限量版或單件原作，恕不接受退貨。若商品送達時有損壞，請於收件後 7 天內附上商品及包裝的照片與我聯絡，確認損壞後將為您辦理退款。":"每件作品皆为限量版或单件原作，恕不接受退货。若商品送达时有损坏，请于收件后 7 天内附上商品及包装的照片与我联系，确认损坏后将为您办理退款。","無法載入 PayPal，請重新整理頁面。":"无法加载 PayPal，请刷新页面。","登出":"注销","確認付款時連線中斷，付款可能已完成也可能未完成。再次嘗試前，請先查看「我的訂單」或您的 PayPal 帳戶，或寄信至 ":"确认付款时连接中断，付款可能已完成也可能未完成。再次尝试前，请先查看「我的订单」或您的 PayPal 帐户，或寄信至 ","紙本數位版畫":"纸本数字版画","網路書店":"网络书店","網路錯誤。":"网络错误。","網路錯誤，請再試一次。":"网络错误，请再试一次。","聯絡":"联系","藝術家會直接回信到您的電子郵件。您的電子郵件僅用於回覆。":"艺术家会直接回信到您的电子邮件。您的电子邮件仅用于回复。","複製頁面連結":"拷贝页面链接","訂單狀態與訊息":"订单状态与消息","訊息":"消息","請填寫標示紅色的收件資訊。":"请填写标示红色的收件信息。","請複製此連結：":"请拷贝此链接：","請輸入訊息。":"请输入消息。","謝謝您，訊息已送出。藝術家將以電子郵件回覆。":"谢谢您，消息已送出。艺术家将以电子邮件回复。","載入中…":"加载中…","輸入英文搜尋 — 例：T 搜尋 Taiwan":"输入英文搜索 — 例：T 搜索 Taiwan","這些訊息只有您和藝術家看得到。":"这些消息只有您和艺术家看得到。","連線已逾時，請重新輸入電子郵件。":"连接已逾时，请重新输入电子邮件。","郵遞區號":"邮政编码","開啟聲音":"打开声音","開啟購物車":"打开购物车","關於訂單，要如何聯絡您？":"关于订单，要如何联系您？","隱私權政策":"隐私政策"};/*/HANS*/
var HCM={}; for(var hi=0;hi<HC.length;hi+=2) HCM[HC.charAt(hi)]=HC.charAt(hi+1);
var HANS=false;
function zhv(){ var v=''; try{ v=localStorage.getItem('lysZhV')||''; }catch(e){} return v?v==='hans':(ZU&&!/^zh-(tw|hk|mo)|^zh-hant/i.test(NL)); }
function cv(t){ if(!HANS||t==null) return t; if(Object.prototype.hasOwnProperty.call(HW,t)) return HW[t]; return t.replace(/[\u3400-\u9fff]/g,function(c){ return HCM[c]||c; }); }
/* master mode: every language can be picked (KO / EN / 中文), Chinese only when chosen */
var MU=false; try{ MU=/(^|; )lysM=1/.test(document.cookie)||localStorage.getItem('leeArchiveMasterOn_v2')==='1'||sessionStorage.getItem('leeArchiveMasterOn_v2')==='1'; }catch(e){}
if(!ZU&&!MU){ H.classList.remove('zhwait'); return; }

/* ---------- exact strings ---------- */
var D={
/* menu */
'CV':'簡歷','WORKS':'作品','TEXT':'文章','SHOP':'商店','CONTACT':'聯絡','GALLERY':'展廳',
'ORIGINALS':'原作','SCULPTURE':'雕塑','EDITIONS':'版畫','BOOKS':'書籍','MY ORDER':'我的訂單',
'Language':'語言','Virtual exhibition':'虛擬展廳','Privacy Policy':'隱私權政策',
'More Works':'更多作品','Next':'下一件','More':'更多','More text':'更多文章',
'Read more':'展開閱讀','Show less':'收合','Show all':'顯示全部',
'View work →':'查看作品 →','Original Work':'原作','Poster Examples':'海報實拍範例',
'View on your wall':'掛在我的牆上看看（AR）','View in your space':'放在我的空間看看（AR）',
'No works yet.':'尚無作品。','No texts yet.':'尚無文章。','Not found.':'找不到此項目。','Item not found.':'找不到此商品。',
'No contact information yet.':'尚無聯絡資訊。','Coming soon':'即將推出',
'Sound on':'開啟聲音','Mute':'靜音','Video':'影片',
/* contact / CV labels */
'Email':'電子郵件','Instagram':'Instagram',
'Education':'學歷','Solo Exhibitions':'個展','Group Exhibitions':'聯展','Awards':'獲獎','Residencies':'駐村',
'Collections':'典藏','Publications':'出版','Selected Bibliography':'相關評論與文獻',
/* newsletter */
'News about new editions and works, sent by email.':'新版畫與新作品的消息，將以電子郵件寄送給您。',
'Subscribe':'訂閱','Unsubscribe anytime.':'可隨時取消訂閱。',
'Please enter a valid email address.':'請輸入有效的電子郵件地址。',
'You are already on the list. Thank you.':'您已經訂閱過了，謝謝。',
'Thank you. I will let you know when something new is ready.':'謝謝您。有新消息時我會寫信通知您。',
'Could not sign up. Please try again later.':'訂閱失敗，請稍後再試。',
'Sending…':'傳送中…',
/* shop list / item */
'Sold out':'已售完','SOLD OUT':'已售完','Unique work':'單件原作','Out of print':'已絕版',
'Digital Print on Paper':'紙本數位版畫','Oil on canvas':'布面油畫','Acrylic on canvas':'布面壓克力',
'Painted 3D-printed resin':'彩繪 3D 列印樹脂',
'International':'海外','PayPal / Card':'PayPal / 信用卡','Inquire':'購買洽詢','Send a message':'傳送訊息',
'Buy with PayPal':'以 PayPal 購買','International · Card OK':'海外 · 可用信用卡','International — Sold out':'海外 · 已售完',
'Shipping & FAQ →':'運送與常見問題 →','Shipping & FAQ':'運送與常見問題',
'International orders: add to cart and pay with PayPal or card (USD, shipping from Korea).':'海外訂購：加入購物車後，以 PayPal 或信用卡付款（美元計價，自韓國寄出）。',
'Orders within Korea go to Naver Smart Store (Naver Pay).':'韓國國內訂購請前往 Naver Smart Store（Naver Pay）。',
'Sorry, this item is sold out for international orders.':'抱歉，此商品的海外訂購已售完。',
'About the Book':'關於本書','Contents':'目錄','Product Details':'商品資訊',
'Publication Date':'出版日期','Pages':'頁數','Weight':'重量','Dimensions':'尺寸','ISBN-13':'ISBN-13',
'Various authors':'多位作者','Online Bookstore':'網路書店','Korea':'韓國',
'3D rendering':'3D 渲染圖','Digitally composited photograph':'數位合成照片','Custom crate, 3D mockup':'訂製木箱，3D 示意圖',
/* inquiry form */
'Name (optional)':'姓名（選填）','Message':'訊息','Send':'傳送','Close':'關閉',
'The artist will reply to your email directly. Your email is used only to reply.':'藝術家會直接回信到您的電子郵件。您的電子郵件僅用於回覆。',
'Please check your email address.':'請確認電子郵件地址。','Please write a message.':'請輸入訊息。',
'Thank you. Your message has been sent — the artist will reply by email.':'謝謝您，訊息已送出。藝術家將以電子郵件回覆。',
/* cart */
'CART':'購物車','International · PayPal':'海外 · PayPal','Remove':'移除','Shipping details':'收件資訊',
'Country':'國家／地區','Loading…':'載入中…','Select country…':'選擇國家／地區…','Type to search — e.g. J for Japan':'輸入英文搜尋 — 例：T 搜尋 Taiwan',
'No matching country':'找不到符合的國家／地區','Shipping':'運費','Shipping method':'寄送方式',
'Full name':'收件人姓名（英文）','Phone':'電話','Address':'地址','City':'城市','State':'州','State / Province':'州／省',
'Select…':'請選擇…','Postal code':'郵遞區號','ZIP code':'郵遞區號','Tax ID':'稅號','Note':'備註','(optional)':'（選填）',
'Street address':'街道地址（英文）','Apt, suite, unit (optional)':'樓層、室號（選填）','Anything I should know?':'有什麼需要告訴我的嗎？',
'Items':'商品','Shipping (select country)':'運費（請選擇國家／地區）','Total (USD)':'總計（美元）',
'Shipping is one flat fee per order, however many you add.':'每筆訂單只收一次固定運費，不論加購幾件。',
'Shipping is charged once per order, however many you add.':'每筆訂單只收一次運費，不論加購幾件。',
'Paying from Instagram?':'正在 Instagram 內付款嗎？',
'Checkout works best in Safari or Chrome. Tap ••• at the top right, then “Open in external browser”.':'建議在 Safari 或 Chrome 中結帳。請點右上角的 •••，再選擇「在外部瀏覽器開啟」。',
'Copy page link':'複製頁面連結','Link copied — paste it in Safari or Chrome':'已複製連結，請貼到 Safari 或 Chrome 開啟',
'Copy this link:':'請複製此連結：',
'Your shipping details are sent with your PayPal order. Credit/debit cards accepted. Import duties/taxes are the buyer\'s responsibility, except US orders, which ship duty-paid (nothing to pay on delivery).':'您的收件資訊會隨 PayPal 訂單一併送出。可使用信用卡／簽帳金融卡付款。進口關稅與稅金由買家負擔；美國訂單除外，以完稅方式寄送（到貨時無需另付費用）。',
'. By paying you agree to our':'。付款即表示您同意本站的','.':'。',
'Korean PayPal accounts may not be able to pay a Korean seller. · 한국 PayPal 계정은 결제가 되지 않을 수 있습니다. 국내 구매는 네이버페이를 이용해 주세요.':'韓國的 PayPal 帳戶可能無法付款給韓國賣家。 · 한국 PayPal 계정은 결제가 되지 않을 수 있습니다. 국내 구매는 네이버페이를 이용해 주세요.',
'· 배송 정보 (English)':'· 請以英文填寫','Cart':'購物車','Open cart':'開啟購物車','Collapse cart':'收合購物車','접기 / Collapse':'收合','Decrease':'減少','Increase':'增加',
'Your cart is empty.':'購物車是空的。',
'Please fill in the highlighted shipping details. · 빨간 칸을 채워 주세요.':'請填寫標示紅色的收件資訊。',
'Please write the name and address in English letters. · 이름·주소는 영문으로 써 주세요.':'收件人姓名與地址請以英文填寫。',
'No more available for this item.':'此商品已無更多庫存。',"Quantity adjusted to what's available.":'數量已依庫存調整。',
'Sold out — please remove':'已售完，請移除',
'Could not start checkout. You have not been charged.':'無法開始結帳，您尚未被扣款。',
'Payment could not be completed. You have not been charged.':'付款未完成，您尚未被扣款。',
'Payment could not be completed.':'付款未完成。',
'PayPal could not be loaded. Please refresh the page.':'無法載入 PayPal，請重新整理頁面。',
'Network error.':'網路錯誤。','Network error. Please try again.':'網路錯誤，請再試一次。',
'Thank you! Your order has been placed.':'謝謝您！訂單已成立。',
'PayPal will email your receipt. Your order will ship within a week, and the tracking number will appear in MY ORDER once it ships.':'PayPal 會寄送收據到您的電子郵件。訂單將於一週內寄出，寄出後追蹤號碼會顯示在「我的訂單」。',
'ORDER COMPLETE':'訂購完成','PAYMENT COMPLETE':'付款完成','Untitled':'無題',
/* my order */
'Order status & messages':'訂單狀態與訊息','Enter the email you used at checkout.':'請輸入結帳時填寫的電子郵件。',
'View':'查詢','Sign out':'登出','Orders':'訂單','Messages':'訊息','No messages yet.':'尚無訊息。',
'Only you and the artist can see these messages.':'這些訊息只有您和藝術家看得到。',
'Session expired. Please enter your email again.':'連線已逾時，請重新輸入電子郵件。',
'Payment received':'已付款','Preparing':'準備出貨','Shipped':'已出貨','Payment pending':'付款確認中','Refunded':'已退款','Canceled':'已取消',
'Track package →':'追蹤包裹 →','Korea Post':'韓國郵政','Could not send.':'傳送失敗。','Could not delete.':'刪除失敗。',
'Send a message to the artist':'傳送訊息給藝術家',
/* footer */
'· International orders (PayPal) ship by Korea Post within a week of payment. Prints can ship by K-Packet or EMS.':'· 海外訂單（PayPal）於付款後一週內由韓國郵政寄出。版畫可選擇 K-Packet 或 EMS 寄送。',
'· As each work is a limited edition or a unique piece, returns are not accepted. If your item arrives damaged, please contact me within 7 days of delivery with photos of the item and its packaging, and I will arrange a refund once the damage is confirmed.':'· 每件作品皆為限量版或單件原作，恕不接受退貨。若商品送達時有損壞，請於收件後 7 天內附上商品及包裝的照片與我聯絡，確認損壞後將為您辦理退款。'
};

/* the static Shipping & FAQ page (/en/shipping/) */
var SHIP={
'Every order is packed by hand in my studio in Korea and shipped worldwide with tracking.':'每一筆訂單都在我位於韓國的工作室親手包裝，並以附追蹤號碼的方式寄往世界各地。',
'Orders ship within one week of payment, by Korea Post.':'訂單於付款後一週內，由韓國郵政寄出。',
'Prints: choose K-Packet or EMS at checkout.':'版畫：結帳時可選擇 K-Packet 或 EMS。',
'K-Packet is Korea Post’s economical tracked service and usually arrives two to three weeks after dispatch. EMS is the express service and usually arrives in about one to two weeks. K-Packet is available for print orders to selected countries.':'K-Packet 是韓國郵政較經濟、可追蹤的寄送方式，寄出後通常約兩到三週送達。EMS 為快捷服務，通常約一到兩週送達。K-Packet 僅適用於寄往部分國家／地區的版畫訂單。',
'Original works and books ship by EMS.':'原作與書籍以 EMS 寄送。',
'One shipping fee per order,':'每筆訂單只收一次運費，',
'however many items you buy. The fee depends on the destination and is shown in the cart once you choose your country. With K-Packet, one fee covers up to 4 prints, and a slightly higher fee covers 5 or more.':'不論購買幾件。運費依目的地而定，在購物車中選擇國家／地區後即會顯示。使用 K-Packet 時，一筆運費最多涵蓋 4 張版畫；5 張以上則為稍高的一筆運費。',
'Delivery times depend on the destination and on customs. If your local post office leaves a delivery notice, please arrange redelivery or pickup promptly, as unclaimed parcels are returned to Korea.':'送達時間依目的地及海關作業而定。若當地郵局留下招領通知，請盡快安排再次投遞或前往領取，逾期未領的包裹將退回韓國。',
'Once your order ships, the tracking number appears in':'訂單寄出後，追蹤號碼會顯示在',
'and in your PayPal order details.':'以及您的 PayPal 訂單明細中。',
'Shipping':'寄送','Shipping & FAQ':'運送與常見問題','Packaging':'包裝',
'Posters are rolled in protective paper and bubble wrap and shipped in a sturdy cardboard tube.':'海報以保護紙和氣泡紙捲起，裝入堅固的紙筒寄出。',
'Posters ship unframed.':'海報不含畫框。',
'Original works are wrapped in protective layers and packed securely for the journey.':'原作以多層保護材料包覆，並妥善包裝以確保運送安全。',
'Customs, duties and taxes':'海關、關稅與稅金',
'United States:':'美國：',
'orders ship duty-paid. Duties are included at checkout, so there is nothing to pay on delivery.':'訂單以完稅方式寄送。關稅已於結帳時一併計入，到貨時無需另付費用。',
'All other countries:':'其他國家／地區：',
'import duties and taxes, if any, are the buyer’s responsibility and may be collected by your local post or customs office on delivery. Amounts vary by country.':'如有進口關稅與稅金，由買家負擔，可能於到貨時由當地郵局或海關收取。金額依各國規定而異。',
'Returns and damage':'退貨與損壞',
'As each work is a limited edition or a unique piece, returns are not accepted. If your item arrives damaged, please contact me within 7 days of delivery with photos of the item and its packaging, and I will arrange a refund once the damage is confirmed.':'每件作品皆為限量版或單件原作，恕不接受退貨。若商品送達時有損壞，請於收件後 7 天內附上商品及包裝的照片與我聯絡，確認損壞後將為您辦理退款。',
'Payment':'付款方式',
'Prices are in US dollars.':'價格以美元計價。',
'Pay with PayPal or with a credit or debit card through PayPal. You do not need a PayPal account to pay by card.':'可使用 PayPal 付款，或透過 PayPal 以信用卡／簽帳金融卡付款。以卡片付款不需要 PayPal 帳戶。',
'FAQ':'常見問題',
'Are the posters signed?':'海報有簽名嗎？',
'Yes. Each poster is signed and numbered by hand, in editions of 300.':'有的。每張海報都親筆簽名並編號，限量 300 版。',
'Can I buy a work that is not in the shop?':'商店裡沒有的作品也可以購買嗎？',
'Many works shown on this site are available by inquiry. Please write to':'本站展示的許多作品都可以洽詢購買。請來信至',
'with the title of the work.':'，並註明作品名稱。',
'Can I order several items together?':'可以一次訂購多件商品嗎？',
'Yes. Add everything to the cart and check out once; you pay a single shipping fee for the whole order.':'可以。將商品全部加入購物車後一次結帳，整筆訂單只需支付一次運費。',
'How do I contact you about my order?':'關於訂單，要如何聯絡您？',
'with your order number. You can also check your order status in':'並附上訂單編號。您也可以前往',
'.':'查看訂單狀態。',
'← Back to SHOP':'← 返回商店'
};
if(/^\/en\/shipping\/?$/.test(location.pathname)){ for(var k in SHIP) D[k]=SHIP[k]; D['Email']='請寄信至'; }

/* ---------- patterns (numbers, prices, names) ---------- */
var SEC={'EDITIONS':'版畫','ORIGINALS':'原作','SCULPTURE':'雕塑','BOOKS':'書籍','SHOP':'商店','WORKS':'作品','TEXT':'文章','MY ORDER':'我的訂單'};
var KIND={'Edition':'版畫','Original':'原作','Sculpture':'雕塑','Book':'書籍'};
function fee(x){ return x?'（'+x.replace(/^ \(|\)$/g,'')+'）':''; }
var R=[
 [/^← Back to (.+)$/, function(m){ return '← 返回'+(SEC[m[1]]||m[1]); }],
 [/^CART · (\d+) · (\$[\d.,]+)$/, function(m){ return '購物車 · '+m[1]+' · '+m[2]; }],
 [/^(Edition|Original|Sculpture|Book) · (\$[\d.,]+)$/, function(m){ return KIND[m[1]]+' · '+m[2]; }],
 [/^Signed and numbered, edition of (\d+) \+ (\d+) AP$/, function(m){ return '親筆簽名並編號，限量 '+m[1]+' 版 + '+m[2]+' AP'; }],
 [/^Signed and numbered, edition of (\d+)$/, function(m){ return '親筆簽名並編號，限量 '+m[1]+' 版'; }],
 [/^Maximum (\d+) per item\.$/, function(m){ return '每件商品最多 '+m[1]+' 件。'; }],
 [/^(\d+) pages$/, function(m){ return m[1]+' 頁'; }],
 [/^by (.+)$/, function(m){ return '作者：'+m[1]; }],
 [/^designed by (.+)$/, function(m){ return '設計：'+m[1]; }],
 [/^✓ One shipping fee( \(\$[\d.]+\))? covers all (\d+) (prints|items)\.$/, function(m){ return '✓ 一筆運費'+fee(m[1])+'即涵蓋全部 '+m[2]+' 件。'; }],
 [/^Add up to (\d+) more prints for the same shipping( \(\$[\d.]+\))?\.$/, function(m){ return '同一筆運費'+fee(m[2])+'內，最多還可再加購 '+m[1]+' 張版畫。'; }],
 [/^Add more prints — shipping stays the same( \(\$[\d.]+\))?\.$/, function(m){ return '再加購版畫，運費不變'+fee(m[1])+'。'; }],
 [/^US import duty \((\d+(?:\.\d+)?)%, prepaid\)$/, function(m){ return '美國進口關稅（'+m[1]+'%，已預付）'; }],
 [/^US import duty \((\d+(?:\.\d+)?)%\)$/, function(m){ return '美國進口關稅（'+m[1]+'%）'; }],
 [/^US orders: import duty \((\d+(?:\.\d+)?)%\) is prepaid by me at shipping and included in your total — no extra charge on delivery\.$/, function(m){ return '美國訂單：進口關稅（'+m[1]+'%）由我在寄件時預先繳納，已包含在總金額內，到貨時無需另付費用。'; }],
 [/^Tax ID \((.+)\)$/, function(m){ return '稅號（'+m[1]+'）'; }],
 [/^Total \$([\d.]+) \(incl\. shipping \$([\d.]+)(?:, US duty \$([\d.]+))?\)$/, function(m){ return '總計 $'+m[1]+'（含運費 $'+m[2]+(m[3]?'、美國關稅 $'+m[3]:'')+'）'; }],
 [/^Total \$([\d.]+) \(shipping \$([\d.]+)(?:, US duty \$([\d.]+))?\)(?: · Ship to (.+))?$/, function(m){ return '總計 $'+m[1]+'（運費 $'+m[2]+(m[3]?'、美國關稅 $'+m[3]:'')+'）'+(m[4]?' · 寄往 '+m[4]:''); }],
 [/^"(.+)" is sold out\. Please remove it\.$/, function(m){ return '「'+m[1]+'」已售完，請將其移除。'; }],
 [/^Could not send\. Please try again, or email (.+)$/, function(m){ return '傳送失敗。請再試一次，或寄信至 '+m[1]; }],
 [/^International checkout is temporarily unavailable\. Please email (.+?)\.?$/, function(m){ return '海外結帳暫時無法使用，請寄信至 '+m[1]+'。'; }],
 [/^Something went wrong with PayPal\. You have not been charged\. If it keeps happening, email (.+?)\.?$/, function(m){ return 'PayPal 發生問題，您尚未被扣款。若問題持續，請寄信至 '+m[1]+'。'; }],
 [/^Connection lost while confirming the payment — it may or may not have gone through\. Please check MY ORDER or your PayPal account before trying again, or email (.+?)\.?$/, function(m){ return '確認付款時連線中斷，付款可能已完成也可能未完成。再次嘗試前，請先查看「我的訂單」或您的 PayPal 帳戶，或寄信至 '+m[1]+'。'; }],
 [/^Image (\d+)$/, function(m){ return '圖片 '+m[1]; }],
 [/^(.+) — WORKS$/, function(m){ return m[1]+' — 作品'; }],
 [/^Business (.+?) · Representative (.+?) · Business Reg\. No\. (.+)$/, function(m){
   return ('商號 '+m[1]+' · 代表人 '+m[2]+' · 營業登記號碼 '+m[3])
     .replace(' Mail-order Reg. No. ',' 通信販賣業申報 ').replace(/ Address /,' 地址 ').replace(' · Phone ',' · 電話 ').replace(' · Email ',' · 電子郵件 '); }]
];

function tr1(s){
  var k=s.replace(/\s+/g,' ').trim(); if(!k) return null;
  if(Object.prototype.hasOwnProperty.call(D,k)) return D[k];
  for(var i=0;i<R.length;i++){ var m=k.match(R[i][0]); if(m) return R[i][1](m); }
  return null;
}
function tr(s){
  var t=tr1(s); if(t!=null) return t;
  if(s.indexOf('\n')<0) return null;
  /* several lines in one text node: translate line by line, keep the rest */
  var hit=false, out=s.split('\n').map(function(l){ var x=tr1(l); if(x==null) return l; hit=true; return l.match(/^\s*/)[0]+x; });
  return hit?out.join('\n'):null;
}

/* ---------- swapping ---------- */
var on=false, done=[], doneA=[];
var SKIP='script,style,textarea,noscript,[contenteditable],.l-ko,.only-ko,.modal,.notranslate,.me-bubble,.me-who,.me-no,.me-date';
function skip(el){ return !el||(el.closest&&el.closest(SKIP)); }
function txt(n){
  var el=n.parentElement; if(skip(el)) return;
  var v=n.nodeValue; if(!v||!/[A-Za-z.]/.test(v)) return;
  if(n.__zh&&n.__zh[1]===v) return;
  /* the language buttons: KO becomes 中文 */
  if(ZU&&el.matches&&el.matches('[data-setlang="ko"]')){ if(v!=='中文'){ n.__zh=[v,'中文']; done.push(n); n.nodeValue='中文'; } return; }
  if(!on) return;
  if(el.closest('[data-setlang]')) return;
  var t=cv(tr(v)); if(t==null) return;
  var lead=v.match(/^\s*/)[0], trail=v.match(/\s*$/)[0], nv=(t.indexOf('\n')>=0?t:lead+t+trail);
  n.__zh=[v,nv]; done.push(n); n.nodeValue=nv;
}
var AT=['placeholder','title','aria-label'];
function attrs(el){
  if(!on||!el||(el.closest&&el.closest('.l-ko,.only-ko,.modal,.notranslate'))) return;
  for(var i=0;i<AT.length;i++){ var a=AT[i], v=el.getAttribute(a); if(!v||!/[A-Za-z]/.test(v)) continue;
    var rec=el.__zha||(el.__zha={}); if(rec[a]&&rec[a][1]===v) continue;
    var t=cv(tr(v)); if(t==null) continue; rec[a]=[v,t]; doneA.push([el,a]); el.setAttribute(a,t); }
}
function walk(root){
  if(root.nodeType===3){ txt(root); return; }
  if(root.nodeType!==1) return;
  if(root.hasAttribute&&(root.hasAttribute('placeholder')||root.hasAttribute('title')||root.hasAttribute('aria-label'))) attrs(root);
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,null), n;
  while((n=w.nextNode())){ if(n.nodeType===3) txt(n); else if(n.hasAttribute('placeholder')||n.hasAttribute('title')||n.hasAttribute('aria-label')) attrs(n); }
}
function revert(){
  for(var i=0;i<done.length;i++){ var n=done[i]; if(n.__zh&&n.nodeValue===n.__zh[1]&&n.__zh[1]!=='中文'){ n.nodeValue=n.__zh[0]; n.__zh=null; } }
  done=done.filter(function(n){ return n.__zh&&n.isConnected; });
  for(var j=0;j<doneA.length;j++){ var el=doneA[j][0], a=doneA[j][1], r=el.__zha&&el.__zha[a]; if(r&&el.getAttribute(a)===r[1]){ el.setAttribute(a,r[0]); el.__zha[a]=null; } }
  doneA=[];
}
/* master (not a Taiwan/Hong Kong browser): a third button 中文 after KO / EN */
function zhBtns(){
  if(ZU) return;
  var ls=document.querySelectorAll('.lang-switch:not([data-zhb])');
  for(var i=0;i<ls.length;i++){ var w=ls[i]; w.setAttribute('data-zhb','1');
    var sep=document.createElement('i'); sep.textContent='/';
    w.appendChild(sep);
    [['hant','繁中'],['hans','简中']].forEach(function(x,j){ if(j){ var s2=document.createElement('i'); s2.textContent='/'; w.appendChild(s2); }
      var b=document.createElement('button'); b.type='button'; b.setAttribute('data-setlang','zh'); b.setAttribute('data-zhv',x[0]); b.textContent=x[1]; w.appendChild(b); }); }
}
var mo=new MutationObserver(function(ms){
  zhBtns();
  for(var i=0;i<ms.length;i++){ var m=ms[i];
    if(m.type==='childList'){ for(var j=0;j<m.addedNodes.length;j++) walk(m.addedNodes[j]); }
    else if(m.type==='characterData') txt(m.target);
    else if(m.type==='attributes') attrs(m.target);
  }
});

/* alerts and prompts from the shop */
var _al=window.alert, _pr=window.prompt;
window.alert=function(m){ return _al.call(window, on&&typeof m==='string'?(cv(tr(m))||m):m); };
window.prompt=function(m,d){ return _pr.call(window, on&&typeof m==='string'?(cv(tr(m))||m):m, d); };

function setOn(v){
  on=v;
  try{ localStorage.setItem('lysZh',v?'1':'0'); }catch(e){}
  H.classList.toggle('zh',v);
  if(v){
    if(H.getAttribute('data-lang')!=='en'){ H.setAttribute('data-lang','en'); try{ localStorage.setItem('lysLang','en'); }catch(e){} }
    HANS=zhv(); H.classList.toggle('zhs',HANS); H.setAttribute('lang',HANS?'zh-Hans':'zh-Hant'); walk(document.body);
  } else { H.classList.remove('zhs'); revert(); setTimeout(function(){ H.setAttribute('lang',H.getAttribute('data-lang')==='ko'?'ko':'en'); },0); }
}

/* 中文 / EN: KO is shown as 中文 for these visitors */
window.addEventListener('click',function(e){
  var b=e.target&&e.target.closest&&e.target.closest('[data-setlang]'); if(!b) return;
  var l=b.getAttribute('data-setlang');
  if(l==='zh'||(ZU&&l==='ko')){ e.preventDefault(); e.stopImmediatePropagation();
    var v=b.getAttribute('data-zhv'); if(v){ try{ localStorage.setItem('lysZhV',v); }catch(er){} if(on&&HANS!==(v==='hans')){ revert(); setOn(true); return; } }
    if(!on) setOn(true); }
  else if(on) setOn(false);
},true);

var css=document.createElement('style');
css.textContent='html.zhu .lang-switch [data-setlang="ko"]{letter-spacing:.04em}'+
 'html.zh:not(.zhs) .lang-switch [data-zhv="hant"],html.zh.zhs .lang-switch [data-zhv="hans"]{color:var(--ink)!important;font-weight:600!important}'+
 'html.zhu.zh .lang-switch [data-setlang="ko"]{color:var(--ink)!important;font-weight:600!important}'+
 'html.zh:not(.zhu) .lang-switch [data-setlang="ko"]{color:var(--ink-faint,#aaa)!important;font-weight:400!important}'+
 'html.zh .lang-switch [data-setlang="en"]{color:var(--ink-faint,#aaa)!important;font-weight:400!important}'+
 'html.zh body{word-break:normal;line-break:strict}';
document.head.appendChild(css);

function start(){
  if(ZU) H.classList.add('zhu');
  var want=ZU; try{ var z=localStorage.getItem('lysZh'); want=ZU?z!=='0':z==='1'; }catch(e){}
  zhBtns();
  on=false; walk(document.body);           /* the 中文 label */
  if(want) setOn(true); else H.classList.remove('zh');
  mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:AT});
  H.classList.remove('zhwait');
}
if(document.body) start(); else document.addEventListener('DOMContentLoaded',start);
})();
