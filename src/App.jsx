import React, { useState } from "react";
import "./styles.css";

/**
 * 通常のhtml,cssを元に作成
 *
 * 表示したいコンテンツ部分は空タグ<></>を書く、
 * htmlの<body>タグだと考えておこう。
 *
 * レンダリング
 * 情報の更新のために毎回一番初めらコードを読む
 * そのためループ(useState)を使っているタグ、
 * その一番目のところにkey="{引数}"を記述する。
 * これが繰り返しレンダリングする時、全ての情報を読み込むじゃなく、
 * 前回からの差分だけ読み込み、レンダリング効率を向上させる方法になる。
 *
 * set関数.map(todo)で表示させたい場所、
 * 今回はliの中にテキストべた書きじゃら{todo}に置き換える事で、
 * mapでループ処理した時に見つかった配列をその数だけ出力する。
 * mapは配列の中身を参照、関数と併用してforEachの様に機能できる。
 *
 */

export const App = () => {
  const [incompleteTodos, setIncompleteTodos] = useState([
    "おおおお",
    "ええええ"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["ああああ"]);
  return (
    <>
      <div className="input-area">
        <input placeholder="ToDoを入力" />
        <button>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のToDo</p>
        <ul>
          {incompleteTodos.map((todo) => {
            return (
              <div key="{todo}" className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                <button>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のToDo</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <div key="{todo}" className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
