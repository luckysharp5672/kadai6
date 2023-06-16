# マップにメッセージを刻むアプリ

## DEMO

  - デプロイは断念。。

## 紹介と使い方

  - デバイスの現在位置を取得し、その位置情報とともに好きなメッセージを入力・保存
  - メッセージを記録した場所に近づいてメッセージを探すとその記録したメッセージが表示される

## 工夫した点

  - 現在位置はGeolocation APIで取得しました
  - メッセージを登録するとその位置はBing Map状にPush pinで表示されるようにしました
  - デバイスを持ってそのPush pinの位置の近くまで言って50m以内に入った時に”メッセージを探す”ボタンを押すとその場所に記録されたメッセージが表示されます。二点間の距離を計算する関数はCatGPTに聞きました。

## 苦戦した点

  - Firebaseにうまく位置情報とメッセージが保存されず、エラーメッセージを見ると、Firebaseのバージョン9.1.0が ESモジュールバージョンで読み込まれており、それが原因で問題が発生していました。あまり理解しきれていないのですが、Firebaseの従来の（"名前空間"）バージョンを使用する必要があることが分かり、Firebaseのversion（8.x系）を変更するとうまくいきました。

## 参考にした web サイトなど

  - ChatGPT先生とのやり取りでした。