/* 繁體中文 layer for visitors whose browser language is zh-TW / zh-HK / zh-MO / zh-Hant.
   The site itself stays in its English mode (data-lang="en", PayPal checkout); this file only
   swaps visible English UI text for Traditional Chinese, and puts the English back when EN is chosen.
   Loaded only for those visitors by the small loader in the page head. */
(function(){
'use strict';
var H=document.documentElement;
/* any Chinese browser: Traditional for Taiwan / Hong Kong / Macau, Simplified (mainland, Singapore…) otherwise; Japanese browsers: 日本語 */
var NL=navigator.language||'', ZU=/^zh/i.test(NL), JU=!ZU&&/^ja/i.test(NL), LG='zh';
/*HANS*/var HC="並并併并來来個个們们備备傳传僅仅價价兒儿內内兩两刪删則则動动務务區区問问啟启單单嗎吗嘗尝國国圖图堅坚報报壓压壞坏學学實实寫写將将尋寻層层屬属帳帐幹干幾几庫库廳厅張张彫雕後后態态戶户捲卷掛挂損损擇择擔担據据擬拟敗败數数斷断於于時时暫暂書书會会條条業业樓楼標标樹树橫横權权歷历氣气沒没減减準准濟济瀏浏為为無无營营爾尔牆墙狀状獎奖獲获獻献現现畫画異异當当發发盡尽確确碼码礎础稅税稱称筆笔範范簡简簽签紀纪約约紅红納纳紙纸細细結结絕绝絡络給给經经網网緒绪線线編编總总繞绕繪绘繳缴續续纏缠聯联聲声臉脸與与蓋盖藝艺虛虚號号術术裝装裡里製制複复見见規规視视親亲覺觉覽览訂订計计訊讯記记設设許许訴诉註注評评詢询試试詮诠話话認认語语誤误請请論论謝谢議议護护讀读變变負负貨货販贩買买費费貼贴資资賣卖購购蹤踪軀躯車车較较載载輸输辦办這这連连週周進进運运過过達达遞递適适選选還还郵邮釋释錄录錯错録录閉闭開开間间閱阅關关隨随隱隐電电靜静韓韩頁页項项預预領领題题額额顯显餘余駐驻體体麼么點点",HW={"· 每件作品皆為限量版或單件原作，恕不接受退貨。若商品送達時有損壞，請於收件後 7 天內附上商品及包裝的照片與我聯絡，確認損壞後將為您辦理退款。":"· 每件作品皆为限量版或单件原作，恕不接受退货。若商品送达时有损坏，请于收件后 7 天内附上商品及包装的照片与我联系，确认损坏后将为您办理退款。","傳送":"发送","傳送中…":"发送中…","傳送失敗。":"发送失败。","傳送失敗。請再試一次，或寄信至 ":"发送失败。请再试一次，或寄信至 ","傳送訊息":"发送消息","傳送訊息給藝術家":"发送消息给艺术家","可使用 PayPal 付款，或透過 PayPal 以信用卡／簽帳金融卡付款。以卡片付款不需要 PayPal 帳戶。":"可使用 PayPal 付款，或通过 PayPal 以信用卡／借记卡付款。以卡片付款不需要 PayPal 帐户。","商品資訊":"商品信息","尚無聯絡資訊。":"尚无联系信息。","尚無訊息。":"尚无消息。","已複製連結，請貼到 Safari 或 Chrome 開啟":"已拷贝链接，请贴到 Safari 或 Chrome 打开","布面壓克力":"布面丙烯","建議在 Safari 或 Chrome 中結帳。請點右上角的 •••，再選擇「在外部瀏覽器開啟」。":"建议在 Safari 或 Chrome 中结帐。请点右上角的 •••，再选择「在外部浏览器打开」。","彩繪 3D 列印樹脂":"彩绘 3D 打印树脂","影片":"视频","您的收件資訊會隨 PayPal 訂單一併送出。可使用信用卡／簽帳金融卡付款。進口關稅與稅金由買家負擔；美國訂單除外，以完稅方式寄送（到貨時無需另付費用）。":"您的收件信息会随 PayPal 订单一并送出。可使用信用卡／借记卡付款。进口关税与税金由买家负担；美国订单除外，以完税方式寄送（到货时无需另付费用）。","收件資訊":"收件信息","數位合成照片":"数字合成照片","查詢":"查找","每件作品皆為限量版或單件原作，恕不接受退貨。若商品送達時有損壞，請於收件後 7 天內附上商品及包裝的照片與我聯絡，確認損壞後將為您辦理退款。":"每件作品皆为限量版或单件原作，恕不接受退货。若商品送达时有损坏，请于收件后 7 天内附上商品及包装的照片与我联系，确认损坏后将为您办理退款。","無法載入 PayPal，請重新整理頁面。":"无法加载 PayPal，请刷新页面。","用 Chrome 開啟":"用 Chrome 打开","用瀏覽器開啟":"用浏览器打开","登出":"注销","確認付款時連線中斷，付款可能已完成也可能未完成。再次嘗試前，請先查看「我的訂單」或您的 PayPal 帳戶，或寄信至 ":"确认付款时连接中断，付款可能已完成也可能未完成。再次尝试前，请先查看「我的订单」或您的 PayPal 帐户，或寄信至 ","紙本數位版畫":"纸本数字版画","網路書店":"网络书店","網路錯誤。":"网络错误。","網路錯誤，請再試一次。":"网络错误，请再试一次。","聯絡":"联系","著：":"着：","藝術家會直接回信到您的電子郵件。您的電子郵件僅用於回覆。":"艺术家会直接回信到您的电子邮件。您的电子邮件仅用于回复。","複製頁面連結":"拷贝页面链接","訂單狀態與訊息":"订单状态与消息","訊息":"消息","請填寫標示紅色的收件資訊。":"请填写标示红色的收件信息。","請複製此連結：":"请拷贝此链接：","請輸入訊息。":"请输入消息。","謝謝您，訊息已送出。藝術家將以電子郵件回覆。":"谢谢您，消息已送出。艺术家将以电子邮件回复。","載入中…":"加载中…","輸入英文搜尋 — 例：T 搜尋 Taiwan":"输入英文搜索 — 例：T 搜索 Taiwan","這些訊息只有您和藝術家看得到。":"这些消息只有您和艺术家看得到。","連線已逾時，請重新輸入電子郵件。":"连接已逾时，请重新输入电子邮件。","郵遞區號":"邮政编码","開啟聲音":"打开声音","開啟購物車":"打开购物车","關於訂單，要如何聯絡您？":"关于订单，要如何联系您？","隱私權政策":"隐私政策"};/*/HANS*/
var HCM={}; for(var hi=0;hi<HC.length;hi+=2) HCM[HC.charAt(hi)]=HC.charAt(hi+1);
var HANS=false;
function zhv(){ var v=''; try{ v=localStorage.getItem('lysZhV')||''; }catch(e){} return v?v==='hans':(ZU&&!/^zh-(tw|hk|mo)|^zh-hant/i.test(NL)); }
function cv(t){ if(!HANS||LG!=='zh'||t==null) return t; if(Object.prototype.hasOwnProperty.call(HW,t)) return HW[t]; return t.replace(/[\u3400-\u9fff]/g,function(c){ return HCM[c]||c; }); }
/* master mode: every language can be picked (KO / EN / 中文), Chinese only when chosen */
var MU=false; try{ MU=/(^|; )lysM=1/.test(document.cookie)||localStorage.getItem('leeArchiveMasterOn_v2')==='1'||sessionStorage.getItem('leeArchiveMasterOn_v2')==='1'; }catch(e){}
if(!ZU&&!JU&&!MU){ H.classList.remove('zhwait'); return; }

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
'Copy page link':'複製頁面連結','Payment not working?':'無法付款嗎？','Open in browser':'用瀏覽器開啟','Open in Chrome':'用 Chrome 開啟','Link copied — paste it in Safari or Chrome':'已複製連結，請貼到 Safari 或 Chrome 開啟',
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

/* ---------- 日本語 ---------- */
var DJ={
"CV": "略歴",
"WORKS": "作品",
"TEXT": "テキスト",
"SHOP": "ショップ",
"CONTACT": "連絡先",
"GALLERY": "ギャラリー",
"ORIGINALS": "原画",
"SCULPTURE": "彫刻",
"EDITIONS": "エディション",
"BOOKS": "書籍",
"MY ORDER": "ご注文の確認",
"Language": "言語",
"Virtual exhibition": "バーチャル展示",
"Privacy Policy": "プライバシーポリシー",
"More Works": "ほかの作品",
"Next": "次へ",
"More": "もっと見る",
"More text": "ほかのテキスト",
"Read more": "続きを読む",
"Show less": "閉じる",
"Show all": "すべて表示",
"View work →": "作品を見る →",
"Original Work": "原画",
"Poster Examples": "ポスターの設置例",
"View on your wall": "自分の壁に飾ってみる（AR）",
"View in your space": "お部屋に置いてみる（AR）",
"No works yet.": "まだ作品がありません。",
"No texts yet.": "まだテキストがありません。",
"Not found.": "見つかりません。",
"Item not found.": "商品が見つかりません。",
"No contact information yet.": "連絡先はまだありません。",
"Coming soon": "近日公開",
"Sound on": "音をオン",
"Mute": "ミュート",
"Video": "動画",
"Email": "メール",
"Instagram": "Instagram",
"Education": "学歴",
"Solo Exhibitions": "個展",
"Group Exhibitions": "グループ展",
"Awards": "受賞",
"Residencies": "レジデンス",
"Collections": "所蔵",
"Publications": "出版",
"Selected Bibliography": "主な文献",
"News about new editions and works, sent by email.": "新しいエディションや作品のお知らせをメールでお届けします。",
"Subscribe": "登録する",
"Unsubscribe anytime.": "いつでも解除できます。",
"Please enter a valid email address.": "正しいメールアドレスを入力してください。",
"You are already on the list. Thank you.": "すでに登録されています。ありがとうございます。",
"Thank you. I will let you know when something new is ready.": "ありがとうございます。新しいお知らせができしだいご連絡します。",
"Could not sign up. Please try again later.": "登録できませんでした。しばらくしてからもう一度お試しください。",
"Sending…": "送信中…",
"Sold out": "売り切れ",
"SOLD OUT": "売り切れ",
"Unique work": "一点もの",
"Out of print": "絶版",
"Digital Print on Paper": "紙にデジタルプリント",
"Oil on canvas": "キャンバスに油彩",
"Acrylic on canvas": "キャンバスにアクリル",
"Painted 3D-printed resin": "3Dプリント樹脂に彩色",
"International": "海外",
"PayPal / Card": "PayPal / カード",
"Inquire": "購入のお問い合わせ",
"Send a message": "メッセージを送る",
"Buy with PayPal": "PayPalで購入",
"International · Card OK": "海外 · カード可",
"International — Sold out": "海外 · 売り切れ",
"Shipping & FAQ →": "配送とよくある質問 →",
"Shipping & FAQ": "配送とよくある質問",
"International orders: add to cart and pay with PayPal or card (USD, shipping from Korea).": "海外からのご注文：カートに入れて、PayPalまたはカードでお支払いください（米ドル建て、韓国から発送）。",
"Orders within Korea go to Naver Smart Store (Naver Pay).": "韓国国内のご注文はNaver Smart Store（Naver Pay）へどうぞ。",
"Sorry, this item is sold out for international orders.": "申し訳ありません。この商品は海外向けには売り切れです。",
"About the Book": "本について",
"Contents": "目次",
"Product Details": "商品情報",
"Publication Date": "発行日",
"Pages": "ページ数",
"Weight": "重さ",
"Dimensions": "サイズ",
"ISBN-13": "ISBN-13",
"Various authors": "複数の著者",
"Online Bookstore": "オンライン書店",
"Korea": "韓国",
"3D rendering": "3Dレンダリング",
"Digitally composited photograph": "デジタル合成写真",
"Custom crate, 3D mockup": "特注木箱（3Dイメージ）",
"Name (optional)": "お名前（任意）",
"Message": "メッセージ",
"Send": "送信",
"Close": "閉じる",
"The artist will reply to your email directly. Your email is used only to reply.": "作家からメールで直接お返事します。メールアドレスは返信にのみ使います。",
"Please check your email address.": "メールアドレスをご確認ください。",
"Please write a message.": "メッセージを入力してください。",
"Thank you. Your message has been sent — the artist will reply by email.": "ありがとうございます。メッセージを送信しました。作家からメールでお返事します。",
"CART": "カート",
"International · PayPal": "海外 · PayPal",
"Remove": "削除",
"Shipping details": "お届け先",
"Country": "国・地域",
"Loading…": "読み込み中…",
"Select country…": "国・地域を選択…",
"Type to search — e.g. J for Japan": "英語で検索 — 例：J で Japan",
"No matching country": "該当する国・地域がありません",
"Shipping": "送料",
"Shipping method": "配送方法",
"Full name": "お名前（ローマ字）",
"Phone": "電話番号",
"Address": "住所",
"City": "市区町村",
"State": "州",
"State / Province": "都道府県・州",
"Select…": "選択…",
"Postal code": "郵便番号",
"ZIP code": "郵便番号",
"Tax ID": "納税者番号",
"Note": "備考",
"(optional)": "（任意）",
"Street address": "番地・建物名（ローマ字）",
"Apt, suite, unit (optional)": "部屋番号など（任意）",
"Anything I should know?": "ご要望などがあればどうぞ",
"Items": "商品",
"Shipping (select country)": "送料（国・地域を選択）",
"Total (USD)": "合計（米ドル）",
"Shipping is one flat fee per order, however many you add.": "送料は1回のご注文につき一律です。何点追加しても変わりません。",
"Shipping is charged once per order, however many you add.": "送料は1回のご注文につき1回だけです。何点追加しても変わりません。",
"Paying from Instagram?": "Instagramの中でお支払いですか？",
"Checkout works best in Safari or Chrome. Tap ••• at the top right, then “Open in external browser”.": "お支払いはSafariまたはChromeがおすすめです。右上の ••• をタップし、「外部ブラウザで開く」を選んでください。",
"Copy page link": "ページのリンクをコピー",
"Payment not working?": "お支払いがうまくいきませんか？",
"Open in browser": "ブラウザで開く",
"Open in Chrome": "Chromeで開く",
"Link copied — paste it in Safari or Chrome": "リンクをコピーしました。SafariまたはChromeに貼り付けてください",
"Copy this link:": "このリンクをコピーしてください：",
"Your shipping details are sent with your PayPal order. Credit/debit cards accepted. Import duties/taxes are the buyer's responsibility, except US orders, which ship duty-paid (nothing to pay on delivery).": "お届け先はPayPalの注文と一緒に送られます。クレジットカード・デビットカードが使えます。輸入関税・税金はお客様のご負担です。ただし米国宛ては関税込みで発送します（受け取り時のお支払いはありません）。",
". By paying you agree to our": "。お支払いをもって、当サイトの",
".": "に同意したものとみなされます。",
"Korean PayPal accounts may not be able to pay a Korean seller. · 한국 PayPal 계정은 결제가 되지 않을 수 있습니다. 국내 구매는 네이버페이를 이용해 주세요.": "韓国のPayPalアカウントからは、韓国の販売者にお支払いできない場合があります。 · 한국 PayPal 계정은 결제가 되지 않을 수 있습니다. 국내 구매는 네이버페이를 이용해 주세요.",
"· 배송 정보 (English)": "· ローマ字（英語）でご記入ください",
"Cart": "カート",
"Open cart": "カートを開く",
"Collapse cart": "カートを閉じる",
"접기 / Collapse": "閉じる",
"Decrease": "減らす",
"Increase": "増やす",
"Your cart is empty.": "カートは空です。",
"Please fill in the highlighted shipping details. · 빨간 칸을 채워 주세요.": "赤枠のお届け先情報を入力してください。",
"Please write the name and address in English letters. · 이름·주소는 영문으로 써 주세요.": "お名前とご住所はローマ字（英語）でご記入ください。",
"No more available for this item.": "この商品はこれ以上在庫がありません。",
"Quantity adjusted to what's available.": "在庫に合わせて数量を調整しました。",
"Sold out — please remove": "売り切れ — 削除してください",
"Could not start checkout. You have not been charged.": "お支払いを開始できませんでした。料金は請求されていません。",
"Payment could not be completed. You have not been charged.": "お支払いが完了しませんでした。料金は請求されていません。",
"Payment could not be completed.": "お支払いが完了しませんでした。",
"PayPal could not be loaded. Please refresh the page.": "PayPalを読み込めませんでした。ページを再読み込みしてください。",
"Network error.": "通信エラーです。",
"Network error. Please try again.": "通信エラーです。もう一度お試しください。",
"Thank you! Your order has been placed.": "ありがとうございます！ご注文を承りました。",
"PayPal will email your receipt. Your order will ship within a week, and the tracking number will appear in MY ORDER once it ships.": "領収書はPayPalからメールで届きます。ご注文は1週間以内に発送し、発送後は「ご注文の確認」に追跡番号が表示されます。",
"ORDER COMPLETE": "ご注文完了",
"PAYMENT COMPLETE": "お支払い完了",
"Untitled": "無題",
"Order status & messages": "ご注文状況とメッセージ",
"Enter the email you used at checkout.": "ご注文時のメールアドレスを入力してください。",
"View": "確認",
"Sign out": "ログアウト",
"Orders": "ご注文",
"Messages": "メッセージ",
"No messages yet.": "メッセージはまだありません。",
"Only you and the artist can see these messages.": "このメッセージはお客様と作家だけが見られます。",
"Session expired. Please enter your email again.": "接続が切れました。もう一度メールアドレスを入力してください。",
"Payment received": "お支払い済み",
"Preparing": "発送準備中",
"Shipped": "発送済み",
"Payment pending": "お支払い確認中",
"Refunded": "返金済み",
"Canceled": "キャンセル",
"Track package →": "荷物を追跡 →",
"Korea Post": "韓国郵便",
"Could not send.": "送信できませんでした。",
"Could not delete.": "削除できませんでした。",
"Send a message to the artist": "作家にメッセージを送る",
"· International orders (PayPal) ship by Korea Post within a week of payment. Prints can ship by K-Packet or EMS.": "· 海外からのご注文（PayPal）は、お支払いから1週間以内に韓国郵便で発送します。版画はK-PacketまたはEMSを選べます。",
"· As each work is a limited edition or a unique piece, returns are not accepted. If your item arrives damaged, please contact me within 7 days of delivery with photos of the item and its packaging, and I will arrange a refund once the damage is confirmed.": "· どの作品も限定エディションまたは一点ものですので、返品はお受けしておりません。破損して届いた場合は、到着から7日以内に商品と梱包の写真を添えてご連絡ください。破損を確認したうえで返金いたします。"
};
var SHIPJ={
'Every order is packed by hand in my studio in Korea and shipped worldwide with tracking.':'ご注文はすべて韓国のアトリエで手作業で梱包し、追跡番号付きで世界中へお届けします。',
'Orders ship within one week of payment, by Korea Post.':'ご注文はお支払いから1週間以内に、韓国郵便で発送します。',
'Prints: choose K-Packet or EMS at checkout.':'版画：お支払いの際にK-PacketかEMSを選べます。',
'K-Packet is Korea Post’s economical tracked service and usually arrives two to three weeks after dispatch. EMS is the express service and usually arrives in about one to two weeks. K-Packet is available for print orders to selected countries.':'K-Packetは韓国郵便の追跡付きの割安な配送で、通常は発送から2〜3週間で届きます。EMSは速達で、通常は1〜2週間ほどで届きます。K-Packetは一部の国・地域への版画のご注文でご利用いただけます。',
'Original works and books ship by EMS.':'原画と書籍はEMSで発送します。',
'One shipping fee per order,':'送料は1回のご注文につき1回だけ。',
'however many items you buy. The fee depends on the destination and is shown in the cart once you choose your country. With K-Packet, one fee covers up to 4 prints, and a slightly higher fee covers 5 or more.':'何点ご購入いただいても同じです。送料はお届け先によって異なり、カートで国・地域を選ぶと表示されます。K-Packetの場合、版画4点までは同じ送料で、5点以上は少し高い送料になります。',
'Delivery times depend on the destination and on customs. If your local post office leaves a delivery notice, please arrange redelivery or pickup promptly, as unclaimed parcels are returned to Korea.':'お届けまでの日数は、お届け先や税関によって異なります。不在通知が届いた場合は、お早めに再配達または窓口での受け取りを手配してください。受け取られなかった荷物は韓国へ返送されます。',
'Once your order ships, the tracking number appears in':'発送後、追跡番号は',
'and in your PayPal order details.':'とPayPalの注文詳細に表示されます。',
'Packaging':'梱包',
'Posters are rolled in protective paper and bubble wrap and shipped in a sturdy cardboard tube.':'ポスターは保護紙とエアパッキンで巻き、丈夫な紙筒に入れてお送りします。',
'Posters ship unframed.':'ポスターは額なしでのお届けです。',
'Original works are wrapped in protective layers and packed securely for the journey.':'原画は何重にも保護材で包み、輸送に耐えるようしっかり梱包します。',
'Customs, duties and taxes':'税関・関税・税金',
'United States:':'米国：',
'orders ship duty-paid. Duties are included at checkout, so there is nothing to pay on delivery.':'関税込みで発送します。関税はお支払い時に含まれているため、受け取り時のお支払いはありません。',
'All other countries:':'その他の国・地域：',
'import duties and taxes, if any, are the buyer’s responsibility and may be collected by your local post or customs office on delivery. Amounts vary by country.':'輸入関税・税金がかかる場合はお客様のご負担となり、受け取り時に現地の郵便局や税関から請求されることがあります。金額は国によって異なります。',
'Returns and damage':'返品と破損',
'As each work is a limited edition or a unique piece, returns are not accepted. If your item arrives damaged, please contact me within 7 days of delivery with photos of the item and its packaging, and I will arrange a refund once the damage is confirmed.':'どの作品も限定エディションまたは一点ものですので、返品はお受けしておりません。破損して届いた場合は、到着から7日以内に商品と梱包の写真を添えてご連絡ください。破損を確認したうえで返金いたします。',
'Payment':'お支払い',
'Prices are in US dollars.':'価格は米ドル表示です。',
'Pay with PayPal or with a credit or debit card through PayPal. You do not need a PayPal account to pay by card.':'PayPal、またはPayPal経由でクレジットカード・デビットカードでお支払いいただけます。カード払いにPayPalアカウントは必要ありません。',
'FAQ':'よくある質問',
'Are the posters signed?':'ポスターにはサインがありますか？',
'Yes. Each poster is signed and numbered by hand, in editions of 300.':'はい。どのポスターにも手書きのサインとエディション番号が入っています（各300部限定）。',
'Can I buy a work that is not in the shop?':'ショップにない作品も購入できますか？',
'Many works shown on this site are available by inquiry. Please write to':'このサイトに載っている作品の多くは、お問い合わせのうえご購入いただけます。',
'with the title of the work.':'まで、作品名を添えてご連絡ください。',
'Can I order several items together?':'複数の商品をまとめて注文できますか？',
'Yes. Add everything to the cart and check out once; you pay a single shipping fee for the whole order.':'はい。すべてカートに入れて一度にお支払いいただければ、送料はご注文全体で1回分だけです。',
'How do I contact you about my order?':'ご注文について問い合わせるには？',
'with your order number. You can also check your order status in':'まで、注文番号を添えてメールでご連絡ください。ご注文の状況は',
'.':'でもご確認いただけます。',
'Shipping':'発送','Shipping & FAQ':'配送とよくある質問',
'← Back to SHOP':'← ショップに戻る'
};
var SECJ={'EDITIONS':'エディション','ORIGINALS':'原画','SCULPTURE':'彫刻','BOOKS':'書籍','SHOP':'ショップ','WORKS':'作品','TEXT':'テキスト','MY ORDER':'ご注文の確認'};
var KINDJ={'Edition':'エディション','Original':'原画','Sculpture':'彫刻','Book':'書籍'};
function feej(x){ return x?'（'+x.replace(/^ \(|\)$/g,'')+'）':''; }
var RJ=[
 [/^← Back to (.+)$/, function(m){ return '← '+(SECJ[m[1]]||m[1])+'に戻る'; }],
 [/^CART · (\d+) · (\$[\d.,]+)$/, function(m){ return 'カート · '+m[1]+' · '+m[2]; }],
 [/^(Edition|Original|Sculpture|Book) · (\$[\d.,]+)$/, function(m){ return KINDJ[m[1]]+' · '+m[2]; }],
 [/^Signed and numbered, edition of (\d+) \+ (\d+) AP$/, function(m){ return 'サイン・番号入り、'+m[1]+'部限定 + '+m[2]+' AP'; }],
 [/^Signed and numbered, edition of (\d+)$/, function(m){ return 'サイン・番号入り、'+m[1]+'部限定'; }],
 [/^Maximum (\d+) per item\.$/, function(m){ return '1商品につき最大'+m[1]+'点までです。'; }],
 [/^(\d+) pages$/, function(m){ return m[1]+'ページ'; }],
 [/^by (.+)$/, function(m){ return '著：'+m[1]; }],
 [/^designed by (.+)$/, function(m){ return 'デザイン：'+m[1]; }],
 [/^✓ One shipping fee( \(\$[\d.]+\))? covers all (\d+) (prints|items)\.$/, function(m){ return '✓ '+m[2]+'点すべて、送料1回分'+feej(m[1])+'でお届けします。'; }],
 [/^Add up to (\d+) more prints for the same shipping( \(\$[\d.]+\))?\.$/, function(m){ return '同じ送料'+feej(m[2])+'で、あと'+m[1]+'点まで版画を追加できます。'; }],
 [/^Add more prints — shipping stays the same( \(\$[\d.]+\))?\.$/, function(m){ return '版画を追加しても送料は変わりません'+feej(m[1])+'。'; }],
 [/^US import duty \((\d+(?:\.\d+)?)%, prepaid\)$/, function(m){ return '米国輸入関税（'+m[1]+'%、前払い済み）'; }],
 [/^US import duty \((\d+(?:\.\d+)?)%\)$/, function(m){ return '米国輸入関税（'+m[1]+'%）'; }],
 [/^US orders: import duty \((\d+(?:\.\d+)?)%\) is prepaid by me at shipping and included in your total — no extra charge on delivery\.$/, function(m){ return '米国宛て：輸入関税（'+m[1]+'%）は発送時にこちらで前払いし、合計金額に含まれています。受け取り時の追加のお支払いはありません。'; }],
 [/^Tax ID \((.+)\)$/, function(m){ return '納税者番号（'+m[1]+'）'; }],
 [/^Total \$([\d.]+) \(incl\. shipping \$([\d.]+)(?:, US duty \$([\d.]+))?\)$/, function(m){ return '合計 $'+m[1]+'（送料 $'+m[2]+(m[3]?'、米国関税 $'+m[3]:'')+' を含む）'; }],
 [/^Total \$([\d.]+) \(shipping \$([\d.]+)(?:, US duty \$([\d.]+))?\)(?: · Ship to (.+))?$/, function(m){ return '合計 $'+m[1]+'（送料 $'+m[2]+(m[3]?'、米国関税 $'+m[3]:'')+'）'+(m[4]?' · お届け先 '+m[4]:''); }],
 [/^"(.+)" is sold out\. Please remove it\.$/, function(m){ return '「'+m[1]+'」は売り切れです。削除してください。'; }],
 [/^Could not send\. Please try again, or email (.+)$/, function(m){ return '送信できませんでした。もう一度お試しいただくか、'+m[1]+' までメールでご連絡ください'; }],
 [/^International checkout is temporarily unavailable\. Please email (.+?)\.?$/, function(m){ return '海外向けのお支払いは一時的にご利用いただけません。'+m[1]+' までメールでご連絡ください。'; }],
 [/^Something went wrong with PayPal\. You have not been charged\. If it keeps happening, email (.+?)\.?$/, function(m){ return 'PayPalで問題が起きました。料金は請求されていません。何度も起きる場合は '+m[1]+' までメールでご連絡ください。'; }],
 [/^Connection lost while confirming the payment — it may or may not have gone through\. Please check MY ORDER or your PayPal account before trying again, or email (.+?)\.?$/, function(m){ return 'お支払いの確認中に接続が切れました。お支払いが完了しているかどうかわかりません。もう一度お試しになる前に「ご注文の確認」かPayPalアカウントをご確認いただくか、'+m[1]+' までメールでご連絡ください。'; }],
 [/^A poster edition of (.+) \((\d{4})\)\.$/, function(m){ return '《'+m[1]+'》（'+m[2]+'）のポスターエディション。'; }],
 [/^A poster edition of (.+) \((\d{4})\), originally produced and released as a limited edition in 2021\. To mark the relaunch of the website, the remaining prints are now available once again\.$/, function(m){ return '《'+m[1]+'》（'+m[2]+'）のポスターエディション。2021年に限定版として制作・発売されたもので、ウェブサイトのリニューアルを記念して、残りの部数を再び販売しています。'; }],
 [/^(The Three Graces Pixel Props \d+) \((\d{4})\) is a painting first shown in the solo exhibition PIXEL PROMETHEUS THE THREE GRACES \(STANDARD\.a \+ Superellipse Gallery, Seoul, 2019\)\. It belongs to a series that renders parts of the faces and bodies of the Three Graces in pixels\.$/, function(m){ return '《'+m[1]+'》（'+m[2]+'）は、個展《PIXEL PROMETHEUS THE THREE GRACES》（STANDARD.a + Superellipse Gallery、ソウル、2019）で初めて発表した絵画で、三美神の顔や体の一部をピクセルで描くシリーズの一点である。'; }],
 [/^(Laocoon \(face\) \d+) \((\d{4})\) is a painting first shown in the solo exhibition Fragmentary \(YK Presents, Seoul, 2024\)\. It belongs to a series of black-and-white paintings that revisits the ancient sculpture of the Trojan priest and his two sons dying in the coils of sea serpents\. Redrawn as women in black and white, the figures are fragmented by serpents hidden in the black ground, while lines cutting across the picture amplify their emotion\.$/, function(m){ return '《'+m[1]+'》（'+m[2]+'）は、個展《Fragmentary》（YK Presents、ソウル、2024）で初めて発表した絵画で、海蛇に巻きつかれて死んでいくトロイアの神官と二人の息子の古代彫刻を描き直す白黒の絵画シリーズの一点である。白黒で女性として描き直された人物は、黒い地に隠れた海蛇によって断片となり、画面を横切る線がその感情を増幅する。'; }],
 [/^(Torso \d+) \((\d{4})\) is a painting from the Torso series, begun in 2012\. The series takes the torso of classical sculpture, a body without arms or legs, as its basis and redraws it in the visual language of animation and subculture\.$/, function(m){ return '《'+m[1]+'》（'+m[2]+'）は、2012年に始まったTorsoシリーズの絵画である。このシリーズは、腕や脚のない古典彫刻のトルソをもとに、アニメーションとサブカルチャーの視覚言語で描き直している。'; }],
 [/^Image (\d+)$/, function(m){ return '画像 '+m[1]; }],
 [/^(.+) — WORKS$/, function(m){ return m[1]+' — 作品'; }],
 [/^Business (.+?) · Representative (.+?) · Business Reg\. No\. (.+)$/, function(m){
   return ('商号 '+m[1]+' · 代表者 '+m[2]+' · 事業者登録番号 '+m[3])
     .replace(' Mail-order Reg. No. ',' 通信販売業申告番号 ').replace(/ Address /,' 住所 ').replace(' · Phone ',' · 電話 ').replace(' · Email ',' · メール '); }]
];

if(/^\/en\/shipping\/?$/.test(location.pathname)){ for(var kj in SHIPJ) DJ[kj]=SHIPJ[kj]; DJ['Email']=''; }

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
 [/^A poster edition of (.+) \((\d{4})\)\.$/, function(m){ return '〈'+m[1]+'〉（'+m[2]+'）的海報版。'; }],
 [/^A poster edition of (.+) \((\d{4})\), originally produced and released as a limited edition in 2021\. To mark the relaunch of the website, the remaining prints are now available once again\.$/, function(m){ return '〈'+m[1]+'〉（'+m[2]+'）的海報版，最初於 2021 年以限量版製作發行。為紀念網站重新開幕，剩餘的版本現在再次開放購買。'; }],
 [/^(The Three Graces Pixel Props \d+) \((\d{4})\) is a painting first shown in the solo exhibition PIXEL PROMETHEUS THE THREE GRACES \(STANDARD\.a \+ Superellipse Gallery, Seoul, 2019\)\. It belongs to a series that renders parts of the faces and bodies of the Three Graces in pixels\.$/, function(m){ return '〈'+m[1]+'〉（'+m[2]+'）是首次發表於個展〈PIXEL PROMETHEUS THE THREE GRACES〉（STANDARD.a + Superellipse Gallery，首爾，2019）的繪畫，屬於以像素描繪美惠三女神臉部與身體局部的系列。'; }],
 [/^(Laocoon \(face\) \d+) \((\d{4})\) is a painting first shown in the solo exhibition Fragmentary \(YK Presents, Seoul, 2024\)\. It belongs to a series of black-and-white paintings that revisits the ancient sculpture of the Trojan priest and his two sons dying in the coils of sea serpents\. Redrawn as women in black and white, the figures are fragmented by serpents hidden in the black ground, while lines cutting across the picture amplify their emotion\.$/, function(m){ return '〈'+m[1]+'〉（'+m[2]+'）是首次發表於個展〈Fragmentary〉（YK Presents，首爾，2024）的繪畫，屬於重新詮釋特洛伊祭司與兩個兒子被海蛇纏繞而死的古代雕塑的黑白繪畫系列。人物以黑白重新畫成女性，被隱入黑色背景的海蛇切成片段，橫切畫面的線條則放大了她們的情緒。'; }],
 [/^(Torso \d+) \((\d{4})\) is a painting from the Torso series, begun in 2012\. The series takes the torso of classical sculpture, a body without arms or legs, as its basis and redraws it in the visual language of animation and subculture\.$/, function(m){ return '〈'+m[1]+'〉（'+m[2]+'）是始於 2012 年的 Torso 系列中的繪畫。這個系列以古典雕塑中沒有手臂和腿的軀幹像為基礎，用動畫與次文化的視覺語言重新描繪。'; }],
 [/^Image (\d+)$/, function(m){ return '圖片 '+m[1]; }],
 [/^(.+) — WORKS$/, function(m){ return m[1]+' — 作品'; }],
 [/^Business (.+?) · Representative (.+?) · Business Reg\. No\. (.+)$/, function(m){
   return ('商號 '+m[1]+' · 代表人 '+m[2]+' · 營業登記號碼 '+m[3])
     .replace(' Mail-order Reg. No. ',' 通信販賣業申報 ').replace(/ Address /,' 地址 ').replace(' · Phone ',' · 電話 ').replace(' · Email ',' · 電子郵件 '); }]
];

/* the artist's own texts (works and shop descriptions): one file per language, fetched only when that language is on,
   keyed by a fingerprint of the English paragraph — a paragraph edited later simply stays in English until translated again */
var DSC={}, DSL={};
function dkey(){ return LG==='ja'?'ja':HANS?'zhs':'zh'; }
function fp(t){ var e=2166136261; for(var n=0;n<t.length;n++){ e^=t.charCodeAt(n); e=Math.imul(e,16777619); } return (e>>>0).toString(16)+':'+t.length; }
function loadDesc(){ var k=dkey(); if(DSL[k]) return; DSL[k]=1;
  fetch('/desc.'+k+'.json?v=1').then(function(r){ return r.ok?r.json():null; }).then(function(j){ if(!j) return; DSC[k]=j; if(on&&dkey()===k) walk(document.body); }).catch(function(){ DSL[k]=0; }); }
function tr1(s){
  var k=s.replace(/\s+/g,' ').trim(); if(!k) return null;
  var DD=LG==='ja'?DJ:D, RR=LG==='ja'?RJ:R;
  if(Object.prototype.hasOwnProperty.call(DD,k)) return DD[k];
  if(k.length>40){ var ds=DSC[dkey()]; if(ds){ var hk=fp(k); if(Object.prototype.hasOwnProperty.call(ds,hk)) return ds[hk]; } }
  for(var i=0;i<RR.length;i++){ var m=k.match(RR[i][0]); if(m) return RR[i][1](m); }
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
  /* the language buttons: KO becomes 中文 (Chinese browsers) or 日本語 (Japanese browsers) */
  if((ZU||JU)&&el.matches&&el.matches('[data-setlang="ko"]')){ var lb=ZU?'中文':'日本語'; if(v!==lb){ n.nodeValue=lb; } return; }
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
  for(var i=0;i<done.length;i++){ var n=done[i]; if(n.__zh&&n.nodeValue===n.__zh[1]){ n.nodeValue=n.__zh[0]; n.__zh=null; } }
  done=done.filter(function(n){ return n.__zh&&n.isConnected; });
  for(var j=0;j<doneA.length;j++){ var el=doneA[j][0], a=doneA[j][1], r=el.__zha&&el.__zha[a]; if(r&&el.getAttribute(a)===r[1]){ el.setAttribute(a,r[0]); el.__zha[a]=null; } }
  doneA=[];
}
/* master (not a Taiwan/Hong Kong browser): a third button 中文 after KO / EN */
function zhBtns(){
  if(ZU||JU) return;
  var ls=document.querySelectorAll('.lang-switch:not([data-zhb])');
  for(var i=0;i<ls.length;i++){ var w=ls[i]; w.setAttribute('data-zhb','1');
    var sep=document.createElement('i'); sep.textContent='/';
    w.appendChild(sep);
    var bj=document.createElement('button'); bj.type='button'; bj.setAttribute('data-setlang','ja'); bj.textContent='日本語'; w.appendChild(bj);
    var s3=document.createElement('i'); s3.textContent='/'; w.appendChild(s3);
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

/* m: 'zh', 'ja' or '' (off) */
function setMode(m){
  if(on) revert();
  on=!!m; if(m) LG=m;
  try{ localStorage.setItem('lysZh',m==='zh'?'1':'0'); localStorage.setItem('lysJa',m==='ja'?'1':'0'); }catch(e){}
  H.classList.toggle('zh',m==='zh'); H.classList.toggle('xja',m==='ja');
  if(m){
    if(H.getAttribute('data-lang')!=='en'){ H.setAttribute('data-lang','en'); try{ localStorage.setItem('lysLang','en'); }catch(e){} }
    HANS=m==='zh'&&zhv(); H.classList.toggle('zhs',HANS); H.setAttribute('lang',m==='ja'?'ja':HANS?'zh-Hans':'zh-Hant'); walk(document.body); loadDesc();
  } else { H.classList.remove('zhs'); setTimeout(function(){ H.setAttribute('lang',H.getAttribute('data-lang')==='ko'?'ko':'en'); },0); }
}
function setOn(v){ setMode(v?'zh':''); }

/* 中文 / EN: KO is shown as 中文 for these visitors */
window.addEventListener('click',function(e){
  var b=e.target&&e.target.closest&&e.target.closest('[data-setlang]'); if(!b) return;
  var l=b.getAttribute('data-setlang');
  if(l==='ja'||(JU&&l==='ko')){ e.preventDefault(); e.stopImmediatePropagation(); if(!(on&&LG==='ja')) setMode('ja'); }
  else if(l==='zh'||(ZU&&l==='ko')){ e.preventDefault(); e.stopImmediatePropagation();
    var v=b.getAttribute('data-zhv'); if(v){ try{ localStorage.setItem('lysZhV',v); }catch(er){} }
    if(!(on&&LG==='zh'&&HANS===zhv())) setMode('zh'); }
  else if(on) setMode('');
},true);

var css=document.createElement('style');
css.textContent='html.zhu .lang-switch [data-setlang="ko"]{letter-spacing:.04em}'+
 'html.zh:not(.zhs) .lang-switch [data-zhv="hant"],html.zh.zhs .lang-switch [data-zhv="hans"]{color:var(--ink)!important;font-weight:600!important}'+
 'html.zhu.zh .lang-switch [data-setlang="ko"]{color:var(--ink)!important;font-weight:600!important}'+
 'html.zh:not(.zhu) .lang-switch [data-setlang="ko"]{color:var(--ink-faint,#aaa)!important;font-weight:400!important}'+
 'html.zh .lang-switch [data-setlang="en"]{color:var(--ink-faint,#aaa)!important;font-weight:400!important}'+
 'html.zh body,html.zh .cv-statement{word-break:normal;line-break:strict}'+
 'html.xja .lang-switch [data-setlang="ja"],html.jau.xja .lang-switch [data-setlang="ko"]{color:var(--ink)!important;font-weight:600!important}'+
 'html.xja:not(.jau) .lang-switch [data-setlang="ko"],html.xja .lang-switch [data-setlang="en"],html.xja .lang-switch [data-setlang="zh"]{color:var(--ink-faint,#aaa)!important;font-weight:400!important}'+
 'html.zh .lang-switch [data-setlang="ja"]{color:var(--ink-faint,#aaa)!important;font-weight:400!important}'+
 'html.xja body,html.xja .cv-statement{word-break:normal;line-break:strict}';
document.head.appendChild(css);

function start(){
  if(ZU) H.classList.add('zhu'); if(JU) H.classList.add('jau');
  var want=''; try{ var z=localStorage.getItem('lysZh'), j=localStorage.getItem('lysJa'); want=ZU?(z!=='0'?'zh':''):JU?(j!=='0'?'ja':''):(z==='1'?'zh':j==='1'?'ja':''); }catch(e){}
  zhBtns();
  on=false; walk(document.body);           /* the 中文 / 日本語 label */
  if(want) setMode(want); else { H.classList.remove('zh'); H.classList.remove('xja'); }
  mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:AT});
  H.classList.remove('zhwait');
}
if(document.body) start(); else document.addEventListener('DOMContentLoaded',start);
})();
