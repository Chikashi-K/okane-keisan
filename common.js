function Calculate(){
  	//入力値の数値変換
  		var chikainp = parseInt(input1.otto.value);
  		var sakiinp = parseInt(input1.tsuma.value);

  	//お金の内訳
  		//じぶん銀行
  		const kyoueki = parseInt(26500+23000);            //じぶん銀(共益¥25,600＋英語¥21,120)
	    const loan = parseInt(117000+24000);              //本店(ローン¥136000/月＋5000円積立/月)
		const hoiku = parseInt(0);                        //保育
		const tsumitate = parseInt(80000+30700+21700);    //大伝馬
		const kyouyu = parseInt(55000);                   //現金
		const teate = parseInt(30000);                    //家事
		const pool = parseInt(7700+8360);                 //プール		
		
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
		var hontensum = Math.ceil((loan + hoiku + pool)*0.01)*100;    //本店合計
		var sums = Math.ceil((kyoueki + hontensum + tsumitate + kyouyu)*0.01)*100; //全合計
		var chikaPay = 0;
		var chikaPaySum = 0;
		var sakiPaySum = 0;
		var chikaPayNokori = 0;
		//	var hontensum = loan + hoiku;
  		//	var sum = kyoueki + hontensum + tsumitate + kyouyu;

  	//割合の計算
	  	chikaPay = (chikainp / (sakiinp + chikainp));
	  	//sakiPay = (sakiinp / (sakiinp + chikainp));

  		//表示用
  		var viewchikaPay = Math.ceil(chikainp/(sakiinp+chikainp)*100);
  		var viewsakiPay = 100 - viewchikaPay;

  	//支払う合計の計算
	  	chikaPaySum = teate + Math.ceil(chikaPay * sums * 0.01) * 100;
	  	sakiPaySum = sums - chikaPaySum;

  	//どの口座にどれだけ支払うか計算
  		var chikaPayNokori = chikaPaySum - hontensum;

		  if (chikaPayNokori > 0) {
			ChikaHonten = hontensum;
			//本店分を差し引いて残っているなら、大伝馬町にお金を入れる
			if (chikaPayNokori >= tsumitate) {
				chikaPayNokori = chikaPayNokori - tsumitate;
				ChikaOdenma = tsumitate;

				//大伝馬町を差し引いて残っているならじぶん銀行にお金を入れると共に、現金金額も確定する
				if (chikaPayNokori >= kyoueki) {
					chikaPayNokori = chikaPayNokori - kyoueki;
					ChikaJibun = kyoueki;
					ChikaGenkin = chikaPayNokori;
					SakiGenkin = kyouyu - ChikaGenkin;
					SakiOdenma = 0;
					SakiJibun = 0;
					SakiHonten = 0;
				} else {
					//じぶん銀行に入金してお金が尽きたので、振込金額が確定する
					ChikaJibun = chikaPayNokori;
					ChikaGenkin = 0;
					SakiJibun = kyoueki - ChikaJibun;
					SakiGenkin = kyouyu;
					SakiOdenma = 0;
					SakiHonten = 0;
				}
			} else {
				//大伝馬町に入金してお金が尽きるので金額が確定する
				ChikaOdenma = chikaPayNokori;
				ChikaJibun = 0;
				ChikaGenkin = 0;
				SakiGenkin = kyouyu;
				SakiJibun = kyoueki;
				SakiOdenma = tsumitate - chikaPayNokori;
				SakiHonten = 0;
			}
		} else {
			//本店に補填してもらう
			SakiGenkin = kyouyu;
			SakiJibun = kyoueki;
			SakiOdenma = tsumitate;
			SakiHonten = sakiPaySum - SakiGenkin - SakiJibun - SakiOdenma;
			ChikaHonten = hontensum - SakiHonten;
			ChikaOdenma = 0;
			ChikaJibun = 0;
			ChikaGenkin = 0;
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
    c_teate.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(-30000);
    s_teate.innerHTML = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(30000);

}


function scrollDown() {
  var element = document.getElementById('table01'); // 移動させたい位置の要素を取得
  var rect = element.getBoundingClientRect();
  var position = rect.top;    // 一番上からの位置を取得
  scrollTo(0, position);
 }