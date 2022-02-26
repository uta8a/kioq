# kioq

## 開発の流れ

CI でチェックする項目 (https://github.com/uta8a/kioq/tree/main/.github/workflows)

- pull_request
  - commitlint: [commitlint](https://github.com/conventional-changelog/commitlint) を用いてコミットメッセージを統一する。
  - formatter: prettier を用いてソースコードのフォーマットを行う
  - linter: eslint を用いてシングルクオートに統一、みたいなコードの書き方を統一する
  - test: jest によるテスト [https://github.com/uta8a/kioq/tree/main/**tests**](https://github.com/uta8a/kioq/tree/main/__tests__) の中のテストが走る
- commit
  - formatter: pull_request と同じ
  - linter: pull_request と同じ
  - test: pull_request と同じ

開発の流れ

- ブランチを切る `git branch sub-branch` `git switch sub-branch`
- なんか機能追加する
- テストを書きたくなったら `__tests__` 以下に書く
- `yarn fmt` `yarn lint` で自動 fix する
- コミットメッセージは commitlint に従う(`echo 'commit message' | yarn commitlint` で事前確認できる。git hooks に入れても良い)
- `git push origin sub-branch`

入れておくといいもの(VSCode 拡張)

- editorconfig を入れていると勝手にファイル末尾の改行を追加してくれたりする
- eslint, prettier は入れておいていいかも。
