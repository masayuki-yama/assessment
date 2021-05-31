'use strict';
//要素の取得
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供を全削除
 * @param {HTMLElement} element HTMLの要素 
 */

//※1　あとでわかりやすくする為に関数定義しておく
function removeAllChildren(element) {
    while (element.firstChild) {
        //子供要素がある限り削除
        element.removeChild(element.firstChild);
    }
}
//ボタンを押したら反応する関数
assessmentButton.onclick = () => {
    //userNameオブジェクトからvalueプロパティからテキストエリアに入力された文字列を受け取る
    const userName = userNameInput.value
    if (userName.length === 0) {
        //名前が空欄の時は処理を終了する
        return;
    }

    //診断結果表示エリアの作成
    //※１先ほど設定していたから⬇️のように(resultDivided)を削除しているのがわかりやすい
    removeAllChildren(resultDivided);
    //createElementで設定した要素は、innerTextを使い編集する
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    //div要素を親としてh3を子要素として追加する
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

     //TODO　ツイートエリアの作成
     removeAllChildren(tweetDivided);
     //ツイートボタンのリンクを設置するための<a>を作る
     const anchor = document.createElement('a');
     const hrefValue =
     'https://twitter.com/intent/tweet?button_hashtag=' +
     encodeURIComponent('あなたの良いところ') +
     '&ref_src=twsrc%5Etfw'

     //setAttributeはクラス設定　(クラスは別に設定しても構わない)
     anchor.setAttribute('href', hrefValue);
     anchor.className = 'twitter-hashtag-button';
     anchor.setAttribute('data-text', result);
     anchor.innerText = 'tweet #あなたの良いところ';

     tweetDivided.appendChild(anchor);

     const script = document.createElement('script');
     script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
     tweetDivided.appendChild(script);
};

const answers = [
'{userName}のいいところはありません。懺悔しなこのやろう',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果 
 */
function assessment(userName) {
    //全文字のコード番号を取得して足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字コードの合計を回答数で割って添字を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('{userName}', userName);
    return result;
}
//ミスをエラーとして表示してくれる
console.assert(
    assessment('太郎') ===
    '太郎のいいところはありません。懺悔しなこのやろう',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。' 
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出す処理が正しくありません'
);
