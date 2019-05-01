function Calculate(){
  	//入力値の数値変換
  		var chikainp = parseInt(input1.otto.value);
  		var sakiinp = parseInt(input1.tsuma.value);

  	//お金の内訳
  		//じぶん銀行
  		var kyoueki = parseInt(26500);
  		//本店
  		var loan = parseInt(112000);
  		var hoiku = parseInt(86300);
  		//大伝馬町
  		var tsumitate = parseInt(80000);
  		//現金
  		var kyouyu = parseInt(50000);
  		//家事手当
  		var teate = 20000;

  	 //支払金額種類
  	 	var ChikaJibun = 0;
  	 	var ChikaOdenma = 0;
  	 	var ChikaGenkin = 0;
  	 	var ChikaHonten = 0;
  	 	var SakiHonten = 0;
  	 	var SakiOdenma = 0;
  	 	var SakiJibun = 0;
  	 	var SakiGenkin = 0;

  	//計算用の変数
		var hontensum = loan + hoiku;
  		var sum = kyoueki + hontensum + tsumitate + kyouyu;

  	//割合の計算
   		var chikaPay = (chikainp/(sakiinp+chikainp));
  		var sakiPay = (sakiinp/(sakiinp+chikainp));

  		//表示用
  		var viewchikaPay = Math.ceil(chikainp/(sakiinp+chikainp)*100);
  		var viewsakiPay = 100 - viewchikaPay;

  	//支払う合計の計算
  		var chikaPaySum = teate + Math.ceil(chikaPay*sum*0.01) * 100;
  		var sakiPaySum = sum - chikaPaySum;

  	//どの口座にどれだけ支払うか計算
  		var chikaPayNokori = chikaPaySum - hontensum;

  		if (chikaPayNokori > 0){
  			ChikaHonten = hontensum;
  			//本店分を差し引いて残っているなら、大伝馬町にお金を入れる
  				if (chikaPayNokori >= tsumitate){
  					chikaPayNokori = chikaPayNokori - tsumitate;
  					ChikaOdenma = tsumitate;

 					//大伝馬町を差し引いて残っているならじぶん銀行にお金を入れると共に、現金金額も確定する
  					if (chikaPayNokori >= kyoueki){
  						chikaPayNokori = chikaPayNokori - kyoueki;
  						ChikaJibun = kyoueki;
  						ChikaGenkin = chikaPayNokori;
  						SakiGenkin = kyouyu - ChikaGenkin;
  					} else {
  						//じぶん銀行に入金してお金が尽きたので、振込金額が確定する
  						ChikaJibun = chikaPayNokori;
  						SakiJibun = kyoueki - ChikaJibun;
  						SakiGenkin = kyouyu;
  					}
  				} else {
  					//大伝馬町に入金してお金が尽きるので金額が確定する
  					ChikaOdenma = chikaPayNokori;
  					SakiGenkin = kyouyu;
  					SakiJibun = kyoueki;
  					SakiOdenma = tsumitate - chikaPayNokori;
  				}
  		} else {
  		//本店に補填してもらう
  			SakiGenkin = kyouyu;
  			SakiJibun = kyoueki;
  			SakiOdenma = tsumitate;
  			SakiHonten = sakiPaySum - SakiGenkin - SakiJibun - SakiOdenma;
  			ChikaHonten = hontensum - SakiHonten;
  		}

    //テーブルに数値を入力
  	c_rate.innerHTML =viewchikaPay + '%';
  	s_rate.innerHTML =viewsakiPay + '%'; 

  	c_pay.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(chikaPaySum);
  	s_pay.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(sakiPaySum);

		c_honten.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(ChikaHonten);
		s_honten.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(SakiHonten);

		c_odenma.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(ChikaOdenma);
		s_odenma.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(SakiOdenma);

		c_jibun.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(ChikaJibun);
		s_jibun.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(SakiJibun);

		c_cash.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(ChikaGenkin);
		s_cash.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(SakiGenkin);  		

    c_income.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(chikainp);
    s_income.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(sakiinp);
    c_teate.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(-20000);
    s_teate.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(20000);

}



function scrollDown() {
  var element = document.getElementById('table01'); // 移動させたい位置の要素を取得
  var rect = element.getBoundingClientRect();
  var position = rect.top;    // 一番上からの位置を取得
  scrollTo(0, position);
 }