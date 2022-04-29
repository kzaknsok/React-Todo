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
 * 追加機能実装
 * inputテキストをincomplete-areaに表示させる
 * input情報のステート化
 * useState
 * 初期値は""空状態にしておく、
 * ※※※※※※※※※※※※※※※※※※※※※※※※※※※※
 * []👈これは無しで書かないと空の配列を渡してしまい、
 * 入力値扱いされる。
 * ※※※※※※※※※※※※※※※※※※※※※※※※※※※※
 *
 * 第一引数の変数名todoText,
 * 更新用の第二引数の変数名setTodoText,
 * todoTextはinputタグのvalueにあたる
 * value={todoText}とする
 * この時点では初期値の空文字が設定されており入力機能が効かない
 *
 * inputタグにonChange="{関数名}"を追記して、
 * stateの更新機能を実装し入力機能を実現させる。
 * 更新用の変巣を定義、アロー関数で実装、
 * (e)はeventの略、この部分は自由に命名。
 * eをターゲットにした処理を書く。
 * e.target.valueの部分は形式的に覚えてしまう。
 * それを更新用である変数setTodoTextに渡す。
 *
 * inputにonChange={onChangeTodoText}追記
 * inputを更新するonChangeTodoTextを渡すことで入力機能実装。
 *
 * 追加ボタン機能
 * 追加ボタンのbuttonにonClick={}を追記。
 * クリックイベントに連動させる変数onClickAddを定義、
 * alert()で動作確認、alertにはtodoTextを渡す。
 * その状態でonClickAddをbuttonのonClickに渡す。
 *
 * 未完了エリアへの表示
 * todoTextをincomplete-areaに表示させる
 * onClickAddに連動させるため、関数内の処理として、
 * 変数newTodosを実装。
 * [...incompleteTodos, todoText]
 * ...３つで情報を引き継がず新しい配列を作成。
 * 第二引数にtodoTextを渡す事で配列の更新をする。
 *
 * setIncompleteTodos(newTodos)
 * 更新用ステートincompleteTodosに、
 * 更新情報のnewTodosを渡して未完了エリアに、
 * 新しい配列を生成する。
 *
 * 現時点での課題...
 * 「入力欄にテキストが残る」、「空文字のまま追加できる」
 * クリックと同時に入力欄のステート、setTodoText("")に、
 * 空文字を設定し直す事で入力欄のリセットを実装。
 * if (todoText === "") return;をonClickAddの最初に
 * 組み込むことで空文字の場合は処理を最初に戻すよう設定。
 * 追加が出来なくなる。
 *
 * 削除ボタン
 * 削除ボタンにクリックイベント設置「関数名{onClickDelete}」とする
 * 関数を作成しalertで動作確認。
 * この段階では何行目の削除ボタンを押したか判断できていない。
 * map()で配列を受け取る際に、第二引数でindexを渡すと番号が受け取れる。
 * onClickDelete(index)としてクリックイベントの対象を判別。
 * 上の状態だとボタンを押さない状態でクリックイベントが反応してしまうため、
 * クリックイベントに() => onClickDelete(index)として個別の新しい関数を作成する。
 * 併せてonClickDelete関数の引数に(index)を渡して、
 * alert(index)でインデックス番号が受け取れているか動作確認する。
 *
 * 未完了のエリアから削除する（ボタンに連動して表示を削除）
 * 削除用にnewTodos=[...incompleteTodos]を定義し、
 * 引き継ぎなしの新しい配列を作成。
 * newTodosに対して.splice()を使って消す。
 * splice(index, 1); 第一引数でindexを受け取り削除対象を受け取り。
 * 第二引数に処理を行う件数を設定。
 * index何番目の一件を削除するという指示になる。
 * setIncompleteTodos(newTodos);を記述して、
 * 未完了エリアを更新する。
 */

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    "おおおお",
    "ええええ"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["ああああ"]);

  const onChangeTodoText = (e) => setTodoText(e.target.value);

  const onClickAdd = () => {
    if (todoText === "")
      // alert("Todoを入力しましょう");
      return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="ToDoを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のToDo</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key="{todo}" className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
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
